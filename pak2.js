

let pacman;
let grid = [];
let rows, cols;
let totalScore = 0;
const w = 20; 
let speedX = 0;
let speedY = 0;
let p;
let ghostNum = 4;
let r;
let thetaoff = 0;
let dir=5; 
let neighbors = [];
let type=1;
let pos="Wall";
let former_x=12;
let former_y=14;
//let former_y=18;
//let former_x=0;
let former_j=14;
let former_i=12;
let method="DFS";
let Exetion_Time=0;
let goal_numbers=1;
let input2;
let input_button;
let check=false;
let x_befor=0;
let y_befor=0;
let check_dir=[];
let cd=true;
let start_dfs=0;
let sir=5;
let cs=true;
let struck=true;
let stack_dfs=[];
let start_bfs=0;
let queue_bfs=[]
let queue_ucs=[]
let start_A=0;
let start_ucs=0;
let t=0;
let t2=0;
let t3=0;
let t4=0;
let END=false;
let goal_coordinate=[];
let heap=[];
let priorityQueue ;
let place_score={};
let path=[];
let ucs_score={};
let visited=[]
var timerValue=0;
let t7=0;
let current;
let j_place;
let i_place;

function setup() {
  createCanvas(26*w, 20*w);
  rectMode(CENTER);
  textSize(w*5);
  rows = height/w + 1;
  cols = width/w + 1;
  setInterval(timeIt, 1000);
  translate(w/2, w/2);
  for(let i = 0; i < rows; i++) {
    grid[i] = [];
    for(let j = 0; j < cols; j++) {
      grid[i][j] = new Cell(w*(j + 0), w*(i + 0));
    }
  }
  pacman = new Pacman(13 * w, 15 * w, w);
  Gstate=createP('state: '+ pos);
  TimeOfExetion=createP('TimeOfExetion: '+Exetion_Time);
  if( type ==1) {
    level1();
  }
  if ( type ==2) {
    level2();
  }

  let button = createButton("reset");
  button.mousePressed(res);
  // let ok_button=createButton("OK");
  // ok_button.mousePressed(Ok_button);
  let clear=createButton("clear");
  clear.mousePressed(clear_button);
  dropdown_type = createSelect();
  dropdown_type.option("default");
  dropdown_type.option("manual");
  dropdown_type.option("random");
  dropdown_type.changed(drop);
  position_type = createSelect();
  position_type.option("Wall");
  position_type.option("Road");
  position_type.option("Pakman");
  position_type.option("Power");
  position_type.changed(drop_pos);
  method_type=createSelect();
  method_type.option("Default");
  method_type.option("DFS");
  method_type.option("BFS");
  method_type.option("A*");
  method_type.option("UCS");
  method_type.option("IDS");
  method_type.changed(algorithm);

  Animation_rate=createSelect();
  Animation_rate.option("Animation");
  Animation_rate.option("Without Animation");
  // let bet =createButton("DFS");
  // bet.mousePressed(DFS_score);
  // let bet2 =createButton("BFS");
  // bet2.mousePressed(BFS_score);

  // let bet3=createButton("A*");
  // bet3.mousePressed(A_Star);
  priorityQueue = new PriorityQueue();

  let bet4=createButton("Show Path");
  bet4.mousePressed(show_path);

  // let bet5=createButton("UCS");
  // bet5.mousePressed(UCS);
  
  


}

function draw() {
  background(0);  
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      grid[i][j].show();
    }

  }
  pacman.show();
  if(END==true) {
    for(let k=0;k<path.length;k++) {
      let p=path[k];
      grid[p[0]+1][p[1]+1].changeColor();
    }
  }
  if(END == false) {
    TimeOfExetion.html('TimeOfExetion: '+timerValue);
  }
  //DFS_Algorithm();
   if(t==1) {
     DFS_score()
   }
  if(t2==1) {
    BFS_score()
  }
  if(t3==1) {
    A_Star();
  }
  if(t4==1) {
    UCS()
  }
  // DFS_score()
  if(t7==1) {
    //console.log(path)
    //console.log("path : ",path.length)
    if(path.length>0) {
      
      let x=path.shift();
      console.log("x : " , x," current : ",current)
      if(x[0]==current[0] && x[1]>current[1]){
        dir=3
      }
      else if(x[0]==current[0] && x[1]<current[1]) {
        dir=2
      }
      else if(x[0]>current[0] && x[1]==current[1]) {
        dir=1
      }
      else if(x[0]<current[0] && x[1]<current[1]) {
        dir=0;
      }
      current=x
      for(let k=0;k<10;k++){
        pacman.move();
      }
      
    }
    else{
      t7=0;
    }
    console.log("dir : ",dir)

  }
  Gstate.html('state: '+ pos);
}

function timeIt() {
  if((t==1 || t2==1 || t3==1 || t4==1) && END==false) {
    timerValue++;
  }
}
function algorithm(){
  if(method_type.value()=="DFS") {
    DFS_score();
  }
  if(method_type.value()=="BFS") {
    BFS_score();
  }
  if(method_type.value()=="UCS") {
    UCS();
  }
  if(method_type.value()=="A*") {
    A_Star();
  }

}

