let gameSeq=[];
let userSeq=[];

let btns = ["red","yellow","green","purple"]

let started = false;
let level = 0;


let h2 = document.querySelector("h2");
document.addEventListener("keypress",function(){
    if (started ==false ){
        console.log("game is started");
        started = true;
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    }, 250); 
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250); 
}
function levelUp(){
    userSeq =[];
    level++
    h2.innerText = `Level ${level}`;

    let randmIdx = Math.floor(Math.random() * 3);
    let randmColor =btns[randmIdx];
    let randmBtn = document.querySelector(`.${randmColor}`);
    

    gameSeq.push(randmColor);
    console.log(gameSeq);
    gameFlash(randmBtn);
  
}
function checkAns(idx){

   if (userSeq[idx] === gameSeq[idx]){
   if(userSeq.length == gameSeq.length){
   setTimeout (levelUp,1000);
   }
   }
   else{
    h2.innerHTML = `Game Over ! Your score was <b>${level}</b> <br> press any key to start.`;
    document.querySelector("body").style.backgroundColor ="red";
    setTimeout(function (){
        document.querySelector("body").style.backgroundColor ="white" ;
    }, 200) ;

    // Check and update the highest score
    let currScore = level ;
    if (currScore > highScore) {
        highScore = currScore;
        localStorage.setItem("highScore", highScore);
        scoreBorad.innerText = highScore ;
    }
    reset() ;
   }
}

function btnPress(){
    // console.log(this)
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
    

}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset (){
started = false;
gameSeq = [];
userSeq = [];
level = 0;
};

function resetHighScore() {
    localStorage.removeItem("highScore");
    highScore = 0;
    scoreBoard.innerText = highScore ;
}
let highScore = localStorage.getItem("highScore") ||0;
let scoreBoard = document.getElementById("high-score");
scoreBoard.innerText= highScore;
