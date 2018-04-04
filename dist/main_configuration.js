      var network={}; 
      var allNodes; 
      var allEdges; 

      var highlightActive = false;
      // var nodes=[];
      // var edges=[];
      var nodesDataset = new vis.DataSet(nodes);
      var edgesDataset = new vis.DataSet(edges); 
      var exportAreavalue;
      var options;

      var sourceId;
      var targetIDs=[];
      var idselect;


      var data;
      var source_movement=0; 
      var target_increase=[];
      var target_decrease=[];

      var locX=0;
      var locY=0;


      var positionX=0;
      var positionY=0;
      var active=0;
      var container;
	   var containerr;

	  
	    var show_menu=0;
		var setAsSource=0; 
	    var setAsTarget=0;

	    var tabTagg=[];
      var DIR="triangle_star_img/";
	  
	    var menuWidth;
	    var menuHeight;
	    var windowWidth;
	    var windowHeight;

      var popUpEditEdges=0;
      var editEdgeId;
	  
	    var canvas;
		var ctx;
		var rect = {}, drag = false;
		var drawingSurfaceImageData;
		var nodesIdInDrawing = [];

 // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  CONFIGURATION FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

 function redrawAll() {

 container = document.getElementById('mynetwork');
 containerr = $("#mynetwork");

 	 options = { 
      /*  layout:{
         improvedLayout: false
       }, */
      nodes: {
      	margin: 5,
        // color:'#000000',
        
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
    		//hover:'rgba(60,60,60,0.6)',
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
  	enabled: true,

      // barnesHut: {
      //   gravitationalConstant: -10000,
      //   centralGravity: 0.15,
      //   springLength: 95,
      //   springConstant: 0.02,
      //   avoidOverlap: 0
      // },
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
      	iterations:3000
      }
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
		idselect = data.nodes[0];
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

network = new vis.Network(container, data, options);  

allNodes=nodesDataset.get({returnType:"Object"});
allEdges=edgesDataset.get({returnType:"Object"});
listener();


/* createTab();
openGraph(); */

 }
 
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  CLICK EVENT xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
   function listener(){
	 
  if(nodesDataset.length == 0){
  	network.setOptions( { physics: false } );
  }


  network.on("stabilizationIterationsDone", function () {
  	network.setOptions( { physics: false } );
  });

  network.on("click",function(params){
  	if(params.nodes.length!=0){ 
  		neighbourhoodHighlight(params);
  		openAttributePane(params);
  		focusNode(params.nodes[0]);
      idselect=params.nodes[0];
  	}else{
  		neighbourhoodHighlight({nodes:[]});
  		closeAttributePane();
  	}
  });

  document.onclick=function(e){

  	if(locX==0 && locY==0)
  	{
  		locX=e.pageX,
  		locY=e.pageY
     console.log(locX + "  " + locY);
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
    //console.log(selectedEdge);

    if (selectedEdge != undefined) {
      menu.classList.add('show-menu');
      //menu.style.left = x + 'px';
      //menu.style.top = y + 'px';
    
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
  
      

      // console.log(menu.offsetWidth);

      // idselect=selectedEdge;
    show_menu=1;
  
    }
    else {
      hideMenu();
    //resizeListener();
    }

  // params.event.preventDefault();
  return selectedEdge;
  }

  function showMenu(x, y){

  	var selectedNode = network.getNodeAt({x:cursorX, y:cursorY});

  	if (selectedNode != undefined) {
  		menu.classList.add('show-menu');
  		//menu.style.left = x + 'px';
  		//menu.style.top = y + 'px';
		
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
	
  		// console.log(menu.offsetWidth);

  		// idselect=selectedNode;
		show_menu=1;
	
  	}
  	else {
  		hideMenu();
		//resizeListener();
  	}

  // params.event.preventDefault();
  return selectedNode;
}

/* function resizeListener() {
	
   window.onresize = function(e) {
	   alert('ok');
    hideMenu();
  }; 
  
} */

function hideMenu(){
	menu.classList.remove('show-menu');
	show_menu=0;
	
}

function onContextMenu(e){
	e.preventDefault();
	var selectedNode=showMenu(e.pageX, e.pageY);
  var selectedEdge=showMenuEdge(e.pageX, e.pageY);

 // console.log(selectedNode + " edge " + selectedEdge);
	
  if(selectedNode != undefined){

    idselect=selectedNode;
    
    showMenu(e.pageX, e.pageY);
    
    console.log("node");
  	
     $("#toHide").show();

    document.getElementById("source_increase").onclick=source_increase;

  	document.getElementById("source_decrease").onclick=source_decrease;

  	document.getElementById("target_increase").onclick=increase_target; 

  	document.getElementById("target_decrease").onclick=decrease_target; 

    document.getElementById("unset").onclick=unset_selected; 

  	document.getElementById("edit").onclick=editNode;

  	document.getElementById("remove").onclick=remove;
    
    selectedNode=undefined;


    document.addEventListener('click', onClick, false);

}else if(selectedEdge != undefined){

    idselect=selectedEdge;

    console.log("edge");

    $("#toHide").hide();

    $('#editProperties').text("Edit properties");

    document.getElementById("edit").onclick=editEdge;

    document.getElementById("remove").onclick=removeEdge;
    
    document.addEventListener('click', onClick, false);

    selectedEdge=undefined;
}

}


function onClick(e){
	hideMenu();
	//resizeListener();
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

$(document).on("click",function(e){
      node_pos_onclkX=e.pageX;
      node_pos_onclkY=e.pageY;

    if( network.getEdgeAt({x:node_pos_onclkX, y:node_pos_onclkY}) != undefined){
      editEdgeId= network.getEdgeAt({x:node_pos_onclkX, y:node_pos_onclkY});
      console.log(editEdgeId);
    }
});

$(document).keydown(function(e) {        
	if (e.keyCode == 27) {
		document.getElementById('network-popUp').style.display = 'none';
	}
});

$(document).keydown(function(e) {        
	if (e.keyCode == 27) {
		document.getElementById('network-popUp_edge').style.display = 'none';
	}
});

$(document).keydown(function(e) {        
	if (e.keyCode == 27) {
		network.setOptions(
		{
			manipulation:{
				initiallyActive :true
			}
		});
	}
});

$(document).keydown(function(e) {  
   if (e.keyCode == 46 && idselect!=undefined ) {
    remove();
  }
});

// $("div.vis-button.vis-edit").on("click",function(){
//   console.log(data.from + "  " + data.to);
// });

 function saveDrawingSurface() {
   drawingSurfaceImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
   }

function restoreDrawingSurface() {
    ctx.putImageData(drawingSurfaceImageData, 0, 0);
}

function selectNodesFromHighlight() {
    var fromX, toX, fromY, toY;
    // var nodesIdInDrawing = [];
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
    containerr.on("mousemove", function(e) {
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

    containerr.on("mousedown", function(e) {
        if (e.button == 2) { 
			
			canvas = network.canvas.frame.canvas;
			ctx = canvas.getContext('2d');
			//console.log("test");
			
            selectedNodes = e.ctrlKey ? network.getSelectedNodes() : null;
            saveDrawingSurface();
            var that = this;
            rect.startX = e.pageX - this.offsetLeft;
            rect.startY = e.pageY - this.offsetTop;
            drag = true;
            containerr[0].style.cursor = "crosshair";
        }
    }); 

    containerr.on("mouseup", function(e) {
        if (e.button == 2) { 

            restoreDrawingSurface();
            drag = false;

            containerr[0].style.cursor = "default";
            selectNodesFromHighlight();
        }
		
		if (network.getSelectedNodes().length!= 0)
			{
					 network.setOptions(
		{
			manipulation:{
				initiallyActive :true
			}
		}); 
			}
			
    });

document.body.oncontextmenu = function() {return false;};

	network = new vis.Network(containerr[0], data, options);

});
