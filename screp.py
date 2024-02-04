import requests
import os
import sys
from bs4 import BeautifulSoup
import ftfy
from urllib.parse import unquote

links = open(sys.argv[1], 'r')
links_arr = links.readlines()
links.close()

os.chdir('D:\!ARCHIVE!\PDF\\2010\\1')

for i in range(0, len(links_arr)):
    response_text = requests.get('http://www.magzdb.org'+links_arr[i]).text
    #">[" "]<"
    soup = BeautifulSoup(response_text, 'html.parser')
    volume = soup.findAll('a')
    file_path = ''
    for i in volume:
        t = str(i).find('../file')
        if t != -1:
            file_path = i
            break
    file_path = str(file_path).split("\"")[1][2:]
    pdf_download = requests.get('http://www.magzdb.org'+file_path, allow_redirects=True)
    print(pdf_download.status_code, pdf_download.url)
    if pdf_download.headers['Content-Type'] == 'application/pdf':
        open(str(unquote(str(pdf_download.url.rsplit('/', 1)[-1]))), 'wb').write(pdf_download.content)
        print('written')
    else:
        print('HTML_PAGE', 'http://www.magzdb.org'+file_path)
        soup1 = BeautifulSoup(pdf_download.content, 'html.parser')
        volume1 = soup.findAll('a')
        file_path1 = ''

        for a in soup1.find_all('a', href=True):
            if 'elibrary' in a['href']:
                file_path1 = a['href']
        print(file_path1)
        pdf_download1 = requests.get(file_path1)
        if pdf_download1.headers['Content-Type'] == 'application/pdf':
            open(str(unquote(str(pdf_download1.url.rsplit('/', 1)[-1]))), 'wb').write(pdf_download1.content)
            print('written')
        else:
            print(pdf_download1.headers['Content-Type'])
            print('ERROR!')