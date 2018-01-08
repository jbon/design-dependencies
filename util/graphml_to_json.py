#############################################################################################
# SCRIPT INFORMATION
#############################################################################################

# LICENSE INFORMATION:
# ---------------------
# graphml_to_json.py
# Converts a file in GraphML format to a json format compatible with the design dependency visualisation tool 
# Authors: Jérémy Bonvoisin
# License:  Apache License, Version 2.0, January 2004, http://www.apache.org/licenses/

# PREREQUISITES: 
# ---------------
# - read and write access in the current directory
# - non standard libraries (install with "pip install <libraryName>"):
#   . NetworkX (https://networkx.github.io/documentation/stable/reference/index.html)

# ARGUMENTS:
# -----------
# Mandatory: "-i" followed by the path of the file to be processed

import getopt
import networkx as nx
import sys
import pdb
import os


# read command arguments
filename = ""
try:
	options, remainder = getopt.getopt(sys.argv[1:], 'i:')
	for opt, arg in options:
		if opt == "-i":
			filename = arg
except getopt.GetoptError as err:
	print(str(err))
	sys.exit(2)
if filename == "":
	print ("error: no reference of the file to be converted has been given. please use option '-i <filename>'")
	
# open graphml file
nxGraph = nx.read_graphml(filename)

# parse nodes
index = 0
nodeListGraphml = nxGraph.nodes(data=True)
numberOfNodes = len(nodeListGraphml)
nodeRefDict = {}
nodeListJson = []
print (str(numberOfNodes) + " nodes found")
for node in nodeListGraphml:
	nodeRefDict[node[0]] = index
	try:
		label = node[1]['label']
	except KeyError as err:
		print ("error : node " +str(index)+ " has no label: " + str(node))
		print(str(err))
		sys.exit(2)
	if 'description' in node[1]:
		description = node[1]['description']
	else:
		description = ""
	nodeDict = {}
	nodeDict['id'] = index
	nodeDict['label'] = label.replace('"', '*')
	nodeDict['description'] = description.replace('"', '*')
	nodeDict['shape'] = "ellipse"
	nodeDict['color'] = "rgba(80,80,80,0.6)"
	nodeDict['tags'] = []
	nodeListJson.append(nodeDict)
	index += 1

# parse edges
index = 0
edgeListJson = []
edgeListGraphML = nxGraph.edges(data=True)
numberOfEdges = len(edgeListGraphML)
print (str(numberOfEdges) + " edges found")
for edge in edgeListGraphML:
	source = edge[0]
	target = edge[1]
	edgeDict = {}
	edgeDict['id'] = index
	edgeDict['from'] = nodeRefDict[source]
	edgeDict['to'] = nodeRefDict[target]
	edgeDict['label'] = "+"
	edgeListJson.append(edgeDict)
	index += 1
	
# export JSON
jsonDict = {}
jsonDict['nodes'] = nodeListJson
jsonDict['edges'] = edgeListJson

outputFileName = os.path.splitext(filename)[0]+'.json'
with open(outputFileName, 'w') as output:
	output.write(str(jsonDict).replace("'", '"'))

print (outputFileName+" extracted successfully")