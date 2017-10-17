      var network={}; 
      var allNodes; 
      var allEdges; 

      var highlightActive = false;

      var nodesDataset = new vis.DataSet(nodes);
      var edgesDataset = new vis.DataSet(edges); 
      var exportAreavalue;
      var options;

      var sourceId;
      // var targetId=undefined ;
      var targetIDs=[];
      var idselect;


      var data;
      var source_movement=0; 
      var target_increase=[];
      var target_decrease=[];

      var locX=0;
      var locY=0;

 // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  CONFIGURATION FUNCTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

 function clearPopUp() {
  document.getElementById('saveButton').onclick = null;
  document.getElementById('cancelButton').onclick = null;
  document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
  clearPopUp();
  callback(null);
}

function saveData(data,callback) {
  data.id = document.getElementById('node-id').value;
  data.label = document.getElementById('node-label').value;
  clearPopUp();
  callback(data);
}


  // document.oncli

  function redrawAll() {

    var container = document.getElementById('mynetwork');

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
        // console.log(add_node_active);
        document.getElementById('operation').innerHTML = "Add Node";
        document.getElementById('network-popUp').style.display = 'block';


        document.getElementById('node-label').value="";
        document.getElementById('node-description').value="";

        document.getElementById('node-label').focus(); 

         // console.log(locX + " et " + locY );



         document.getElementById('saveButton').onclick = function(){

         // var location=network.DOMtoCanvas({x:positionX,y:positionY});

         // var loc=network.DOMtoCanvas({x:locX,y:locY});
         // console.log(locX + " et " + locY );


         nodesDataset.add({
          id:nodesDataset.length,
          label: document.getElementById('node-label').value,
          description:  document.getElementById('node-description').value,   
          shape:"ellipse",
          color:'rgba(60,60,60,0.6)'
          // x:loc.X,
          // y:loc.Y
        });        

         var location=network.DOMtoCanvas({x:locX,y:locY});

         console.log(location);
          // console.log(location.x)         
          network.moveNode(nodesDataset.length-1,location.x,location.y);
          console.log(network.getPositions(nodesDataset.length-1));

          allNodes=nodesDataset.get({returnType:"Object"});
          document.getElementById('network-popUp').style.display = 'none'; 


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





        // document.getElementById('node-label').value = data.label;
        // document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
        // document.getElementById('cancelButton').onclick = clearPopUp.bind();
        // document.getElementById('network-popUp').style.display = 'block';
      },

      addEdge: function (data, callback) {

       var edge_label_value="";
       if (data.from != data.to) {

        document.getElementById('operation').innerHTML = "Add Edge";
        document.getElementById('network-popUp_edge').style.display = 'block';

      // document.getElementById('edge-label').value="";

      // if(label[0].checked){

      // }
      $('input.boxplus').on('change', function() {
        $('input.boxminus').prop('checked', false);  
      });
      $('input.boxminus').on('change', function() {
        $('input.boxplus').prop('checked', false);  
      });

      document.getElementById('saveButton_edge').onclick = function(){

        if($('input.boxplus').prop('checked')){
          console.log("je passe");
          edge_label_value= '+';
        }else if($('input.boxminus').prop('checked')){
          console.log("je passe 2");

          edge_label_value= '-';
        }
        else{
          alert("no selection")
        }
        console.log(edge_label_value)


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

      document.getElementById('operation').innerHTML = "Add Edge";
      document.getElementById('network-popUp_edge').style.display = 'block';

      // document.getElementById('edge-label').value="";
      $('input.boxplus').on('change', function() {
        $('input.boxminus').prop('checked', false);  
      });
      $('input.boxminus').on('change', function() {
        $('input.boxplus').prop('checked', false);  
      });


      document.getElementById('saveButton_edge').onclick = function(){
        // edge_label_value=document.getElementById('edge-label').value; 
        if($('input.boxplus').prop('checked')){
          console.log("je passe");
          edge_label_value= '+';
        }else if($('input.boxminus').prop('checked')){
          console.log("je passe 2");

          edge_label_value= '-';
        }
        else{
          alert("no selection")
        }     

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

  document.getElementById("remove").onclick=function(){ 


  // Remove the selected Node and ajust nodesDataset XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
    console.log(JSON.parse(JSON.stringify(nodesDataset)));
    allNodes=nodesDataset.get({returnType:"Object"});

  }


  // Remove the edges connected to the selected Node and ajust EdgesDatasetXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  var length=edgesDataset.length; 
  // console.log(JSON.parse(JSON.stringify(edgesDataset)));
  var edges_removed=[];
  for(var edge in allEdges){
    if(allEdges[edge].from==idselect || allEdges[edge].to==idselect){  
      // console.log(edge);

      edgesDataset.remove(edge,length);
      edges_removed.push(edge);
  // console.log(JSON.parse(JSON.stringify(edgesDataset)));

}
} 
// console.log(JSON.parse(JSON.stringify(edgesDataset)));

// console.log(edges_removed);
allEdges=edgesDataset.get({returnType:"Object"});

for(var int=edges_removed.length-1; int>=0; int--){
  var edgeId_removed=parseInt(edges_removed[int]);
  for (var i=edgeId_removed; i<length-1; i++){
    allEdges[i]=allEdges[i+1];
    allEdges[i].id=i;
  }
}
// console.log(JSON.parse(JSON.stringify(allEdges)));
// console.log(JSON.parse(JSON.stringify(edgesDataset)));


for(var edgeId in allEdges){
  if(allEdges[edgeId].from>idselect){
    allEdges[edgeId].from=allEdges[edgeId].from-1;
    console.log(allEdges[edgeId].from);
  }
  if(allEdges[edgeId].to>idselect){
    allEdges[edgeId].from=allEdges[edgeId].to-1;
  }
}

var updateArray = [];
for(var edge=0; edge<length-edges_removed.length+1;edge++){
      // console.log(edge);
      updateArray.push(allEdges[edge]);
    }
    console.log(JSON.parse(JSON.stringify(updateArray)));
    // edgesDataset = new vis.DataSet([]); 

    edgesDataset.update(updateArray);
    // console.log(JSON.parse(JSON.stringify(edgesDataset)));

    // console.log(allEdges);
    // console.log(edgesDataset.data);

    // for(var a=0; a<edges_removed.length;a++){
      // console.log(a);
      // console.log(edges_removed.length);
      // edgesDataset.remove(length-a);
    // }
    // console.log(edgesDataset);

    // console.log(JSON.parse(JSON.stringify(edgesDataset[1])));
    console.log(edgesDataset[1]);


    allEdges=edgesDataset.get({returnType:"Object"});

    hideMenu();
  }

  document.getElementById("increase").onclick=function(){ 

    if(sourceId==idselect){
      source_movement=1;
      set_a_plus(sourceId);
    }

    for(var i in targetIDs){
      if(idselect==targetIDs[i]){
        target_increase.push(idselect);
        set_a_plus(targetIDs[i]);
      }
    }

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
      var sourceId_decrease=sourceId;
      set_a_minus(sourceId);
    }

    for(var i in targetIDs){
      if(idselect==targetIDs[i]){
        target_decrease.push(idselect);
        set_a_minus(targetIDs[i]);
      }
    }

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

document.ondblclick=function(e){
  if(positionX==0 && positionY==0){
    positionX=e.pageX;
    positionY=e.pageY;
  }
}
};

var positionX=0;
var positionY=0;



function addNodefunction(){

 document.getElementById('operation').innerHTML = "Add Node";
 document.getElementById('network-popUp').style.display = 'block';

 document.getElementById('node-label').value="";
 document.getElementById('node-description').value="";
 document.getElementById('node-label').focus(); 


 document.getElementById('saveButton').onclick = function(){

  var location=network.DOMtoCanvas({x:positionX,y:positionY});

  nodesDataset.add({
    id:nodesDataset.length,
    label: document.getElementById('node-label').value,
    description:  document.getElementById('node-description').value,   
    shape:"ellipse",
    color:'rgba(60,60,60,0.6)'
  });        

  network.moveNode(nodesDataset.length-1,location.x,location.y);

  allNodes=nodesDataset.get({returnType:"Object"});
  document.getElementById('network-popUp').style.display = 'none';
};


document.getElementById('cancelButton').onclick = function(){
  document.getElementById('saveButton').onclick = null;
  document.getElementById('cancelButton').onclick = null;
  document.getElementById('network-popUp').style.display = 'none';

};

positionX=0;
positionY=0;

var updateArray = [];
for (var nodeId in allNodes) {
  if (allNodes.hasOwnProperty(nodeId)) {
    updateArray.push(allNodes[nodeId]);
  }
}
nodesDataset.update(updateArray);

}

var active=0;


  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Draw the path beetween 2 nodes FUNCTION on the button xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  function save_changes(){
  // data.nodes.on('*', function(event, properties, senderId) {
    console.log('Nodes changed');
    setTimeout(getExport,0);
  // });
}


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
   sourceId=undefined;
   targetIDs=[] ;
   result_path=[""];
   source_movement=0;
   target_decrease=[];
   target_increase=[];


   var updateArray=[];
   for(var nodeId in allNodes)
   {
     allNodes[nodeId].shape="ellipse";
     allNodes[nodeId].color='rgba(60,60,60,0.6)';
     if (allNodes[nodeId].hiddenLabel !== undefined) {
       allNodes[nodeId].label=allNodes[nodeId].hiddenLabel;
     }else{
      allNodes[nodeId].label=allNodes[nodeId].label.substring(0,allNodes[nodeId].label.length-3);
    }

  }
  for (var edgeId in allEdges){
    allEdges[edgeId].color='rgba(60,60,60,0.6)';
  }
  active=0;

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

  var result_path = [""];
  function propagation(sourceId, targetId) {

    var influencing = [];

    var connectedNodes = network.getConnectedNodes(sourceId);
    for(var x=0; x<edgesDataset.length; x++ ){
      if(edgesDataset.get(x).from==sourceId ){
        influencing.push(allNodes[edgesDataset.get(x).to].id);
      }
    }

    if ((influencing.length==0 && targetIDs.length== 0 ) || (sourceId == targetId && targetIDs.length != 0)) {
      result_path.push(result_path[result_path.length - 1]);
      result_path[result_path.length-2] += sourceId;
      return;
    }
    else{
      result_path[result_path.length - 1] += sourceId + ";";
    }

    for(var son in influencing)
    {
      propagation(influencing[son],targetId);
    } 

    if((influencing.length !=0 && targetIDs.length==0 )|| (sourceId != targetId && targetIDs.length != 0)){
      result_path[result_path.length-1] = result_path[result_path.length-1].substring(0, result_path[result_path.length - 1].substring(0,result_path[result_path.length - 1].length-1).lastIndexOf(';')) + ";";
    }
  }


  function draw_in_all_canvas(){

    var before="";


    propagation(sourceId);
    console.log(result_path);

    var test=[];
    var final_test=[];
    for(var i=0; i<result_path.length-1 ; i++){
      test=result_path[i].split(";"); 
        // console.log(test);
        for(var i2=0; i2<test.length;i2++) {
          test[i2] = +test[i2];
        }
        final_test=final_test.concat(test);
      }
      console.log(final_test);

      if(result_path.length==1){
        alert("no influencing parameters");
      }



      for(var i=0; i<result_path.length-1 ; i++){

        var path=result_path[i].split(";"); 


        if(result_path[i] != ""){

          for(var i2=0; i2<path.length;i2++) {
            path[i2] = +path[i2];
          }

          for(var int in path){


          active=1; //signal flag to unable the highlight function to ease the visualization


          var connectedEdges=network.getConnectedEdges(path[int]);

          // if(before!=""){

            // console.log(before);
            for(var id in connectedEdges)
            {

              if(allEdges[connectedEdges[id]].from == before )
              {


                switch (source_movement){

                  case 1:

                  if(allEdges[connectedEdges[id]].label == "+"){
                    // allEdges[connectedEdges[id]].color = 'rgba(138, 14, 239,1)';
                    allNodes[path[int]].label+=" (+)";
                  }else if (allEdges[connectedEdges[id]].label== "-"){
                    // allEdges[connectedEdges[id]].color = 'rgba(138, 14, 239,0.3)'; 
                    // allNodes[path[int]].color = 'rgba(138, 14, 239,0.3)';
                    allNodes[path[int]].label+=" (-)";

                    // set_a_minus(path[int]);

                  }
                  break;

                  case -1:

                  if(allEdges[connectedEdges[id]].label == "+"){
                    // allEdges[connectedEdges[id]].color = 'rgba(138, 14, 239,0.3)';
                    // allNodes[path[int]].color = 'rgba(138, 14, 239,0.3)';
                    allNodes[path[int]].label+=" (-)";

                    // set_a_minus(path[int]);

                  }else if (allEdges[connectedEdges[id]].label== "-"){
                    // allEdges[connectedEdges[id]].color = 'rgba(138, 14, 239,1)'; 
                    // allNodes[path[int]].color = 'rgba(138, 14, 239,1)';
                    // set_a_plus(path[int]);
                    allNodes[path[int]].label+=" (+)";


                  }
                  break;

                  case 0:
                  allEdges[connectedEdges[id]].color = 'rgba(100,150,25,1)';
                  allNodes[sourceId].color='rgba(100,150,25,1)';
                  allNodes[path[int]].color = 'rgba(100,150,25,1)';
                  break;
                }

              }


            }

          // }
          before=path[int];
          var multi=[];

          for(var id in connectedEdges){

            if(allEdges[connectedEdges[id]].to == path[int] && final_test.includes(allEdges[connectedEdges[id]].from) && multi.includes(connectedEdges[id]) != true){
              multi.push(connectedEdges[id]);
            }
          }
          if(multi.length>=2){
            // console.log(multi);
            for(var edge=1;edge<multi.length;edge++){
              if(allEdges[multi[edge]].label != allEdges[multi[edge-1]].label){
                // allNodes[path[int]].shapeProperties={borderDashes:[5,5], borderWidth:3, color:{border:'#000000'}};
                allNodes[path[int]].color = 'rgba(250,250,0,1)';

              }
            }
          }



        }
      }
    }



    path=[];
    var updateArray = [];
    for (var edgeId in allEdges) {
      updateArray.push(allEdges[edgeId]);
    }
    edgesDataset.update(updateArray);

    var updateArray = [];
    for (nodeId in allNodes) {
      if(final_test.includes(allNodes[nodeId].id)==false){
        if (allNodes[nodeId].hiddenLabel === undefined) {
          allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
          allNodes[nodeId].label = undefined;
        }
        allNodes[nodeId].shape="dot";

      }
      if (allNodes.hasOwnProperty(nodeId)) {
        updateArray.push(allNodes[nodeId]);
      }
    }
    nodesDataset.update(updateArray);
    console.log(allNodes);
  }

  function draw_with_target(){

    var target_movement=0;

    for(var i in targetIDs){

      var multi_toTarget=[];

      result_path=[""];
      propagation(sourceId,targetIDs[i]);
      console.log(result_path);

      if(result_path.length==1){
        allNodes[targetIDs[i]].color='rgba(60,60,60,0.6)';
      }

      if (target_increase.includes(targetIDs[i])){
        target_movement = 1;
      }
      else if (target_decrease.includes(targetIDs[i])){
        target_movement = -1;
      }

      for(var i1=0; i1<result_path.length-1 ; i1++){

        var path=result_path[i1].split(";"); 
        for(var i2=0; i2<path.length;i2++) {
          path[i2] = +path[i2];
        }
        // console.log(path);

        if(result_path[i1] != ";"){
          for(var int in path){

          active=1; //signal flag to unable the highlight function to ease the visualization
          var connectedEdges=network.getConnectedEdges(path[int]);
          for(var id in connectedEdges)
          {
           if(path[int]==targetIDs[i] && path.includes(allEdges[connectedEdges[id]].from) && path.includes(allEdges[connectedEdges[id]].to))
           {

            if(result_path.length>2 && multi_toTarget.includes(connectedEdges[id]) != true){
              multi_toTarget.push(connectedEdges[id]);
              console.log(multi_toTarget);
            }

            switch (source_movement){

              case 1:
              if(allEdges[connectedEdges[id]].label == "+"){
                if(target_movement==1){
                 allNodes[path[int]].color = 'rgba(0,250,0,1)';
                 // set_a_plus(path[int]);
                 console.log("1 "  + path[int]);

               }else if(target_movement==-1){
                 allNodes[path[int]].color = 'rgba(250,0,0,1)';
                 // set_a_minus(path[int]);
                 console.log("2 " + path[int]);

               }
             }else if (allEdges[connectedEdges[id]].label== "-"){

              if(target_movement==1){
               allNodes[path[int]].color = 'rgba(250,0,0,1)';
               // set_a_plus(path[int]);
               console.log("3 " + path[int]);

             }else if(target_movement==-1){
               allNodes[path[int]].color = 'rgba(0,250,0,1)';
               // set_a_minus(path[int]);
               console.log("4 " + path[int]);
             }
           }
           break;

           case -1:

           if(allEdges[connectedEdges[id]].label == "+"){

            if(target_movement==1){
             allNodes[path[int]].color = 'rgba(250,0,0,1)';
             set_a_plus(path[int]);
             console.log("5 " + path[int]);

           }else if(target_movement==-1){
             allNodes[path[int]].color = 'rgba(0,250,0,1)';
             // set_a_minus(path[int]);
             console.log("6 " + path[int]);

           }

         }else if (allEdges[connectedEdges[id]].label== "-"){

          if(target_movement==1 ){
           allNodes[path[int]].color = 'rgba(0,250,0,1)';
           // set_a_plus(path[int]);
           console.log("7 " + path[int]);

         }else if(target_movement==-1){
           allNodes[path[int]].color = 'rgba(250,0,0,1)';
           // set_a_minus(path[int]);
           console.log("8 " + path[int]);

         }
       }
       break;

       case 0:
       console.log("9 " + path[int]);

       break;
     }

   }

 }

}
}
for(var edge=1; edge<multi_toTarget.length;edge++){
  if(allEdges[multi_toTarget[edge]].label != allEdges[multi_toTarget[edge-1]].label){
   allNodes[path[int]].color = 'rgba(250,250,0,1)';
 }

}
}
}
path=[];

var updateArray = [];
for (var edgeId in allEdges) {
  updateArray.push(allEdges[edgeId]);
}
edgesDataset.update(updateArray);


var updateArray = [];
for (var nodeId in allNodes) {
  if (allNodes.hasOwnProperty(nodeId)) {
    updateArray.push(allNodes[nodeId]);
  }
}
nodesDataset.update(updateArray);



}





function openAttributePane(params) {

  attributepane.style.display="block";

  var selectedNode = params.nodes[0];

  var LABEL=document.getElementById('affichageLabel');
  LABEL.innerHTML = 'Label: '+  nodesDataset.get(params.nodes[0]).label  ;

  var DESCRIPTION=document.getElementById('affichageDescription');
  var msg= nodesDataset.get(params.nodes[0]).description;
  msg= msg.replace(/\n/g, "<br />");
  DESCRIPTION.innerHTML = 'Description: '+  msg  ;

  var connectedNodes = network.getConnectedNodes(selectedNode);

  var INFLUENCING=document.getElementById('influencing'); 
  var INFLUENCED=document.getElementById('influenced'); 
  INFLUENCING.innerHTML ="";
  INFLUENCED.innerHTML ="";

  if(connectedNodes.length != 0){
    for(var x=0; x<edgesDataset.length; x++ ){
      if(edgesDataset.get(x).from==params.nodes[0]){

        var ing=document.createElement("div");
        ing.id=edgesDataset.get(x).to;
        ing.innerHTML=allNodes[edgesDataset.get(x).to].label;

        INFLUENCING.appendChild(ing);
        document.getElementById(edgesDataset.get(x).to).onmouseover = function() {
          this.style.fontSize='large';

        };
        document.getElementById(edgesDataset.get(x).to).onmouseout = function() {
          this.style.fontSize='medium';
        };


        ing.onclick=function(){
          neighbourhoodHighlight({nodes:[this.id]});
          openAttributePane({nodes:[this.id]});
          focusNode(this.id);
        };
      }


      if(edgesDataset.get(x).to==params.nodes[0]){
       var ed=document.createElement("div");
       ed.id=edgesDataset.get(x).from;
       ed.innerHTML=allNodes[edgesDataset.get(x).from].label;
       INFLUENCED.appendChild(ed);

       document.getElementById(edgesDataset.get(x).from).onmouseover = function() {
        this.style.textDecoration='underline';
      };
      document.getElementById(edgesDataset.get(x).from).onmouseout = function() {
        this.style.textDecoration='none';
      };

      ed.onclick=function(){
        neighbourhoodHighlight({nodes:[this.id]});
        openAttributePane({nodes:[this.id]});
        focusNode(this.id);/**/

      }
    }


  }
}

}

function closeAttributePane() {
  attributepane.style.display="none";
}

function focusNode(nodeId) {
  // updateValues();
  var options = {
    scale:  0.75,
    offset: {x:0,y:0},
    animation: {
      duration: 200,
    }
  };
  network.focus(nodeId, options);
}

// This function is not well implemented because at the places where the color is set to #268ac9 it should 
// be undefined that means the defaut color maybe a pb of data waiting for  new datafile to test
function neighbourhoodHighlight(params) {

  if (params.nodes.length > 0 && active==0 ) {
    highlightActive = true;
    var i,j;
    var selectedNode = params.nodes[0];
    var degrees = 2;

    for (var nodeId in allNodes) {
      allNodes[nodeId].color = 'rgba(170,170,170,0.6)';
      if (allNodes[nodeId].hiddenLabel === undefined) {
        allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
        allNodes[nodeId].label = undefined;
      }
    }
    var connectedNodes = network.getConnectedNodes(selectedNode);
    var allConnectedNodes = [];

    for (i = 1; i < degrees; i++) {
      for (j = 0; j < connectedNodes.length; j++) {
        allConnectedNodes = allConnectedNodes.concat(network.getConnectedNodes(connectedNodes[j]));
      }
    }


    for (i = 0; i < allConnectedNodes.length; i++) {
      allNodes[allConnectedNodes[i]].color = 'rgba(120,120,120,0.6)';
      if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
        allNodes[allConnectedNodes[i]].label = allNodes[allConnectedNodes[i]].hiddenLabel;
        allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
      }
    }

    for (i = 0; i < connectedNodes.length; i++) {
      allNodes[connectedNodes[i]].color = 'rgba(60,60,60,0.6)';
      if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
        allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
        allNodes[connectedNodes[i]].hiddenLabel = undefined;
      }
    }

    allNodes[selectedNode].color = 'rgba(60,60,60,0.6)';
    if (allNodes[selectedNode].hiddenLabel !== undefined) {
      allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
      allNodes[selectedNode].hiddenLabel = undefined;
    }
  }
  else if (highlightActive === true) {

    for (var nodeId in allNodes) {
      allNodes[nodeId].color = 'rgba(60,60,60,0.6)';
      if (allNodes[nodeId].hiddenLabel !== undefined) {
        allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
        allNodes[nodeId].hiddenLabel = undefined;
      }
    }
    highlightActive = false
  }

  var updateArray = [];
  for (nodeId in allNodes) {
    if (allNodes.hasOwnProperty(nodeId)) {
      updateArray.push(allNodes[nodeId]);
    }
  }
  nodesDataset.update(updateArray);


}

function getExport() {
  var out_data = {
    nodes: data.nodes.get(),
    edges: data.edges.get()
  };

  // Optional: retrieve node positioning data and add to output
  var positions = network.getPositions();
  out_data.nodes.forEach(function(item, index, array) {
    var pos = positions[item.id];
    if (pos !== undefined) {
      array[index].x = pos.x;
      array[index].y = pos.y;
    }
  });

  console.log(out_data.nodes);
  // Save your data to file here
}


function set_as_source(){ 

  neighbourhoodHighlight({nodes:[]});

  if(sourceId == undefined || idselect==sourceId){
    if(allNodes[idselect].shape!="triangle"){
      for(var i in targetIDs)
       if(idselect == targetIDs[i]){
        targetIDs.splice(i,1);
      }

      allNodes[idselect].shape="triangle";
      sourceId  =idselect ;

    }
    else{
      allNodes[idselect].shape="ellipse";
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

    sourceId=idselect;
    allNodes[idselect].shape="triangle";
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
    targetIDs.push(idselect);
  }
  else{
    allNodes[idselect].shape="ellipse";

     // a ameliorer lorsque le programme fera plusieurs chemins vers plusieurs target ++++++++++++
     targetId=[] ;
     for(var i in targetIDs){
      if(targetIDs[i]==idselect){
        targetIDs.splice(i,1);
      }
    }
    console.log(targetIDs);
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   //  for(var nodeId in allNodes){
   //   allNodes[nodeId].color='rgba(60,60,60,0.6)';
   // }
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
 document.getElementById('node-description').value=allNodes[idselect].description;

 document.getElementById('saveButton').onclick = function(){

   allNodes[idselect].label= document.getElementById('node-label').value;
   allNodes[idselect].description=  document.getElementById('node-description').value;

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

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Autocomplete JQUERY  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

$( function() {
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


} );

$(function() {
  $('textarea#node-description').froalaEditor()
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
	    network.disableEditMode();
		network.setOptions(
		{manipulation:{
			initiallyActive :true
		}
		}
		 );
  }
});

function clusterByColor() {
  var classifications = ['Sustainability','Product properties','Product-characteristics'];
  var clusterOptionsByData;
  for (var i = 0; i < classifications.length; i++) {
    var classification = classifications[i];
    console.log(classification);

    clusterOptionsByData = {
      joinCondition: function (childOptions) {
        return childOptions.classification == classification; 
      },
      processProperties: function (clusterOptions, childNodes, childEdges) {
        var totalMass = 0;
        for (var i = 0; i < childNodes.length; i++) {
          totalMass += childNodes[i].mass;
        }
        clusterOptions.mass = totalMass;
        return clusterOptions;
      },
      clusterNodeProperties: {id: 'cluster:' + classification, borderWidth: 3, shape: 'box', classification:classification, label:classification}
    };
    console.log(clusterOptionsByData);
    network.cluster(clusterOptionsByData);
  }
}

function set_a_plus(nodeId) {

  // var nodePosition= new Object;
  // nodePosition[nodeId].x=0;
  // nodePosition[nodeId].y=0;

  // var nodePosition=new Object();
  // nodePosition[nodeId]={x:0,y:0};
  // console.log(nodePosition);

  network.on("afterDrawing", function (ctx) {
    // var comparate=network.getPositions([nodeId]);
    // console.log(comparate);

    // if(nodePosition[nodeId].x != comparate[nodeId].x || nodePosition[nodeId].y != comparate[nodeId].y ){

      var nodePosition = network.getPositions([nodeId]);
    // }
    ctx.fillStyle = '#fff';
    ctx.font = 20 + "px Arial";
    ctx.fillText('+', nodePosition[nodeId].x-6, nodePosition[nodeId].y+4);
    console.log(nodePosition);
    // else{
    //   console.log("oooooook")
    // }
  });
};

function set_a_minus(nodeId) {
  if(highlightActive != true){

    // network.on("dragEnd ",function(){
      network.on("afterDrawing", function (ctx) {
        var nodePosition = network.getPositions([nodeId]);
        ctx.fillStyle = '#fff';
        ctx.font = 20 + "px Tahoma";
        ctx.fillText('-', nodePosition[nodeId].x-6, nodePosition[nodeId].y+4);
      });
    // });
  }
};


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
    parentCentralization: 'enable',
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

document.ondblclick=function(e){
  positionX=e.pageX;
  positionY=e.pageY;
}
}; 
     





