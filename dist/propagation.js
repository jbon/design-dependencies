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

 var draw_in_all_canvas_active=0;
 
 function draw_in_all_canvas(){

  var previousNode;

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

    //if(result_path.length==1){
  //  	alert("no influencing parameters");
//    }

    for(var i=0; i<result_path.length-1 ; i++){

    	var path=result_path[i].split(";"); 

    	if(result_path[i] != ""){

    		for(var i2=0; i2<path.length;i2++) {
    			path[i2] = +path[i2];
    		}

    		for(var int in path){

          active=1; //signal flag to unable the highlight function to ease the visualization

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
        }

    before=path[int];
    // var multi=[];
    // var sign="";
    // for(var id in connectedEdges){

    // 	if(allEdges[connectedEdges[id]].to == path[int] && final_test.includes(allEdges[connectedEdges[id]].from) && multi.includes(connectedEdges[id]) != true){
    // 		multi.push(connectedEdges[id]);
    // 	}
    // }

    // console.log(multi);

    // if(multi.length>=2){
    // 	for(var edge=1;edge<multi.length;edge++){
    // 		if(allEdges[multi[edge]].label != allEdges[multi[edge-1]].label){
    //       			sign=" (?)";
    //       			break;

    //       		}else{
    //       			// sign=allNodes[path[int]].label.substring(allNodes[path[int]].label.length-4,allNodes[path[int]].label.length);
    //       		}
    //       	}
    //       }
      }
  }
}
// if(multi.length>=2){
//   allNodes[path[int]].label=allNodes[path[int]].label.substring(0,allNodes[path[int]].label.length-4*(multi.length));
//   allNodes[path[int]].label+=sign;
// }

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
// console.log(allNodes);
}

function draw_with_target(){

	var target_movement=0;
  var previousNode;
  var before;
  var targetTemp = targetIDs;
  console.log(targetIDs);
	for(var i in targetTemp){
 //   console.log(targetIDs);
   // console.log(targetTemp);

		var multi_toTarget=[];

		result_path=[""];
		propagation(sourceId,targetIDs[i]);

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
			for(var i2=0; i2<path.length;i2++) {
				path[i2] = +path[i2];
			}

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
                          //    console.log(allNodes[path[int]].shape);
                          //                      console.log(previousNode);
                        //console.log("etoile pas jaune");

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

//targetTemp.shift();

//for(var edge=1; edge<multi_toTarget.length;edge++){
	//if(allEdges[multi_toTarget[edge]].label != allEdges[multi_toTarget[edge-1]].label){
		//if(allNodes[path[int]].image.includes("plus")){
		//allNodes[path[int]].shape="image";
		//allNodes[path[int]].image=DIR + "yellow_star_plus.png"; 
	//}else if(allNodes[path[int]].image.includes("minus")){
		//allNodes[path[int]].shape="image";
		//allNodes[path[int]].image=DIR + "yellow_star_minus.png"; 
	//}else{
		//console.log("error loading the yellow star image");
	//}
	//}

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

