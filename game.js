(function(){
var card=document.getElementById('playGame');
if(!card)return;
card.style.cursor='pointer';
var m=document.createElement('div');m.className='gm';
m.innerHTML='<div class="gbox"><button class="gx" id="gx">✕</button><h3>FLAPPY <b>BABY</b></h3><div class="gh"><span>Score <b id="gs">0</b></span><span>Best <b id="gb">0</b></span></div><canvas id="gc" width="320" height="440"></canvas><p class="gmsg" id="gmsg">Tap to start</p></div>';
document.body.appendChild(m);
var c=document.getElementById('gc'),x=c.getContext('2d'),W=320,H=440,R=18,BX=80,GAP=135;
var face=new Image();face.src='friend.png';
var snd={flap:new Audio('flap.m4a'),hit:new Audio('hit.m4a')},ok={flap:true,hit:true},AC;
snd.flap.onerror=function(){ok.flap=false};
snd.hit.onerror=function(){ok.hit=false};
function beep(f,d){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.15;o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function play(n){
 if(ok[n]){try{snd[n].currentTime=0;var p=snd[n].play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
 else beep(n=='flap'?600:150,n=='flap'?.08:.3);
}
var by,vy,pipes,score,best=0,state=0,frame,raf,open=false,overAt=0;
try{best=+localStorage.getItem('pxflap')||0}catch(e){}
var gs=document.getElementById('gs'),gb=document.getElementById('gb'),msg=document.getElementById('gmsg');
gb.textContent=best;
function reset(){by=200;vy=0;pipes=[];score=0;frame=0;gs.textContent=0;state=0;msg.textContent='Tap to start'}
function die(){
 state=2;overAt=Date.now();play('hit');
 if(score>best){best=score;try{localStorage.setItem('pxflap',best)}catch(e){}gb.textContent=best}
 msg.textContent='Game over! Score '+score+'. Tap to retry';
}
function flap(){
 if(state==2){if(Date.now()-overAt<500)return;reset();return}
 if(state==0){state=1;msg.textContent='Go!'}
 vy=-6.2;play('flap');
}
function update(){
 if(state==0){by=200+Math.sin(Date.now()/200)*8;return}
 if(state!=1)return;
 vy+=.35;by+=vy;frame++;
 if(frame%85==1)pipes.push({x:W,t:40+Math.random()*(H-GAP-80),s:false});
 for(var i=0;i<pipes.length;i++){
  var p=pipes[i];p.x-=2.3;
  if(!p.s&&p.x+50<BX){p.s=true;score++;gs.textContent=score}
  if(BX+R>p.x&&BX-R<p.x+50&&(by-R<p.t||by+R>p.t+GAP))die();
 }
 if(pipes.length&&pipes[0].x<-60)pipes.shift();
 if(by+R>H||by-R<0)die();
}
function draw(){
 var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#04120a');g.addColorStop(1,'#0b2a10');
 x.fillStyle=g;x.fillRect(0,0,W,H);
 x.shadowColor='#39e61f';x.shadowBlur=14;x.fillStyle='#39e61f';
 pipes.forEach(function(p){x.fillRect(p.x,0,50,p.t);x.fillRect(p.x,p.t+GAP,50,H);});
 x.shadowBlur=0;
 x.save();x.translate(BX,by);x.rotate(Math.max(-.5,Math.min(.8,vy*.06)));
 x.beginPath();x.arc(0,0,R,0,7);x.save();x.clip();
 if(face.complete&&face.naturalWidth){
  var s=Math.min(face.naturalWidth,face.naturalHeight);
  x.drawImage(face,(face.naturalWidth-s)/2,(face.naturalHeight-s)/2,s,s,-R,-R,R*2,R*2);
 }else{x.fillStyle='#fff';x.fillRect(-R,-R,R*2,R*2)}
 x.restore();
 x.lineWidth=3;x.strokeStyle='#fff';x.shadowColor='#39e61f';x.shadowBlur=12;
 x.beginPath();x.arc(0,0,R,0,7);x.stroke();x.restore();
 x.shadowBlur=0;
}
function loop(){if(!open)return;update();draw();raf=requestAnimationFrame(loop)}
c.onpointerdown=function(e){e.preventDefault();flap()};
card.onclick=function(){m.classList.add('on');open=true;reset();loop()};
document.getElementById('gx').onclick=function(){open=false;cancelAnimationFrame(raf);m.classList.remove('on')};
})();
