 // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// File that contains all the functions used in the propagation
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 
 var result_path = [""];
 
 // This function find all the path starting from a source node in the graph. If one or more target exist, it finds the path between the source node and the target.
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

 var draw_in_all_canvas_active=0;
 
 // This function allows to draw the propagation in the all graph i.e. when there are no targets. It adds (+), (-) or (?) depending on the evolution of the previous node and the previous edge. 
 // You can also assume the value of a node and the function is called another time with the value fixed for the node selected by the assume value.
 function draw_in_all_canvas(){

  var previousNode;
  var updateArray=[];

 	var before="";
 	draw_in_all_canvas_active=1;

 	propagation(sourceId);

 	var test=[];
 	var final_test=[];
 	for(var i=0; i<result_path.length-1 ; i++){
 		test=result_path[i].split(";"); 
        for(var i2=0; i2<test.length;i2++) {
        	test[i2] = +test[i2];
        }
        final_test=final_test.concat(test);
    }
    console.log(final_test);
    //if(result_path.length==1){
  //  	alert("no influencing parameters");
//    }
active=1;
    for(var i=0; i<result_path.length-1 ; i++){

      var path=result_path[i].split(";"); 

      if(result_path[i] != ""){

        for(var i2=0; i2<path.length;i2++) {
          path[i2] = +path[i2];
        }

         for(var int in path){
               if(path[int] != idselect && idselect != sourceId && allNodes[path[int]].label != undefined){
                if(allNodes[path[int]].label.includes("(?)") || allNodes[path[int]].label.includes("(+)") || allNodes[path[int]].label.includes("(-)")){
                  allNodes[path[int]].label=allNodes[path[int]].label.substring(0,allNodes[path[int]].label.length-4);
                }
            }
          }
        }
      }






    for(var i=0; i<result_path.length-1 ; i++){

    	var path=result_path[i].split(";"); 

    	if(result_path[i] != ""){

    		for(var i2=0; i2<path.length;i2++) {
    			path[i2] = +path[i2];
    		}



          

    		for(var int in path){

          if(path[int] == sourceId){
            if(source_movement ==1){
              previousNode=1;
            }else{
              previousNode=-1;
            }
           }

          var connectedEdges=network.getConnectedEdges(path[int]);




            for(var id in connectedEdges)
            {
                if(allNodes[path[int]].label != undefined){             
                  if((path[int] != idselect && idselect != sourceId  )|| idselect == sourceId){

                    if(allNodes[path[int]].label.includes("(?)") == false){

                	     if(allEdges[connectedEdges[id]].from == before && previousNode != 0)
                  	    {
                         if(allNodes[path[int]].label.includes("(+)") == false && allNodes[path[int]].label.includes("(-)") == false ){

                       	    if(allEdges[connectedEdges[id]].label == "+"){
                               if(previousNode == 1){
                                  allNodes[path[int]].label+=" (+)";
                                  previousNode =1;

                                }else if(previousNode == -1){
                                  allNodes[path[int]].label+=" (-)";
                                  previousNode=-1;
                                }
                          

                          }else if (allEdges[connectedEdges[id]].label== "-"){
                             
                              //console.log("1" + allNodes[path[int]].label);
                             if(previousNode == 1){
                                  allNodes[path[int]].label+=" (-)";
                                  previousNode=-1;
                             }else if(previousNode == -1){
                                  allNodes[path[int]].label+=" (+)";
                                  previousNode=1;
                             }
                            }
                          }else{
                              var label_sign = allNodes[path[int]].label.substring(allNodes[path[int]].label.length-4,allNodes[path[int]].label.length);

                                  if(allEdges[connectedEdges[id]].label == "+"){

                                     if(previousNode == 1){
                                        previousNode =1;

                                      }else if(previousNode == -1){
                                        previousNode=-1;
                                      }                        

                                    }else if (allEdges[connectedEdges[id]].label== "-"){
                                       
                                        //console.log("1" + allNodes[path[int]].label);
                                       if(previousNode == 1){
                                            previousNode=-1;
                                       }else if(previousNode == -1){
                                            previousNode=1;
                                       }
                                      }
                                    if((previousNode == 1 && label_sign == " (-)") || (previousNode == -1 && label_sign == " (+)") ){
                                        allNodes[path[int]].label=allNodes[path[int]].label.substring(0,allNodes[path[int]].label.length-4);
                                        allNodes[path[int]].label+=" (?)";
                                        previousNode = 0; 
                                      }
                              
                              
                            }
                          

             
           }else if(previousNode == 0 && allNodes[path[int]].label.includes("(+)") == false && allNodes[path[int]].label.includes("(-)") == false){
              allNodes[path[int]].label+=" (?)";
           }else if(previousNode == 0){
              allNodes[path[int]].label=allNodes[path[int]].label.substring(0,allNodes[path[int]].label.length-4);
              allNodes[path[int]].label+=" (?)";
           }
         
}
       }else{
                  console.log(assumingValue);
                  if(assumingValue ==-1){
                    previousNode=-1;
                  }else if(assumingValue==1){
                    previousNode=1;
                  }
        }
       
     }
   }

    before=path[int];
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
       console.log(allNodes[nodeId].hiddenLabel);

    }
    allNodes[nodeId].shape="dot";
	allNodes[nodeId].color = 'rgba(170,170,170,0.2)';

  }
  if (allNodes.hasOwnProperty(nodeId)) {
    updateArray.push(allNodes[nodeId]);
  }
}
nodesDataset.update(updateArray);
}

