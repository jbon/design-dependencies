// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// File that contains all the functions needed for configuration
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  GLOBAL VARIABLES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	  
	  // data 
	  var nodesDataset = new vis.DataSet(nodes);
      var edgesDataset = new vis.DataSet(edges); 	  
	  var container;  
	  var data;
	  var network={}; 
      var allNodes; 
      var allEdges; 
      
	  //variables for the propagation
      var idselect;
	  var sourceId;
      var targetIDs=[];
	  var source_movement=0; 
      var target_increase=[];
      var target_decrease=[];
	  var active=0;
	  
	  // variables position for the click/doubleclick
      var locX=0;
      var locY=0;
      var positionX=0;
      var positionY=0;
	  
	  // variables to know which mode is active 	
      var model_analysis_active;
      var edit_graph_active;
	  
      //variable for edit edge
      var editEdgeId;

	  // path for the target images  
      var DIR="dist/triangle_star_img/";
	 
	  // variables for the multiselection
	  var canvas;
	  var ctx;
	  var rect = {}, drag = false;
	  var drawingSurfaceImageData;
	  var nodesIdInDrawing = [];
	  
	  // variable for the text guidance (to know when to change the text)
	  var show_menu=0;
	  
	  // variables for the oncontext menu  (corner display)
	  var menuWidth;
	  var menuHeight;
	  var windowWidth;
	  var windowHeight;

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  CONFIGURATION FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
 // Configuration function for the physical layout
 // In the options, definition of the node style, edges style, interaction, configure, physics, manipulation.
 //See vis.js documentation for the options :
 // http://visjs.org/docs/network/index.html?keywords=options#options

 function redrawAll() {
container = $("#mynetwork");

options = { 
      
    nodes: {  
      	margin: 5,
        widthConstraint: {
        	maximum: 150
        },
        scaling: {
        	min: 10,
        	max: 30,

        	label: {
        		min: 5,
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
    		enabled: true,
    		type:'continuous'
    	},
    	color:{
    		inherit:false,
    		color:'rgba(60,60,60,0.6)',
    		highlight:'rgba(60,60,60,0.6)',
    	},
    	width: 1,
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
     },

    configure: {
  	container: document.getElementById('optionsContainer'),
  	showButton: false
     },    
 
    physics:{
  	enabled: true,

      barnesHut:{
        gravitationalConstant:-50000,
      	centralGravity:0.0002,
      	springLength: 200,
      	springConstant: 0.05,
      	damping:0.09,
        avoidOverlap:0.5
      },

      maxVelocity: 50,
      minVelocity: 0.1,
      solver: 'barnesHut',
      timestep: 0.9,
      stabilization: {
      	enabled: true,
      	iterations:300
      }
  },

    manipulation: {
		
    enabled:true,
  	initiallyActive :true,

    addNode: function (data, callback) {
		
	if (tagFilterActive==false){
		  
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
        		id:maxid+1,
        		label: document.getElementById('node-label').value,
        		description: $('#node-description').html(),   
        		shape:"ellipse",
        		color:'rgba(60,60,60,0.6)',
				tags:tabTagNew
        	});       
			
			maxid++;

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

		}
    },

    addEdge: function (data, callback) {
	if (tagFilterActive==false){
    	var edge_label_value="";
		
		//no possibility to add an edge which already exist
		for(var i=0; i<edgesDataset.length;i++){
			if(data.from==allEdges[i].from && data.to==allEdges[i].to){
			return;}
		}
		
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
    				edge_label_value= '+';
    			}else if($('input.boxminus').prop('checked')){
    				edge_label_value= '-';
    			}
    			else{
    				alert("Please select one of the influence directions before validating edge edtition");
    			}

    			if(edge_label_value != ""){
    				allEdges=edgesDataset.get({returnType:"Object"});

    				edgesDataset.add({
    					id:edgesDataset.length,
    					from:data.from,
    					to:data.to,
    					label:edge_label_value
    				});

    				allEdges=edgesDataset.get({returnType:"Object"});

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
	}	
    },
	
    editNode:function(data,callback){
	if (tagFilterActive==false){
    editNode();
    
    network.setOptions(
    {
      manipulation:{
        initiallyActive :true
      }
    });
	}
    },
	
    editEdge:function(data,callback){
		if (tagFilterActive==false){
    	var edge_label_value;

        edgesDataset.update({
              id:data.id,
              from:data.from,
              to:data.to
            });

        var updateArray = [];
        for (var edgeId in allEdges) {
          updateArray.push(allEdges[edgeId]);
        }
        edgesDataset.update(updateArray);

    	if (typeof data.to == "number") {

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
	  }
    },
	
    deleteNode:function(data,callback){
		if (tagFilterActive==false){
		idselect = data.nodes[0];
		remove();
		neighbourhoodHighlight({nodes:[]});
		 }
    },
    
	deleteEdge:function(data,callback){
		if (tagFilterActive==false){
  		idselect=data.edges[0];
      console.log(idselect);
	   	removeEdge();
		 }
    }
  }

  };

data = {nodes: nodesDataset , edges:edgesDataset };

network = new vis.Network(container[0], data, options);  

allNodes=nodesDataset.get({returnType:"Object"});
allEdges=edgesDataset.get({returnType:"Object"});

listener();

 if(model_analysis_active){
		hideButton();
   } 

if (tagFilterActive==false){
maxid = 0;
nodesDataset.map(function(obj){     
    if (obj.id > maxid) maxid = obj.id;    
});
}

 }
 
 
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  CLICK EVENT xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
  // This function defines onclick actions (onclick on a node, doubleclick on the network, right click on a node or an edge)
   function listener(){
	 
  if(nodesDataset.length == 0){
  	network.setOptions( { physics: false } );
  }

  network.on("stabilizationIterationsDone", function () {
  	network.setOptions( { physics: false } );
  });

   network.on("click", function(params){
   if(params.nodes.length!=0 && model_analysis_active==true){ 
  		neighbourhoodHighlight(params);
  		openAttributePane(params);
  		focusNode(params.nodes[0]);
        idselect=params.nodes[0];
  	}else{
  		neighbourhoodHighlight({nodes:[]});
  		closeAttributePane();
  	}
	 if(model_analysis_active){
		hideButton();
   } 
  });
  
  document.onclick=function(e){
  	if(locX==0 && locY==0){
		locX=e.pageX,
  		locY=e.pageY
    }
}
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Add Node on doubleclick FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  network.on("doubleClick",addNodefunction);

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  oncontext menu FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    var menu = document.querySelector('.menu');
	var cursorX;
    var cursorY;
	  
  document.onmousemove = function(e){
  	cursorX = e.pageX;
  	cursorY = e.pageY;
  }

  function showMenuEdge(x,y){
    var selectedEdge= network.getEdgeAt({x:cursorX, y:cursorY});

    if (selectedEdge != undefined) {
    menu.classList.add('show-menu');
    
    menuWidth = menu.offsetWidth;
    menuHeight = menu.offsetHeight + 14;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    
     if ( (windowWidth - x) < (menuWidth) ) {
      $(".menu .menu").css("left","-103%");
      menu.style.left = windowWidth - menuWidth + "px";

      }else if((windowWidth - x) < (menuWidth+204)){
          $(".menu .menu").css("left","-103%");
          menu.style.left = x + "px";
      } else {
      $(".menu .menu").css("left","100%");
      menu.style.left = x + "px";
      }

    if ( (windowHeight - y) < menuHeight ) {
      menu.style.top = windowHeight - menuHeight + "px";
      } else {
      menu.style.top = y + "px";
    }
  
    show_menu=1;
  
    }
    else {
      hideMenu();
    }

  return selectedEdge;
  }

  function showMenu(x, y){

  	var selectedNode = network.getNodeAt({x:cursorX, y:cursorY});

  	if (selectedNode != undefined) {
  		menu.classList.add('show-menu');
		
		menuWidth = menu.offsetWidth;
		menuHeight = menu.offsetHeight + 14;

		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		
		if ( (windowWidth - x) < (menuWidth) ) {
      $(".menu .menu").css("left","-103%");
			menu.style.left = windowWidth - menuWidth + "px";

		  }else if((windowWidth - x) < (menuWidth+204)){
          $(".menu .menu").css("left","-103%");
          menu.style.left = x + "px";
      } else {
      $(".menu .menu").css("left","100%");
			menu.style.left = x + "px";
		  }

		if ( (windowHeight - y) < menuHeight ) {
			menu.style.top = windowHeight - menuHeight + "px";
		  } else {
			menu.style.top = y + "px";
		}
	
		show_menu=1;
	
  	}
  	else {
  		hideMenu();
  	}

  return selectedNode;
}


function hideMenu(){
	menu.classList.remove('show-menu');
	show_menu=0;
	
}

function onContextMenu(e){
   e.preventDefault();
   selectedNode=showMenu(e.pageX, e.pageY);
   selectedEdge=showMenuEdge(e.pageX, e.pageY);
	
  if(selectedNode != undefined){

    idselect=selectedNode;
    showMenu(e.pageX, e.pageY);
  	
	if (model_analysis_active==true){
		$("#data-action").show();
		 $("#toHide").show();
         $("#toHide2").hide();	
	}	
	if(edit_graph_active==true){
		$("#data-action").show();
		$("#toHide").hide();
        $("#toHide2").show();
	}

    document.getElementById("source_increase").onclick=source_increase;
  	document.getElementById("source_decrease").onclick=source_decrease;
  	document.getElementById("target_increase").onclick=increase_target; 
  	document.getElementById("target_decrease").onclick=decrease_target;     
	document.getElementById("assume_increase").onclick=increase_assume; 
    document.getElementById("assume_decrease").onclick=decrease_assume;
    document.getElementById("unset").onclick=unset_selected; 
  	document.getElementById("edit").onclick=editNode;
  	document.getElementById("remove").onclick=remove;
    
    selectedNode=undefined;

    document.addEventListener('click', onClick, false);

}else if(selectedEdge != undefined){

    idselect=selectedEdge;

    console.log("edge");

   if (model_analysis_active==true){
		 $("#data-action").hide();
	}	
	if(edit_graph_active==true){
		$("#data-action").show();
	     $("#toHide").hide();
        $("#toHide2").show();
	}

    $('#editProperties').text("Edit properties");

    document.getElementById("edit").onclick=editEdge;
    document.getElementById("remove").onclick=removeEdge;
    document.addEventListener('click', onClick, false);

    selectedEdge=undefined;
}

}


function onClick(e){
	hideMenu();
	document.removeEventListener('click', onClick);
}

document.addEventListener('contextmenu', onContextMenu, false);

document.ondblclick=function(e){
	if(positionX==0 && positionY==0){
		positionX=e.pageX;
		positionY=e.pageY;
	}
}

tabTag=[];
add_tag();

layout_physical_active=true;
layout_hierarchical_active=false;

 }