function clear_button() {
  pos="Wall";
  former_j=former_y;
  former_i=former_x;
  if(type==3) {
    former_j=j_place
    former_i=i_place
  }
  method="DFS";
  Exetion_Time=0;
  stack_dfs=[];
  start_bfs=0;
  queue_bfs=[]
  queue_ucs=[]
  start_A=0;
  start_ucs=0;
  t=0;
  t2=0;
  t3=0;
  t4=0;
  END=false;
  timerValue=0;
  goal_coordinate=[];
  heap=[];
  priorityQueue ;
  place_score={};
  path=[];
  ucs_score={};
  visited=[]
  // for(let i = 0; i < cols; i++) {
  //   for(let j = 0; j < rows; i++) {
  //     grid[j][i].score = false;
      
  //   }
  // }
  for(let k=1;k<20;k++) {
    for(let j=1;j<26;j++) {
      grid[k][j].score=false
    }
  }
  // grid[19][20].score=false
  // grid[1][1].score=false
  // grid[9][9].score=false
  // console.log(cols)
  priorityQueue.empty();
  method_type.value("Default")
  dropdown_type.value("default")
  position_type.value("Wall")
}
function drop() {
  if (dropdown_type.value()=="default") {
    console.log("lllll")
    type=1;
    res();

  }

  if (dropdown_type.value()=="manual") {
    type=2;
    res();
    console.log('kkkkkk')
  }

  if (dropdown_type.value() == "random") {
    console.log("jjjj")
    type=3;
    res();
  }
}
function drop_pos() {
  if(position_type.value()=="Wall"){
    pos="Wall"
  }
  if(position_type.value()=="Road") {
    pos ="wall2";
  }
  if(position_type.value()=="Pakman") {
    pos ="Pakman";
  }
  if(position_type.value()=="Power") {
    pos = "Power";
  }
}
function res(){
  method_type.value("Default")
  dropdown_type.value("default")
  position_type.value("Wall")
  rectMode(CENTER);
  textSize(w*5);
  rows = height/w + 1;
  cols = width/w + 1;
  translate(w/2, w/2);
  for(let i = 0; i < rows; i++) {
    grid[i] = [];
    for(let j = 0; j < cols; j++) {
      grid[i][j] = new Cell(w*(j + 0), w*(i + 0));
    }
  }
  pacman = new Pacman(13 * w, 15 * w, w);
  dir=5;
  if( type ==1) {
    level1();
  }
  if ( type ==2) {
    level2();
  }
  if (type ==3) {
    level3()


  }
  type=1;
  pos="Wall";
  former_x=12;
  former_y=14;
  method="DFS";
  Exetion_Time=0;
  stack_dfs=[];
  start_bfs=0;
  queue_bfs=[]
  queue_ucs=[]
  start_A=0;
  start_ucs=0;
  t=0;
  t2=0;
  t3=0;
  t4=0;
  END=false;
  goal_coordinate=[];
  heap=[];
  priorityQueue ;
  place_score={};
  path=[];
  ucs_score={};
  visited=[]
  priorityQueue.empty();
  timerValue=0;

}

function inp() {
  goal_numbers=input2.value();
  input2.remove();
  input_button.remove();
  check=true;

}