// This function is called if there is at least a target and a source node. It colors the target in green (same evolution), red (opposite evolution) or yellow (undefined)
function draw_with_target(){

	var target_movement=0;
  var previousNode;
  var before;
  var targetTemp = targetIDs;
  console.log(targetIDs);
  var final_test=[];
	for(var i in targetTemp){
 //   console.log(targetIDs);
   // console.log(targetTemp);


		result_path=[""];
		propagation(sourceId,targetIDs[i]);

    if(targetIDs.length == 1){
      var updateArray = [];
      console.log(result_path);
      for(var i1=0; i1<result_path.length-1 ; i1++){

             var path1=result_path[i1].split(";"); 
      
      for(var i2=0; i2<path1.length;i2++) {
        path1[i2] = +path1[i2];
      }
     final_test=final_test.concat(path1);

}       
 console.log(path1);

      for (nodeId in allNodes) {
          if(final_test.includes(allNodes[nodeId].id)==false){
            if (allNodes[nodeId].hiddenLabel === undefined) {
              allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
              allNodes[nodeId].label = undefined;
             }
             allNodes[nodeId].shape="dot";
			 allNodes[nodeId].color = 'rgba(170,170,170,0.2)';
          }else{
            console.log(nodeId);
          }

          if (allNodes.hasOwnProperty(nodeId)) {
               updateArray.push(allNodes[nodeId]);
           }
      }
      nodesDataset.update(updateArray);

    }

		if(result_path.length==1){
			allNodes[targetIDs[i]].color='rgba(60,60,60,0.6)';
		}

     // console.log(target_decrease);
      //console.log(target_increase);

		if (target_increase.includes(targetIDs[i])){
			target_movement = 1;
		}
		else if (target_decrease.includes(targetIDs[i])){
			target_movement = -1;
		}

		for(var i1=0; i1<result_path.length-1 ; i1++){

			var path=result_path[i1].split(";"); 
		  console.log(path);
    	for(var i2=0; i2<path.length;i2++) {
				path[i2] = +path[i2];
			}
      console.log(path);

        if(result_path[i1] != ";"){
           for(var int in path){

            //console.log(allNodes[path[int]].image);

     
                   if(path[int] == sourceId){
                    console.log(source_movement);
                        if(source_movement ==1){
                          previousNode=1;
                        }else{
                          previousNode=-1;
                        }
                      }

          active=1; //signal flag to unable the highlight function to ease the visualization
          var connectedEdges=network.getConnectedEdges(path[int]);
          for(var id in connectedEdges)
          {
            if(allNodes[path[int]].image != "yellow_star_minus.png" || allNodes[path[int]].image != "yellow_star_plus.png"){
                  if(allEdges[connectedEdges[id]].from == before && previousNode != 0)
                    {
                      if(allNodes[path[int]].shape != "image" || allNodes[path[int]].image == "dist/triangle_star_img/grey_star_plus.png" || allNodes[path[int]].image == "dist/triangle_star_img/grey_star_minus.png" || (allNodes[path[int]].shape=="image" && path[int]!=targetTemp[i])){

                        //console.log(allNodes[path[int]].image);
                        //console.log("etoile pas jaune");

                         if(allEdges[connectedEdges[id]].label == "+"){
                               if(previousNode == 1){
                                  previousNode =1;

                               if(target_movement==1 && path[int]==targetTemp[i]){
                                      allNodes[path[int]].shape="image";
                                      allNodes[path[int]].image=DIR + "green_star_plus.png";
                                 }else if(target_movement==-1 && path[int]==targetTemp[i]){
                                      allNodes[path[int]].shape="image";
                                      allNodes[path[int]].image=DIR + "red_star_minus.png";
                                 }

                                }else if(previousNode == -1){
                                  previousNode=-1;
                                   if(target_movement==1 && path[int]==targetTemp[i]){
                                        allNodes[path[int]].shape="image";
                                        allNodes[path[int]].image=DIR + "red_star_plus.png";
                                   }else if(target_movement==-1 && path[int]==targetTemp[i]){
                                        allNodes[path[int]].shape="image";
                                        allNodes[path[int]].image=DIR + "green_star_minus.png";
                                   }
                                }
                          

                          }else if (allEdges[connectedEdges[id]].label== "-"){
                             
                              //console.log("1" + allNodes[path[int]].label);
                             if(previousNode == 1){
                                  previousNode=-1;
                                  if(target_movement==1 && path[int]==targetTemp[i]){
                                        allNodes[path[int]].shape="image";
                                        allNodes[path[int]].image=DIR + "red_star_plus.png";
                                   }else if(target_movement==-1 && path[int]==targetTemp[i]){
                                        allNodes[path[int]].shape="image";
                                        allNodes[path[int]].image=DIR + "green_star_minus.png";
                                   }
                             }else if(previousNode == -1){
                                  previousNode=1;
                                  if(target_movement==1 && path[int]==targetTemp[i]){
                                        allNodes[path[int]].shape="image";
                                        allNodes[path[int]].image=DIR + "green_star_plus.png";
                                   }else if(target_movement==-1 && path[int]==targetTemp[i]){
                                        allNodes[path[int]].shape="image";
                                        allNodes[path[int]].image=DIR + "red_star_minus.png";
                                   }
                             }
                            }
                          }
                         else{

                              var imageFile= allNodes[path[int]].image;
                            //  console.log("test1");
                             if(allEdges[connectedEdges[id]].label == "+"){

                                     if(previousNode == 1){
                                        previousNode =1;

                                      }else if(previousNode == -1){
                                        previousNode=-1;
                                      }                        

                                   }else if (allEdges[connectedEdges[id]].label== "-"){
                                       
                                        //console.log("1" + allNodes[path[int]].label);
                                       if(previousNode == 1){
                                            previousNode=-1;
                                       }else if(previousNode == -1){
                                            previousNode=1;
                                       }
                                     }
                                    if(previousNode == 1 && (imageFile== "dist/triangle_star_img/red_star_plus.png" ||imageFile=="dist/triangle_star_img/green_star_minus.png")|| previousNode == -1  && (imageFile=="dist/triangle_star_img/green_star_plus.png" || imageFile =="dist/triangle_star_img/red_star_minus.png") ){
                                      //  console.log("test2");
                                        previousNode = 0; 
                                        if(target_movement==1 && path[int]==targetTemp[i]){
                                            allNodes[path[int]].shape="image";
                                            allNodes[path[int]].image=DIR + "yellow_star_plus.png";
                                      }else if(target_movement==-1 && path[int]==targetTemp[i]){
                                            allNodes[path[int]].shape="image";
                                            allNodes[path[int]].image=DIR + "yellow_star_minus.png";
                                        }
                                      }

                          }
                      }else if(previousNode ==0){
                         // console.log("test3")
                          if(target_movement==1 && path[int]==targetTemp[i]){
                                allNodes[path[int]].shape="image";
                                allNodes[path[int]].image=DIR + "yellow_star_plus.png";
                            }else if(target_movement==-1 && path[int]==targetTemp[i]){
                                allNodes[path[int]].shape="image";
                                allNodes[path[int]].image=DIR + "yellow_star_minus.png";
                           }
                      }
                    }

             
           }
               before=path[int];

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

// This propagation is the same than above but it’s adapted for the propagation when there is only one target.
 function propagation_starting_target(sourceId) {

  var influenced = [];
  var connectedNodes = network.getConnectedNodes(sourceId);

  for(var x=0; x<edgesDataset.length; x++ ){
    if(edgesDataset.get(x).to==sourceId){
      influenced.push(allNodes[edgesDataset.get(x).from].id);
    }
  }

 if (influenced.length==0) {
    result_path.push(result_path[result_path.length - 1]);
    result_path[result_path.length-2] += sourceId;
    return;
  }
  else{
    result_path[result_path.length - 1] += sourceId + ";";
  }

  for(var son in influenced)
  {
    propagation_starting_target(influenced[son]);
  } 

  if(influenced.length !=0){
    result_path[result_path.length-1] = result_path[result_path.length-1].substring(0, result_path[result_path.length - 1].substring(0,result_path[result_path.length - 1].length-1).lastIndexOf(';')) + ";";
  }
 }

// Use the paths of the previous function to show all the nodes included in this path.
function target_propagation(){
   var previousNode;
  var updateArray=[];

  var before="";
  draw_in_all_canvas_active=1;

  sourceId = targetIDs[0];

  propagation_starting_target(targetIDs[0]);

  var test=[];
  var final_test=[];
  for(var i=0; i<result_path.length-1 ; i++){
    test=result_path[i].split(";"); 
        for(var i2=0; i2<test.length;i2++) {
          test[i2] = +test[i2];
        }
        final_test=final_test.concat(test);
    }
   // console.log(final_test);
    //if(result_path.length==1){
  //    alert("no influencing parameters");
//    }
    active=1;
    for(var i=0; i<result_path.length-1 ; i++){

      var path=result_path[i].split(";"); 

      if(result_path[i] != ""){

        for(var i2=0; i2<path.length;i2++) {
          path[i2] = +path[i2];
        }

         for(var int in path){
               if(path[int] != idselect && idselect != sourceId && allNodes[path[int]].label != undefined){
                if(allNodes[path[int]].label.includes("(?)") || allNodes[path[int]].label.includes("(+)") || allNodes[path[int]].label.includes("(-)")){
                  allNodes[path[int]].label=allNodes[path[int]].label.substring(0,allNodes[path[int]].label.length-4);
                }
            }
          }
        }
      }






    for(var i=0; i<result_path.length-1 ; i++){

      var path=result_path[i].split(";"); 

      if(result_path[i] != ""){

        for(var i2=0; i2<path.length;i2++) {
          path[i2] = +path[i2];
        }



          

        for(var int in path){

          if(path[int] == sourceId){
            if(source_movement ==1){
              previousNode=1;
            }else{
              previousNode=-1;
            }
           }

          var connectedEdges=network.getConnectedEdges(path[int]);




            for(var id in connectedEdges)
            {
                if(allNodes[path[int]].label != undefined){             
                  if((path[int] != idselect && idselect != sourceId  )|| idselect == sourceId){

                    if(allNodes[path[int]].label.includes("(?)") == false){

                       if(allEdges[connectedEdges[id]].to == before && previousNode != 0)
                        {
                         if(allNodes[path[int]].label.includes("(+)") == false && allNodes[path[int]].label.includes("(-)") == false ){

                            if(allEdges[connectedEdges[id]].label == "+"){
                               if(previousNode == 1){
                                  allNodes[path[int]].label+=" (+)";
                                  previousNode =1;

                                }else if(previousNode == -1){
                                  allNodes[path[int]].label+=" (-)";
                                  previousNode=-1;
                                }
                          

                          }else if (allEdges[connectedEdges[id]].label== "-"){
                             
                              //console.log("1" + allNodes[path[int]].label);
                             if(previousNode == 1){
                                  allNodes[path[int]].label+=" (-)";
                                  previousNode=-1;
                             }else if(previousNode == -1){
                                  allNodes[path[int]].label+=" (+)";
                                  previousNode=1;
                             }
                            }
                          }else{
                              var label_sign = allNodes[path[int]].label.substring(allNodes[path[int]].label.length-4,allNodes[path[int]].label.length);

                                  if(allEdges[connectedEdges[id]].label == "+"){

                                     if(previousNode == 1){
                                        previousNode =1;

                                      }else if(previousNode == -1){
                                        previousNode=-1;
                                      }                        

                                    }else if (allEdges[connectedEdges[id]].label== "-"){
                                       
                                        //console.log("1" + allNodes[path[int]].label);
                                       if(previousNode == 1){
                                            previousNode=-1;
                                       }else if(previousNode == -1){
                                            previousNode=1;
                                       }
                                      }
                                    if((previousNode == 1 && label_sign == " (-)") || (previousNode == -1 && label_sign == " (+)") ){
                                        allNodes[path[int]].label=allNodes[path[int]].label.substring(0,allNodes[path[int]].label.length-4);
                                        allNodes[path[int]].label+=" (?)";
                                        previousNode = 0; 
                                      }
                              
                              
                            }
                          

             
           }else if(previousNode == 0 && allNodes[path[int]].label.includes("(+)") == false && allNodes[path[int]].label.includes("(-)") == false){
              allNodes[path[int]].label+=" (?)";
           }else if(previousNode == 0){
              allNodes[path[int]].label=allNodes[path[int]].label.substring(0,allNodes[path[int]].label.length-4);
              allNodes[path[int]].label+=" (?)";
           }
         
}
       }else{
                  console.log(assumingValue);
                  if(assumingValue ==-1){
                    previousNode=-1;
                  }else if(assumingValue==1){
                    previousNode=1;
                  }
        }
       
     }
   }

    before=path[int];
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
      // console.log(allNodes[nodeId].hiddenLabel);

    }
    allNodes[nodeId].shape="dot";
	allNodes[nodeId].color = 'rgba(170,170,170,0.2)';

  }
  if (allNodes.hasOwnProperty(nodeId)) {
    updateArray.push(allNodes[nodeId]);
  }
}
nodesDataset.update(updateArray);
}