var node_pos_onclkX=0;
var node_pos_onclkY=0;

// get positions
$(document).on("click",function(e){
      node_pos_onclkX=e.pageX;
      node_pos_onclkY=e.pageY;

    if( network.getEdgeAt({x:node_pos_onclkX, y:node_pos_onclkY}) != undefined){
      editEdgeId= network.getEdgeAt({x:node_pos_onclkX, y:node_pos_onclkY});
    }
});

// actions when the esc key is pressed
$(document).keydown(function(e) {        
	if (e.keyCode == 27) { 
		document.getElementById('network-popUp').style.display = 'none';
		document.getElementById('network-popUp_edge').style.display = 'none';
		reset_parameters();
	}
});

// action when the delete key is pressed
$(document).keydown(function(e) {
		if (tagFilterActive==false){
   if (e.keyCode == 46 && idselect!=undefined ) {
    remove();
  }
  }
});


 // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  MULTI SELECTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  function saveDrawingSurface() {
   drawingSurfaceImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
   }

function restoreDrawingSurface() {
    ctx.putImageData(drawingSurfaceImageData, 0, 0);
}

function selectNodesFromHighlight() {
    var fromX, toX, fromY, toY;
	nodesIdInDrawing = [];
    var xRange = getStartToEnd(rect.startX, rect.w);
    var yRange = getStartToEnd(rect.startY, rect.h);
    var allNodes = nodesDataset.get();
    for (var i = 0; i < allNodes.length; i++) {
        var curNode = allNodes[i];
        var nodePosition = network.getPositions([curNode.id]);
        var nodeXY = network.canvasToDOM({x: nodePosition[curNode.id].x, y: nodePosition[curNode.id].y});
        if (xRange.start <= nodeXY.x && nodeXY.x <= xRange.end && yRange.start <= nodeXY.y && nodeXY.y <= yRange.end) {
            nodesIdInDrawing.push(curNode.id);
        }
    }
    network.selectNodes(nodesIdInDrawing);
}

