(function(){
var card=document.getElementById('playGame');
if(!card)return;
var openFlappy=card.onclick;
function g(i){return document.getElementById(i)}
var pk=document.createElement('div');pk.className='gm';
pk.innerHTML='<div class="gbox"><button class="gx" id="pkx">✕</button><h3>CHOOSE <b>GAME</b></h3><button class="gpick" id="pkf">🐤 FLAPPY BABY</button><button class="gpick" id="pkp">⚽ PENALTY SHOOTOUT</button></div>';
var pm=document.createElement('div');pm.className='gm';
pm.innerHTML='<div class="gbox"><button class="gx" id="px">✕</button><h3>PENALTY <b>SHOOTOUT</b></h3><div class="gh"><span>Goals <b id="pg">0</b>/5</span><span>Best <b id="pb">0</b></span></div><canvas id="pc" width="320" height="440"></canvas><p class="gmsg" id="pmsg">Tap the goal to shoot</p></div>';
document.body.appendChild(pk);document.body.appendChild(pm);
var c=g('pc'),x=c.getContext('2d'),W=320,H=440,G={x:30,y:70,w:260,h:110};
var face=new Image();face.src='friend.png';
var A={goal:new Audio('flap.m4a'),save:new Audio('hit.m4a')},ok={goal:1,save:1},AC;
A.goal.onerror=function(){ok.goal=0};A.save.onerror=function(){ok.save=0};
function beep(f,d){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),v=AC.createGain();o.frequency.value=f;v.gain.value=.15;o.connect(v);v.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function play(n){
 if(ok[n]){try{A[n].currentTime=0;var p=A[n].play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
 else beep(n=='goal'?700:150,.25);
}
var S={save:new Audio('save.mp3'),end:new Audio('end.m4a')};function sfx(n){try{S[n].currentTime=0;var p=S[n].play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
var st,t,kx,kx0,kdx,tx,ty,bx,by,br,shot,goals,res='',best=0,open=false,raf,overAt=0;
try{best=+localStorage.getItem('pxpen')||0}catch(e){}
var msg=g('pmsg');g('pb').textContent=best;
function reset(full){
 if(full){shot=0;goals=0;g('pg').textContent=0}
 st=0;t=0;bx=160;by=395;br=14;kx=160;res='';
 msg.textContent='Shot '+(shot+1)+' of 5: tap the goal';
}
function kick(px,py){
 tx=px;ty=py;kx0=kx;
 var s=[100,160,220];
 kdx=s[Math.floor(Math.random()*3)]+(Math.random()*30-15);
 st=1;t=0;
}
var SV=new Audio('save.mp3');SV.preload='auto';function saveSnd(){try{SV.currentTime=0;var p=SV.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
var GL=new Audio('goal.mp3');GL.preload='auto';function goalSnd(){try{GL.currentTime=0;var p=GL.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
var EN=new Audio('end.mp3');EN.preload='auto';function endSnd(){try{EN.currentTime=0;var p=EN.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
var KP=new Image();KP.src='keeper.png';
function resolve(){
 var inGoal=tx>G.x&&tx<G.x+G.w&&ty>G.y&&ty<G.y+G.h;
 if(!inGoal){res='MISSED!';play('save')}
 else if(Math.abs(tx-kdx)<46&&Math.abs(ty-130)<58){res='SAVED!'}
 else{res='GOAL!';goals++;g('pg').textContent=goals;goalSnd()}
 msg.textContent=res;if(res=='SAVED!')saveSnd();shot++;st=2;
 setTimeout(next,1200);
}
function next(){
 if(!open)return;
 if(shot>=5){
  st=3;overAt=Date.now();endSnd();
  if(goals>best){best=goals;try{localStorage.setItem('pxpen',best)}catch(e){}g('pb').textContent=best}
  msg.textContent='Final score '+goals+'/5. Tap to play again';
 }else reset(false);
}
function update(){
 if(st==0)kx=160+Math.sin(Date.now()/300)*60;
 if(st==1){
  t++;var p=t/35;
  bx=160+(tx-160)*p;by=395+(ty-395)*p;br=14-7*p;
  kx=kx0+(kdx-kx0)*Math.min(1,p*1.4);
  if(t>=35)resolve();
 }
}
function draw(){
 var gr=x.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#0a2a10');gr.addColorStop(1,'#14501c');
 x.fillStyle=gr;x.fillRect(0,0,W,H);
 x.fillStyle='rgba(255,255,255,.04)';
 for(var i=0;i<H;i+=60)x.fillRect(0,i,W,30);
 x.strokeStyle='rgba(255,255,255,.2)';x.lineWidth=1;
 for(var a=G.x;a<=G.x+G.w;a+=20){x.beginPath();x.moveTo(a,G.y);x.lineTo(a,G.y+G.h);x.stroke()}
 for(var b=G.y;b<=G.y+G.h;b+=20){x.beginPath();x.moveTo(G.x,b);x.lineTo(G.x+G.w,b);x.stroke()}
 x.shadowColor='#39e61f';x.shadowBlur=12;x.strokeStyle='#fff';x.lineWidth=5;
 x.strokeRect(G.x,G.y,G.w,G.h);x.shadowBlur=0;
 if(KP.complete&&KP.naturalWidth){var kh=122,kw=kh*KP.naturalWidth/KP.naturalHeight;x.shadowColor='#39e61f';x.shadowBlur=10;x.drawImage(KP,kx-kw/2,60,kw,kh);x.shadowBlur=0}else{x.fillStyle='#39e61f';x.fillRect(kx-20,100,40,70)}
 if(st==0){x.fillStyle='rgba(57,230,31,.7)';x.beginPath();x.arc(160,395,22,0,7);x.fill()}
 x.fillStyle='#fff';x.shadowColor='#39e61f';x.shadowBlur=14;
 x.beginPath();x.arc(bx,by,br,0,7);x.fill();x.shadowBlur=0;
 if(st==2||st==3){
  x.font='900 44px sans-serif';x.textAlign='center';x.fillStyle=res=='GOAL!'?'#39e61f':'#ff4d4d';
  x.shadowColor='#000';x.shadowBlur=10;x.fillText(res,160,260);x.shadowBlur=0;
 }
}
function loop(){if(!open)return;update();draw();raf=requestAnimationFrame(loop)}
c.onpointerdown=function(e){
 e.preventDefault();
 if(st==3){if(Date.now()-overAt>500)reset(true);return}
 if(st!=0)return;
 var r=c.getBoundingClientRect();
 var px=(e.clientX-r.left)*W/r.width,py=(e.clientY-r.top)*H/r.height;
 if(py>300)return;
 kick(px,py);
};
function openPen(){pk.classList.remove('on');pm.classList.add('on');open=true;reset(true);loop()}
card.onclick=function(){pk.classList.add('on')};
g('pkf').onclick=function(){pk.classList.remove('on');if(openFlappy)openFlappy()};
g('pkp').onclick=openPen;
g('pkx').onclick=function(){pk.classList.remove('on')};
g('px').onclick=function(){open=false;cancelAnimationFrame(raf);pm.classList.remove('on')};
})();
