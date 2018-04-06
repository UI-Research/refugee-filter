import copy
import csv
import simplejson as json

# Assign spreadsheet filename to `file`
file = 'tracker.csv'

with open(file, 'rb') as f:
    reader = csv.reader(f)
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
	entry["region2"] = rows[i][5]
	entry["partnerships"] = rows[i][6].split(",")
	entry["partnerships2"] = rows[i][7]
	entry["year"] = rows[i][8]

	# print entry
	JSONout.append(entry)


# print JSONout
# print rows[1]

with open('tracker.json', 'w') as f:
    json.dump(JSONout, f)