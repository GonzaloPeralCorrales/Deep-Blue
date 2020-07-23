
var audioStart = new Audio()
audioStart.src= 'epic.wav';
audioStart.volume = 0.05
audioStart.play()
console.log('hi')

let canvas = document.getElementById('myCanvas')
canvas.style.border = '3px solid black'
let ctx = canvas.getContext('2d')

let score = 0;
var audio = new Audio()
audio.src= 'sounds/splash1.wav';
audio.autoplay = false;

//var audioStart = new Audio()
//audioStart.src= 'sounds/epic.wav';


let intervalId = 0;

var counterShip = document.getElementById('counterShip');
var counter = document.getElementById('counterPlayer');
var contadores = document.querySelector('.contadores')

let bombImg = new Image();
bombImg.src = 'img/cannonBall_NW.png'
let positionX= 0;
let positionY = canvas.height -90;

let cannonImg = new Image();
cannonImg.src = 'img/cannonMobile_N.png'
let cannonX= 0;
let cannonY = canvas.height -90;

let shipImg = new Image();
shipImg.src = 'img/ship_dark_S.png'

let shipX= 20;
let shipY= 20;

let bombs = []

let ship = [{x:shipX, y:shipY }]

function draw(){
    
    ctx.clearRect(0,0,canvas.width,canvas.height)
   
    //drop(x, y, damping, shading, refraction, ctx, screenWidth, screenHeight)
    //moveWaves()
    for (let i=0; i< bombs.length; i++){
        ctx.drawImage(bombImg, bombs[i].x, bombs[i].y, 40, 40)
        collision(bombs[i])
        bombs[i].y -= 30;
    }
   
    ctx.drawImage(cannonImg, cannonX, cannonY, 64, 64) 
    for(let i=0; i< ship.length; i++){
        ctx.drawImage(shipImg,ship[i].x , ship[i].y, 95, 75)
        moveShip(ship[i]) 
        if (ship[i].y == 100){
            ship.push({
                x: Math.floor(Math.random() * canvas.width),// random num 0 - canvas width
                y: 0
            })
        }
    }
}
function moveWaves(){
for(var i=0; i< wave.length; i++){
    wave[i].x +=3;
    //audio.play();
}    
}
function collision(bomb){
    for(var i=0; i< ship.length; i++){
        //console.log('Bommeb x position', positionX);
        //console.log('Bommeb y position', positionY);
    //console.log('Dolphin y + height', ship[i].y + 75);

        if( ((bomb.y < ship[i].y + 75) && (bomb.y + 40 > ship[i].y)) && 
            ((bomb.x + 64> ship[i].x) && (bomb.x < ship[i].x + 95)) 
        ){
            //console.log(score)
           // ctx.clear(ship[i].y)
           // ctx.clear(ship[i].y)
            score++;
            counter.innerHTML= "counter : " + score; 
            audio.play();
            console.log('Increasing score')
            // draw the image
            ctx.beginPath();
            ctx.strokeStyle = 'yellow'
            ctx.arc(bomb.x,bomb.y, 50, 0, 2 * Math.PI)
            ctx.stroke()
            ctx.closePath(); 
            // clear the image after a time
            setTimeout(function(){
               //clear the arc
               ctx.clearRect(bomb.x,bomb.y)
            }, 3000);
            
            ship[i].y = 700;
            ship[i].x = -100;
            bomb.x=-100; 
            bomb.y=-100;
             }
    }
}
let lifeCanon = 5;
let countShipDown=0;

function moveShip(myShip){
myShip.y += 4;

if( myShip.y > canvas.height && myShip.y < 610){
    console.log('Reducing life')
    lifeCanon -= 1;
    countShipDown++;
    counterShip.innerHTML= 'CounterShip:' + countShipDown;

    myShip.y = 620
}
if(lifeCanon <= 0){
    clearInterval(intervalId)
    newPage()
}
//audio.play();
/*console.log(dolphin.y);*/
}
function newPage(){
   let body = document.querySelector('.container')
   var player = localStorage.getItem('inputPlayer');
    ctx.clearRect(0,0,canvas.width, canvas.height)
    //counterShip.style.display = 'none';
    //counter.style.display = 'none';
    contadores.removeChild(counterShip)
contadores.removeChild(counter)

 body.removeChild(canvas)
 var div= document.createElement('div');
div.innerHTML= `<div class="final-result"> 
 <h1 class="score-result"> ${player} Score:${score}</h1> 
 <!--<button type="button" id="startBtn" onclick="initialize()">-->
 <a href="landingPage.html" class="btn-restart">RESTART</a></button>   
    </div>`;
body.appendChild(div)
}

function moveShooter(e) {
    switch(e.keyCode){
        case 37:
            if(cannonX > 0){
                cannonX -= 15 
                
            } 
            break
        case 39:
        if(cannonX < canvas.width-bombImg.width){
        cannonX += 15 
         
        }
        break
    }      
}
canvas.addEventListener('mousedown', shoot)

document.addEventListener('keydown', moveShooter)

function shoot(){
    positionX = cannonX;
    positionY = cannonY;
    bombs.push({
        x: positionX,
        y: positionY
    })

}
window.addEventListener('load', () => {
    //audioStart.play()

    intervalId = setInterval(() => {
        requestAnimationFrame(draw)
    }, 100)
})
