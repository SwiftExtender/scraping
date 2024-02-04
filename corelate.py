import sys
import json
from xml.dom.minidom import parse
from xml.etree.ElementTree import Element, SubElement, tostring
from urllib.parse import urlparse, parse_qs

# root = Element('root')
# child = SubElement(root, "child")
# child.text = "I am a child"
#
# print(tostring(root))
import bs4
#import shutil
#shutil.copyfile(src, dst)
def construct_jmx():
    pass

def correlate_session():
    pass

def get_json_paths(d):
    if isinstance(d, dict):
        for key, value in d.items():
            yield f'.{key}'
            yield from (f'.{key}{p}' for p in get_json_paths(value))

    elif isinstance(d, list):
        for i, value in enumerate(d):
            yield f'[{i}]'
            yield from (f'[{i}]{p}' for p in get_json_paths(value))

def get_boundary_values():
    pass

def correlate_or_not():
    #req_url, req_post_data, resp_content_mime_type, resp_content
    pass

def collect_var_values(scenario_messaging):
    params = []
    allowed_mime_types = ['text/html', 'multipart/form-data', 'application/json']
    ignored_values = ('true', 'false')
    for sampler in scenario_messaging:
        #get url param values
        query_string = urlparse(sampler['req_url']).query
        get_params = parse_qs(query_string).values()
        for i in get_params:
            params.append(i)
        #get post params
        if req_post_data_mime_type in allowed_mime_types:
            if req_post_data_mime_type == 'application/json':
                get_json_paths(req_post_data_text)

        #print(get_params)

harfile = sys.argv[1]
reqs_dict = []
with open(harfile, 'r', encoding='utf-8') as f:
    har_data = f.readlines()
    har_data = ''.join(har_data)
    hardata = json.loads(har_data)
    for item in hardata["log"]["entries"]:
        req_method = item['request']['method']
        req_url = item['request']['url']
        req_http_version = item['request']['httpVersion']
        req_headers = item['request']['headers']
        req_post_data_mime_type = ''
        req_post_data_params = ''
        req_post_data_text = ''
        resp_status = item['response']['status']
        resp_content_mime_type = ''
        resp_content = ''
        #print(req_url)
        if 'postData' in item['request']:
            if 'mimeType' in item['request']['postData']:
                req_post_data_mime_type = item['request']['postData']['mimeType']
            if 'params' in item['request']['postData']:
                req_post_data_params = item['request']['postData']['params']
            req_post_data_text = item['request']['postData']['text']
        resp_headers = item['response']['headers']
        if 'content' in item['response']:
            resp_content_mime_type = item['response']['content']['mimeType']
            resp_content = item['response']['content']['text']
        #print(c)
        reqs_dict.append({'req_method': req_method, 'req_url': req_url, 'req_http_version': req_http_version, 'req_headers': req_headers, 'req_post_data_mime_type': req_post_data_mime_type, 'req_post_data_params': req_post_data_params, 'req_post_data_text': req_post_data_text, 'resp_status': resp_status, 'resp_headers': resp_headers, 'resp_content_mime_type': resp_content_mime_type, 'resp_content': resp_content})
        #c += 1
#print(reqs_dict)
collect_var_values(reqs_dict)