class Pacman {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.d = diameter;
  }
  
  show() {
    fill(220, 220, 50);
    let theta = PI/3*sq(sin(thetaoff))
    if(speedY < 0) {
    arc(this.x, this.y, this.d, this.d, -theta - PI/6, theta + 7*PI/6); 
      } else if(speedY > 0) {
          arc(this.x, this.y, this.d, this.d, -7*PI/6 - theta, theta + PI/6);
      } else if(speedX < 0){
          arc(this.x, this.y, this.d, this.d, theta + PI, -theta + PI);
      } else if(speedX > 0){
          arc(this.x, this.y, this.d, this.d, theta, -theta);
      } else {
          if(dir == 0) {
            arc(this.x, this.y, this.d, this.d, -theta - PI/6, theta + 7*PI/6); 
          } else if(dir == 1) {
              arc(this.x, this.y, this.d, this.d, -7*PI/6 - theta, theta + PI/6);
          } else if(dir == 2){
              arc(this.x, this.y, this.d, this.d, theta + PI, -theta + PI);
          } else if(dir == 3){
              arc(this.x, this.y, this.d, this.d, theta, -theta);
          } else {
              arc(this.x, this.y, this.d, this.d, theta, -theta);
          }
      }
    thetaoff += 0.1;
  }
  
  move() {
    checkNeighbors(this.x, this.y, neighbors);
    if(this.y % w == 0 && this.x % w == 0) {
      if(neighbors[3] || neighbors[1]) {
        speedX = 0; 
        console.log("1")  
      }
      if(neighbors[0] || neighbors[2]) {
        speedY = 0;
        console.log("2")   
      }
      if(dir == 2 && neighbors[3] == false){
        speedX = -w/10;
        speedY = 0;
        console.log("3")
      } 
      if(dir == 3 && neighbors[1] == false){
        speedX = w/10;
        speedY = 0;
        console.log("4")
      } 
      if(dir == 0 && neighbors[0] == false){
        speedY = -w/10;
        speedX = 0;
        console.log("5")
        } 
      if(dir == 1 && neighbors[2] == false) {
        speedY = w/10;
        speedX = 0;
        console.log("6")
      }
    
  }
      this.x += speedX;
      this.y += speedY;
    //looping the pacman through the canvas
    if(this.x < - w/2) {
      this.x = width + w/2;
    }
    if(this.x > width + w/2) {
      this.x = -w/2;
    }
    if(this.y < - w/2) {
      this.y = height + w/2;
    }
    if(this.y > height + w/2) {
      this.y = -w/2;
    }
  }
  
  stop() {
    speedX=0;
    speedY=0;
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wall = false; //is this cell a wall?
    this.score = false; //this cell increases the total score?
    this.power = false; // is this cell a power token?
    this.time = 0;
    this.w=false;
    this.w2=false;
    this.w3=false;
  }
  
  show() {
    if(this.wall == true) {
      fill(150, 150);
      rect(this.x, this.y, w, w);
      this.score = false;
    } else if(this.score) {
      fill(225, 120, 0);
      ellipse(this.x, this.y, w/5);
    }
    if(this.power) {
      fill(225, 120, 0);
      if(this.time % 45 < 15) {
      fill(0);
      }
      ellipse(this.x, this.y, w/2);
      this.time++;
      if(this.time == 4500) {
        this.time = 0;
      }
    }
    if(this.w) {
      fill(90,50);
      rect(this.x, this.y, w, w);
      //this.score = false;
    }
    if(this.w2) {
      fill(105,60);
      rect(this.x, this.y, w, w);
    }
    if(this.w3) {
      fill(120,70);
      rect(this.x, this.y, w, w);
    }
  }
  
  changeColor() {
    if(this.score) {
      fill(0, 190, 0);
      ellipse(this.x, this.y, w/5);
    }
    if(this.power) {
      fill(0, 190, 0);
      if(this.time % 45 < 15) {
      fill(0);
      }
      ellipse(this.x, this.y, w/2);
      this.time++;
      if(this.time == 4500) {
        this.time = 0;
      }
    }
  }
}

class QElement {
	constructor(element, priority)
	{
		this.element = element;
		this.priority = priority;
	}
}


class PriorityQueue {

	
	constructor()
	{
		this.items = [];
	}


enqueue(element, priority)
{
	
	var qElement = new QElement(element, priority);
	var contain = false;

	
	for (var i = 0; i < this.items.length; i++) {
		if (this.items[i].priority > qElement.priority) {
			
			this.items.splice(i, 0, qElement);
			contain = true;
			break;
		}
	}

	
	if (!contain) {
		this.items.push(qElement);
	}
}

dequeue()
{

	if (this.isEmpty())
		return "Underflow";
	return this.items.shift();
}



isEmpty()
{
	
	return this.items.length == 0;
}


length() {
	return this.items.length;
}
empty(){
  this.items=[];
}

}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    dir = 0;
  }
  if(keyCode === DOWN_ARROW) {
    //dir = 1;
    A_Star();
  }
  if(keyCode === LEFT_ARROW) {
    BFS_score();
  }
  if(keyCode === RIGHT_ARROW) {
    // dir = 3;
    DFS_score();
  }
}


function checkNeighbors(x, y, array) {
  if(array instanceof Array) {
  let i = floor(y/w);
  let j = floor(x/w);
  let top = grid[i-1][j];
  let right = grid[i][j+1];
  let bottom = grid[i+1][j];
  let left = grid[i][j-1];
  if(!top) {
    top = false;
  }
  if(!right) {
    right = false;
  }
  if(!bottom) {
    bottom = false;
  }
  if(!left) {
    left = false;
  }
  array[0] = top.wall;
  array[1] = right.wall;
  array[2] = bottom.wall;
  array[3] = left.wall;
  }
}



