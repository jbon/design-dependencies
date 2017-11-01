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


	  var tabTagg=[];
      var DIR="triangle_star_img/";

 // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  CONFIGURATION FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

 function redrawAll() {

 	container = document.getElementById('mynetwork');

 	options = {
      // layout:{
      //   improvedLayout: true
      // },
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
        		min: 12,
        		max: 30,
        		drawThreshold: 12,
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
  	enabled: true,

      // barnesHut: {
      //   gravitationalConstant: -10000,
      //   centralGravity: 0.15,
      //   springLength: 95,
      //   springConstant: 0.02,
      //   avoidOverlap: 0
      // },
      repulsion:{
      	nodeDistance:200,
      	centralGravity:0.002,
      	springLength: 200,
      	springConstant: 0.05,
      	damping:0.09
      },

      maxVelocity: 50,
      minVelocity: 0.1,
      solver: 'repulsion',
      timestep: 0.9,
      stabilization: {
      	enabled: true,
      	iterations:40000
      }
  },

  manipulation: {

  	initiallyActive :true,

  	addNode: function (data, callback) {
        // filling in the popup DOM elements
        document.getElementById('operation').innerHTML = "Add Node";
        document.getElementById('network-popUp').style.display = 'block';
        document.getElementById('node-label').value="";
		document.getElementById('tag-input').value="";
		document.getElementById('show-tag').innerHTML ="    " ;
       // document.getElementById('node-description').value="";
        document.getElementById('node-label').focus(); 

        $('#node-description').html("");

		document.getElementById('addTag').onclick = function(){
			tabTagg.push(document.getElementById('tag-input').value);			
			document.getElementById('show-tag').innerHTML +="    " + document.getElementById('tag-input').value;		
			document.getElementById('tag-input').value="";	
		};

        document.getElementById('saveButton').onclick = function(){

        	nodesDataset.add({
        		id:nodesDataset.length,
        		label: document.getElementById('node-label').value,
        		description: $('#node-description').html(),   
        		shape:"ellipse",
        		color:'rgba(60,60,60,0.6)',
		  		tags:tabTagg
        	});        

        	var location=network.DOMtoCanvas({x:locX,y:locY});

        	network.moveNode(nodesDataset.length-1,location.x,location.y);

        	allNodes=nodesDataset.get({returnType:"Object"});
        	document.getElementById('network-popUp').style.display = 'none'; 
   	        updateLeftPane();

		 TAG.innerHTML="";
		 saveTag();
		 createButtons();
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
    		document.getElementById('operation').innerHTML = "Add Edge";
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
    				console.log("je passe");
    				edge_label_value= '+';
    			}else if($('input.boxminus').prop('checked')){
    				console.log("je passe 2");

    				edge_label_value= '-';
    			}
    			else{
    				alert("No selection !");
    			}
    			console.log(edge_label_value)

    			if(edge_label_value != ""){
    				allEdges=edgesDataset.get({returnType:"Object"});

    				edgesDataset.add({
    					id:edgesDataset.length,
    					from:data.from,
    					to:data.to,
    					label:edge_label_value
    				});

    				allEdges=edgesDataset.get({returnType:"Object"});
    				console.log(edgesDataset);

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
    editEdge:function(data,callback){

    	var edge_label_value;
    	if (data.from != data.to) {

    		document.getElementById('operation').innerHTML = "Add Edge";
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
    				alert("no selection");
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
    	}
    },
    deleteNode:function(data,callback){
    	idselect=data.nodes[0];
    	remove();
    	neighbourhoodHighlight({nodes:[]});

    },
    deleteEdge:function(data,callback){

    	var length=edgesDataset.length; 
    	var edges_removed=data.edges[0];

    	allEdges=edgesDataset.get({returnType:"Object"});


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
    	console.log(updateArray);

// for(var edgeId in updateArray){
//   if(updateArray[edgeId].from>idselect){
//     updateArray[edgeId].from=updateArray[edgeId].from-1;
//   }
//   if(updateArray[edgeId].to>idselect){
//     updateArray[edgeId].to=updateArray[edgeId].to-1;
//   }
// }
edgesDataset = new vis.DataSet(updateArray); 
redrawAll();

}
}

};

data = {nodes: nodesDataset , edges:edgesDataset };

network = new vis.Network(container, data, options);  

allNodes=nodesDataset.get({returnType:"Object"});
allEdges=edgesDataset.get({returnType:"Object"});



  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  CLICK EVENT xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

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

    // console.log(locX + "  " + locY);
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


  function showMenu(x, y){

  	var selectedNode = network.getNodeAt({x:cursorX, y:cursorY});

  	if (selectedNode != undefined) {
  		menu.style.left = x + 'px';
  		menu.style.top = y + 'px';
  		menu.classList.add('show-menu');

  		idselect=selectedNode;
  	}
  	else {
  		hideMenu();
  	}

  // params.event.preventDefault();
  return idselect;
}

function hideMenu(){
	menu.classList.remove('show-menu');
}


function onContextMenu(e){
	e.preventDefault();
	showMenu(e.pageX, e.pageY);

	document.getElementById("source").onclick=set_as_source;

	document.getElementById("target").onclick=set_as_target;

	document.getElementById("edit").onclick=editNode;

	document.getElementById("remove").onclick=remove;

	document.getElementById("increase").onclick=increase;

	document.getElementById("decrease").onclick=decrease;

	document.addEventListener('click', onClick, false);

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

document.getElementById('TAG').innerHTML=" ";
saveTag();
createButtons();

};

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




