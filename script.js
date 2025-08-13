const bubbleSize = 60;
const layers = [
        { radius: 80, count: 8 },
        { radius: 160, count: 16},
    ];
let bubble_val;
let hit_val=0;
let timer_val=60;
let score_val=0;

function make_bubbles(){
    let clutter = "";
    bubble_val=new Set();
    const centerX = document.querySelector("#panel_mid").offsetWidth / 2;
    const centerY = document.querySelector("#panel_mid").offsetHeight / 2;
    const offset = bubbleSize / 2;
    layers.forEach(layer => {
        for (var i = 0; i < layer.count; i++) {
            //generating random values
            const r = Math.floor(Math.random() * 10);
            bubble_val.add(r);

            //creating circles
            const angle = (i / layer.count) * (2 * Math.PI);
            const x = centerX + layer.radius * Math.cos(angle) - offset;
            const y = centerY + layer.radius * Math.sin(angle) - offset;
            
            //displaying on html
            clutter += `<div class="bubble" style="left:${x}px; top:${y}px;">${r}</div>`;
        }
    });

    document.querySelector("#panel_mid").innerHTML = clutter;
}
function new_hit(){
    // Pick hit from the values we actually used
    let valuesArray = Array.from(bubble_val);
    hit_val = valuesArray[Math.floor(Math.random() * valuesArray.length)];
 
    document.querySelector('#hit').textContent=hit_val;
}
function start_timer(){
    t=setInterval(function(){
        if(timer_val>0){
            timer_val--;
            document.querySelector('#timer').textContent=timer_val;
        }
        else{
            clearInterval(t);
            document.querySelector('#panel_mid').innerHTML=`<div class="bubble" style="width:120px; height:120px;">Score: ${score_val}</div>`;
            document.querySelector('#panel_bottom').innerHTML='<a href="index.html"><h2>Start New</h2></a>';
        }
    },1000);
}
function increase_score(){
    score_val+=10;
    document.querySelector('#score').textContent=score_val;
}
function handleBubbleClick(details){
    var clicked_num=Number(details.target.textContent);
    if(clicked_num===hit_val){
        increase_score();
        make_bubbles();
        new_hit();
    }
}
function initGame() {
    make_bubbles();
    new_hit();
    start_timer();
    document.querySelector('#panel_mid').addEventListener('click',handleBubbleClick);
}

// Start the game
initGame();

