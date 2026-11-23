(function(){
var D=document,H=D.documentElement,page=D.querySelector('.page');
if(!page||D.getElementById('strands'))return;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var c=D.createElement('canvas');c.id='strands';c.setAttribute('aria-hidden','true');
page.insertBefore(c,page.firstChild);
var x=c.getContext('2d');
if(!x)return;
var W=1,Hh=1,small=innerWidth<700,N=small?40:70,SEG=26,S=[],i;
for(i=0;i<N;i++){S.push({u:(i/(N-1))*2-1,ph:Math.random()*6.283,hue:100+Math.random()*65,l:58+Math.random()*22,w:.6+Math.random()*1})}
function size(){W=c.width=Math.max(1,innerWidth);Hh=c.height=Math.max(1,innerHeight)}
size();
var rt=0;
addEventListener('resize',function(){
 clearTimeout(rt);
 rt=setTimeout(function(){if(innerWidth!==W||Math.abs(innerHeight-Hh)>120){size();draw(performance.now())}},150);
});
var p=0,tg=0;
function onS(){var h=Math.max(1,Math.max(H.scrollHeight,D.body.scrollHeight)-innerHeight);tg=Math.min(1,Math.max(0,(window.pageYOffset||0)/h))}
addEventListener('scroll',onS,{passive:true});onS();
function draw(now){
 var wf=Math.max(0,1-p*2),wr=Math.max(0,p*2-1),wx=Math.max(0,1-Math.abs(p-.5)*2);
 var amp=Hh*.34,cy=Hh*(.46+.06*Math.sin(p*4.5)),tw=Hh*.17*wr,t=now*.0006;
 x.clearRect(0,0,W,Hh);
 x.globalCompositeOperation='lighter';
 x.lineJoin='round';
 for(var i=0;i<N;i++){
  var s=S[i],a=.16+.2*(1-Math.abs(s.u));
  x.strokeStyle='hsla('+s.hue+',90%,'+s.l+'%,'+a+')';x.lineWidth=s.w;
  x.beginPath();
  for(var k=0;k<=SEG;k++){
   var tt=k/SEG,sh=wf*(1-tt)+wx*Math.abs(2*tt-1)+wr*.05;
   var y=cy+s.u*amp*sh+Math.sin(tt*5+t+s.ph)*Hh*.02*(.35+sh)+Math.sin(tt*3.77+p*4)*tw;
   var X=tt*W*1.1-W*.05;
   if(k)x.lineTo(X,y);else x.moveTo(X,y);
  }
  x.stroke();
 }
 x.globalCompositeOperation='source-over';
}
var last=0;
function loop(now){
 requestAnimationFrame(loop);
 if(D.hidden||H.classList.contains('sflock')||D.getElementById('pxi'))return;
 if(now-last<(small?40:24))return;
 last=now;
 p+=(tg-p)*.08;
 draw(now);
}
if(reduce){p=tg;draw(0)}else requestAnimationFrame(loop);
})();
