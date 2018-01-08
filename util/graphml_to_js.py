#############################################################################################
# SCRIPT INFORMATION
#############################################################################################

# LICENSE INFORMATION:
# ---------------------
# graphml_to_js.py
# Converts a file in GraphML format to a js format compatible with the design dependency visualisation tool 
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
nodeString = "var nodes=[\n"
nodeList = nxGraph.nodes(data=True)
numberOfNodes = len(nodeList)
nodeRefDict = {}
print (str(numberOfNodes) + " nodes found")
for node in nodeList:
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
	nodeString += "\tid: "+ str(index) + ", label: '" + label + "', description: '" + description + "', shape: 'ellipse', color: 'rgba(80,80,80,0.6)', tags:[] }"
	if index != numberOfNodes -1:
		nodeString += ",\n"
	else:
		nodeString += "];\n\n"
	index += 1

# parse edges
index = 0
edgeString = "var edges=[\n"
edgeList = nxGraph.edges(data=True)
numberOfEdges = len(edgeList)
print (str(numberOfEdges) + " edges found")
for edge in edgeList:
	#pdb.set_trace()
	source = edge[0]
	target = edge[1]
	edgeString += "\t{id: "+str(index)+ ", from: " +str(nodeRefDict[source])+ ", to: " +str(nodeRefDict[target])+ ", label: '+'}"
	if index != numberOfEdges -1:
		edgeString += ",\n"
	else:
		edgeString += "];\n\n"
	index += 1

outputFileName = os.path.splitext(filename)[0]+'.js'
with open(outputFileName, 'w') as output:
	output.write(nodeString)
	output.write(edgeString)

print (outputFileName+" extracted successfully")