function layout_physical(){  
  redrawAll()
}

function layout_hierarchical(){

 redrawAll2()
 
}
function redrawAll2() {

  var container = document.getElementById('mynetwork');

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
        color:'rgba(80,80,80,0.6)',
        hover:'rgba(80,80,80,0.6)',
        highlight:'rgba(80,80,80,0.6)',

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

      hierarchicalRepulsion: {

        nodeDistance :300,
        centralGravity:0,
        springLength:50,
        springConstant: 0.01,
        damping: 0.09
      }, 
      maxVelocity: 50,
      minVelocity: 0.1,
      solver: 'hierarchicalRepulsion',
      timestep: 0.9,
      stabilization: {
        enabled: true,
        iterations:400 
      }
    },

    layout: {
      hierarchical: {
        direction: "UD",
        nodeSpacing: 250,
        levelSeparation: 250,
        parentCentralization: true,
        sortMethod: "directed"
      }},

      manipulation: {

        initiallyActive :true,

        addNode: function (data, callback) {
        // filling in the popup DOM elements
        document.getElementById('operation').innerHTML = "Add Node";
        document.getElementById('network-popUp').style.display = 'block';

        document.getElementById('node-label').value="";
        document.getElementById('froala-editor').value="";

        var location=network.DOMtoCanvas({x:locX,y:locY});


        document.getElementById('saveButton').onclick = function(){

         // var location=network.DOMtoCanvas({x:positionX,y:positionY});

         var loc=network.DOMtoCanvas({x:locX,y:locY});


         nodesDataset.add({
          id:nodesDataset.length,
          label: document.getElementById('node-label').value,
          description:  document.getElementById('froala-editor').value,   
          shape:"ellipse",
          color:'rgba(80,80,80,0.6)',
          x:loc.X,
          y:loc.Y
        });        

          // console.log(location);

          allNodes=nodesDataset.get({returnType:"Object"});
          document.getElementById('network-popUp').style.display = 'none'; 


        };

        document.getElementById('cancelButton').onclick = function(){
          document.getElementById('saveButton').onclick = null;
          document.getElementById('cancelButton').onclick = null;
        };

        var updateArray = [];
        for (var nodeId in allNodes) {
          if (allNodes.hasOwnProperty(nodeId)) {
            updateArray.push(allNodes[nodeId]);
          }
        }
        nodesDataset.update(updateArray);
      },

      addEdge: function (data, callback) {

       var edge_label_value;
       if (data.from != data.to) {

        document.getElementById('operation').innerHTML = "Add Node";
        document.getElementById('network-popUp_edge').style.display = 'block';

        document.getElementById('edge-label').value="";


        document.getElementById('saveButton_edge').onclick = function(){
          edge_label_value=document.getElementById('edge-label').value;      

          allEdges=edgesDataset.get({returnType:"Object"});

          edgesDataset.add({
            id:edgesDataset.length+1,
            from:data.from,
            to:data.to,
            label:edge_label_value
          });

          allEdges=edgesDataset.get({returnType:"Object"});
          console.log(edgesDataset);

          document.getElementById('network-popUp_edge').style.display = 'none';

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
    editEdge:function(data,callback){

      var edge_label_value;
      if (data.from != data.to) {

        document.getElementById('operation').innerHTML = "Add Node";
        document.getElementById('network-popUp_edge').style.display = 'block';

        document.getElementById('edge-label').value="";


        document.getElementById('saveButton_edge').onclick = function(){
          edge_label_value=document.getElementById('edge-label').value;      

          allEdges=edgesDataset.get({returnType:"Object"});

          edgesDataset.update({
            id:data.id,
            from:data.from,
            to:data.to,
            label:edge_label_value
          });

          allEdges=edgesDataset.get({returnType:"Object"});
          console.log(edgesDataset);

          document.getElementById('network-popUp_edge').style.display = 'none';

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
  }

};


data = {nodes: nodesDataset , edges:edgesDataset };

network = new vis.Network(container, data, options);  

allNodes=nodesDataset.get({returnType:"Object"});
allEdges=edgesDataset.get({returnType:"Object"});

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  CLICK EVENT xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

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

    locX=e.pageX,
    locY=e.pageY
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

    document.getElementById("remove").onclick=function(){ 

  // Remove the edges connected to the selected Node and ajust EdgesDatasetXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  var length=edgesDataset.length; 
  var edges_removed=[];
  for(var edge in allEdges){
    if(allEdges[edge].from==idselect || allEdges[edge].to==idselect){      
      edgesDataset.remove(edge);
      edges_removed.push(edge);
    }
  } 

  allEdges=edgesDataset.get({returnType:"Object"});

  for(var int=edges_removed.length-1; int>=0; int--){
    var edgeId_removed=parseInt(edges_removed[int]);
    // console.log(int);
    for (var i=edgeId_removed; i<length; i++){
      // console.log(length);
      allEdges[i]=allEdges[i+1];
      allEdges[i].id=i;
    }
  }

  var updateArray = [];
  for (var edgeId=1; edgeId<=edgesDataset.length;edgeId++) {

    if (allEdges.hasOwnProperty(edgeId)) {
      updateArray.push(allEdges[edgeId]);
      console.log(allEdges[edgeId]);
    }
  }
  // console.log(updateArray)
  edgesDataset.update(updateArray);
  // console.log(allEdges);
  // console.log(edgesDataset);

  for(var a=0; a<edges_removed.length;a++){
    // console.log(a);
    edgesDataset.remove(length);
  }

  // Remove the selected Node and ajust nodesDataset XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  nodesDataset.remove(idselect);

  if(idselect!=nodesDataset.length){
    allNodes=nodesDataset.get({returnType:"Object"});

    for (var int=idselect; int<nodesDataset.length; int++){
      allNodes[int]=allNodes[int+1];
      allNodes[int].id=int;
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
  hideMenu();
}

document.getElementById("increase").onclick=function(){ 

  if(sourceId==idselect){
    source_movement=1;
    allNodes[idselect].color='rgba(0,250,0,1)';

  }
  f
  // source_movement=1;

  for(var i in targetIDs){
    if(idselect==targetIDs[i]){
      target_increase.push(idselect);
      allNodes[idselect].color='rgba(0,250,0,1)';

    }
  }
  console.log("target increase" + target_increase);

  var updateArray = [];
  for (var nodeId in allNodes) {
    if (allNodes.hasOwnProperty(nodeId)) {
      updateArray.push(allNodes[nodeId]);
    }
  }
  nodesDataset.update(updateArray);



  hideMenu();
}

document.getElementById("decrease").onclick=function(){ 

  if(sourceId==idselect){
    source_movement=-1;
    allNodes[idselect].color='rgba(250,0,0,1)';


  }
//  if(sourceId == "" || sourceId != idselect){
//   set_as_source();
// }
for(var i in targetIDs){
  if(idselect==targetIDs[i]){
    target_decrease.push(idselect);
    allNodes[idselect].color='rgba(250,0,0,1)';

  }
}
console.log("target decrease" + target_decrease);

var updateArray = [];
for (var nodeId in allNodes) {
  if (allNodes.hasOwnProperty(nodeId)) {
    updateArray.push(allNodes[nodeId]);
  }
}
nodesDataset.update(updateArray);

hideMenu();
}

document.addEventListener('click', onClick, false);

}

function onClick(e){
  hideMenu();
  document.removeEventListener('click', onClick);
}

document.addEventListener('contextmenu', onContextMenu, false);

// document.ondblclick=function(e){
//   positionX=e.pageX;
//   positionY=e.pageY;
// }
}; 