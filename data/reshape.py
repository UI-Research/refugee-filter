import copy
import csv
import simplejson as json

# Assign spreadsheet filename to `file`
file = 'tracker_0508_utf.csv'

# with open(file, 'rb') as f:
#     reader = csv.reader(f)    
#     rows = list(reader)


with open(file, newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    # for row in reader:
    #     print(row)
    rows = list(reader)

JSONout = []

for i in range(1, len(rows)):    
	# print rows[i]
	entry = {}
	entry["company"] = rows[i][0]
	entry["description"] = rows[i][1]
	entry["sector"] = rows[i][2]
	entry["sector2"] = rows[i][3]
	entry["region"] = rows[i][4].split(",")	
	entry["partner"] = rows[i][5].split(",")
	entry["partner2"] = rows[i][6]
	entry["year"] = rows[i][7]

	# print entry
	JSONout.append(entry)


# print JSONout
# print rows[1]

with open('tracker_0508.json', 'w') as f:
    json.dump(JSONout, f)