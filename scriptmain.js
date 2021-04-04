var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var btn = document.getElementById('btn');


canvas.width = 1500;
canvas.height = 670;
let width_remained = 480;
let nv_x = 20;
let nv_y = 490; 
let index_color = -1;
let old_width_remained = 0;
let old_y = null;
let old_x = null;
let sorted = false;


//colors availible for rectangles 
let color_draw = ['blue','black','aqua','blueviolet','darkred','forestgreen','yellowgreen','antiquewhite',
				   'cadetblue','chocolate'];

//values of rectangles 
let value_draw = [[700,50,70,130],[700,190,70,130],[790, 50,50,130],[790, 190,50,130],[880, 50,70,130],
					[880, 170,70,130],[880, 290,70,130],[990, 50,110,60],[990, 180,110,60],[990, 310,110,60],
					[990, 440,110,60],[1150, 50,95,60],[1150, 150,95,60],[1150, 250,95,60],[1150, 350,95,60],
					[1150, 450,95,60],[1150, 550,95,60],[1270, 50,120,60],[1270, 190,100,60],[1270, 290,100,60],
					[1270, 400,100,60],[1270, 550,100,60],[1270, 550,100,60],[1270, 550,100,60],[1270, 550,70,60],
					[700,330,70,130],[700,470,70,130],[700,470,70,130],[700,470,70,130],[700,470,70,130],
					[700,470,70,130],[700,470,60,130],[1270, 550,100,60],[1270, 550,100,60],[1270, 550,100,60],
					[1270, 550,100,60],[1270, 550,80,60]];



//function to draw of the little objects
function draw(x,y,width,height){

	color_index = getRandomInt(color_draw.length);
	if(index_color == color_index){
		color_index = getRandomInt(color_draw.length);
	}else{
		index_color = color_index;
	}
	ctx.fillStyle = color_draw[index_color];
	ctx.fillRect(x,y,width,height);

	//return[x,y,width,height];
}


//function to draw of the bandaged 
function drawBand(x,y,width,height){
	
	ctx.beginPath();
	ctx.strokeStyle="blue";   
	ctx.lineWidth="2";   
	ctx.rect(x,y,width,height);
	ctx.stroke();

	//return [x,y,width,height];
}


//the function that clear unsorted rectangles
function clearRectange(){
	
	for (let i = 0; i < value_draw.length; i++) {

	let index = value_draw[i];

	let x = index[0];
	let y = index[1];
	let width = index[2];
	let height = index[3];
	ctx.clearRect(x, y, width, height);
	}

}

//function random to define a color random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


//function that calculates the bottom left point to place the rectangles in the best places
function calculate(x,y,width,height){

	if(old_width_remained >= width && old_height >= height){
		draw(old_x,old_y,width,height);
		old_width_remained = width_remained - width;
		old_x = old_x + width;
		old_y = old_y + height;
	}


	if(width_remained >= width){
		draw(nv_x,nv_y,width,height);
		width_remained = width_remained - width;
		nv_x = nv_x + width;
	}else{
		old_width_remained = width_remained;
		old_x = nv_x;
		old_y = nv_y;
		old_height = height;
		width_remained = 480;
		nv_x = 20;
		nv_y = nv_y-height;
		draw(nv_x,nv_y,width,height);
		nv_x = nv_x + width;
		width_remained = width_remained - width;

	}

}



//the function that fills the strip by sorting the rectangles
btn.onclick = function(){

	if(sorted == false){
	
	clearRectange();

	for (let i = 0; i < value_draw.length; i++) {

	let index = value_draw[i];
	let width = index[2];
	let height = index[3];

	calculate(nv_x,nv_y,width,height);
	sorted = true;
	}
	console.log(nv_x);
	console.log(nv_y);

}

}



//draw rectangles before sorting in the band
for (let i = 0; i < value_draw.length; i++) {

	let index = value_draw[i];

	let x = index[0];
	let y = index[1];
	let width = index[2];
	let height = index[3];

	draw(x,y,width,height);
}


//drawing of the bandaged 
drawBand(20,20,480,600);









