import sys
import json
#DepartmentTreeNode, 
input_file = sys.argv[1]
output_file = sys.argv[2]
with open(input_file, 'r') as file:
    data = json.load(file)

for k,v in data['paths'].items():
    for a,b in v.items():
        print(k)
        print(a)
        b['operationId'] = str(a)+str(k).replace('{','').replace('}','').replace('/','_')
        
with open(output_file, 'w') as file:
    json.dump(data, file, indent=4)