function level1() {
  // for(let i = 0; i < rows; i++) {
  //   for(let j = 0; j < cols; j++) {
  //     grid[i][j].score = true;
  //   }
  // }
  for(let i = 0; i < cols; i++) {
    grid[0][i].wall = true;
    grid[rows-1][i].wall = true;
  }
  for(let i = 0; i < rows; i++) {
    grid[i][0].wall = true;
    grid[i][cols-1].wall = true;
  }
  grid[10][0].wall = false;
  grid[10][0].score = false;
  grid[1][13].wall = true;
  grid[2][13].wall = true;
  grid[4][13].wall = true;
  grid[5][13].wall = true;
  grid[6][13].wall = true;
  grid[4][12].wall = true;
  grid[4][11].wall = true;
  grid[4][10].wall = true;
  grid[12][13].wall = true;
  grid[13][13].wall = true;
  grid[14][13].wall = true;
  grid[16][13].wall = true;
  grid[17][13].wall = true;
  grid[18][13].wall = true;
  grid[2][2].wall = true;
  grid[2][3].wall = true;
  grid[2][4].wall = true;
  grid[3][2].wall = true;
  grid[3][3].wall = true;
  grid[3][4].wall = true;
  grid[4][2].wall = true;
  grid[4][3].wall = true;
  grid[4][4].wall = true;
  grid[6][2].wall = true;
  grid[6][3].wall = true;
  grid[6][4].wall = true;
  grid[2][6].wall = true;
  grid[2][7].wall = true;
  grid[2][8].wall = true;
  grid[3][6].wall = true;
  grid[3][7].wall = true;
  grid[3][8].wall = true;
  grid[4][6].wall = true;
  grid[4][7].wall = true;
  grid[4][8].wall = true;
  grid[2][9].wall = true;
  grid[2][10].wall = true;
  grid[2][11].wall = true;
  grid[8][1].wall = true;
  grid[8][2].wall = true;
  grid[8][3].wall = true;
  grid[8][4].wall = true;
  grid[8][5].wall = true;
  grid[8][6].wall = true;
  grid[9][1].wall = true;
  grid[9][2].wall = true;
  grid[9][3].wall = true;
  grid[9][4].wall = true;
  grid[9][5].wall = true;
  grid[9][6].wall = true;
  grid[11][1].wall = true;
  grid[11][2].wall = true;
  grid[11][3].wall = true;
  grid[11][4].wall = true;
  grid[11][5].wall = true;
  grid[11][6].wall = true;
  grid[12][1].wall = true;
  grid[12][2].wall = true;
  grid[12][3].wall = true;
  grid[12][4].wall = true;
  grid[12][5].wall = true;
  grid[12][6].wall = true;
  grid[6][6].wall = true;
  grid[6][7].wall = true;
  grid[6][8].wall = true;
  grid[6][9].wall = true;
  grid[6][10].wall = true;
  grid[6][11].wall = true;
  grid[7][8].wall = true;
  grid[8][8].wall = true;
  grid[9][8].wall = true;
  grid[11][8].wall = true;
  grid[12][8].wall = true;
  grid[8][10].wall = true;
  grid[8][11].wall = true;
  grid[8][12].wall = true;
  grid[9][10].wall = true;
  grid[10][10].wall = true;
  grid[11][10].wall = true;
  grid[12][10].wall = true;
  grid[12][11].wall = true;
  grid[12][12].wall = true;
  grid[14][2].wall = true;
  grid[14][3].wall = true;
  grid[14][4].wall = true;
  grid[15][4].wall = true;
  grid[16][4].wall = true;
  grid[16][5].wall = true;
  grid[16][6].wall = true;
  grid[14][6].wall = true;
  grid[14][7].wall = true;
  grid[14][8].wall = true;
  grid[14][9].wall = true;
  grid[14][10].wall = true;
  grid[14][11].wall = true;
  grid[16][12].wall = true;
  grid[16][11].wall = true;
  grid[16][10].wall = true;
  grid[16][1].wall = true;
  grid[16][2].wall = true;
  grid[18][2].wall = true;
  grid[18][3].wall = true;
  grid[18][4].wall = true;
  grid[18][5].wall = true;
  grid[18][6].wall = true;
  grid[18][7].wall = true;
  grid[18][8].wall = true;
  grid[18][9].wall = true;
  grid[18][10].wall = true;
  grid[18][11].wall = true;
  grid[17][8].wall = true;
  grid[16][8].wall = true;
  for(let i = 0; i < cols/2 +1; i++) {
    for(let j = 0; j < rows; j++) {
      let temp = grid[j][i].wall;
      grid[j][26-i].wall = temp;
    }
  }
  for(let i = 0; i < rows; i++) {
    grid[i][cols-1].wall = true;
  }
  grid[10][26].wall = false;
  grid[10][26].score = false;
  // grid[3][1].power = true;
  // grid[3][25].power = true;
  // grid[15][1].power = true;
  // grid[15][24].power = true;
  grid[15][13].score = false;
  grid[10][26].wall=true;
  grid[10][0].wall=true;
}

function level2() {
  // for(let i = 0; i < rows; i++) {
  //   for(let j = 0; j < cols; j++) {
  //     grid[i][j].score = true;
  //   }
  // }

  for(let i = 0; i < cols; i++) {
    grid[0][i].wall = true;
    grid[rows-1][i].wall = true;
  }
  for(let i = 0; i < rows; i++) {
    grid[i][0].wall = true;
    grid[i][cols-1].wall = true;
  }
  for(let i = 0; i < cols/2 +1; i++) {
    for(let j = 0; j < rows; j++) {
      let temp = grid[j][i].wall;
      grid[j][26-i].wall = temp;
    }
  }
  for(let i = 0; i < rows; i++) {
    grid[i][cols-1].wall = true;
  }
  grid[10][26].wall = false;
  grid[10][26].score = false;

  // grid[3][1].power = true;
  // grid[3][25].power = true;
  // grid[15][1].power = true;
  // grid[15][24].power = true;
  grid[15][13].score = false;
  grid[10][26].wall=true;
}

