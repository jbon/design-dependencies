function set_as_source(){ 

	neighbourhoodHighlight({nodes:[]});

	if(sourceId == undefined || idselect==sourceId){
		if(allNodes[idselect].shape!="triangle"){
			for(var i in targetIDs)
				if(idselect == targetIDs[i]){
					targetIDs.splice(i,1);
				}

				allNodes[idselect].shape="triangle";
				allNodes[idselect].font={
					color:"#000000"
				};
				sourceId  =idselect ;

			}
			else{
				allNodes[idselect].shape="ellipse";
				allNodes[idselect].font={
					color:"#ffffff"
				};
				sourceId=undefined;
				for(var nodeId in allNodes){
					allNodes[nodeId].color='rgba(60,60,60,0.6)';
				}
			}

		}
		else{
			if(confirm("you have already selected a source node ! Do you want to replace it ?") == true){

				allNodes[sourceId].shape="ellipse";
				allNodes[sourceId].color='rgba(60,60,60,0.6)';
				allNodes[sourceId].font={
					color:"#ffffff"
				};

				sourceId=idselect;
				allNodes[idselect].shape="triangle";
				allNodes[idselect].font={
					color:"#000000"
				};
			}
		}

		var updateArray = [];
		for (var nodeId in allNodes) {
			if (allNodes.hasOwnProperty(nodeId)) {
				updateArray.push(allNodes[nodeId]);
			}
		}
		nodesDataset.update(updateArray);

	}

	function set_as_target(){

		if(allNodes[idselect].shape!="star"){
			if(idselect == sourceId){
				sourceId=undefined;
			}
			allNodes[idselect].shape="star";
			allNodes[idselect].font={
				color:"#000000"
			};
			targetIDs.push(idselect);

		}
		else{
			allNodes[idselect].shape="ellipse";
			allNodes[idselect].font={
				color:"#ffffff"
			};

			for(var i in targetIDs){
				if(targetIDs[i]==idselect){
					targetIDs.splice(i,1);
				}
			}
			console.log(targetIDs);
		}

		var updateArray = [];
		for (var nodeId in allNodes) {
			if (allNodes.hasOwnProperty(nodeId)) {
				updateArray.push(allNodes[nodeId]);
			}
		}
		nodesDataset.update(updateArray);

// hideMenu();

}
function editNode(){ 

	document.getElementById('network-popUp').style.display = 'block';

	document.getElementById('node-label').value=allNodes[idselect].label;
	$('#node-description').html(allNodes[idselect].description);

	document.getElementById('saveButton').onclick = function(){

		allNodes[idselect].label= document.getElementById('node-label').value;
		allNodes[idselect].description=   $('#node-description').html();

		var updateArray = [];

		if (allNodes.hasOwnProperty(idselect)) {
			updateArray.push(allNodes[idselect]);
		}

		nodesDataset.update(updateArray);
		document.getElementById('network-popUp').style.display = 'none';
	};

	document.getElementById('cancelButton').onclick = function(){
		document.getElementById('saveButton').onclick = null;
		document.getElementById('cancelButton').onclick = null;
		document.getElementById('network-popUp').style.display = 'none';
	};

	var updateArray = [];
	for (var nodeId in allNodes) {
		if (allNodes.hasOwnProperty(nodeId)) {
			updateArray.push(allNodes[nodeId]);
		}
	}
	nodesDataset.update(updateArray);

// hideMenu();

}

function remove(){ 

  // Remove the edges connected to the selected Node and update EdgesDataset XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  var length=edgesDataset.length; 
  var edges_removed=[];
  for(var edge in allEdges){
  	if(allEdges[edge].from==idselect || allEdges[edge].to==idselect){  
  		edgesDataset.remove(edge,length);
  		edges_removed.push(edge);
  	}
  } 

  allEdges=edgesDataset.get({returnType:"Object"});

  for(var int=edges_removed.length-1; int>=0; int--){
  	var edgeId_removed=parseInt(edges_removed[int]);
  	for (var i=edgeId_removed; i<length-1; i++){
  		if(typeof allEdges[i+1] == "undefined"){
  			break;
  		}else{
  			allEdges[i]=allEdges[i+1];
  			allEdges[i].id=i;
  		}
  	}
  }

  var updateArray = [];
  for(var edge=0; edge<length-edges_removed.length;edge++){
  	updateArray.push(allEdges[edge]);
  }
  if(updateArray.length != 0){
  	updateArray[updateArray.length-1].id=updateArray.length-1;
  }

  for(var edgeId in updateArray){
  	if(updateArray[edgeId].from>idselect){
  		updateArray[edgeId].from=updateArray[edgeId].from-1;
  	}
  	if(updateArray[edgeId].to>idselect){
  		updateArray[edgeId].to=updateArray[edgeId].to-1;
  	}
  }
  console.log(updateArray);
  edgesDataset = new vis.DataSet(updateArray); 

 // Remove the selected Node and update nodesDataset XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 nodesDataset.remove(idselect);

 if(idselect!=nodesDataset.length){
 	allNodes=nodesDataset.get({returnType:"Object"});

 	for (var int1=idselect; int1<nodesDataset.length; int1++){
 		allNodes[int1]=allNodes[int1+1];
 		allNodes[int1].id=int1;
 	}

 	var updateArray = [];
 	for (var nodeId in allNodes) {
 		if (allNodes.hasOwnProperty(nodeId)) {
 			updateArray.push(allNodes[nodeId]);
 		}
 	}
 	nodesDataset.update(updateArray);


 	nodesDataset.remove(nodesDataset.length-1);
 	allNodes=nodesDataset.get({returnType:"Object"});

 }
 if(layout_hierarchical_active==true){

 	layout_physical();
 	layout_hierarchical();

 }else{
 	layout_hierarchical();
 	layout_physical();
 }
  // hideMenu();
}



function increase(){ 

	if(sourceId==idselect){
		source_movement=1;
      // set_a_plus(sourceId);
      allNodes[sourceId].shape="image";
      allNodes[sourceId].image=DIR + "grey_triangle_plus.png";
  }

  for(var i in targetIDs){
  	if(idselect==targetIDs[i]){
  		target_increase.push(idselect);
  		console.log("coucou");
  		allNodes[targetIDs[i]].shape="image";
  		allNodes[targetIDs[i]].image=DIR + "grey_star_plus.png";

        // set_a_plus(targetIDs[i]);
    }
}

var updateArray = [];
for (var nodeId in allNodes) {
	if (allNodes.hasOwnProperty(nodeId)) {
		updateArray.push(allNodes[nodeId]);
	}
}
nodesDataset.update(updateArray);

    // hideMenu();
}


function decrease(){ 

	if(sourceId==idselect){
		source_movement=-1;
		var sourceId_decrease=sourceId;
		allNodes[sourceId].shape="image";
		allNodes[sourceId].image=DIR + "grey_triangle_minus.png";
      // set_a_minus(sourceId);
  }

  for(var i in targetIDs){
  	if(idselect==targetIDs[i]){
  		target_decrease.push(idselect);
  		allNodes[targetIDs[i]].shape="image";
  		allNodes[targetIDs[i]].image=DIR + "grey_star_minus.png";
        // set_a_minus(targetIDs[i]);
    }
}

var updateArray = [];
for (var nodeId in allNodes) {
	if (allNodes.hasOwnProperty(nodeId)) {
		updateArray.push(allNodes[nodeId]);
	}
}
nodesDataset.update(updateArray);

    // hideMenu();
}