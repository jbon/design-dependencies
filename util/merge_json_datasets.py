#############################################################################################
# SCRIPT INFORMATION
#############################################################################################

# LICENSE INFORMATION:
# ---------------------
# merge_json_datasets.py
# Merge two files formated in a json format compatible with the design dependency visualisation tool 
# Authors: Jérémy Bonvoisin
# License:  Apache License, Version 2.0, January 2004, http://www.apache.org/licenses/

# PREREQUISITES: 
# ---------------
# - read and write access in the current directory
# - non standard libraries (install with "pip install <libraryName>"):
#   . NetworkX (https://networkx.github.io/documentation/stable/reference/index.html)

# ARGUMENTS:
# -----------
# Mandatory: "-1" followed by the path of the one file to be processed
# Mandatory: "-2" followed by the path of the second file to be processed

import getopt
import sys
import os
import json

# read command arguments
filename1 = ""
filename2 = ""
try:
	options, remainder = getopt.getopt(sys.argv[1:], '1:2:')
	for opt, arg in options:
		if opt == "-1":
			filename1 = arg
		if opt == "-2":
			filename2 = arg
except getopt.GetoptError as err:
	print(str(err))
	sys.exit(2)
if filename1 == "" or filename2 == "" :
	print ("error: two file paths are required as arguments. please use option '-1 <filename>' '-2 <filename>'")

jsonDataSets = []
with open(filename1, 'r') as input:
	jsonDataSets.append(json.loads(input.read()))
with open(filename2, 'r') as input:
	jsonDataSets.append(json.loads(input.read()))

nodes = []
edges = []
nodeRefDict = {}
indexNodes = 0
indexEdges = 0
for jsonDataSet in jsonDataSets:
	for node in jsonDataSet['nodes']:
		nodeRefDict[node['id']] = indexNodes
		node['id']=indexNodes
		nodes.append(node)
		indexNodes += 1
	for edge in jsonDataSet['edges']:
		edge['id']=indexEdges
		edge['from']=nodeRefDict[edge['from']]
		edge['to']=nodeRefDict[edge['to']]
		edges.append(edge)
		indexEdges += 1
		
# export JSON
jsonDict = {}
jsonDict['nodes'] = nodes
jsonDict['edges'] = edges

outputFileName = 'merged.json'
with open(outputFileName, 'w') as output:
	output.write(str(jsonDict).replace("'", '"'))
print ("datasets successfully merged into file"+outputFileName)