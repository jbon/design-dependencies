var layout_physical_active=true;
var layout_hierarchical_active=false;

function layout_physical(){  
	if(layout_physical_active != true){
		redrawAll();
		layout_physical_active=true;
		layout_hierarchical_active=false;
	}else{
		alert("you are already on the physical layout");
	}
}

function layout_hierarchical(){

if(layout_hierarchical_active==false){
	obj = {
		hierarchical: function() {
			network.setOptions({
				layout: {
					hierarchical: {
						enabled: true,
						levelSeparation: 300,
						nodeSpacing: 300,
						// treeSpacing:200,
						// blockShifting:true,
						// edgeMinimization:true,
						// parentCentralization: true,
						direction: "UD",
						sortMethod: "directed"
					}
				},
				physics:{
					enabled: true,

					hierarchicalRepulsion: {
						nodeDistance :300,
						centralGravity:0.0,
						springLength:200,
						springConstant: 0.01,
						damping: 0.09
					}, 
					maxVelocity: 50,
					minVelocity: 0.1,
					solver: 'hierarchicalRepulsion',
					timestep: 0.9,
					stabilization: {
						enabled:true,
						iterations:1000
					}

				}
			})
		}
	};
	network.stabilize(2000);
	obj.hierarchical();
		// redrawAll();
		// network = new vis.Network(container, data, options);  

		network.on("stabilized", function () {
			// console.log("stabilization");
			network.setOptions( { physics: false } );
		});

		layout_physical_active=false;
		layout_hierarchical_active=true;
	}else{
		alert("you are already on the hierarchical layout");
	}
	}
