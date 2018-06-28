 // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// File that contains all the functions used in the oncontext menu, for the analysis mode and edit mode 
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  FUNCTIONS FOR ANALYSIS MODE xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// Set the selected node as a source and make the set as source possible if the selected node is already set as a target
function set_as_source(){ 

	neighbourhoodHighlight({nodes:[]});

	if(sourceId == undefined ){
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

// Store the targets id and call the appropriate function depending on the what is in target_increase and target_decrease	
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

// Change the shape of the node if the node is a target and put it as a star and reset the shape of the node if it’s already a star	
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

// Import the good image of the source or the target if it’s selected as increase
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

// Same than previous function but when decrease is selected 
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

// Reset the (-), (+) and (?) if it exists in the label
function check_if_sign_in_label(){
 	  	var updateArray = [];
  	for (nodeId in allNodes) {
  		if (allNodes.hasOwnProperty(nodeId)) {
			if(allNodes[nodeId].label != undefined){
  			if(allNodes[nodeId].label.includes("(+)") || allNodes[nodeId].label.includes("(-)") || allNodes[nodeId].label.includes("(?)")){
  				allNodes[nodeId].label=allNodes[nodeId].label.substring(0,allNodes[nodeId].label.length-4);
  			}  			
			updateArray.push(allNodes[nodeId]);

  		}
		}
  	}
  	nodesDataset.update(updateArray);
  	}
	
// Call all the functions necessary when the node is selected as an increasing source	
function source_increase(){
	if(targetIDs.length == 0 ){
		set_as_source();
		increase();
   		check_if_sign_in_label();
		draw_in_all_canvas();		
	}else if(targetIDs.length != 0){
		set_as_source();
		increase();
		check_if_sign_in_label();
		draw_with_target();
	}
		 updateLeftPane();
}

// Call all the functions necessary when the node is selected as an decreasing source
function source_decrease(){
	check_if_sign_in_label();
	if(targetIDs.length == 0){
		set_as_source();
		decrease();
		check_if_sign_in_label();
		draw_in_all_canvas();
	}else if(targetIDs.length != 0){
		set_as_source();
		decrease();
		check_if_sign_in_label();
		draw_with_target();
	}
	 updateLeftPane();
}

// Call all the functions necessary when the node is selected as an increasing target
function increase_target(){
	set_as_target();
	increase();

	if(sourceId != undefined){
		draw_with_target();
	}else{
		target_propagation();
	}
		 updateLeftPane();

}

// Call all the functions necessary when the node is selected as an decreasing target
function decrease_target(){
	set_as_target();
	decrease();

	if(sourceId != undefined){
		draw_with_target();
	}else{
		target_propagation();
	}
	updateLeftPane();

}

var assumingValue;

// Store the assume value in the node label and call the propagation function
function increase_assume(){
	console.log(allNodes[idselect]);
	if(sourceId != undefined && allNodes[idselect].label.includes("(?)") ){
		assumingValue=1;
        allNodes[idselect].label=allNodes[idselect].label.substring(0,allNodes[idselect].label.length-4);
        allNodes[idselect].label += " (+)";  
		console.log(assumingValue);
		draw_in_all_canvas();
	}
}

// Store the assume value in the node label and call the propagation function
function decrease_assume(){
		console.log(allNodes[idselect]);

	if (sourceId != undefined && allNodes[idselect].label.includes("(?)")){
		assumingValue=-1;
        allNodes[idselect].label=allNodes[idselect].label.substring(0,allNodes[idselect].label.length-4);
		allNodes[idselect].label += " (-)"; 

		console.log(assumingValue);
		draw_in_all_canvas();
	}
}

// Reset the source or the target variable and put the shape back to ellipse
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

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  FUNCTIONS FOR EDIT MODE xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// Function to edit node
function editNode(){ 
if (tagFilterActive==false){
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
}

// Functions to remove one or more nodes
 function remove() {
	if (tagFilterActive==false){
	var selected = network.getSelectedNodes();
	//var selectedEdges = network.getSelectedEdges();
	
	/*  for (var i = 0; i < nodesIdInDrawing.length; i++) {
		 selected.push(allNodes[nodesIdInDrawing[i]]);
	}	  
*/
	 if (selected.length>1)
	{	
		 selected.sort(function(a,b){
			return a.id - b.id;
		}); 
		selected.reverse();
		 for (var n in selected) {
		    idselect = selected[n];
		    remove2();
		}
	}else{
		remove2();
	} 
	} 
} 
 
function remove2(){ 

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
else{
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

// Function to edit edge
function editEdge(){
	if (tagFilterActive==false){
	var edge_label_value;

    		//document.getElementById('operation').innerHTML = "Add Edge";
    		document.getElementById('network-popUp_edge').style.display = 'block';

    		$('input.boxplus').prop('checked',false);
    		$('input.boxminus').prop('checked',false);

    		$('input.boxplus').on('change', function() {
    			$('input.boxminus').prop('checked', false);  
    		});
    		$('input.boxminus').on('change', function() {
    			$('input.boxplus').prop('checked', false);  
    		});

    		document.getElementById('saveButton_edge').onclick = function(){
    			if($('input.boxplus').prop('checked')){
    				edge_label_value= '+';
    			}else if($('input.boxminus').prop('checked')){
    				edge_label_value= '-';
    			}
    			else{
    				alert("Please select one of the influence directions before validating edge edtition");
    				edge_label_value="";
    			}     

    			if(edge_label_value != ""){

    				allEdges=edgesDataset.get({returnType:"Object"});

    				edgesDataset.update({
    					id:idselect,
    					label:edge_label_value
    				});

    				allEdges=edgesDataset.get({returnType:"Object"});

    				document.getElementById('network-popUp_edge').style.display = 'none';
    			}
    		};

    		document.getElementById('cancelButton_edge').onclick = function(){
    			document.getElementById('saveButton_edge').onclick = null;
    			document.getElementById('cancelButton_edge').onclick = null;
    			document.getElementById('network-popUp_edge').style.display = 'none';
    		};

    		var updateArray = [];
    		for (var edgeId in allEdges) {
    			updateArray.push(allEdges[edgeId]);
    		}
    		edgesDataset.update(updateArray);
   } 	
}

// Functions to remove one or more edges
function removeEdge() {
	
	if (tagFilterActive==false){
	var selected = network.getSelectedEdges();
	
	if (selected.length>1)
		{
			selected.sort(function(a,b){
		return a.id - b.id;
		});
	selected.reverse();

	 for (var n in selected) {
      idselect = selected[n];
	  removeEdge2();
	}
		}	
	else 
		removeEdge2();
		
	 }
 }
 
function removeEdge2(){
	   	var length=edgesDataset.length; 
    	var edges_removed=idselect;


    	edgesDataset.remove(edges_removed);

    	allEdges=edgesDataset.get({returnType:"Object"});

    	if(edges_removed != nodesDataset.length-1){
    	for (var i=edges_removed; i<length-1; i++){
    		if(typeof allEdges[i+1] == "undefined"){
    			break;
    		}else{
    			allEdges[i]=allEdges[i+1];
    			allEdges[i].id=i;
    		}
    	}


    	var updateArray = [];
    	for(var edge=0; edge<length-1;edge++){
    		updateArray.push(allEdges[edge]);
    	}
    	if(updateArray.length != 0){
    		updateArray[updateArray.length-1].id=updateArray.length-1;
    	}
    	edgesDataset.update(updateArray);
    	edgesDataset.remove(edgesDataset.length-1);

		// edgesDataset = new vis.DataSet(updateArray); 
		}

		allEdges=edgesDataset.get({returnType:"Object"});
}