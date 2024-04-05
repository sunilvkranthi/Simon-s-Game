let gameseq=[];
let userseq=[];
let scoreList=[];
let colors=["yellow","green","red","blue"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){

    if(started==false){
        started=true;
        levelUp();
    }
})

function flash(btn){

    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
};

function userFlash(btn){

    btn.classList.add("userFlash");

    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
};

function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randInt = Math.floor(Math.random()*4);
    let randColor = colors[randInt];
    gameseq.push(randColor);
    let btn = document.querySelector(`.${randColor}`);
    flash(btn);

}


let btns = document.querySelectorAll(".btn");

for(btn of btns){
    btn.addEventListener("click",function(){
        let c = this.getAttribute("id");
        userseq.push(c);
        userFlash(this);
        checkColor(userseq.length-1);   
    })
}


function checkColor(index){

    if(userseq[index]==gameseq[index]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,500);
        }
    }
    else{
        scoreList.push(level-1);
        let hScore = max(scoreList);
        h2.innerHTML=`Game Over! Your Score=<b>${level-1}</b><br>Highest Score=${hScore}<br>Press any key to start the game`;
        let body = document.querySelector("body");
        body.classList.add("gameOver");
        
        setTimeout(function(){
            body.classList.remove("gameOver");
        },200);

        started=false;
        level=0;
        userseq=[];
        gameseq=[];
    }
}


function max(obj){
    let max=0;
    for(i of obj){
        if(i>max){
            max=i;
        }
    }
    return max;
}