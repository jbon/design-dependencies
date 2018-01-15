function draw_the_path(){

	if (sourceId==undefined) {

		alert("No source node selected");

	}else {

		if(targetIDs.length == 0 ){
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
  			allNodes[nodeId].label=allNodes[nodeId].hiddenLabel;
  			allNodes[nodeId].hiddenLabel = undefined;
  		}else if(draw_in_all_canvas_active==1 && nodeId != sourceId){
  			console.log(allNodes[nodeId].label=allNodes[nodeId].label.substring(0,allNodes[nodeId].label.length-4));
  		}

  	}
  	for (var edgeId in allEdges){
  		allEdges[edgeId].color='rgba(60,60,60,0.6)';
  	}

  	// if(tagFilterActive == true && draw_in_all_canvas_active == 0){
  	// 	nodesDataset = temp_nodesDataset;
  	// 	edgesDataset = temp_edgesDataset;
  	// 	redrawAll();
  	// 	tagFilterActive=false;
  	// }

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
	
	setAsSource=0;
	setAsTarget=0;
	
	// $('#tagSelectBox').empty();
	
	document.getElementById("text_scenario").innerHTML=" ";
	clearInterval(show_consequences_2);
    clearInterval(show_consequences_3);
	clearInterval(show_compliance_2); 
	clearInterval(show_compliance_3); 
	clearInterval(show_compliance_4);
	

  }


  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Algorithm that allows us to find the path beetween 2 nodes FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  function save_changes(){
// function save(text, filename){
	var a = document.createElement('a');
	var nodes_arr = [];
	var edges_arr = [];

	for (var i in allNodes)
		nodes_arr.push(allNodes[i]);
	for (var i in allEdges)
		edges_arr.push(allEdges[i]);
	
	a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify({nodes:nodes_arr, edges:edges_arr})));
	a.setAttribute('download', "data.json");
	document.body.appendChild(a);
	a.click();
	document.body.appendChild(a);

// }
}
// var obj = {a: "Hello", b: "World");




// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Autocomplete JQUERY  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


function updateLeftPane() {


	// console.log(nodesDataset);

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
var check_ifPresent_list=[];

function add_tag(){
	// console.log(tabTag);

	for (var nodeId in allNodes)
	{
		for (var i=0; i<(allNodes[nodeId].tags).length;i++)
		{
			var tag = allNodes[nodeId].tags[i];
			if(tabTag.includes(tag)==false)
			{
				tabTag.push(tag);
			}
		} 
	}
	// console.log(tabTag);
	for(var i=0; i<tabTag.length;i++)
	{ 
		if(check_ifPresent_list.includes(tabTag[i])==false){
			var tagList = document.getElementById("tagSelectBox");
			var option = document.createElement("option");
			option.text = tabTag[i];
			tagList.add(option);
			check_ifPresent_list.push(tabTag[i]);
		}
	}
	// console.log(tabTag);

		$(document).ready(function() {
			$('#tagSelectBox').select2({
				placeholder: "Select a tag",
				allowClear: true,
				tags: true,
				debug:true
			});
		});
	
};


var temp_nodesDataset=[];
var temp_edgesDataset=[];
var tagFilterActive=false;

$(function(){
	// console.log($('#tagSelectBox').val());
	$('#tagSelectBox').on('select2:select select2:unselect',function(){
		filterByTag();
	});
})


function filterByTag(){
	var selectedTag=($('#tagSelectBox').val());
	console.log(selectedTag);
	if(selectedTag != null){
		var nodeArray=[];
		var edgeArray=[];
		var nodeId_Array=[];

		if(tagFilterActive == false){
			temp_nodesDataset=nodesDataset;
			temp_edgesDataset=edgesDataset;
		}else{
			nodesDataset = temp_nodesDataset;
			edgesDataset = temp_edgesDataset;
			var layout_state=layout_hierarchical_active;
			redrawAll();

			if(layout_state == true){
				layout_hierarchical();
			}
			tagFilterActive = false;
		}


		tagFilterActive=true;

		for(var currentTag in selectedTag){
			for(var nodeId in allNodes){
				if(allNodes[nodeId].tags.includes(selectedTag[currentTag]) == true && nodeArray.includes(allNodes[nodeId])==false){
					nodeArray.push(allNodes[nodeId]);
					nodeId_Array.push(parseInt(nodeId));
				}
			}
		}

		var influenced_nodes=[];
		for(var edgeId in allEdges){
			if(nodeId_Array.includes(allEdges[edgeId].from) == true){
				edgeArray.push(allEdges[edgeId]);
				if(nodeId_Array.includes(allEdges[edgeId].to) == false && influenced_nodes.includes(allEdges[edgeId].to) == false ){

					var id_to_push=allEdges[edgeId].to;

					influenced_nodes.push(id_to_push);

					nodeArray.push(allNodes[id_to_push]);
				}
			}
		}

		console.log(nodeArray);
		console.log(edgeArray);

		for(var id_node in nodeArray){
			if(nodeArray[id_node].id>id_to_replace){
			var id_to_replace=nodeArray[id_node].id;
			console.log("old id " + id_to_replace);
			nodeArray[id_node].id=parseInt(id_node);
			console.log("new id " + id_node);

			for(var id_edge in edgeArray){

				if(edgeArray[id_edge].to == id_to_replace){
					console.log("to " + edgeArray[id_edge].to);
					edgeArray[id_edge].to=parseInt(id_node);
					console.log("to " + edgeArray[id_edge].to);
				}else if(edgeArray[id_edge].from == id_to_replace){
					console.log("from " + edgeArray[id_edge].from);
					edgeArray[id_edge].from=parseInt(id_node);
					console.log("from " + edgeArray[id_edge].from);
					console.log(" ");

				}
			}
		}
	}

		for(var id_edge in edgeArray){
			edgeArray[id_edge].id=parseInt(id_edge);
		}

		console.log(nodeArray);
		console.log(edgeArray);

		nodesDataset = new vis.DataSet(nodeArray);
		edgesDataset = new vis.DataSet(edgeArray);

		console.log(nodesDataset);
		updateLeftPane();
		// console.log(edgesDataset);
		
			var layout_state=layout_hierarchical_active;

		redrawAll();
			if(layout_state == true){
				layout_hierarchical();
			}

	}else{
		// console.log(tagFilterActive);
		if(tagFilterActive == true){
			nodesDataset = temp_nodesDataset;
			edgesDataset = temp_edgesDataset;

			var layout_state=layout_hierarchical_active;

			redrawAll();
			if(layout_state == true){
				layout_hierarchical();
			}
			tagFilterActive = false;
		}
	}
}

function reset_dataset(){
	nodesDataset= new vis.DataSet([]);
	edgesDataset=new vis.DataSet([]);
	console.log(typeof nodesDataset);
	check_ifPresent_list=[];
	$('#tagSelectBox').empty();
	redrawAll();
}