function level3() {
  console.log(goal_numbers);
  for(let i = 0; i < cols; i++) {
    grid[0][i].wall = true;
    grid[rows-1][i].wall = true;
  }
  for(let i = 0; i < rows; i++) {
    grid[i][0].wall = true;
    grid[i][cols-1].wall = true;
  }
  for(let i = 0; i < rows; i++) {
    grid[i][cols-1].wall = true;
  }

  for(let i=1; i< cols-1; i++) {
    for(let j=1; j<rows-1;j++) {
      let ran=[1,2,2];
      if(random(ran)==1) {
        grid[j][i].wall=true;
      }
    }
  }
  // i<=25 && j<=19 && 0<=i && 0<=j && type !=3
  //       pacman.x=i*w+w;
  //       pacman.y=j*w+w;
  let i_ran=[];
  let j_ran=[];
  for(let k=1;k<24;k++){
    i_ran.push(k)
  }
  for(let k=1;k<19;k++) {
    j_ran.push(k)
  }
  i_place=random(i_ran)
  j_place=random(j_ran)
  pacman.x=i_place*w+w
  pacman.y=j_place*w+w
  if(grid[j_place+1][i_place+1].wall==true) {
    grid[j_place+1][i_place+1].wall=false
  }
  former_x=i_place;
  former_y=j_place;
  former_i=i_place;
  former_j=j_place;
}

// function Ok_button() {
//   if(pos=="Wall") {
//     pos ="wall2";
    
//   }
//   else if(pos == "wall2") {
//     pos="Pakman"
//   }
//   else if (pos == "Pakman") {
//     pos = "Power";

//   }
//   else if (pos == "Power") {
//     pos ="Complete";
//   }
// }
function mousePressed() {
  let i=floor(mouseX/w);
  let j=floor(mouseY/w);
  if(pos == "Wall") {
    if(i<=25 && j<=19 && 0<=i && 0<=j ) {
      if(grid[j+1][i+1].wall==true) {
        grid[j+1][i+1].wall=false;
      }
      else {
        grid[j+1][i+1].wall=true;
      }
    }

  }
  if(pos == "wall2") {
    
    if(i<=25 && j<=19 && 0<=i && 0<=j ) {
      if(grid[j+1][i+1].wall==false && grid[j+1][i+1].w==false) {
        grid[j+1][i+1].w=true;
        console.log("1")
      }
      else if(grid[j+1][i+1].w==true && grid[j+1][i+1].w2==false)
      {
        grid[j+1][i+1].w2=true;
        console.log("2")
      }
      else if(grid[j+1][i+1].w2==true && grid[j+1][i+1].w3==false)
      {
        grid[j+1][i+1].w3=true;
        console.log("3")
      }
      else {
        grid[j+1][i+1].wall=true;
        grid[j+1][i+1].w=false
        grid[j+1][i+1].w2=false
        grid[j+1][i+1].w3=false
        
      }

    }
  }
  if (pos== "Pakman") {
    if(i<=25 && j<=19 && 0<=i && 0<=j && type !=3) {
      if(grid[j+1][i+1].wall==true) {
        console.log("divar");
      }
      else {
        // console.log(former_x);
        // console.log(former_y);
        // console.log("formmer");
        //grid[(former_y)+1][(former_x)+1].score=true;
        pacman.x=i*w+w;
        pacman.y=j*w+w;
        // console.log(i);
        // console.log(j);
        
        former_i=i;
        former_j=j;
        former_x=i;
        former_y=j;
      }

    }
  }
  if (pos == "Power") {
      if(i<=25 && j<=19 && 0<=i && 0<=j && type !=3){
        if(grid[j+1][i+1].wall==false) {
          //grid[j+1][i+1].power=true;
          grid[j+1][i+1].power=true;
        }
        else if(grid[j+1][i+1].power ==true)
        {
          console.log("power is ")
          grid[j+1][i+1].power=false;
        }
      //   else if(grid[j+1][i+1].power ==true) {
      //     grid[j+1][i+1].power=false;
      //      grid[j+1][i+1].score=true;
      //  }
      goal_coordinate=[j+1,i+1];
      }
    
  }
  // console.log("i : "+i);
  // console.log("j : "+j);

}


