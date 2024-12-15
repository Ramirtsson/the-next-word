var width=490;
var height=735;
if (window.innerWidth>window.innerHeight) {
	width=735;
	height=490;
}

let mid_w=width/2;
let mid_h=height/2;
let mid_w_q=mid_w/2;
let base_cols=3;
let base_rows=3;
var firstTime=true;

if (width>height) {
	var default_scale=.3;
}else{
	var default_scale=.2;
}



let basic_padding=20;//padding para evitar que los elementos toquen las orillas;
let col_size=(width-(basic_padding*base_cols))/base_cols;
let cols=[];
let base_sum=0;

for (var i = 0; i < base_cols; i++) {
	base_sum+=basic_padding+(col_size)
	cols.push(base_sum);
}



//profile vars
let money=0;
let name=0;
let globalScore=0;


//gameElemetns
let btn_money=undefined;//para cambiar el texto de este boton usar btn_money.objText.text="nuevo texto";


let originScreen=[];//se usa para que el boton de regresar sepa a que escena ir; Revisar elements->showBtnReturn



// 
var exampleGameConfig={"generalSettings":{"resolution":{"height": 640,"width": 450,"fullscreen": false},"sound":{"volume":50},"gameplay":{"language": "en"}},
"configurationGame":[{"challenges":[{"title":"moreLetters","dificulty":"normal","description":"algo pro"}],
"categoryGames": [
	{
	"category":"Letters","image":"mode_icon_1","status":true,"description":"",
	"subCategories":[
	{"title": "Animals","image":"icon_animals","config":[{"fullWord":true,"difficulty":"easy","timeRemaining":30,"random":false,"bonusWord":5,"point":1,"cursedWord":1}],"words": ["DOG","HORSE","CHICKEN","FOX","RACCOON","AXOLOTL","RAT"],"findDifference":["CHICKEN","DOG","HORSE","RACCOON","FOX","RAT","AXOLOTL"],"status": true},
	{"title": "Planets","image":"icon_planets","config":[{"fullWord":false,"difficulty":"hard","timeRemaining":30,"random":false,"bonusWord":5,"point":1,"cursedWord":1}],"words": ["MERCURY","VENUS","EARTH","MARS","JUPITER","SATURN","URANUS","NEPTUNE"],"status": true},
	{"title": "Forms","image":"icon_figures","config":[{"fullWord":false,"difficulty":"hard","timeRemaining":30,"random":false,"bonusWord":5,"point":1,"cursedWord":1}],"words": ["CIRCLE","SQUARE","RECTANGULE","OVAL","PENTAGON","DIAMOND","HEXAGON","HEPTAGON","OCTAGON","STAR","CUBE","CYLINDER","CONE","PYRAMID"],"status": true},
	{"title": "Fruits","image":"icon_fruits","config":[{"fullWord":false,"difficulty":"normal","timeRemaining":30,"random":false,"bonusWord":5,"point":1,"cursedWord":1}],"words": ["APPLE","BANANA","ORANGE","GRAPE","STRAWBERRY","PINEAPPLE","WATERMELON","MANGO","BLUEBERRY","PEAR","CHERRY","LEMON","KIWI","COCONUT"],"status": true},
	{"title": "Weather","image":"icon_weather","config":[{"fullWord":false,"difficulty":"normal","timeRemaining":30,"random":false,"bonusWord":5,"point":1,"cursedWord":1}],"words": ["SUNNY","CLOUDY","RAINY","SNOWY","WINDY","STORMY","FOGGY","HUMID","DRY","COLD","ICY","DRIZZLY","OVERCAST"],"status": true},
	{"title": "Weather1","image":"icon_fruits","config":[{"fullWord":false,"difficulty":"normal","timeRemaining":30,"random":false,"bonusWord":5,"point":1,"cursedWord":1}],"words": ["SUNNY","CLOUDY","RAINY","SNOWY","WINDY","STORMY","FOGGY","HUMID","DRY","COLD","ICY","DRIZZLY","OVERCAST"],"status": true},
	{"title": "Weather2","image":"icon_figures","config":[{"fullWord":false,"difficulty":"normal","timeRemaining":30,"random":false,"bonusWord":5,"point":1,"cursedWord":1}],"words": ["SUNNY","CLOUDY","RAINY","SNOWY","WINDY","STORMY","FOGGY","HUMID","DRY","COLD","ICY","DRIZZLY","OVERCAST"],"status": true},
	{"title": "Weather3","image":"icon_figures","config":[{"fullWord":false,"difficulty":"normal","timeRemaining":30,"random":false,"bonusWord":5,"point":1,"cursedWord":1}],"words": ["SUNNY","CLOUDY","RAINY","SNOWY","WINDY","STORMY","FOGGY","HUMID","DRY","COLD","ICY","DRIZZLY","OVERCAST"],"status": true},

	]},

	{"category":"Numbers","image":"mode_icon_2","status":false,"description":"","subCategories":[{}]},{"category":"Visuals","image":"mode_icon_3","status":false,"description":"","subCategories":[{}]}]}]};


let levels= [];



//level selection

