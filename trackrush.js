(function(){
var pf=document.getElementById('pkf');
if(!pf)return;
var pk=pf.parentNode.parentNode;
var btn=document.createElement('button');
btn.className='gpick';btn.id='pksf';btn.textContent='🚆 TRACK RUSH';
pf.parentNode.appendChild(btn);
var m=document.createElement('div');m.className='gm';
m.innerHTML='<div class="gbox"><button class="gx" id="sfx">✕</button><h3>TRACK <b>RUSH</b></h3><div class="gh"><span>Score <b id="sfs">0</b></span><span>Coins <b id="sfc">0</b></span><span>Best <b id="sfb">0</b></span></div><canvas id="sfv" width="320" height="440"></canvas><p class="gmsg" id="sfm">Swipe to start</p></div>';
document.body.appendChild(m);
function $(i){return document.getElementById(i)}
var c=$('sfv'),x=c.getContext('2d'),W=320,H=440,HZ=100,GY=380,F=260,LW=86;
function S(z){return F/(F+Math.max(z,-F+30))}
function Y(s){return HZ+(GY-HZ)*s}
var lane,pos,jy,vy,slide,dist,v,objs,nextW,coinsN,st,best=0,open=false,raf=0,last=0,overAt=0,tt=0;
try{best=+localStorage.getItem('pxsurf')||0}catch(e){}
$('sfb').textContent=best;
var CO=['#1a3a6a','#6a1a3a','#3a1a6a','#1a5a4a'];
function score(){return Math.floor(dist/100)+coinsN*3}
function reset(){buf=0;lane=0;pos=0;jy=0;vy=0;slide=0;dist=0;v=480;objs=[];nextW=900;coinsN=0;st=0;$('sfs').textContent=0;$('sfc').textContent=0;$('sfm').textContent='Swipe to start'}
function add(t,l,w,co){objs.push({t:t,lane:l,w:w,c:co||Math.floor(Math.random()*4)})}
function pick(n){var a=[-1,0,1].sort(function(){return Math.random()-.5});return a.slice(0,n)}
function spawnRow(w,gap){
 var r=Math.random(),n,p;
 if(r<.3){n=Math.random()<.5?1:2;pick(n).forEach(function(l){add('w',l,w)})}
 else if(r<.55){n=1+Math.floor(Math.random()*3);pick(n).forEach(function(l){add('b',l,w)})}
 else if(r<.75){n=1+Math.floor(Math.random()*3);pick(n).forEach(function(l){add('o',l,w)})}
 else{p=pick(3);add('w',p[0],w);add('b',p[1],w);if(Math.random()<.5)add('o',p[2],w)}
 var cl=[-1,0,1][Math.floor(Math.random()*3)],cw=w+gap*.4;
 for(var k=0;k<5;k++)add('c',cl,cw+k*50);
}
function die(){
 st=2;overAt=Date.now();
 var sc=score();
 if(sc>best){best=sc;try{localStorage.setItem('pxsurf',best)}catch(e){}$('sfb').textContent=best}
 $('sfm').textContent='Crashed! Score '+sc+'. Swipe or tap to retry';
}
var buf=0;
function act(d){
 if(st==2){if(Date.now()-overAt>500)reset();return}
 if(st==0){st=1;$('sfm').textContent='Run!'}
 if(d=='t')return;
 if(d=='l')lane=Math.max(-1,lane-1);
 else if(d=='r')lane=Math.min(1,lane+1);
 else if(d=='u'){if(jy<=1){vy=650;slide=0}else buf=.2}
 else if(d=='d'){slide=.6;buf=0;if(jy>1)vy=-900}
}
function update(dt){
 if(st!=1)return;
 v=Math.min(1150,480+dist/60);dist+=v*dt;
 pos+=(lane-pos)*Math.min(1,dt*14);
 if(buf>0)buf-=dt;if(jy>0||vy>0){vy-=2600*dt;jy+=vy*dt;if(jy<=0){jy=0;vy=0;if(buf>0){vy=650;buf=0}}}
 if(slide>0)slide-=dt;
 while(nextW<dist+1500){var gap=300+v*.6+Math.random()*160;spawnRow(nextW,gap);nextW+=gap}
 for(var i=objs.length-1;i>=0;i--){
  var o=objs[i],z=o.w-dist;
  if(z<-90){objs.splice(i,1);continue}
  if(z>-30&&z<30){
   if(o.t=='c'){
    if(Math.abs(o.lane-pos)<.6){objs.splice(i,1);coinsN++;$('sfc').textContent=coinsN}
   }else if(Math.abs(o.lane-pos)<.55){
    if(o.t=='w'||(o.t=='b'&&jy<34)||(o.t=='o'&&slide<=0)){die();return}
   }
  }
 }
 $('sfs').textContent=score();
}
function drawObj(o,z){
 var s=S(z),y=Y(s),cx=160+o.lane*LW*s;
 if(o.t=='w'){
  var w=70*s,h=92*s;
  x.fillStyle=CO[o.c%4];x.fillRect(cx-w/2,y-h,w,h);
  x.strokeStyle='#39e61f';x.lineWidth=2*s;x.strokeRect(cx-w/2,y-h,w,h);
  x.fillStyle='#ffe38a';
  x.fillRect(cx-w*.38,y-h*.8,w*.3,h*.22);x.fillRect(cx+w*.08,y-h*.8,w*.3,h*.22);
  x.fillStyle='#ff4d4d';x.fillRect(cx-w*.3,y-h*.3,w*.1,h*.1);x.fillRect(cx+w*.2,y-h*.3,w*.1,h*.1);
 }else if(o.t=='b'){
  var w=70*s,h=28*s;
  x.fillStyle='#ff4d4d';x.fillRect(cx-w/2,y-h,w,h);
  x.fillStyle='#fff';
  for(var k=0;k<4;k++)x.fillRect(cx-w/2+w*(.08+k*.25),y-h,w*.1,h);
 }else if(o.t=='o'){
  var w=74*s;
  x.fillStyle='#666';x.fillRect(cx-w/2,y-84*s,5*s,84*s);x.fillRect(cx+w/2-5*s,y-84*s,5*s,84*s);
  x.fillStyle='#ffd24d';x.fillRect(cx-w/2,y-84*s,w,22*s);
  x.fillStyle='#000';
  for(var q=0;q<5;q++)x.fillRect(cx-w/2+w*(.04+q*.2),y-84*s,w*.08,22*s);
 }else{
  var cw=Math.abs(Math.cos(tt*6+o.w*.01)),r=9*s;
  x.fillStyle='#ffd700';x.shadowColor='#ffd700';x.shadowBlur=8*s;
  x.beginPath();x.ellipse(cx,y-24*s,Math.max(1.5*s,r*cw),r,0,0,7);x.fill();x.shadowBlur=0;
 }
}
function drawPlayer(){
 var px=160+pos*LW,feet=GY-jy,sl=slide>0&&jy<=1,bob=jy<=1&&st==1?Math.sin(tt*16)*2:0;
 x.fillStyle='rgba(0,0,0,.45)';x.beginPath();x.ellipse(px,GY+2,20-jy*.1,6,0,0,7);x.fill();
 x.fillStyle='#39e61f';
 if(sl)x.fillRect(px-17,feet-12,34,12);else x.fillRect(px-13,feet-28+bob,26,28-bob);
 var hh=sl?30:46,hy=sl?feet-6:feet-24+bob;
var hr=hh/2.4,hcy=hy-hr;x.fillStyle='#39e61f';x.beginPath();x.arc(px,hcy,hr,0,7);x.fill();x.fillStyle='rgba(0,0,0,.75)';x.fillRect(px-hr*.7,hcy-hr*.25,hr*1.4,hr*.55);x.fillStyle='rgba(255,255,255,.5)';x.fillRect(px+hr*.2,hcy-hr*.15,hr*.3,hr*.15);x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.arc(px,hcy,hr,0,7);x.stroke();
}
function draw(){
 var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#04120a');g.addColorStop(1,'#0b2a10');
 x.fillStyle=g;x.fillRect(0,0,W,H);
 var s0=.04,s1=1.25,y0=Y(s0),y1=Y(s1);
 x.fillStyle='#050a06';x.beginPath();x.moveTo(160-135*s0,y0);x.lineTo(160+135*s0,y0);x.lineTo(160+135*s1,y1);x.lineTo(160-135*s1,y1);x.fill();
 x.strokeStyle='rgba(57,230,31,.55)';x.lineWidth=2;
 x.beginPath();x.moveTo(160-135*s0,y0);x.lineTo(160-135*s1,y1);x.moveTo(160+135*s0,y0);x.lineTo(160+135*s1,y1);x.stroke();
 x.strokeStyle='rgba(57,230,31,.2)';x.lineWidth=1;
 x.beginPath();[-43,43].forEach(function(o){x.moveTo(160+o*s0,y0);x.lineTo(160+o*s1,y1)});x.stroke();
 var off=110-dist%110;
 x.beginPath();
 for(var z=off;z<1500;z+=110){var s=S(z),yy=Y(s);x.moveTo(160-135*s,yy);x.lineTo(160+135*s,yy)}
 x.strokeStyle='rgba(57,230,31,.14)';x.stroke();
 var po=220-dist%220;
 for(var pz=po;pz<1500;pz+=220){
  var ps=S(pz),py=Y(ps);
  [-175,175].forEach(function(o){
   var px2=160+o*ps;x.strokeStyle='#2a3a2c';x.lineWidth=3*ps;x.beginPath();x.moveTo(px2,py);x.lineTo(px2,py-110*ps);x.stroke();
   x.fillStyle='#39e61f';x.shadowColor='#39e61f';x.shadowBlur=8*ps;x.beginPath();x.arc(px2,py-112*ps,4*ps,0,7);x.fill();x.shadowBlur=0;
  });
 }
 var fg=x.createLinearGradient(0,HZ,0,HZ+75);fg.addColorStop(0,'#04120a');fg.addColorStop(1,'rgba(4,18,10,0)');
 x.fillStyle=fg;x.fillRect(0,HZ,W,75);
 objs.sort(function(a,b){return b.w-a.w});
 var after=[];
 objs.forEach(function(o){var z=o.w-dist;if(z>1500)return;if(z>=0)drawObj(o,z);else if(z>-40)after.push(o)});
 drawPlayer();
 after.forEach(function(o){drawObj(o,o.w-dist)});
}
function loop(ts){
 if(!open)return;
 raf=requestAnimationFrame(loop);
 var dt=last?Math.min(.05,(ts-last)/1000):0;last=ts;tt+=dt;
 update(dt);draw();
}
var TH=45,lastSw=0;
var sx=0,sy=0,fired=false,pid=null;
m.id='sfmodal';
m.addEventListener('touchmove',function(e){e.preventDefault()},{passive:false});
function lock(on){document.documentElement.classList.toggle('sflock',on);document.body.classList.toggle('sflock',on)}
m.addEventListener('pointerdown',function(e){if(e.target.closest&&e.target.closest('#sfx'))return;e.preventDefault();pid=e.pointerId;sx=e.clientX;sy=e.clientY;fired=false});
m.addEventListener('pointermove',function(e){
 if(e.pointerId!=pid)return;
 var dx=e.clientX-sx,dy=e.clientY-sy;
 var ax=Math.abs(dx),ay=Math.abs(dy);if(Math.max(ax,ay)<TH||Date.now()-lastSw<160||Math.min(ax,ay)*1.4>Math.max(ax,ay))return;
 fired=true;lastSw=Date.now();sx=e.clientX;sy=e.clientY;
 if(Math.abs(dx)>Math.abs(dy))act(dx>0?'r':'l');else act(dy<0?'u':'d');
});
m.addEventListener('pointerup',function(e){if(e.pointerId!=pid)return;pid=null;if(!fired)act('t')});
m.addEventListener('pointercancel',function(e){if(e.pointerId==pid)pid=null});
document.addEventListener('keydown',function(e){
 if(!open)return;
 var k=(e.key||'').toLowerCase(),d=k=='arrowleft'||k=='a'?'l':k=='arrowright'||k=='d'?'r':k=='arrowup'||k=='w'||k==' '?'u':k=='arrowdown'||k=='s'?'d':'';
 if(d){e.preventDefault();act(d)}
});
btn.onclick=function(){lock(true);pk.classList.remove('on');m.classList.add('on');open=true;last=0;reset();raf=requestAnimationFrame(loop)};
$('sfx').onclick=function(){lock(false);open=false;cancelAnimationFrame(raf);m.classList.remove('on')};
})();