function search_dfs() {
  let x;
  if(END==true) {
    return;
  }
  for(let k=0;k<stack_dfs.length;k++) {
    
    x=stack_dfs.pop();

    //console.log("x : "+x[0]+1)
    if(x[1]>24 || x[0]>18 || x[0]<0 || x[1]<0 ) {
      continue
    }
    else if(grid[x[0]+1][x[1]+1].score == false) {
      
      break
    }
    
  }
  if(x===undefined) {
    return
  }
  former_j=x[0]
  former_i=x[1]
  grid[former_j +1][former_i + 1].score=true;
  if(grid[former_j+2][former_i+1].wall==false) {
    if(place_score[[[former_j+1,former_i]]]==undefined){
      place_score[[[former_j+1,former_i]]]=[former_j,former_i]
    }
    stack_dfs.push([former_j+1,former_i])
  }
  if(grid[former_j+1][former_i].wall==false) {
    if(place_score[[[former_j,former_i-1]]]==undefined){
      place_score[[[former_j,former_i-1]]]=[former_j,former_i]
    }

    stack_dfs.push([former_j,former_i-1])
  }
  if(grid[former_j][former_i+1].wall==false) {
    if(place_score[[[former_j-1,former_i]]]==undefined){
      place_score[[[former_j-1,former_i]]]=[former_j,former_i]
    }
    stack_dfs.push([former_j-1,former_i])
  }
  if(grid[former_j+1][former_i+2].wall==false) {
    if(place_score[[[former_j,former_i+1]]]==undefined){
      place_score[[[former_j,former_i+1]]]=[former_j,former_i]
    }
    stack_dfs.push([former_j,former_i+1])
  }
  if(grid[former_j +1][former_i + 1].power==true) {
    console.log("goooooooooooooooooooooool");
    END=true
    let x=[former_j,former_i]
    path.push(x)
    while(true) {
      x=find_path(x);
      if(x=="start"){
        break;
      }
    }
    path.pop()
  }


}
function DFS_score(){
  t=1;
  if(start_dfs==0) {
    start_dfs=1;
    place_score[[former_j,former_i]]="start";
    if(grid[former_j+2][former_i+1].wall==false) {
      if(place_score[[[former_j+1,former_i]]]==undefined){
        place_score[[[former_j+1,former_i]]]=[former_j,former_i]
      }
      stack_dfs.push([former_j+1,former_i])
    }
    if(grid[former_j+1][former_i].wall==false) {
      if(place_score[[[former_j,former_i-1]]]==undefined){
        place_score[[[former_j,former_i-1]]]=[former_j,former_i]
      }

      stack_dfs.push([former_j,former_i-1])
    }
    if(grid[former_j][former_i+1].wall==false) {
      if(place_score[[[former_j-1,former_i]]]==undefined){
        place_score[[[former_j-1,former_i]]]=[former_j,former_i]
      }
      stack_dfs.push([former_j-1,former_i])
    }
    if(grid[former_j+1][former_i+2].wall==false) {
      if(place_score[[[former_j,former_i+1]]]==undefined){
        place_score[[[former_j,former_i+1]]]=[former_j,former_i]
      }
      stack_dfs.push([former_j,former_i+1])
    }
  }
  else {
    search_dfs();
  }  
}
function search_bfs() {
  let x;
  if(END==true) {
    return;
  }
  //queue_bfs=remove_duplicated(queue_bfs);
  if(queue_bfs.length==0) {
    pos="no path"
    END=true
  }
  for(let k=0;k<queue_bfs.length;k++) {
    x=queue_bfs.shift();
    console.log("x : "+x)
    if(x[1]>24 || x[0]>18 || x[0]<0 || x[1]<0 ) {
      
      continue
    }
    else if(grid[x[0]+1][x[1]+1].score == false) {
      
      break
    }

    
  }
  
  if(x===undefined) {
    return
  }
  former_j=x[0]
  former_i=x[1]
    grid[former_j +1][former_i + 1].score=true;
    if(grid[former_j+1][former_i+2].wall==false && grid[former_j+1][former_i+2].score==false && !queue_bfs.includes([former_j,former_i+1])) {
      queue_bfs.push([former_j,former_i+1]);
      if(place_score[[former_j,former_i+1]]==undefined){
        place_score[[former_j,former_i+1]]=[former_j,former_i];
      }
      console.log("1")
    }
    
    if(grid[former_j][former_i+1].wall==false && grid[former_j][former_i+1].score==false && !queue_bfs.includes([former_j-1,former_i])) {
      queue_bfs.push([former_j-1,former_i]);
      if(place_score[[former_j-1,former_i]]==undefined){
        place_score[[former_j-1,former_i]]=[former_j,former_i];
      }
      console.log("2")
    }

    if(grid[former_j+1][former_i].wall==false && grid[former_j+1][former_i].score==false && !queue_bfs.includes([former_j,former_i-1])) {
      queue_bfs.push([former_j,former_i-1]);
      //place_score[[former_j,former_i-1]]=[former_j,former_i];
      if(place_score[[former_j,former_i-1]]==undefined){
        place_score[[former_j,former_i-1]]=[former_j,former_i];
      }
      console.log("3")
    }
    if(grid[former_j+2][former_i+1].wall==false && grid[former_j+2][former_i+1].score==false && !queue_bfs.includes([former_j+1,former_i])) {
      queue_bfs.push([former_j+1,former_i]);
      //place_score[[former_j+1,former_i]]=[former_j,former_i];
      if(place_score[[former_j+1,former_i]]==undefined){
        place_score[[former_j+1,former_i]]=[former_j,former_i];
      }
      console.log("4")
    }
    console.log(queue_bfs)
    if(grid[former_j +1][former_i + 1].power==true) {
      console.log("goooooooooooooooooooooool");
      //console.log([former_j,former_i])
      //console.log(place_score)
      let x=[former_j,former_i]
      path.push(x)
      while(true) {
        x=find_path(x);
        if(x=="start"){
          break;
        }
      }
      path.pop()
      //console.log(place_score.length())
      END=true
      
    }
}
function BFS_score() {
  t2=1;
  if(start_bfs == 0) {
    grid[former_j+1][former_i+1].score=true;
    console.log(former_j+"    "+former_i)
    place_score[[former_j,former_i]]="start";
    start_bfs=1;
    if(grid[former_j+1][former_i+2].wall==false && grid[former_j+1][former_i+2].score==false) {
      queue_bfs.push([former_j,former_i+1]);
      place_score[[former_j,former_i+1]]=[former_j,former_i];
    }
    
    if(grid[former_j][former_i+1].wall==false && grid[former_j][former_i+1].score==false) {
      queue_bfs.push([former_j-1,former_i]);
      place_score[[former_j-1,former_i]]=[former_j,former_i];
    }

    if(grid[former_j+1][former_i].wall==false && grid[former_j+1][former_i].score==false) {
      queue_bfs.push([former_j,former_i-1]);
      place_score[[former_j,former_i-1]]=[former_j,former_i];
    }
    if(grid[former_j+2][former_i+1].wall==false && grid[former_j+2][former_i+1].score==false) {
      queue_bfs.push([former_j+1,former_i]);
      place_score[[former_j+1,former_i]]=[former_j,former_i];
    }
    //console.log("len : "+queue_bfs.length)
  }
  else {
    search_bfs();
  }
}

