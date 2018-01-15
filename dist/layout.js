var layout_physical_active=true;
var layout_hierarchical_active=false;

function layout_physical(){  
	if(layout_physical_active != true){
	   document.getElementById("text_scenario").innerHTML="";
	   console.log(typeof $("#text_scenario")[0].innerHTML);

		redrawAll();
	}else if($("#text_scenario")[0].innerHTML.includes("You are already on the") == false){

	  		document.getElementById("text_scenario").innerHTML+="<br>" + "You are already on the physical layout !";
		}
	
}

function layout_hierarchical(){

	if(layout_hierarchical_active==false){
	   document.getElementById("text_scenario").innerHTML="";

		obj = {
			hierarchical: function() {
				network.setOptions({
				    layout: {
				        hierarchical: {
				            levelSeparation: 250,
				            direction: "DU",
				            sortMethod: "directed"
				        }
				    },
				    physics: {
				        hierarchicalRepulsion: {
				            springLength: 170,
				            nodeDistance: 300
				        },
				        timestep: 0.40,
				        stabilization: {
				            enabled: true,
				            iterations: 10000,
				            updateInterval: 30,
				            fit: false
				        }
				    }
				})
			}
		};
		network.stabilize(2000);
		obj.hierarchical();

		network.on("stabilized", function () {
			network.setOptions( { physics: false } );
		});

		layout_physical_active=false;
		layout_hierarchical_active=true;


	}else if($("#text_scenario")[0].innerHTML.includes("You are already on the") == false) {
	  		document.getElementById("text_scenario").innerHTML+="<br>" + "You are already on the hierarchical layout !";
		}
	}
