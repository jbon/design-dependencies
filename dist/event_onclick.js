function openAttributePane(params) {

	attributepane.style.display="block";

	var selectedNode = params.nodes[0];

	var LABEL=document.getElementById('affichageLabel');
	LABEL.innerHTML = 'Label: '+  nodesDataset.get(params.nodes[0]).label  ;

	var DESCRIPTION=document.getElementById('affichageDescription');
	var msg= nodesDataset.get(params.nodes[0]).description;
	msg= msg.replace(/\n/g, "<br />");
	DESCRIPTION.innerHTML = 'Description: '+  msg  ;

	var connectedNodes = network.getConnectedNodes(selectedNode);

	var INFLUENCING=document.getElementById('influencing'); 
	var INFLUENCED=document.getElementById('influenced'); 
	INFLUENCING.innerHTML ="";
	INFLUENCED.innerHTML ="";

	if(connectedNodes.length != 0){
		for(var x=0; x<edgesDataset.length; x++ ){
			if(edgesDataset.get(x).from==params.nodes[0]){

				var ing=document.createElement("div");
				ing.id=edgesDataset.get(x).to;
				ing.innerHTML=allNodes[edgesDataset.get(x).to].label;

				INFLUENCING.appendChild(ing);
				document.getElementById(edgesDataset.get(x).to).onmouseover = function() {
					this.style.fontSize='large';

				};
				document.getElementById(edgesDataset.get(x).to).onmouseout = function() {
					this.style.fontSize='medium';
				};


				ing.onclick=function(){
					neighbourhoodHighlight({nodes:[this.id]});
					openAttributePane({nodes:[this.id]});
					focusNode(this.id);
				};
			}


			if(edgesDataset.get(x).to==params.nodes[0]){
				var ed=document.createElement("div");
				ed.id=edgesDataset.get(x).from;
				ed.innerHTML=allNodes[edgesDataset.get(x).from].label;
				INFLUENCED.appendChild(ed);

				document.getElementById(edgesDataset.get(x).from).onmouseover = function() {
					this.style.textDecoration='underline';
				};
				document.getElementById(edgesDataset.get(x).from).onmouseout = function() {
					this.style.textDecoration='none';
				};

				ed.onclick=function(){
					neighbourhoodHighlight({nodes:[this.id]});
					openAttributePane({nodes:[this.id]});
					focusNode(this.id);/**/


				}
			}


		}
	}

}

function closeAttributePane() {
	attributepane.style.display="none";
}

function focusNode(nodeId) {
  // updateValues();
  var options = {
  	scale:  0.75,
  	offset: {x:0,y:0},
  	animation: {
  		duration: 200,
  	}
  };
  network.focus(nodeId, options);
}

// This function is not well implemented because at the places where the color is set to #268ac9 it should 
// be undefined that means the defaut color maybe a pb of data waiting for  new datafile to test
function neighbourhoodHighlight(params) {

	if (params.nodes.length > 0 && active==0 ) {
		highlightActive = true;
		var i,j;
		var selectedNode = params.nodes[0];
		var degrees = 2;

		for (var nodeId in allNodes) {
			allNodes[nodeId].color = 'rgba(170,170,170,0.6)';
			if (allNodes[nodeId].hiddenLabel === undefined) {
				allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
				allNodes[nodeId].label = undefined;
			}
		}
		var connectedNodes = network.getConnectedNodes(selectedNode);
		var allConnectedNodes = [];

		for (i = 1; i < degrees; i++) {
			for (j = 0; j < connectedNodes.length; j++) {
				allConnectedNodes = allConnectedNodes.concat(network.getConnectedNodes(connectedNodes[j]));
			}
		}


		for (i = 0; i < allConnectedNodes.length; i++) {
			allNodes[allConnectedNodes[i]].color = 'rgba(170,170,170,0.6)';
			if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
				allNodes[allConnectedNodes[i]].label = allNodes[allConnectedNodes[i]].hiddenLabel;
				allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
			}
		}

		for (i = 0; i < connectedNodes.length; i++) {
			allNodes[connectedNodes[i]].color = 'rgba(120,120,120,0.6)';
			if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
				allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
				allNodes[connectedNodes[i]].hiddenLabel = undefined;
			}
		}

		allNodes[selectedNode].color = 'rgba(60,60,60,0.6)';
		if (allNodes[selectedNode].hiddenLabel !== undefined) {
			allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
			allNodes[selectedNode].hiddenLabel = undefined;
		}
	}
	else if (highlightActive === true) {

		for (var nodeId in allNodes) {
			allNodes[nodeId].color = 'rgba(60,60,60,0.6)';
			if (allNodes[nodeId].hiddenLabel !== undefined) {
				allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
				allNodes[nodeId].hiddenLabel = undefined;
			}
		}
		highlightActive = false
	}

	var updateArray = [];
	for (nodeId in allNodes) {
		if (allNodes.hasOwnProperty(nodeId)) {
			updateArray.push(allNodes[nodeId]);
		}
	}
	nodesDataset.update(updateArray);


}

// This function fired on double click
function addNodefunction(){

	document.getElementById('operation').innerHTML = "Add Node";
	document.getElementById('network-popUp').style.display = 'block';
	document.getElementById('node-label').value="";
	document.getElementById('node-label').focus(); 

	$('#node-description').html("");

	$('#tag-input').empty();
	for(var i=0; i<tabTag.length;i++)
	{ 
        
 		var tagList = document.getElementById("tag-input");
		var option = document.createElement("option");
		option.text = tabTag[i];
		tagList.add(option);

		$(document).ready(function() {
			$('#tag-input').select2({
				placeholder: "Select a Tag",
				allowClear: true,
				tags: true
			});
		});
	}

	document.getElementById('saveButton').onclick = function(){

		var location=network.DOMtoCanvas({x:positionX,y:positionY});
		
		var tabTagNew=[];	
		var selectedTag=($('#tag-input').val());
		for(var currentTag in selectedTag){
			tabTagNew.push(selectedTag[currentTag]);	
		} 

		nodesDataset.add({
			id:nodesDataset.length,
			label: document.getElementById('node-label').value,
			description: $('#node-description').html()  ,   
			shape:"ellipse",
			color:'rgba(60,60,60,0.6)',
			tags:tabTagNew
		});        

		updateLeftPane();
		

		console.log(nodesDataset);
		network.moveNode(nodesDataset.length-1,location.x,location.y);

		allNodes=nodesDataset.get({returnType:"Object"});
		document.getElementById('network-popUp').style.display = 'none';
		
		saveTag();
		createButtons();
	};


	document.getElementById('cancelButton').onclick = function(){
		document.getElementById('saveButton').onclick = null;
		document.getElementById('cancelButton').onclick = null;
		document.getElementById('network-popUp').style.display = 'none';

	};

	positionX=0;
	positionY=0;

	var updateArray = [];
	for (var nodeId in allNodes) {
		if (allNodes.hasOwnProperty(nodeId)) {
			updateArray.push(allNodes[nodeId]);
		}
	}
	nodesDataset.update(updateArray);

}