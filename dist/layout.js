var layout_physical_active=true;
var layout_hierarchical_active=false; 

var temp;
var allNodesTemp;

function layout_physical(){ 
 
	if(layout_physical_active != true){

	   document.getElementById("text_scenario").innerHTML="";
	   console.log(typeof $("#text_scenario")[0].innerHTML);

		redrawAll();
	}else if($("#text_scenario")[0].innerHTML.includes("You are already on the") == false){

	  		document.getElementById("text_scenario").innerHTML+="<br>" + "You are already on the physical layout !";
		}
	
}
var maxid;
function layout_hierarchical(){
	
		//console.log(JSON.stringify(allNodes));
	//allNodes=nodesDataset.get({returnType:"Object"});
	
	/* maxid = 0;
nodesDataset.map(function(obj){     
    if (obj.id > maxid) maxid = obj.id;    
}); */

		var updateArray = [];
 	for (var nodeId in allNodes) {
 		if (allNodes.hasOwnProperty(nodeId)) {
 			updateArray.push(allNodes[nodeId]);
 		}
 	}
	temp= new vis.DataSet(updateArray);
	
	//console.log(JSON.stringify(temp));


	if(layout_hierarchical_active==false){
	   
	   document.getElementById("text_scenario").innerHTML="";
	
	 // Create a new directed graph 
	 var g = new dagre.graphlib.Graph();

	 // Set an object for the graph label
	 g.setGraph({
		nodestep:30,
		edgesep:40,
		ranksep:500,
		rankdir:"BT"
	 });

	 // Default to assigning a new object as a label for each new edge.
	 g.setDefaultEdgeLabel(function() { return {}; });

	 for (var nodeId in allNodes) {
		 g.setNode(allNodes[nodeId].id,    {  width: 200, height: 100 });
	 }
	 
	 for (var edgeId in allEdges) {
		 g.setEdge(allEdges[edgeId].from,   allEdges[edgeId].to);
	 }
	 
	 dagre.layout(g);

	 var i=0;
	//g.nodes().forEach(function(v)

	for (var nodeId=0;nodeId<maxid+1;nodeId++){
		if (allNodes[i]!= undefined)
			{
			
		v=nodeId;
		var string=JSON.stringify(g.node(v));
		
		var pos1=string.indexOf("x");
		var pos2=string.indexOf(",\"y\":");
		var stringx=string.substring(pos1+3,pos2);
		var x=parseInt(stringx);
		allNodes[i].x=x;
		
		var pos3=string.indexOf("y");
	    var pos4=string.indexOf("}");
		var stringy=string.substring(pos3+3,pos4);
		var y=parseInt(stringy);
		allNodes[i].y=y;
		}
		i++;
		}
		
	
	var updateArray = [];
 	for (var nodeId in allNodes) {
 		if (allNodes.hasOwnProperty(nodeId)) {
 			updateArray.push(allNodes[nodeId]);
 		}
 	}
	nodesDataset.update(updateArray);
	
options = {
       layout:{
         improvedLayout: false
       }, 
      nodes: {
      	margin: 5,

        
        widthConstraint: {
        	maximum: 150
        },
        scaling: {
        	min: 10,
        	max: 30,

        	label: {
        		min: 6,
        		max: 30,
        		drawThreshold: 5,
        		maxVisible: 20
        	}
        },

        font: {
        	color:'#ffffff',
        	size: 16,
        	face: 'Tahoma'
        },
    },

    edges: {
    	smooth: {
    		enabled: false,
    		type:'continuous'
    	},
    	color:{
    		inherit:false,
    		color:'rgba(60,60,60,0.6)',
    		hover:'rgba(60,60,60,0.6)',
    		highlight:'rgba(60,60,60,0.6)',

    	},

    	width: 0.15,

    	font: {
    		size:30,
    		align: 'top'
    	},

    	arrows: 'to',
    },

    interaction: {
    	dragNodes:true,
    	hover:true,
    	hoverConnectedEdges:true,
    	hideEdgesOnDrag: true,
    	tooltipDelay: 200,
    	navigationButtons: true,
    	multiselect:true
      // keyboard: true

  },

  configure: {
  	container: document.getElementById('optionsContainer'),
  	showButton: false
  },   
 
  physics:{
  	enabled: false,
  },

  manipulation: {
    enabled:true,
  	initiallyActive :true,

  addNode: function (data, callback) {
   document.getElementById('network-popUp').style.display = 'block';
   document.getElementById('node-label').value="";
	 document.getElementById('tag-input').value="";
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
			
	 	var tabTagNew=[];	
		var selectedTag=($('#tag-input').val());
		for(var currentTag in selectedTag){
			tabTagNew.push(selectedTag[currentTag]);	
		} 
		
        	nodesDataset.add({
        		id:nodesDataset.length,
        		label: document.getElementById('node-label').value,
        		description: $('#node-description').html(),   
        		shape:"ellipse",
        		color:'rgba(60,60,60,0.6)',
				    tags:tabTagNew
        	});       
			
			

        	var location=network.DOMtoCanvas({x:locX,y:locY});

        	network.moveNode(nodesDataset.length-1,location.x,location.y);

        	allNodes=nodesDataset.get({returnType:"Object"});
        	document.getElementById('network-popUp').style.display = 'none'; 
   	        updateLeftPane();
   	 	 
	 	add_tag();
        };

        document.getElementById('cancelButton').onclick = function(){
        	document.getElementById('saveButton').onclick = null;
        	document.getElementById('cancelButton').onclick = null;
        	document.getElementById('network-popUp').style.display = 'none'; 
        };

        locX=0;
        locY=0;

        var updateArray = [];
        for (var nodeId in allNodes) {
        	if (allNodes.hasOwnProperty(nodeId)) {
        		updateArray.push(allNodes[nodeId]);
        	}
        }
        nodesDataset.update(updateArray);
    },

    addEdge: function (data, callback) {

    	var edge_label_value="";
    	if (data.from != data.to) {
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
				
			 function save_edge (){

    			if($('input.boxplus').prop('checked')){
    				// console.log("je passe");
    				edge_label_value= '+';
    			}else if($('input.boxminus').prop('checked')){
    				// console.log("je passe 2");
    				edge_label_value= '-';
    			}
    			else{
    				alert("Please select one of the influence directions before validating edge edtition");
    			}
    			// console.log(edge_label_value)

    			if(edge_label_value != ""){
    				allEdges=edgesDataset.get({returnType:"Object"});

    				edgesDataset.add({
    					id:edgesDataset.length,
    					from:data.from,
    					to:data.to,
    					label:edge_label_value
    				});

    				allEdges=edgesDataset.get({returnType:"Object"});
    				// console.log(edgesDataset);

    				document.getElementById('network-popUp_edge').style.display = 'none';
    			}
    		};

    		document.getElementById('saveButton_edge').onclick=function(e){
    			save_edge();
    		}

    		document.onkeydown=function(e){
    			if(e.keyCode === 13 ){
    				save_edge();
    			}
    		} 

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

    },
    editNode:function(data,callback){

    editNode();
    
    network.setOptions(
    {
      manipulation:{
        initiallyActive :true
      }
    });
    },
    editEdge:function(data,callback){

     console.log("je suis dans editEdge");
    	var edge_label_value;

        edgesDataset.update({
              id:data.id,
              from:data.from,
              to:data.to
              // label:edge_label_value
            });

        var updateArray = [];
        for (var edgeId in allEdges) {
          updateArray.push(allEdges[edgeId]);
        }
        edgesDataset.update(updateArray);

    	if (typeof data.to == "number") {

    		// document.getElementById('operation').innerHTML = "Add Edge";
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
    					id:data.id,
    					from:data.from,
    					to:data.to,
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
        popUpEditEdges=1;
    	}else{

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
              id:data.id,
              from:allEdges[editEdgeId].to,
              to:allEdges[editEdgeId].from,
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
    },
    deleteNode:function(data,callback){
    	remove();
    	neighbourhoodHighlight({nodes:[]});

    },
    deleteEdge:function(data,callback){
  		idselect=data.edges[0];
      console.log(idselect);
	   	removeEdge();
    }
  }
};

	data = {nodes: nodesDataset , edges:edgesDataset };
	network = new vis.Network(containerr[0], data, options);  
	listener();
	    //console.log(tempNodeDataset);

		layout_physical_active=false;
		layout_hierarchical_active=true;

    }
	
	else if($("#text_scenario")[0].innerHTML.includes("You are already on the") == false) {
	  		document.getElementById("text_scenario").innerHTML+="<br>" + "You are already on the hierarchical layout !";
		} 

	allNodes=temp.get({returnType:"Object"});
	
	
		  var updateArray = [];
 	for (var nodeId in allNodes) {
 		if (allNodes.hasOwnProperty(nodeId)) {
 			updateArray.push(allNodes[nodeId]);
 		}
 	}
	nodesDataset.update(updateArray);
	
	data.nodes.update(data.nodes.get().map(function(item) {
	  item.x = undefined;
	  item.y = undefined;
	  return item;
	}));
	

	/* console.log(JSON.stringify(allNodes));
	console.log(JSON.stringify(temp));
	console.log(JSON.stringify(nodesDataset)); */
	
	
 
	}
