import sys
import json
import uuid

#fix operationId in bad swagger spec
input_file = sys.argv[1]
output_file = sys.argv[2]
with open(input_file, 'r') as file:
    data = json.load(file)

c= 0
for k,v in data['paths'].items():
    for a,b in v.items():
        b['operationId'] = b['operationId'] + "_" + str(uuid.uuid4())
    c+= 1
print(c)

with open(output_file, 'w') as file:
    json.dump(data, file, indent=4)
