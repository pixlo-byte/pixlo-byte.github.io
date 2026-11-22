(function(){
var D=document,H=D.documentElement,B=D.body;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var first=true;try{first=!sessionStorage.getItem('pxs')}catch(e){}
var force=/[?&]intro=1/.test(location.search);
if((reduce&&!force)||(!first&&!force))return;
var sp=D.getElementById('splash');if(sp)sp.remove();
var release;window.pxWait=new Promise(function(r){release=r});
var CSEL='.top,.bio,.stats,.about,.tag,.ic,.btn,.contact,.socials a,.shot,nav a';
var ov=null,over=false;
function curve(){
 if(!H.classList.contains('swsharp'))return;
 var els=[].slice.call(D.querySelectorAll(CSEL));
 H.classList.remove('swsharp');
 els.forEach(function(el){
  var br=getComputedStyle(el).borderRadius;
  if(br&&br!=='0px'){try{el.animate([{borderRadius:'0px'},{borderRadius:br}],{duration:1100,easing:'cubic-bezier(.2,.7,.2,1)'})}catch(e){}}
 });
}
function cleanup(){
 curve();
 H.classList.remove('sflock');H.classList.remove('swmeasure');B.classList.remove('sflock');
 if(ov&&ov.parentNode)ov.parentNode.removeChild(ov);
}
var safety=setTimeout(function(){release();cleanup()},16000);
run().catch(function(){release();cleanup()});
async function run(){
 scrollTo(0,0);
 H.classList.add('swsharp');
 var vw=innerWidth,vh=innerHeight,docH=vh,Q=[];
 ov=D.createElement('div');ov.id='swm';
 ov.innerHTML='<div id="swworld"></div><div id="swcap">PIXLO <b>FX</b></div><button id="swskip" type="button">Skip ›</button>';
 B.appendChild(ov);
 var world=ov.children[0],cap=ov.children[1],skip=ov.children[2],S={snap:false,skip:false};
 ov.addEventListener('touchmove',function(e){e.preventDefault()},{passive:false});
 skip.addEventListener('click',function(){S.skip=true;S.snap=true});
 function frame(){return new Promise(function(r){requestAnimationFrame(r)})}
 function sleep(ms){return S.snap?Promise.resolve():new Promise(function(r){setTimeout(r,ms)})}
 function esc(s){return s.replace(/[&<>]/g,function(m){return m=='&'?'&amp;':m=='<'?'&lt;':'&gt;'})}
 var CL=['#39e61f','#ff4d4d','#4da6ff','#ffd24d','#ff7ad9','#a07aff'],rr=Math.max(vw,vh);
 var cur=CL.map(function(col,i){
  var e=D.createElement('div');e.className='swc';e.style.color=col;
  e.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 2l17 8-7 2-3 7z"/></svg><span class="swg"></span>';
  world.appendChild(e);
  var a=i*1.047+.4,x=vw/2+Math.cos(a)*rr,y=vh*.42+Math.sin(a)*rr;
  return{e:e,gl:e.querySelector('.swg'),x:x,y:y,tx:x,ty:y,ph:i*1.1,k:.09,col:col,b:0,res:null,dl:0};
 });
 var cam=0,camT=0,fin=false,raf=0,t0=performance.now();
 function loop(){
  raf=requestAnimationFrame(loop);
  var now=performance.now(),t=(now-t0)/1000,sy=0;
  cur.forEach(function(c){
   c.x+=(c.tx-c.x)*c.k;c.y+=(c.ty-c.y)*c.k;
   if(c.res&&(S.snap||now>c.dl||Math.hypot(c.tx-c.x,c.ty-c.y)<8)){var f=c.res;c.res=null;f()}
   var bx=c.b?0:Math.sin(t*2+c.ph)*3,by=c.b?0:Math.cos(t*2.3+c.ph)*3;
   c.e.style.transform='translate3d('+(c.x+bx)+'px,'+(c.y+by)+'px,0)';
   sy+=c.y;
  });
  camT=fin?0:Math.max(0,Math.min(docH-vh,sy/cur.length-vh*.45));
  cam+=(camT-cam)*.07;
  world.style.transform='translate3d(0,'+(-cam)+'px,0)';
 }
 function measure(){
  H.classList.add('swmeasure');
  var sx=pageXOffset||0,sy=pageYOffset||0;
  docH=Math.max(H.scrollHeight,B.scrollHeight,vh);
  function abs(r){return{x:r.left+sx,y:r.top+sy,w:r.width,h:r.height}}
  function q(s){return [].slice.call(D.querySelectorAll(s))}
  function texts(el){var w=D.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),a=null,z=null,n;while((n=w.nextNode())){if(n.nodeValue.trim()){if(!a)a=n;z=n}}return a?[a,z]:null}
  function trect(el){var t=texts(el);if(!t)return null;var r=D.createRange();r.setStartBefore(t[0]);r.setEndAfter(t[1]);var b=r.getBoundingClientRect();return(b.width>2&&b.height>2)?b:null}
  function fcss(el){var cs=getComputedStyle(el),c=cs.color;if(/rgba\([^)]*,\s*0\)|transparent/.test(c))c='#e8e8e8';return 'font:'+cs.fontStyle+' '+cs.fontWeight+' '+cs.fontSize+'/'+cs.lineHeight+' '+cs.fontFamily+';letter-spacing:'+cs.letterSpacing+';text-transform:'+cs.textTransform+';text-align:'+cs.textAlign+';color:'+c+';'}
  function box(el,ph){if(!el)return;var r=abs(el.getBoundingClientRect());if(r.w>6&&r.h>6)Q.push({k:'b',p:0,r:r,ph:ph})}
  function text(el,o){
   if(!el)return;o=o||{};
   var b=trect(el);if(!b)return;
   var s=(el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();if(!s)return;
   var g=-1;
   if(o.last){var i=s.lastIndexOf(' ');if(i>0)g=i+1}
   if(o.plus){var j=s.indexOf('+');if(j>0)g=j}
   Q.push({k:'t',p:1,r:abs(b),s:s,css:fcss(el),g:g,sk:o.sk});
  }
  box(D.querySelector('.top'));
  var lg=D.querySelector('.logo');
  if(lg){
   var lt=texts(lg),lb=lg.querySelector('b');
   if(lt&&lb){var rg=D.createRange();rg.setStartBefore(lt[0]);rg.setEndAfter(lb);var rc=rg.getBoundingClientRect();if(rc.width>2)Q.push({k:'t',p:1,r:abs(rc),s:'PIXLO FX',css:fcss(lg),g:6})}
   var sm=lg.querySelector('small');if(sm)text(sm);
  }
  q('nav a').forEach(function(e){text(e)});
  box(D.querySelector('.shot'),1);
  text(D.querySelector('.hi'));text(D.querySelector('h1'),{last:1});text(D.querySelector('.role'));
  box(D.querySelector('.bio'));text(D.querySelector('.bio'));
  q('.connect .btn').forEach(function(e){box(e);text(e)});
  q('.socials a').forEach(function(e){box(e)});
  box(D.querySelector('.stats'));
  q('.stats li b').forEach(function(e){text(e,{plus:1})});
  q('.stats li span').forEach(function(e){text(e)});
  q('.ttl').forEach(function(e){text(e)});
  q('.card .ic').forEach(function(e){box(e)});
  q('.card span').forEach(function(e){text(e)});
  box(D.querySelector('.about'));text(D.querySelector('.about'));
  q('.contact').forEach(function(e){box(e);text(e)});
  q('.big').forEach(function(e){text(e,{last:1,sk:1})});
  q('.sub').forEach(function(e){text(e)});
  box(D.querySelector('.tag'));text(D.querySelector('.tag'));
  H.classList.remove('swmeasure');
  Q.sort(function(a,b){return a.r.y-b.r.y||a.p-b.p||a.r.x-b.r.x});
 }
 function moveTo(c,x,y){
  c.tx=x;c.ty=y;
  if(S.snap)return Promise.resolve();
  return new Promise(function(res){c.res=res;c.dl=performance.now()+800});
 }
 async function doBox(c,t){
  var r=t.r;
  await moveTo(c,r.x,r.y);
  var b=D.createElement('div');b.className='swb';
  b.style.cssText='left:'+r.x+'px;top:'+r.y+'px;width:0;height:0;border-color:'+c.col;
  world.appendChild(b);
  if(!S.snap){
   c.b=1;c.gl.style.display='block';
   var dur=Math.min(600,220+Math.max(r.w,r.h)*.5),s0=performance.now();
   while(!S.snap){
    var p=Math.min(1,(performance.now()-s0)/dur),e=1-Math.pow(1-p,3),w=r.w*e,h=r.h*e;
    b.style.width=w+'px';b.style.height=h+'px';
    c.x=c.tx=r.x+w;c.y=c.ty=r.y+h;
    c.gl.textContent=Math.round(w)+' × '+Math.round(h);
    if(p>=1)break;
    await frame();
   }
   c.b=0;c.gl.style.display='none';
  }
  b.style.width=r.w+'px';b.style.height=r.h+'px';
  b.className='swb '+(t.ph?'ph':'fill');
 }
 function paint(d,t,k){
  var s=t.s;
  if(t.g>=0&&k>t.g)d.innerHTML=esc(s.slice(0,t.g))+'<span style="color:#39e61f">'+esc(s.slice(t.g,k))+'</span>';
  else d.textContent=s.slice(0,k);
 }
 async function doText(c,t){
  var r=t.r;
  await moveTo(c,r.x,r.y);
  var d=D.createElement('div');d.className='swt ty';
  d.style.cssText='left:'+r.x+'px;top:'+r.y+'px;width:'+Math.ceil(r.w+6)+'px;'+t.css+(t.sk?'transform:skewX(-6deg);':'');
  world.appendChild(d);
  var n=t.s.length;
  if(!S.snap){
   var dur=Math.min(900,200+n*18),s0=performance.now();
   c.b=1;
   while(!S.snap){
    var p=Math.min(1,(performance.now()-s0)/dur),k=Math.floor(p*n);
    paint(d,t,k);
    c.x=c.tx=r.x+r.w*Math.min(1,k/n);c.y=c.ty=r.y+Math.min(r.h*.5,40)+4;
    if(p>=1)break;
    await frame();
   }
   c.b=0;
  }
  paint(d,t,n);d.classList.remove('ty');
 }
 async function worker(c,delay){
  await sleep(delay);
  while(Q.length&&!S.snap){var t=Q.shift();if(t.k=='b')await doBox(c,t);else await doText(c,t)}
 }
 function end(){
  if(over)return;over=true;
  clearTimeout(safety);release();
  ov.style.transitionDuration=S.skip?'.25s':'.8s';
  ov.style.opacity='0';
  setTimeout(curve,S.skip?250:900);
  setTimeout(function(){cancelAnimationFrame(raf);cleanup()},S.skip?350:1000);
 }
 raf=requestAnimationFrame(loop);
 var ready=false,fp=(D.fonts&&D.fonts.ready)?D.fonts.ready:Promise.resolve();
 Promise.race([fp,new Promise(function(r){setTimeout(r,2000)})]).then(function(){ready=true});
 var g0=performance.now();
 while(!S.snap&&(!ready||performance.now()-g0<1100)){
  var tt=(performance.now()-g0)/1000;
  cur.forEach(function(c,i){var a=tt*2.4+i*1.047;c.tx=vw/2+Math.cos(a)*70;c.ty=vh*.42+Math.sin(a)*70});
  await frame();
 }
 if(S.snap){end();return}
 measure();
 world.style.height=docH+'px';
 H.classList.add('sflock');B.classList.add('sflock');
 cap.style.opacity='0';
 var dl=setTimeout(function(){S.snap=true},4700);
 await Promise.all(cur.map(function(c,i){c.k=.14;return worker(c,i*110)}));
 clearTimeout(dl);S.snap=true;
 while(Q.length){var t=Q.shift();if(t.k=='b')doBox(cur[0],t);else doText(cur[0],t)}
 fin=true;
 cur.forEach(function(c){c.k=.07});
 var f0=performance.now(),hold=S.skip?0:Math.max(900,6600-(f0-t0));
 while(performance.now()-f0<hold){
  var u=(performance.now()-t0)/1000;
  cur.forEach(function(c,i){var a=u*1.6+i*1.047;c.tx=vw/2+Math.cos(a)*vw*.28;c.ty=vh*.5+Math.sin(a)*vh*.18});
  await frame();
 }
 end();
}
})();
