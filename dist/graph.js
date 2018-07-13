// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// File that contains the function to draw the scatter graph
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


//This function uses sessionStorage to access the data to plot the graph (tab2).
//The highcharts library is used to draw the scatter graph.
//See the documentation for the different options: https://api.highcharts.com/highcharts/plotOptions.scatter

function Storage(){
	 var items = [];

	 var tab= JSON.parse(sessionStorage.getItem("storage"));

	 for (var i = 0; i <tab.length; i++) {
      items.push({x: tab[i][1], y: tab[i][2], label: tab[i][0] });
     }
  
	
 Highcharts.chart('container', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
	exporting: { enabled: false },
    title: {
        text: 'Design dependencies graph'
    },
   
    xAxis: {
        title: {
            enabled: true,
            text: 'Influencing nodes'
        },
        startOnTick: true,
        endOnTick: true,
		allowDecimals:false,
		min: 0,
        showLastLabel: true
    },
    yAxis: {
		allowDecimals:false,
		min: 0,
        title: {
            text: 'Influenced nodes'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
    }, 
	 plotOptions: {

        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
						     showInLegend: false,               

                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            } ,
             tooltip: {
                headerFormat: '<b>Node(s) :</b><br>',
				//followPointer:true,
				 pointFormat: '{point.label} '
				 
            }  
        }
    },
    series: [{		
     showInLegend: false,               
        color: 'rgba(223, 83, 83, .5)',
	    data: items
    }]
     
	}); 
    }


