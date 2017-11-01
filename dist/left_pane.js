function draw_the_path(){

	if (sourceId==undefined) {

		alert("No source node selected");

	}else {

		if(targetIDs.length == 0  && confirm("do you want to draw the path without target node ?") == true){
			draw_in_all_canvas();
		}
		else if(targetIDs.length>=1){
			draw_with_target();
		}

	}

}


  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx reset parameters i.e. shape and color of the nodes FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


  function reset_parameters()
  { 
  	var updateArray=[];
  	for(var nodeId in allNodes)
  	{
  		allNodes[nodeId].shape="ellipse";
  		allNodes[nodeId].color='rgba(60,60,60,0.6)';

  		if(allNodes[nodeId].font != "#ffffff"){
  			allNodes[nodeId].font={
  				color:"#ffffff"
  			};
  		}

  		if (allNodes[nodeId].hiddenLabel !== undefined) {
  			console.log(nodeId);
  			allNodes[nodeId].label=allNodes[nodeId].hiddenLabel;
  			allNodes[nodeId].hiddenLabel = undefined;
  		}else if(draw_in_all_canvas_active==1 && nodeId != sourceId){
  			allNodes[nodeId].label=allNodes[nodeId].label.substring(0,allNodes[nodeId].label.length-4);
  		}

  	}
  	for (var edgeId in allEdges){
  		allEdges[edgeId].color='rgba(60,60,60,0.6)';
  	}

  	sourceId=undefined;
  	targetIDs=[] ;
  	result_path=[""];
  	source_movement=0;
  	target_decrease=[];
  	target_increase=[];
  	active=0;
  	draw_in_all_canvas_active=0;


  	var updateArray = [];
  	for (var edgeId in allEdges) {
  		updateArray.push(allEdges[edgeId]);
  	}
  	edgesDataset.update(updateArray);

  	var updateArray = [];
  	for (nodeId in allNodes) {
  		if (allNodes.hasOwnProperty(nodeId)) {
  			updateArray.push(allNodes[nodeId]);
  		}
  	}
  	nodesDataset.update(updateArray);

  }


  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Algorithm that allows us to find the path beetween 2 nodes FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




//   function save_changes() {
//     var out_data = {
//       nodes: data.nodes.get(),
//       edges: data.edges.get()
//     };

//   // Optional: retrieve node positioning data and add to output
//   var positions = network.getPositions();
//   out_data.nodes.forEach(function(item, index, array) {
//     var pos = positions[item.id];
//     if (pos !== undefined) {
//       array[index].x = pos.x;
//       array[index].y = pos.y;
//     }
//   });
// var xhReq = new XMLHttpRequest();
// xhReq.open("GET", "file:///C:/Users/DumaAdri/Desktop/design-dependencies.git/dist/data1.js", false);
// xhReq.send(null);
// var jsonObject = JSON.parse(xhReq.responseText);
// }
function save_changes(){
// function save(text, filename){
	var a = document.createElement('a');
	var nodes_arr = [];
	var edges_arr = [];
	for (var i in allNodes)
		nodes_arr.push(allNodes[i]);
	for (var i in allEdges)
		edges_arr.push(allEdges[i]);

	a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(JSON.stringify({nodes:nodes_arr, edges:edges_arr})));
	a.setAttribute('download', "data.json");
	a.click();
// }
}
// var obj = {a: "Hello", b: "World");




// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Autocomplete JQUERY  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


function updateLeftPane() {


	console.log(nodesDataset);

	var availableTags = nodesDataset.map(function(obj) { 
		return obj.label; 
	});

	$( "#tags" ).autocomplete({  
		source: availableTags,
		minLength:3,

		select: function (event, ui) {
			var label = ui.item.label;
			var value = ui.item.value;
			var nodesLabels = nodesDataset.map(function(obj) { 
				return [obj.id, obj.label != undefined ? obj.label : obj.hiddenLabel]; 
			});
			var id = nodesLabels.filter(o => o[1] == label)[0][0];
      // console.log(id);

      		neighbourhoodHighlight({nodes:[id]});
      		openAttributePane({nodes:[id]});
      		focusNode(id);
  		}
	});
}


$(function () {
	updateLeftPane();
});



// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx TAGGGG xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 
 var tabTag=[];
 
 function saveTag(){
	 
	 for (var nodeId in allNodes)
	 {
		 for (var i=0; i<(allNodes[nodeId].tags).length;i++)
		 {
			 var tag = allNodes[nodeId].tags[i];
			if(tabTag.includes(tag)==true)
			{
			}else{
				tabTag.push(tag);
			}
		 } 
	 }
		console.log(tabTag);
 }
 
 function createButtons(){
 
	 for(var i=0; i<tabTag.length;i++)
	 { 
	     var btn=document.createElement("BUTTON");
		 btn.id=tabTag[i];
		 var t = document.createTextNode(tabTag[i]); 
		 btn.appendChild(t);
		  
		 btn.onclick=function() {
		var id=this.id;
		for (var nodeId in allNodes)
			{		
			     if (allNodes[nodeId].hiddenLabel !== undefined) {
					 allNodes[nodeId].label=allNodes[nodeId].hiddenLabel;
					 allNodes[nodeId].hiddenLabel = undefined;
				 }	
			}

		for (var nodeId in allNodes)
			{		
				var tab=allNodes[nodeId].tags;
				// console.log(tab);

				if (tab.includes(id)==true)
				{
					console.log(tab);
				}
				else{
					allNodes[nodeId].hiddenLabel=allNodes[nodeId].label;
					allNodes[nodeId].label=undefined;
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
			 
		 TAG.appendChild(btn); 
	 }
 	 
 }


