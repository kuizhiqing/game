T = 16;
var ruler = false;
$('.rule').click(function(){
	if(ruler){
		$('.rule').animate({height:'40px'});
		ruler = false;
	}else{
		$('.rule').animate({height:'200px'});
		ruler = true;
	}
});
//double match
grids = ['0','0','1','1','2','2','3','3','4','4','5','5','6','6','7','7'];
front_grid = [];
fini_grid = [];
clicks = 0;
status_msg = "go";// "go"  "refresh" "giveup" 
grid_width = 100;

function init(){
    grids = shuffle(grids);
	for(i=0;i<T;i++){
		$('#i'+i).css('background','url(images/grids.png) '+ parseInt(grids[i])*grid_width + 'px  -100px');
	}
	front_grid = [];
	fini_grid = [];
	clicks = 0;
}
function over(){
	for(i=0;i<T;i++){
		turn_front(i);
	}
}
function finish(){
	$('.status_bar').html('恭喜: '+clicks+' 击');
	$('.status_bar').css('background','green');
	status_msg = "go";
}

function turn_back(id){
	console.log(id+':back');
	$('#i'+id).animate({'background-position-y':'-'+grid_width+'px'});
	front_grid.pop();
}
function turn_front(id){
	console.log(id+':front');
	$('#i'+id).animate({'background-position-y':'0px'});
	front_grid.push(id);
}

bloque = false;
$('td').click(function(){
    id = $(this).attr('rid');
	if(status_msg=="go") return;
	if(fini_grid.indexOf(id)>=0) return;
	if(bloque) return;
	bloque = true;
	clicks++;
	if(front_grid.length==0){
		turn_front(id);
	}else if(front_grid[0]==id){ //click self
		turn_back(id);
	}else if(grids[front_grid[0]]==grids[id]){ //match
		turn_front(id);
		fini_grid.push(id);
		fini_grid.push(front_grid[0]);	
		front_grid.pop();		
		front_grid.pop();
	}else{ //not match
		turn_front(id);
		turn_back(front_grid[0]);
		turn_back(id);
	}
	if(fini_grid.length==T)	finish();
	bloque = false;
});

$('.status_bar').click(function(){
	if(status_msg=="go"){
		init();
		$('.status_bar').css('background','blue');
		$('.status_bar').html('放弃');
		status_msg = "giveup";
	}else if(status_msg=="giveup"){
		over();
		$('.status_bar').css('background','red');
		$('.status_bar').html('开始');
		status_msg = "go";
	}
});

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};