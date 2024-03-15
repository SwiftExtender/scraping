import sys
import re
import copy

input_file = sys.argv[1]
output_file = sys.argv[2]
text = ""
count = 0
re_pattern = re.compile(r'\`(.*?)\]\]')


with open(input_file, 'r') as file:
    text = file.read()

for m in re.finditer(re_pattern, text):
    count += 1
    normalized_name = m.group(0).replace('[','').replace('=','').replace(']','').replace(',','').replace(' ','').replace('`','').replace('.','_').replace('1','')
    text = text.replace(m.group(0), normalized_name)

text1 = text.replace(']]','').replace('[[','')

for oneline_string in text.splitlines():
    if "$ref\":" in oneline_string:
        if oneline_string.split(":")[1].count(" ") > 1:
            normalized_name = oneline_string.split("\"")[3].replace('[','').replace('=','').replace(']','').replace(',','').replace(' ','').replace('`','').replace('.','_').replace('1','')
            text1 = text1.replace(oneline_string.split("\"")[3], normalized_name)

with open(output_file, 'w') as file:
    file.write(text1)