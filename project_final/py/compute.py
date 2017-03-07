import csv
import json
from operator import add

# Reading a CSV file:

with open("res/refugees_unhcr.csv", encoding = "latin-1") as f:
    reader = csv.DictReader(f, 'r')
    data = [row for row in reader]

#init variables of interest
countryDict = {}

for row in data:
	if row == data[0]:
		continue
	try:
		int(row[None][4]) 
	except:
		continue

	country = row["r"]
	#origin = row[None][0]
	year     = int(row[None][1])
	refugees = int(row[None][4])
	year_data = {year: refugees}

	if country not in countryDict:
		countryDict[country] = {}
	if year not in countryDict[country]:
		countryDict[country][year] = 0
	countryDict[country][year] += refugees

for row in data:
	if row == data[0]:
		continue
	try:
		int(row[None][4]) 
	except:
		continue

	#country = row["r"]
	country = row[None][0]
	year     = int(row[None][1])
	refugees = int(row[None][4])
	year_data = {year: refugees}
	
	if country not in countryDict:
		countryDict[country] = {}
	if year not in countryDict[country]:
		countryDict[country][year] = 0
	countryDict[country][year] -= refugees

final = []
for countryName, data in countryDict.items():
	final.append({'country': countryName, 'values': data})

with open("res/countries.json", "w") as f:
    outdata = json.dumps(final, indent=2)
    f.write(outdata)
#final.append({'country': countryName, 'values': [{'year': year, 'refugees': refugees} for year, refugees in data.items()]})