function getStartToEnd(start, theLen) {
    return theLen > 0 ? {start: start, end: start + theLen} : {start: start + theLen, end: start};
}

$(document).ready(function() { 
    container.on("mousemove", function(e) {
        if (drag) { 
            restoreDrawingSurface();
            rect.w = (e.pageX - this.offsetLeft) - rect.startX;
            rect.h = (e.pageY - this.offsetTop) - rect.startY ;
            ctx.setLineDash([5]);
            ctx.strokeStyle = "rgb(102, 102, 102)";
            ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
            ctx.setLineDash([]);
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
        }
    });

    container.on("mousedown", function(e) {
        if (e.button == 2) { 
			canvas = network.canvas.frame.canvas;
			ctx = canvas.getContext('2d');
            selectedNodes = e.ctrlKey ? network.getSelectedNodes() : null;
            saveDrawingSurface();
            var that = this;
            rect.startX = e.pageX - this.offsetLeft;
            rect.startY = e.pageY - this.offsetTop;
            drag = true;
            container[0].style.cursor = "crosshair";
        }
    }); 

    container.on("mouseup", function(e) {
        if (e.button == 2) { 
            restoreDrawingSurface();
            drag = false;
            container[0].style.cursor = "default";
            selectNodesFromHighlight();
        }
		
		if (network.getSelectedNodes().length!= 0 && edit_graph_active==true){
		     network.setOptions({
			manipulation:{
				initiallyActive :true
			}
		}); 
			}
			
    });

document.body.oncontextmenu = function() {return false;};
});   
