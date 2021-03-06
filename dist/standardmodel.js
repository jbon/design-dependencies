var nodes= [
{id:0,description:"Effort which needs to be applied in order to seperate two cpmponents in disassembly",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Disassembly effort"},
{id:1,description:"Force which needs to be applied in order to seperate two components",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Required force/energy"},
{id:2,description:"Kind of tools which are necessary to seperate two components in disassembly (from bare hands to welding or a heavy hammer)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Size/complexity of required tool"},
{id:3,description:"Time which is necessary for seperating two cpmponents in disassembly",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Required time"},
{id:4,description:"Measures whether components require the same time for becoming obsolescent due to technology change (different innovation cycles lead to components which need to be exvahnged more often, etc. electronics in manufacturing equipment)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Grouping of components regarding their technology lifetime"},
{id:5,description:"Measures whether components require the same time for becoming obsolescent due to technical reasons (e.g. fatigue, corrosion etc.)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Grouping of components regarding their technical lifetime"},
{id:6,description:"[Measures whether components require the same time for becoming obsolescent not necessarily due to technical reasons (e.g. because of changing perception of aesthetics in fashion etc.)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Grouping of components regarding their value lifetime"},
{id:7,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Accessibility"},
{id:8,description:"Measures the difficulty of assembling components together",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Assembly Difficulty"},
{id:9,description:"Measures the required tool for assembling two components (from assembly by hand to large assembly machines)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Tool size/complexity"},
{id:10,description:"Measure for the complexity of assembling two components (e.g. if it is constrained by several connection points)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Contact complexity"},
{id:11,description:"Measures the degree of information excahnge between two components",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Architecture - Information-type interaction factor"},
{id:12,description:"Measures the exchange of materials between components",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Architecture - Substance-type interaction factor"},
{id:13,description:"Measures whether components need to be allocated adjacent to each other (e.g. to enable a certain function)..",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Spatial-type interaction factor"},
{id:14,description:"Measures whether energy transfer is necessary between components",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Architecture -  Energy-type interaction factor"},
{id:15,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Architecture - Transitive dependancy"},
{id:16,description:"Measures the degree to which components require the same time for becoming obsolescent or not",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Grouping of components regarding their lifetime"},
{id:17,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Design reusability by simplifIied interfaces"},
{id:18,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Degree of Interface standardization"},
{id:19,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Coupling between components"},
{id:20,description:"Increase efficiency of assembly by clustering together components with same principles of assembly",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Grouping per assembly process"},
{id:21,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Grouping of components with same material to modules"},
{id:22,description:"Solid, liquid & gaseous emissions along the product lifecycle, utilization of renewable &  non-renewable resources",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Emissions"},
{id:23,description:"Increase coherence of product properties to customer requirements",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Customer value"},
{id:24,description:"Life Cycle costs refer to all costs which occur during product-lifetime. They can be allocated to multiple stakeholders (e.g. producing company, consumer, recycling company etc.)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Life Cycle Costs"},
{id:25,description:"Mass Customization refers to products which can be customized to users preferences without loosing advantages of mass production, e.g. cost reduction via economies of scale. Examples: Dell computers, car market etc.",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Mass Customization"},
{id:26,description:"Indicates the effort for disassembling a product which is determined by the amount and type of component-interfaces.",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Disassembility"},
{id:27,description:"Describes the effort for sorting components with homogenous properties for post-processing in the End-of life phase",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Sorting complexity"},
{id:28,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Material recyclability"},
{id:29,description:"Service time of materials",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Temporal extension of material-usage"},
{id:30,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Maintenance"},
{id:31,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Testability"},
{id:32,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Reuse"},
{id:33,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Remanufacturing"},
{id:34,description:"Temporal extension of product/part usage",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Service timeof product/parts"},
{id:35,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Upgradeability (flexibility in use)"},
{id:36,description:"If a component needs to be changed several other components might be affected. The ease of a design change therefore refers to the amount and complexity of subsequent changes.",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Ease of design changes"},
{id:37,description:"Increase of experience with time & output leads to better prouct quality",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Learning curve"},
{id:38,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Purchase costs"},
{id:39,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Decrease Development time"},
{id:40,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Production costs"},
{id:41,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Development costs"},
{id:42,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Economies of scope"},
{id:43,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Cost for Company"},
{id:44,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Economies of scale"},
{id:45,description:"Costs which occur in the End-of life phase of the product for recycling, remanufacturing, incineration etc.",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Retirement costs"},
{id:46,description:"Costs which occur for routine-inspections or repair incidents during the use phase of the product",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Maintenance costs"},
{id:47,description:"Costs which can be directly allocated to disassembly (e.g. wages, tools)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Disassembly costs"},
{id:48,description:"Costs which occur within product assembly (e.g. wages, machines etc.)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Assembly costs"},
{id:49,description:"Limits inventory cost by keeping stock of final products minimal. The idea is to keep a higher stock of components which can be used for several products and to finalize them when the actual demand is known. E.g. Benetton keeps white sweaters and dyes them when the season-colour demand is known.",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Delayed differenciation"},
{id:50,description:"Costs which occur for holding inventory (e.g. opportunity costs, obsolescence, theft etc.)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Inventory costs"},
{id:51,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Forecasting errors"},
{id:52,description:"Increase utilization of equipment, e.g. mashines for enabling economies of scale",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Increased equipment intensity"},
{id:53,description:"Parallelization of design-tasks (e.g. parallel design of different components)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Ease of concurrent engineering"},
{id:54,description:"Internal variety describes the amount of parts which is necessary to realize the product configurations offered to the customer",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Internal Variety"},
{id:55,description:"External variety refers to the multitude of product configurations which can be offered to the customer",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"External Variety"},
{id:56,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Meeting individual Customer Requirements"},
{id:57,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Black box engineering"},
{id:58,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Grouping of components  per maintenance frequency"},
{id:59,description:"Increase coherence of product properties to customer requirements",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Overall product sustainability"},
{id:60,description:"Increase coherence of product properties to customer requirements",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Product quality"},
{id:61,description:"Increase coherence of product properties to customer requirements",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Product function"},
{id:62,description:"Solid, liquid & gaseous emissions along the product lifecycle, utilization of renewable &  non-renewable resources",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Specific lifecycle emissions"},
{id:63,description:"Solid, liquid & gaseous emissions along the product lifecycle, utilization of renewable &  non-renewable resources",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Amount of produced goods/materials"},
{id:64,description:"Solid, liquid & gaseous emissions along the product lifecycle, utilization of renewable &  non-renewable resources",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Emissions in production"},
{id:65,description:"Solid, liquid & gaseous emissions along the product lifecycle, utilization of renewable &  non-renewable resources",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Emissions in End of life"},
{id:66,description:"Solid, liquid & gaseous emissions along the product lifecycle, utilization of renewable &  non-renewable resources",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Emissions in manufacturing"},
{id:67,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Grouping of components with same functions to modules"},
{id:68,description:"Costs which occur in the End-of life phase of the product for recycling, remanufacturing, incineration etc",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Costs in product use"},
{id:69,label:"Efficiency of electric motor",description:"<br>",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:70,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Solvability of joinings"},
{id:71,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Interface Simplicity"},
{id:72,description:"Increase coherence of product properties to customer requirements",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Energy consumption in material production"},
{id:73,description:"Increase coherence of product properties to customer requirements",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Energy consumption in the usage phase"},
{id:74,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Accessability of components"},
{id:75,description:"Kind of tools which are necessary to seperate two components in disassembly (from bare hands to welding or a heavy hammer)",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Disassemblibility without damage"},
{id:76,description:"Effort which needs to be applied in order to seperate two cpmponents in disassembly",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Reuse potential for disassembled components"},
{id:77,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Complexity of contact"},
{id:78,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Tightness of contact"},
{id:79,label:"Air conduction",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:80,label:"Number of cooling fins",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:81,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Stator radius"},
{id:82,label:"Engineering tolerance (Rotor/Motor)",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:83,label:"Number of pole pairs",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:84,label:"Cross section of electrical conductor",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:85,label:"Number of windings",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},"image":"dist/triangle_star_img/grey_triangle_plus.png"},
{id:86,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Number of brushes"},
{id:87,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Material density"},
{id:88,label:"Weight",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:89,label:"Friction",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:90,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Wear"},
{id:91,label:"Magnetic excitation",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:92,label:"Flux density",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:93,label:"Winding temperature",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:94,label:"Heat losses",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:95,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Friction area"},
{id:96,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Torque"},
{id:97,label:"Power frequency",description:"rise the frequency--&gt;motor will speed up",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:98,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Brushes Material electrical resistance"},
{id:99,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Electrical resistance"},
{id:100,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Electrical energy consumed"},
{id:101,label:"Electric current",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:102,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Voltage"},
{id:103,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Winding lengh"},
{id:104,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Magnet Ferrite content"},
{id:105,label:"Permability",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:106,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Product Safety and Health Impact"},
{id:107,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Logistic Costs"},
{id:108,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Product Reliability"},
{id:109,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Health in usage"},
{id:110,label:"Rotational speed",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:111,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Structrual robustness"},
{id:112,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Lifespan"},
{id:113,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Working time of the machine"},
{id:114,label:"Noise level",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},"image":"dist/triangle_star_img/grey_triangle_minus.png"},
{id:115,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Use of copper"},
{id:116,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Electrical power"},
{id:117,label:"Losses",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:118,label:"Resistance losses",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:119,label:"Magnetization losses",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"}},
{id:120,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Magnetic Domain Energy"},
{id:121,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Number of magnetic domains of magnet material"},
{id:122,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:["Electric Motor"],font:{color:"#ffffff"},label:"Friction in the bearings"},
{id:123,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Emissions in use"},
{id:124,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Ressource Consumption"},
{id:125,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Energy Use and Efficiency"},
{id:126,description:"Increase coherence of product properties to customer requirements",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Product quality in use"},
{id:127,description:"Increase coherence of product properties to customer requirements",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Product quality in production"},
{id:128,description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"},label:"Volume"},
{id:129,label:"Material Use",description:"",shape:"ellipse",color:"rgba(60,60,60,0.6)",tags:[],font:{color:"#ffffff"}}

];



var edges = [

{id:0,to:0,from:3,label:"+",color:"rgba(60,60,60,0.6)"},
{id:1,to:0,from:2,label:"-",color:"rgba(60,60,60,0.6)"},
{id:2,to:0,from:1,label:"+",color:"rgba(60,60,60,0.6)"},
{id:3,to:16,from:5,label:"+",color:"rgba(60,60,60,0.6)"},
{id:4,to:16,from:6,label:"+",color:"rgba(60,60,60,0.6)"},
{id:5,to:8,from:7,label:"-",color:"rgba(60,60,60,0.6)"},
{id:6,to:8,from:9,label:"+",color:"rgba(60,60,60,0.6)"},
{id:7,to:8,from:10,label:"+",color:"rgba(60,60,60,0.6)"},
{id:8,to:28,from:26,label:"-",color:"rgba(60,60,60,0.6)"},
{id:9,to:28,from:27,label:"-",color:"rgba(60,60,60,0.6)"},
{id:10,to:29,from:28,label:"+",color:"rgba(60,60,60,0.6)"},
{id:11,to:30,from:31,label:"+",color:"rgba(60,60,60,0.6)"},
{id:12,to:32,from:31,label:"+",color:"rgba(60,60,60,0.6)"},
{id:13,to:33,from:31,label:"+",color:"rgba(60,60,60,0.6)"},
{id:14,to:34,from:33,label:"+",color:"rgba(60,60,60,0.6)"},
{id:15,to:34,from:32,label:"+",color:"rgba(60,60,60,0.6)"},
{id:16,to:34,from:30,label:"+",color:"rgba(60,60,60,0.6)"},
{id:17,to:34,from:35,label:"-",color:"rgba(60,60,60,0.6)"},
{id:18,to:40,from:44,label:"+",color:"rgba(60,60,60,0.6)"},
{id:19,to:41,from:42,label:"+",color:"rgba(60,60,60,0.6)"},
{id:20,to:25,from:55,label:"+",color:"rgba(60,60,60,0.6)"},
{id:21,to:25,from:54,label:"-",color:"rgba(60,60,60,0.6)"},
{id:22,to:56,from:55,label:"+",color:"rgba(60,60,60,0.6)"},
{id:23,to:24,from:43,label:"+",color:"rgba(60,60,60,0.6)"},
{id:24,to:43,from:40,label:"+",color:"rgba(60,60,60,0.6)"},
{id:25,to:43,from:41,label:"+",color:"rgba(60,60,60,0.6)"},
{id:26,to:41,from:44,label:"+",color:"rgba(60,60,60,0.6)"},
{id:27,to:40,from:42,label:"+",color:"rgba(60,60,60,0.6)"},
{id:28,to:42,from:54,label:"+",color:"rgba(60,60,60,0.6)"},
{id:29,to:44,from:54,label:"-",color:"rgba(60,60,60,0.6)"},
{id:30,to:39,from:54,label:"-",color:"rgba(60,60,60,0.6)"},
{id:31,to:37,from:54,label:"-",color:"rgba(60,60,60,0.6)"},
{id:32,to:40,from:38,label:"+",color:"rgba(60,60,60,0.6)"},
{id:33,to:40,from:48,label:"+",color:"rgba(60,60,60,0.6)"},
{id:34,to:50,from:49,label:"+",color:"rgba(60,60,60,0.6)"},
{id:35,to:40,from:50,label:"+",color:"rgba(60,60,60,0.6)"},
{id:36,to:51,from:54,label:"-",color:"rgba(60,60,60,0.6)"},
{id:37,to:40,from:51,label:"+",color:"rgba(60,60,60,0.6)"},
{id:38,to:52,from:54,label:"-",color:"rgba(60,60,60,0.6)"},
{id:39,to:40,from:52,label:"-",color:"rgba(60,60,60,0.6)"},
{id:40,to:24,from:45,label:"+",color:"rgba(60,60,60,0.6)"},
{id:41,to:45,from:47,label:"+",color:"rgba(60,60,60,0.6)"},
{id:42,to:46,from:47,label:"+",color:"rgba(60,60,60,0.6)"},
{id:43,to:38,from:57,label:"+",color:"rgba(60,60,60,0.6)"},
{id:44,to:49,from:54,label:"+",color:"rgba(60,60,60,0.6)"},
{id:45,to:48,from:20,label:"-",color:"rgba(60,60,60,0.6)"},
{id:46,to:54,from:17,label:"-",color:"rgba(60,60,60,0.6)"},
{id:47,to:36,from:18,label:"-",color:"rgba(60,60,60,0.6)"},
{id:48,to:36,from:17,label:"+",color:"rgba(60,60,60,0.6)"},
{id:49,to:36,from:19,label:"+",color:"rgba(60,60,60,0.6)"},
{id:50,to:36,from:67,label:"+",color:"rgba(60,60,60,0.6)"},
{id:51,to:55,from:67,label:"+",color:"rgba(60,60,60,0.6)"},
{id:52,to:27,from:21,label:"+",color:"rgba(60,60,60,0.6)"},
{id:53,to:31,from:58,label:"+",color:"rgba(60,60,60,0.6)"},
{id:54,to:31,from:67,label:"+",color:"rgba(60,60,60,0.6)"},
{id:55,to:35,from:67,label:"+",color:"rgba(60,60,60,0.6)"},
{id:56,to:35,from:18,label:"+",color:"rgba(60,60,60,0.6)"},
{id:57,to:53,from:19,label:"-",color:"rgba(60,60,60,0.6)"},
{id:58,to:53,from:17,label:"+",color:"rgba(60,60,60,0.6)"},
{id:59,to:53,from:19,label:"-",color:"rgba(60,60,60,0.6)"},
{id:60,to:53,from:18,label:"-",color:"rgba(60,60,60,0.6)"},
{id:61,to:53,from:67,label:"+",color:"rgba(60,60,60,0.6)"},
{id:62,to:41,from:25,label:"+",color:"rgba(60,60,60,0.6)"},
{id:63,to:40,from:25,label:"+",color:"rgba(60,60,60,0.6)"},
{id:64,to:39,from:36,label:"+",color:"rgba(60,60,60,0.6)"},
{id:65,to:39,from:53,label:"+",color:"rgba(60,60,60,0.6)"},
{id:66,to:41,from:39,label:"+",color:"rgba(60,60,60,0.6)"},
{id:67,to:54,from:18,label:"-",color:"rgba(60,60,60,0.6)"},
{id:68,to:33,from:26,label:"+",color:"rgba(60,60,60,0.6)"},
{id:69,to:30,from:26,label:"+",color:"rgba(60,60,60,0.6)"},
{id:70,to:32,from:26,label:"+",color:"rgba(60,60,60,0.6)"},
{id:71,to:32,from:27,label:"-",color:"rgba(60,60,60,0.6)"},
{id:72,to:33,from:27,label:"+",color:"rgba(60,60,60,0.6)"},
{id:73,to:16,from:4,label:"+",color:"rgba(60,60,60,0.6)"},
{id:74,to:46,from:58,label:"-",color:"rgba(60,60,60,0.6)"},
{id:75,to:59,from:23,label:"+",color:"rgba(60,60,60,0.6)"},
{id:76,to:59,from:24,label:"-",color:"rgba(60,60,60,0.6)"},
{id:77,to:59,from:22,label:"-",color:"rgba(60,60,60,0.6)"},
{id:78,to:23,from:60,label:"+",color:"rgba(60,60,60,0.6)"},
{id:79,to:127,from:37,label:"+",color:"rgba(60,60,60,0.6)"},
{id:80,to:61,from:56,label:"-",color:"rgba(60,60,60,0.6)"},
{id:81,to:22,from:63,label:"+",color:"rgba(60,60,60,0.6)"},
{id:82,to:22,from:62,label:"+",color:"rgba(60,60,60,0.6)"},
{id:83,to:63,from:34,label:"+",color:"rgba(60,60,60,0.6)"},
{id:84,to:63,from:29,label:"+",color:"rgba(60,60,60,0.6)"},
{id:85,to:62,from:65,label:"+",color:"rgba(60,60,60,0.6)"},
{id:86,to:62,from:64,label:"-",color:"rgba(60,60,60,0.6)"},
{id:87,to:64,from:66,label:"+",color:"rgba(60,60,60,0.6)"},
{id:88,to:19,from:11,label:"+",color:"rgba(60,60,60,0.6)"},
{id:89,to:19,from:12,label:"+",color:"rgba(60,60,60,0.6)"},
{id:90,to:19,from:14,label:"+",color:"rgba(60,60,60,0.6)"},
{id:91,to:19,from:13,label:"+",color:"rgba(60,60,60,0.6)"},
{id:92,to:19,from:15,label:"+",color:"rgba(60,60,60,0.6)"},
{id:93,to:48,from:8,label:"+",color:"rgba(60,60,60,0.6)"},
{id:94,to:24,from:68,label:"+",color:"rgba(60,60,60,0.6)"},
{id:95,to:68,from:46,label:"+",color:"rgba(60,60,60,0.6)"},
{id:96,to:1,from:70,label:"-",color:"rgba(60,60,60,0.6)"},
{id:97,to:2,from:70,label:"+",color:"rgba(60,60,60,0.6)"},
{id:98,to:3,from:70,label:"+",color:"rgba(60,60,60,0.6)"},
{id:99,to:17,from:71,label:"+",color:"rgba(60,60,60,0.6)"},
{id:100,to:27,from:16,label:"-",color:"rgba(60,60,60,0.6)"},
{id:101,to:47,from:26,label:"+",color:"rgba(60,60,60,0.6)"},
{id:102,to:64,from:72,label:"+",color:"rgba(60,60,60,0.6)"},
{id:103,to:73,from:69,label:"+",color:"rgba(60,60,60,0.6)"},
{id:104,to:73,from:88,label:"+",color:"rgba(60,60,60,0.6)"},
{id:105,to:68,from:73,label:"+",color:"rgba(60,60,60,0.6)"},
{id:106,to:3,from:74,label:"-",color:"rgba(60,60,60,0.6)"},
{id:107,to:76,from:75,label:"+",color:"rgba(60,60,60,0.6)"},
{id:108,to:26,from:3,label:"-",color:"rgba(60,60,60,0.6)"},
{id:109,to:26,from:76,label:"-",color:"rgba(60,60,60,0.6)"},
{id:110,to:75,from:70,label:"+",color:"rgba(60,60,60,0.6)"},
{id:111,to:70,from:78,label:"-",color:"rgba(60,60,60,0.6)"},
{id:112,to:70,from:77,label:"-",color:"rgba(60,60,60,0.6)"},
{id:113,to:31,from:75,label:"+",color:"rgba(60,60,60,0.6)"},
{id:114,to:35,from:75,label:"+",color:"rgba(60,60,60,0.6)"},
{id:115,to:79,from:82,label:"+",color:"rgba(60,60,60,0.6)"},
{id:116,to:88,from:87,label:"-",color:"rgba(60,60,60,0.6)"},
{id:117,to:89,from:98,label:"+",color:"rgba(60,60,60,0.6)"},
{id:118,to:90,from:89,label:"+",color:"rgba(60,60,60,0.6)"},
{id:119,to:90,from:113,label:"+",color:"rgba(60,60,60,0.6)"},
{id:120,to:91,from:84,label:"-",color:"rgba(60,60,60,0.6)"},
{id:121,to:91,from:92,label:"+",color:"rgba(60,60,60,0.6)"},
{id:122,to:91,from:85,label:"+",color:"rgba(60,60,60,0.6)"},
{id:123,to:91,from:105,label:"+",color:"rgba(60,60,60,0.6)"},
{id:124,to:91,from:79,label:"+",color:"rgba(60,60,60,0.6)"},
{id:125,to:92,from:85,label:"+",color:"rgba(60,60,60,0.6)"},
{id:126,to:92,from:84,label:"+",color:"rgba(60,60,60,0.6)"},
{id:127,to:93,from:85,label:"+",color:"rgba(60,60,60,0.6)"},
{id:128,to:94,from:91,label:"-",color:"rgba(60,60,60,0.6)"},
{id:129,to:94,from:80,label:"-",color:"rgba(60,60,60,0.6)"},
{id:130,to:94,from:79,label:"+",color:"rgba(60,60,60,0.6)"},
{id:131,to:94,from:93,label:"+",color:"rgba(60,60,60,0.6)"},
{id:132,to:96,from:81,label:"+",color:"rgba(60,60,60,0.6)"},
{id:133,to:96,from:88,label:"+",color:"rgba(60,60,60,0.6)"},
{id:134,to:96,from:97,label:"+",color:"rgba(60,60,60,0.6)"},
{id:135,to:99,from:98,label:"+",color:"rgba(60,60,60,0.6)"},
{id:136,to:99,from:84,label:"-",color:"rgba(60,60,60,0.6)"},
{id:137,to:99,from:85,label:"+",color:"rgba(60,60,60,0.6)"},
{id:138,to:100,from:116,label:"-",color:"rgba(60,60,60,0.6)"},
{id:139,to:103,from:85,label:"+",color:"rgba(60,60,60,0.6)"},
{id:140,to:105,from:104,label:"+",color:"rgba(60,60,60,0.6)"},
{id:141,to:106,from:109,label:"+",color:"rgba(60,60,60,0.6)"},
{id:142,to:107,from:88,label:"+",color:"rgba(60,60,60,0.6)"},
{id:143,to:108,from:112,label:"+",color:"rgba(60,60,60,0.6)"},
{id:144,to:110,from:91,label:"-",color:"rgba(60,60,60,0.6)"},
{id:145,to:110,from:94,label:"-",color:"rgba(60,60,60,0.6)"},
{id:146,to:110,from:88,label:"+",color:"rgba(60,60,60,0.6)"},
{id:147,to:110,from:97,label:"+",color:"rgba(60,60,60,0.6)"},
{id:148,to:110,from:83,label:"+",color:"rgba(60,60,60,0.6)"},
{id:149,to:111,from:88,label:"+",color:"rgba(60,60,60,0.6)"},
{id:150,to:112,from:111,label:"+",color:"rgba(60,60,60,0.6)"},
{id:151,to:112,from:90,label:"+",color:"rgba(60,60,60,0.6)"},
{id:152,to:114,from:110,label:"-",color:"rgba(60,60,60,0.6)"},
{id:153,to:115,from:85,label:"+",color:"rgba(60,60,60,0.6)"},
{id:154,to:116,from:101,label:"+",color:"rgba(60,60,60,0.6)"},
{id:155,to:116,from:102,label:"+",color:"rgba(60,60,60,0.6)"},
{id:156,to:117,from:94,label:"+",color:"rgba(60,60,60,0.6)"},
{id:157,to:117,from:118,label:"+",color:"rgba(60,60,60,0.6)"},
{id:158,to:118,from:99,label:"+",color:"rgba(60,60,60,0.6)"},
{id:159,to:117,from:119,label:"+",color:"rgba(60,60,60,0.6)"},
{id:160,to:119,from:120,label:"+",color:"rgba(60,60,60,0.6)"},
{id:161,to:120,from:121,label:"+",color:"rgba(60,60,60,0.6)"},
{id:162,to:117,from:89,label:"-",color:"rgba(60,60,60,0.6)"},
{id:163,to:89,from:122,label:"-",color:"rgba(60,60,60,0.6)"},
{id:164,to:89,from:86,label:"+",color:"rgba(60,60,60,0.6)"},
{id:165,to:86,from:95,label:"+",color:"rgba(60,60,60,0.6)"},
{id:166,to:69,from:117,label:"+",color:"rgba(60,60,60,0.6)"},
{id:167,to:69,from:100,label:"+",color:"rgba(60,60,60,0.6)"},
{id:168,to:102,from:96,label:"+",color:"rgba(60,60,60,0.6)"},
{id:169,to:101,from:110,label:"+",color:"rgba(60,60,60,0.6)"},
{id:170,to:62,from:123,label:"-",color:"rgba(60,60,60,0.6)"},
{id:171,to:124,from:125,label:"+",color:"rgba(60,60,60,0.6)"},
{id:172,to:59,from:124,label:"-",color:"rgba(60,60,60,0.6)"},
{id:173,to:125,from:73,label:"-",color:"rgba(60,60,60,0.6)"},
{id:174,to:125,from:72,label:"+",color:"rgba(60,60,60,0.6)"},
{id:175,to:109,from:114,label:"+",color:"rgba(60,60,60,0.6)"},
{id:176,to:59,from:106,label:"+",color:"rgba(60,60,60,0.6)"},
{id:177,to:126,from:108,label:"+",color:"rgba(60,60,60,0.6)"},
{id:178,to:126,from:114,label:"+",color:"rgba(60,60,60,0.6)"},
{id:179,to:60,from:127,label:"+",color:"rgba(60,60,60,0.6)"},
{id:180,to:60,from:126,label:"+",color:"rgba(60,60,60,0.6)"},
{id:181,to:126,from:61,label:"-",color:"rgba(60,60,60,0.6)"},
{id:182,to:46,from:112,label:"-",color:"rgba(60,60,60,0.6)"},
{id:183,to:61,from:116,label:"-",color:"rgba(60,60,60,0.6)"},
{id:184,to:72,from:88,label:"+",color:"rgba(60,60,60,0.6)"},
{id:185,to:43,from:107,label:"+",color:"rgba(60,60,60,0.6)"},
{id:186,to:123,from:73,label:"-",color:"rgba(60,60,60,0.6)"},
{id:187,to:65,from:1,label:"+",color:"rgba(60,60,60,0.6)"},
{id:188,to:88,from:128,label:"-",color:"rgba(60,60,60,0.6)"},
{id:189,to:99,from:103,label:"+",color:"rgba(60,60,60,0.6)"},
{id:190,from:67,to:54,label:"-",color:"rgba(60,60,60,0.6)"},
{id:191,from:129,to:124,label:"+",color:"rgba(60,60,60,0.6)"},
{id:192,from:115,to:129,label:"-",color:"rgba(60,60,60,0.6)"},
{id:193,from:115,to:40,label:"+",color:"rgba(60,60,60,0.6)"},
{id:194,from:88,to:129,label:"+",color:"rgba(60,60,60,0.6)"},
{id:195,from:34,to:129,label:"-",color:"rgba(60,60,60,0.6)"},
{id:196,from:29,to:129,label:"-",color:"rgba(60,60,60,0.6)"}

];






































