function remove_duplicated(arr) {
  return arr.filter((item,index) => arr.indexOf(item))
}

function A_Star() {
  t3=1;
  if(start_A == 0 ) {
    start_A=1;
    grid[former_j+1][former_i+1].score=true;
    place_score[[former_j,former_i]]="start";
    if(grid[former_j+1][former_i+2].wall==false && grid[former_j+1][former_i+2].score==false) {
      Add_to_heap(former_j,former_i+1)
      place_score[[former_j,former_i+1]]=[former_j,former_i];
    }
    
    if(grid[former_j][former_i+1].wall==false && grid[former_j][former_i+1].score==false) {
      Add_to_heap(former_j-1,former_i)
      place_score[[former_j-1,former_i]]=[former_j,former_i];
    }

    if(grid[former_j+1][former_i].wall==false && grid[former_j+1][former_i].score==false) {
      Add_to_heap(former_j,former_i-1)
      place_score[[former_j,former_i-1]]=[former_j,former_i];
    }
    if(grid[former_j+2][former_i+1].wall==false && grid[former_j+2][former_i+1].score==false) {
      Add_to_heap(former_j+1,former_i)
      place_score[[former_j+1,former_i]]=[former_j,former_i];
    }
    console.log(priorityQueue.printPQueue())
  }
  else {
    search_Astar();
  }
}
function Add_to_heap(j,i) {
  let j_goal=goal_coordinate[0]
  let i_goal=goal_coordinate[1]
  let x=Math.abs(j_goal-(j+1))+Math.abs(i_goal-(i+1));
  priorityQueue.enqueue([j,i],x);
}
function Add_to_heap_ucs(j,i) {

  let x=0;
  if(grid[j+1][i+1].w3==true) {
    x=4
  }
  else if(grid[j+1][i+1].w2==true) {
    x=3
  }
  else if(grid[j+1][i+1].w==true) {
    x=2
  }
  else {
    x=1;
  }
  console.log(" j , i : ",j , i)
  console.log(visited)
  if(visited.includes([[j,i]])==true) {
    console.log("j , i : ",j,"  ",i , "return")
  }
  else {
    console.log(ucs_score[place_score[[j,i]]])
    x +=ucs_score[place_score[[j,i]]]
    console.log(x)
    priorityQueue.enqueue([j,i],x);
    if(ucs_score[[j,i]]==undefined) {
      ucs_score[[j,i]]=x;
    }
    else
    {
      ucs_score[[j,i]]=Math.min(ucs_score[[j,i]],x)
    }
  }
}
function search_Astar() {
  if(END==true) {
    return;
  }
  if(priorityQueue.isEmpty()) {
    pos="no path"
    END=true
    return;
  }
  let x=0;
  for(let k=0;k<priorityQueue.length();k++) {
    x=priorityQueue.dequeue().element;
    if(x[1]>24 || x[0]>18 || x[0]<0 || x[1]<0 ) {
      console.log("kkl")
      continue
    }
    else if(grid[x[0]+1][x[1]+1].score == false) {
      
      break
    }
  }
  if(x===undefined) {
    return
  }
  //x=priorityQueue.dequeue().element;
  former_j=x[0];
  former_i=x[1];
  grid[former_j +1][former_i + 1].score=true;
    if(grid[former_j+1][former_i+2].wall==false && grid[former_j+1][former_i+2].score==false && !queue_bfs.includes([former_j,former_i+1])) {
      Add_to_heap(former_j,former_i+1);
      if(place_score[[former_j,former_i+1]]==undefined){
        place_score[[former_j,former_i+1]]=[former_j,former_i];
      }
      console.log("1")
    }
    
    if(grid[former_j][former_i+1].wall==false && grid[former_j][former_i+1].score==false && !queue_bfs.includes([former_j-1,former_i])) {
      
      Add_to_heap(former_j-1,former_i)
      if(place_score[[former_j-1,former_i]]==undefined){
        place_score[[former_j-1,former_i]]=[former_j,former_i];
      }
      console.log("2")
    }

    if(grid[former_j+1][former_i].wall==false && grid[former_j+1][former_i].score==false && !queue_bfs.includes([former_j,former_i-1])) {
      Add_to_heap(former_j,former_i-1)
      if(place_score[[former_j,former_i-1]]==undefined){
        place_score[[former_j,former_i-1]]=[former_j,former_i];
      }
      console.log("3")
    }
    if(grid[former_j+2][former_i+1].wall==false && grid[former_j+2][former_i+1].score==false && !queue_bfs.includes([former_j+1,former_i])) {
      Add_to_heap(former_j+1,former_i);
      if(place_score[[former_j+1,former_i]]==undefined){
        place_score[[former_j+1,former_i]]=[former_j,former_i];
      }
      console.log("4")
    }
    console.log(queue_bfs)
    if(grid[former_j +1][former_i + 1].power==true) {
      console.log("goooooooooooooooooooooool");
      let x=[former_j,former_i]
      path.push(x)
      while(true) {
        x=find_path(x);
        if(x=="start"){
          break;
        }
      }
      path.pop()
      END=true
      
    }
}


