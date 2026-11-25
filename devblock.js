(function(){
var H=document.documentElement;
if(!H.classList.contains('devlock'))return;
var blk=document.getElementById('devblock'),c=document.getElementById('dbc'),w=document.getElementById('dbw'),fl=document.getElementById('dbf');
var x=c&&c.getContext('2d');
if(!blk||!x||!w)return;
var W=0,Ht=0,B=[],run=false,last=0,AC=null,NB=null,down=false,lastM=0,lastS=0,lastF=0;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function size(){W=c.width=innerWidth;Ht=c.height=innerHeight}
size();addEventListener('resize',size);
window.pxUnlockMain=function(){location.reload()};
function jag(x0,y0,x1,y1,d,out){
 var dx=x1-x0,dy=y1-y0;
 if(d<5||dx*dx+dy*dy<100){out.push([x1,y1]);return}
 var mx=(x0+x1)/2+(Math.random()-.5)*d,my=(y0+y1)/2+(Math.random()-.5)*d;
 jag(x0,y0,mx,my,d/2,out);jag(mx,my,x1,y1,d/2,out);
}
function mkBolt(x0,y0,x1,y1,wd,life){
 var pts=[[x0,y0]];
 jag(x0,y0,x1,y1,Math.hypot(x1-x0,y1-y0)*.35,pts);
 B.push({p:pts,t:0,l:life,w:wd});
 return pts;
}
function strike(px,py){
 var i,sx=px+(Math.random()-.5)*W*.35,pts=mkBolt(sx,-12,px,py,1.2,.42);
 var nb=2+Math.floor(Math.random()*3);
 for(i=0;i<nb;i++){
  var q=pts[Math.floor(pts.length*(.2+Math.random()*.6))],a=Math.PI/2+(Math.random()-.5)*1.8,l=60+Math.random()*130;
  mkBolt(q[0],q[1],q[0]+Math.cos(a)*l,q[1]+Math.sin(a)*l,.6,.3);
 }
 for(i=0;i<3;i++){
  var a2=Math.random()*6.283,l2=50+Math.random()*110;
  mkBolt(px,py,px+Math.cos(a2)*l2,py+Math.sin(a2)*l2,.7,.3);
 }
 start();
}
function small(px,py){
 var a=Math.random()*6.283,l=40+Math.random()*80;
 mkBolt(px,py,px+Math.cos(a)*l,py+Math.sin(a)*l,.6,.22);start();
}
function stroke(p,col,wd){
 x.strokeStyle=col;x.lineWidth=Math.max(.6,wd);
 x.beginPath();x.moveTo(p[0][0],p[0][1]);
 for(var i=1;i<p.length;i++)x.lineTo(p[i][0],p[i][1]);
 x.stroke();
}
function frame(now){
 var dt=Math.min(.05,(now-last)/1000||.016),i;last=now;
 x.clearRect(0,0,W,Ht);
 x.globalCompositeOperation='lighter';x.lineJoin='round';x.lineCap='round';
 for(i=B.length-1;i>=0;i--){
  var b=B[i];b.t+=dt;
  if(b.t>=b.l){B.splice(i,1);continue}
  var a=(1-b.t/b.l)*(Math.random()<.18?.35:1);
  stroke(b.p,'rgba(70,150,255,'+(a*.22)+')',12*b.w);
  stroke(b.p,'rgba(150,205,255,'+(a*.55)+')',5*b.w);
  stroke(b.p,'rgba(255,255,255,'+a+')',1.8*b.w);
 }
 x.globalCompositeOperation='source-over';
 if(B.length)requestAnimationFrame(frame);
 else{run=false;x.clearRect(0,0,W,Ht)}
}
function start(){if(!run){run=true;last=performance.now();requestAnimationFrame(frame)}}
function flash(a){
 if(!fl||reduce)return;
 fl.style.transition='none';fl.style.opacity=a;void fl.offsetWidth;
 fl.style.transition='opacity .35s ease-out';fl.style.opacity='0';
}
function shake(){if(reduce)return;w.classList.remove('shake');void w.offsetWidth;w.classList.add('shake')}
function zap(){
 try{
  AC=AC||new(window.AudioContext||window.webkitAudioContext)();
  if(AC.state=='suspended')AC.resume();
  if(!NB){NB=AC.createBuffer(1,Math.floor(AC.sampleRate*.7),AC.sampleRate);var d=NB.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=Math.random()*2-1}
  var t=AC.currentTime,s=AC.createBufferSource();s.buffer=NB;
  var f=AC.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(3000,t);f.frequency.exponentialRampToValueAtTime(200,t+.5);
  var g=AC.createGain();g.gain.setValueAtTime(.2,t);g.gain.exponentialRampToValueAtTime(.001,t+.6);
  s.connect(f);f.connect(g);g.connect(AC.destination);s.start(t);s.stop(t+.65);
  var o=AC.createOscillator(),g2=AC.createGain();
  o.type='sawtooth';o.frequency.setValueAtTime(900,t);o.frequency.exponentialRampToValueAtTime(60,t+.2);
  g2.gain.setValueAtTime(.05,t);g2.gain.exponentialRampToValueAtTime(.001,t+.22);
  o.connect(g2);g2.connect(AC.destination);o.start(t);o.stop(t+.23);
 }catch(e){}
}
blk.addEventListener('pointerdown',function(e){
 if(e.target.closest&&e.target.closest('.dbl'))return;
 down=true;
 var n=performance.now();
 if(n-lastF>450){
  lastF=n;strike(e.clientX,e.clientY);flash(.55);shake();zap();
  try{if(navigator.vibrate)navigator.vibrate(30)}catch(_){}
 }else small(e.clientX,e.clientY);
});
blk.addEventListener('pointermove',function(e){
 if(!down)return;
 var n=performance.now();
 if(n-lastM>90){lastM=n;small(e.clientX,e.clientY)}
 if(n-lastS>450){lastS=n;shake()}
});
function up(){down=false}
blk.addEventListener('pointerup',up);blk.addEventListener('pointercancel',up);
setInterval(function(){
 if(document.hidden||!H.classList.contains('devlock'))return;
 strike(Math.random()*W,Ht*(.25+Math.random()*.5));flash(.22);
},2600);
})();
