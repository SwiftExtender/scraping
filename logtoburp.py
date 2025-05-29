import argparse
import base64
import xml.etree.ElementTree as ET
import requests
from urllib.parse import urlparse, urlunparse

def parse_raw_request(request_bytes):
    """Parse raw HTTP request bytes into method, full URL, headers, and body."""
    try:
        parts = request_bytes.split(b'\r\n\r\n', 1)
        head = parts[0]
        body = parts[1] if len(parts) > 1 else b''
        
        lines = head.split(b'\r\n')
        request_line = lines[0].decode('utf-8', errors='replace')
        parts = request_line.split()
        method = parts[0]
        full_url = parts[1]
        
        # Parse headers
        headers = {}
        for line in lines[1:]:
            line_str = line.decode('utf-8', errors='replace').strip()
            if ':' in line_str:
                key, val = line_str.split(':', 1)
                headers[key.strip()] = val.strip()
                
        return method, full_url, headers, body
    
    except Exception as e:
        raise ValueError(f"Request parsing failed: {str(e)}") from e

def send_request(method, original_url, headers, body, target_override, proxy_url, host_header):
    """Send HTTP request using original URL or target override."""
    # Apply target override if specified
    if target_override:
        # Parse both URLs
        original_parsed = urlparse(original_url)
        target_parsed = urlparse(target_override)
        
        # Construct new URL with target's scheme/netloc but original path/query
        url = urlunparse((
            target_parsed.scheme or original_parsed.scheme,
            target_parsed.netloc or original_parsed.netloc,
            original_parsed.path,
            original_parsed.params,
            original_parsed.query,
            original_parsed.fragment
        ))
        
        # Update Host header unless custom header provided
        if not host_header:
            headers['Host'] = target_parsed.netloc or original_parsed.netloc
    else:
        url = original_url
    
    # Apply custom Host header if specified
    if host_header:
        headers['Host'] = host_header
    
    # Configure proxies
    proxies = {'http': proxy_url, 'https': proxy_url} if proxy_url else None
    
    # Send request
    try:
        response = requests.request(
            method=method,
            url=url,
            headers=headers,
            data=body,
            proxies=proxies,
            allow_redirects=False,
            verify=False
        )
        return response
    except requests.exceptions.RequestException as e:
        return str(e)

def process_burp_export(xml_file, target_override=None, proxy_url=None, host_header=None):
    """Process Burp export XML and send requests to original hosts by default."""
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    for item in root.findall('item'):
        # Extract request details
        request_elem = item.find('request')
        response_elem = item.find('response')
        
        if request_elem is None or request_elem.text is None:
            continue
            
        # Get URL from Burp's metadata if available
        url_elem = item.find('url')
        original_url = url_elem.text if url_elem is not None and url_elem.text else None
        
        # Get request bytes
        is_base64 = request_elem.get('base64', 'false') == 'true'
        raw_request = request_elem.text
        request_bytes = base64.b64decode(raw_request) if is_base64 else raw_request.encode('utf-8')
        
        try:
            # Parse request
            method, parsed_url, headers, body = parse_raw_request(request_bytes)
            
            # Prefer Burp's stored URL if available
            if original_url is None:
                original_url = parsed_url
            
            # Send request using original URL
            response = send_request(
                method, 
                original_url, 
                headers, 
                body, 
                target_override,
                proxy_url,
                host_header
            )
            
            # Display results
            print(f"\n=== Request: {method} {original_url} ===")
            print(f"Target: {'OVERRIDE' if target_override else 'ORIGINAL'}")
            if target_override:
                print(f"New Target: {target_override}")
            print(f"Host Header: {headers.get('Host', 'AUTO')}")
            print(f"Proxy: {proxy_url or 'None'}")
            
            if isinstance(response, str):
                print(f"Error: {response}")
            else:
                print(f"Response: {response.status_code} {response.reason}")
                print(f"Content Length: {len(response.content)} bytes")
                
                # Compare with original response if available
                if response_elem is not None and response_elem.text:
                    is_resp_base64 = response_elem.get('base64', 'false') == 'true'
                    original_response = base64.b64decode(response_elem.text) if is_resp_base64 else response_elem.text.encode()
                    print(f"Original Response Size: {len(original_response)} bytes")
                    print(f"Size Match: {'OK' if len(original_response) == len(response.content) else 'Wrong'}")
                    
        except Exception as e:
            print(f"Error processing request: {str(e)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Burp Suite Request Sender')
    parser.add_argument('--file', required=True, help='Burp export XML file')
    parser.add_argument('--target', help='Override target base URL (e.g., https://newhost:8080)')
    parser.add_argument('--proxy', help='Proxy URL (e.g., http://127.0.0.1:8080)')
    parser.add_argument('--host-header', help='Custom Host header value (e.g., example.com)')
    args = parser.parse_args()
    
    process_burp_export(
        args.file, 
        args.target, 
        args.proxy, 
        args.host_header
    )