function search_ucs()
{
  if(END==true) {
    return;
  }
  if(priorityQueue.isEmpty()) {
    pos="no path";
    END=true
    return;
  }
  let x=0;
  for(let k=0;k<priorityQueue.length();k++) {
    x=priorityQueue.dequeue().element;
    if(x[1]>24 || x[0]>18 || x[0]<0 || x[1]<0 ) {
      console.log("kkl")
      continue
    }
    else if(grid[x[0]+1][x[1]+1].score == false) {
      
      break
    }
  }
  if(x===undefined) {
    return
  }
  former_j=x[0];
  former_i=x[1];
  grid[former_j +1][former_i + 1].score=true;
  if(grid[former_j+1][former_i+2].wall==false && grid[former_j+1][former_i+2].score==false) {
    if(place_score[[former_j,former_i+1]]==undefined){
      place_score[[former_j,former_i+1]]=[former_j,former_i];
    }
    Add_to_heap_ucs(former_j,former_i+1) 
  }
  
  if(grid[former_j][former_i+1].wall==false && grid[former_j][former_i+1].score==false) {
    if(place_score[[former_j-1,former_i]]==undefined){
      place_score[[former_j-1,former_i]]=[former_j,former_i];
    }
    Add_to_heap_ucs(former_j-1,former_i)
  }

  if(grid[former_j+1][former_i].wall==false && grid[former_j+1][former_i].score==false) {
    if(place_score[[former_j,former_i-1]]==undefined){
      place_score[[former_j,former_i-1]]=[former_j,former_i];
    }
    Add_to_heap_ucs(former_j,former_i-1)
  }
  if(grid[former_j+2][former_i+1].wall==false && grid[former_j+2][former_i+1].score==false) {
    if(place_score[[former_j+1,former_i]]==undefined){
      place_score[[former_j+1,former_i]]=[former_j,former_i];
    }
    Add_to_heap_ucs(former_j+1,former_i)
  }
  console.log(ucs_score)
  visited.push([former_j,former_i])
  if(grid[former_j +1][former_i + 1].power==true) {
    console.log("goooooooooooooooooooooool");
    let x=[former_j,former_i]
    path.push(x)
    while(true) {
      x=find_path(x);
      if(x=="start"){
        break;
      }
    }
    path.pop()
    END=true
    
  }

}



function find_path(x) {
  path.push(place_score[x])
  return place_score[x];
}

function show_path() {
  t7=1
  console.log(path)
  //pacman.move()
  current=path.shift()
}

function UCS(){
  t4=1;
  if(start_ucs==0){
    start_ucs=1;
    ucs_score[[former_j,former_i]]=0;
    grid[former_j+1][former_i+1].score=true;
    console.log(former_j+"    "+former_i)
    place_score[[former_j,former_i]]="start";
    if(grid[former_j+1][former_i+2].wall==false && grid[former_j+1][former_i+2].score==false) {
      place_score[[former_j,former_i+1]]=[former_j,former_i];
      Add_to_heap_ucs(former_j,former_i+1) 
    }
    
    if(grid[former_j][former_i+1].wall==false && grid[former_j][former_i+1].score==false) {
      place_score[[former_j-1,former_i]]=[former_j,former_i];
      Add_to_heap_ucs(former_j-1,former_i)
    }

    if(grid[former_j+1][former_i].wall==false && grid[former_j+1][former_i].score==false) {
      place_score[[former_j,former_i-1]]=[former_j,former_i];
      Add_to_heap_ucs(former_j,former_i-1)
    }
    if(grid[former_j+2][former_i+1].wall==false && grid[former_j+2][former_i+1].score==false) {
      place_score[[former_j+1,former_i]]=[former_j,former_i];
      Add_to_heap_ucs(former_j+1,former_i)
    }
    console.log(ucs_score)
    visited.push([former_j,former_i])
  }
  else{
    search_ucs()
  }

}




