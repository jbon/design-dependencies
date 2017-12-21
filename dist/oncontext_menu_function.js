function set_as_source(){ 

	neighbourhoodHighlight({nodes:[]});

	if(sourceId == undefined ){
		console.log(sourceId);
		// if(allNodes[idselect].shape!="triangle"){
			for(var i in targetIDs)
				if(idselect == targetIDs[i]){
					targetIDs.splice(i,1);
				}

				// allNodes[idselect].shape="triangle";
				allNodes[idselect].font={
					color:"#000000"
				};
				sourceId  =idselect ;

			// }
		}else{
			console.log("je rentre");
			target_storage();
			set_as_source();

		}

		var updateArray = [];
		for (var nodeId in allNodes) {
			if (allNodes.hasOwnProperty(nodeId)) {
				updateArray.push(allNodes[nodeId]);
			}
		}
		nodesDataset.update(updateArray);

	}

	var temp_target_increase;
	var temp_target_decrease;
	var temp_targetIds;
	var temp_idselect;

	function target_storage(){
		temp_targetIds=targetIDs;
		temp_target_decrease=target_decrease;
		temp_target_increase=target_increase;
		temp_idselect=idselect;

		reset_parameters();

		for(var int in temp_targetIds){
			idselect=temp_targetIds[int];
			set_as_target();
		}

		for(var i_inc in temp_target_increase){
			idselect=temp_target_increase[i_inc];
			increase();	
		}
		
		for(var i_dec in temp_target_decrease){
			idselect=temp_target_decrease[i_dec];
			decrease();	
		}

		targetIDs=temp_targetIds;
		target_increase=temp_target_increase;
		target_decrease=temp_target_decrease;
		idselect=temp_idselect;
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
			if(targetIDs.includes(idselect)==false){
				targetIDs.push(idselect);
			}

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


function increase(){ 

	if(sourceId==idselect){
		source_movement=1;
      // set_a_plus(sourceId);
      allNodes[sourceId].shape="image";
      allNodes[sourceId].image=DIR + "grey_triangle_plus.png";
  }

  for(var i in targetIDs){

  	if(target_decrease.includes(targetIDs[i]) && idselect==targetIDs[i]){
  		target_decrease = jQuery.grep(target_decrease, function(value) {
  			return value != targetIDs[i];
		});
  	target_increase.push(targetIDs[i]);
	}

  	if(idselect==targetIDs[i]){
  		if(target_increase.includes(idselect)==false){
  			target_increase.push(idselect);
  		}
  		allNodes[idselect].shape="image";
  		allNodes[idselect].image=DIR + "grey_star_plus.png";

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
  	if(target_increase.includes(targetIDs[i]) && idselect==targetIDs[i]){
  		target_increase = jQuery.grep(target_increase, function(value) {
  			return value != targetIDs[i];
		});
  		target_decrease.push(targetIDs[i]);


  	}
  	if(idselect==targetIDs[i]){
  		if(target_decrease.includes(idselect)==false){
  			console.log("dec");
  			target_decrease.push(idselect);
  		}
  		allNodes[idselect].shape="image";
  		allNodes[idselect].image=DIR + "grey_star_minus.png";
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


function source_increase(){
	if(targetIDs.length == 0 ){
		set_as_source();
		increase();
		draw_in_all_canvas();
	}else if(targetIDs.length != 0){
		set_as_source();
		increase();
		draw_with_target();
	}
}

function source_decrease(){
	if(targetIDs.length == 0){
		set_as_source();
		decrease();
		draw_in_all_canvas();
	}else if(targetIDs.length != 0){
		set_as_source();
		decrease();
		draw_with_target();
	}
}
function increase_target(){
	set_as_target();
	increase();
	setAsTarget=1;

	if(sourceId != undefined){
		draw_with_target();
	}
}

function decrease_target(){
	set_as_target();
	decrease();
	setAsTarget=1;

	if(sourceId != undefined){
		draw_with_target();
	}
}


function unset_selected(){

  	if(allNodes[idselect].shape != "ellipse" && idselect!=sourceId){

  		allNodes[idselect].shape="ellipse";
  		allNodes[idselect].color='rgba(60,60,60,0.6)';

  		if(allNodes[idselect].font != "#ffffff"){
  			allNodes[idselect].font={
  			color:"#ffffff"
  			};
  		}

  		if(target_increase.includes(idselect)){
  			target_increase = jQuery.grep(target_increase, function(value) {
  				return value != idselect;
			});
	 	}

	 	if(target_decrease.includes(idselect)){
  			target_decrease = jQuery.grep(target_decrease, function(value) {
  				return value != idselect;
			});
	 	}

  		for(var i in targetIDs){
  			if(idselect==targetIDs[i]){
  				targetIDs.splice(i,1);
  				console.log(targetIDs);
  			}
  		}
  	}else if(idselect==sourceId && targetIDs.length == 0){
  		reset_parameters();

  	}else if(idselect==sourceId && targetIDs.length != 0){
		target_storage();
  	}
  	

   	var updateArray = [];
  	for (nodeId in allNodes) {
  		if (allNodes.hasOwnProperty(nodeId)) {
  			updateArray.push(allNodes[nodeId]);
  		}
  	}
  	nodesDataset.update(updateArray);
}


function editNode(){ 

	document.getElementById('network-popUp').style.display = 'block';

	document.getElementById('node-label').value=allNodes[idselect].label;
	$('#node-description').html(allNodes[idselect].description);
	
	$('#tag-input').empty();
	for(var i=0; i<tabTag.length;i++)
	{ 
		var tagList = document.getElementById("tag-input");
		var option = document.createElement("option");
		option.text = tabTag[i];
		if (allNodes[idselect].tags.includes(tabTag[i])==true)  {
			option.selected="selected";
		}
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

		allNodes[idselect].label= document.getElementById('node-label').value;
		allNodes[idselect].description=   $('#node-description').html();

		var selectedTag=($('#tag-input').val());
		allNodes[idselect].tags=[];
		for(var currentTag in selectedTag){
			allNodes[idselect].tags.push(selectedTag[currentTag]);
		}

		var updateArray = [];

		if (allNodes.hasOwnProperty(idselect)) {
			updateArray.push(allNodes[idselect]);
		}

		nodesDataset.update(updateArray);
		document.getElementById('network-popUp').style.display = 'none';
		
		add_tag();
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
		updateLeftPane();

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
	updateLeftPane();

  // hideMenu();
}