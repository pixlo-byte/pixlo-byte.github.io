(function(){
var pf=document.getElementById('pkf');
if(!pf)return;
var pk=pf.parentNode.parentNode;
var btn=document.createElement('button');
btn.className='gpick';btn.id='pkr';btn.textContent='🐐 GOAT RUNNER';
pf.parentNode.appendChild(btn);
var rm=document.createElement('div');rm.className='gm';
rm.innerHTML='<div class="gbox"><button class="gx" id="rx">✕</button><h3>GOAT <b>RUNNER</b></h3><div class="gh"><span>Score <b id="rs">0</b></span><span>Lives <b id="rl">0</b></span><span>Best <b id="rb">0</b></span></div><canvas id="rc" width="320" height="440"></canvas><p class="gmsg" id="rmsg">Tap to start</p></div>';
document.body.appendChild(rm);
var c=document.getElementById('rc'),x=c.getContext('2d'),W=320,H=440,GY=380,R=20,PX=70,FLIP=-1;
var J=new Audio('jump.mp3'),HT=new Audio('pillar.mp3'),GL=new Audio('pickup.mp3'),ok={j:1,h:1,g:1},AC;
J.onerror=function(){ok.j=0};HT.onerror=function(){ok.h=0};GL.onerror=function(){ok.g=0};
var snd={j:J,h:HT,g:GL};HT.preload='auto';HT.load(),fq={j:600,h:150,g:900};
var BI=new Image();BI.src='ballon.png';
var GI=new Image();GI.src='goat.png';
function beep(f,d){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),v=AC.createGain();o.frequency.value=f;v.gain.value=.15;o.connect(v);v.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function play(n){
 if(ok[n]){try{snd[n].currentTime=0;var p=snd[n].play();if(p&&p.catch)p.catch(function(){beep(fq[n],.2)})}catch(e){}}
 else beep(fq[n],.2);
}
var y,vy,obs,balls,dist,speed,st,frame,nxt,pn,lives,inv,best=0,open=false,raf,overAt=0,off=0;
try{best=+localStorage.getItem('pxrun')||0}catch(e){}
var rs=document.getElementById('rs'),rb=document.getElementById('rb'),rl=document.getElementById('rl'),msg=document.getElementById('rmsg');
rb.textContent=best;
function reset(){y=GY-R;vy=0;obs=[];balls=[];dist=0;speed=4;st=0;frame=0;nxt=60;pn=450;lives=0;inv=0;rs.textContent=0;rl.textContent=0;msg.textContent='Tap to start. Grab the golden ball for a life!'}
function die(){
 st=2;overAt=Date.now();play('h');
 var sc=Math.floor(dist/40);
 if(sc>best){best=sc;try{localStorage.setItem('pxrun',best)}catch(e){}rb.textContent=best}
 msg.textContent='Crashed! Score '+sc+'. Tap to retry';
}
function jump(){
 if(st==2){if(Date.now()-overAt<500)return;reset();return}
 if(st==0){st=1;msg.textContent='Run, GOAT!'}
 if(y>=GY-R-1){vy=-11.5;play('j')}
}
function update(){
 if(st!=1)return;
 vy+=.6;y+=vy;
 if(y>GY-R){y=GY-R;vy=0}
 frame++;speed=Math.min(8.5,4+frame/600);
 dist+=speed;off=(off+speed)%40;
 rs.textContent=Math.floor(dist/40);
 if(inv>0)inv--;
 nxt--;
 if(nxt<=0){
  obs.push({x:W+10,w:24+Math.random()*16,h:34+Math.random()*40});
  nxt=Math.floor((300+Math.random()*180)/speed);
 }
 pn--;
 if(pn<=0){balls.push({x:W+20,y:GY-55-Math.random()*60});pn=500+Math.floor(Math.random()*400)}
 for(var i=0;i<obs.length;i++){
  var o=obs[i];o.x-=speed;
  if(inv<=0&&PX+R-5>o.x&&PX-R+5<o.x+o.w&&y+R-4>GY-o.h){
   if(lives>0){lives--;inv=90;o.x=-200;rl.textContent=lives;play('h');msg.textContent='Life used! Keep going!'}
   else{die();break}
  }
 }
 for(var j=0;j<balls.length;j++){
  var b=balls[j];b.x-=speed;
  var dx=b.x-PX,dy=b.y-y;
  if(dx*dx+dy*dy<(R+16)*(R+16)){
   b.dead=true;
   if(lives<3)lives++;
   rl.textContent=lives;play('g');msg.textContent="Ballon d'Or! +1 life 🏆";
  }
 }
 balls=balls.filter(function(b){return !b.dead&&b.x>-40});
 if(obs.length&&obs[0].x<-60)obs.shift();
}
function draw(){
 var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#04120a');g.addColorStop(1,'#0b2a10');
 x.fillStyle=g;x.fillRect(0,0,W,H);
 x.fillStyle='#071a0b';x.fillRect(0,GY,W,H-GY);
 x.shadowColor='#39e61f';x.shadowBlur=12;x.fillStyle='#39e61f';x.fillRect(0,GY,W,3);
 obs.forEach(function(o){x.fillRect(o.x,GY-o.h,o.w,o.h)});
 x.shadowBlur=0;
 x.fillStyle='rgba(57,230,31,.25)';
 for(var i=-off;i<W;i+=40)x.fillRect(i,GY+18,20,3);
 balls.forEach(function(b){
  var by=b.y+Math.sin(Date.now()/200)*4;
  x.save();x.translate(b.x,by);
  if(BI.complete&&BI.naturalWidth){var bh=48,bw=bh*BI.naturalWidth/BI.naturalHeight;x.shadowColor='#ffd700';x.shadowBlur=18;x.drawImage(BI,-bw/2,-bh/2,bw,bh)}
  else{x.fillStyle='#ffd700';x.beginPath();x.arc(0,0,16,0,7);x.fill()}
  x.restore();
 });
 x.save();x.translate(PX,y);
 if(inv>0&&Math.floor(inv/6)%2)x.globalAlpha=.35;
 if(GI.complete&&GI.naturalWidth){var gh=58,gw=gh*GI.naturalWidth/GI.naturalHeight;x.shadowColor='#39e61f';x.shadowBlur=10;x.drawImage(GI,-gw/2,R-gh+2,gw,gh)}else{x.font='50px serif';x.textAlign='center';x.textBaseline='middle';x.fillText('🐐',0,2)}
 x.restore();
}
function loop(){if(!open)return;update();draw();raf=requestAnimationFrame(loop)}
c.onpointerdown=function(e){e.preventDefault();jump()};
btn.onclick=function(){pk.classList.remove('on');rm.classList.add('on');open=true;reset();loop()};
document.getElementById('rx').onclick=function(){open=false;cancelAnimationFrame(raf);rm.classList.remove('on')};
})();
