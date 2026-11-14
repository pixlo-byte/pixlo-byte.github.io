(function(){
var pf=document.getElementById('pkf');
if(!pf)return;
var pk=pf.parentNode.parentNode;
var btn=document.createElement('button');
btn.className='gpick';btn.id='pkm';btn.textContent='🔫 MINI MILITIA';
pf.parentNode.appendChild(btn);
function $(i){return document.getElementById(i)}
var lb=document.createElement('div');lb.className='gm';
lb.innerHTML='<div class="gbox mlbox"><button class="gx" id="mlx">✕</button><h3>MINI <b>MILITIA</b></h3><p class="gmsg" id="mlmsg">2-12 players. Bots fill empty slots. Play in landscape.</p><input id="mlname" class="mlin" maxlength="12" placeholder="Your name"><div class="mlrow"><span>Total players</span><select id="mln" class="mlsel"><option>4</option><option selected>6</option><option>8</option><option>12</option></select></div><button class="gpick" id="mlsolo">🤖 PLAY VS BOTS</button><button class="gpick" id="mlcre">🏠 CREATE ROOM</button><input id="mlcode" class="mlin" maxlength="5" placeholder="Room code"><button class="gpick" id="mljoin">🔗 JOIN ROOM</button></div>';
document.body.appendChild(lb);
var gv=document.createElement('div');gv.id='mmgame';
gv.innerHTML='<canvas id="mmc"></canvas><button id="mmx">✕</button><button id="mmcode"></button><div class="mmj" id="mmjl"><i></i></div><div class="mmj" id="mmjr"><i></i></div><div id="mmrot">Rotate your phone to landscape</div>';
document.body.appendChild(gv);
var cv=$('mmc'),ctx=cv.getContext('2d'),dpr=1;
var W=1600,H=640,PW=24,PH=40,STEP=1/60;
var PLAT=[[0,600,1600,40],[150,480,260,20],[600,500,220,20],[1000,480,260,20],[380,360,240,20],[900,340,240,20],[40,320,200,20],[1360,320,200,20],[680,220,240,20],[300,200,160,20],[1140,200,160,20]];
var SP=[[100,560],[800,560],[1500,560],[250,440],[700,460],[1100,440],[480,320],[1000,300],[780,180]];
var COL=['#39e61f','#ff4d4d','#4da6ff','#ffd24d','#ff7ad9','#a07aff','#ff9a3d','#3dffd9','#c8ff3d','#ff3d7a','#7aa0ff','#e0e0e0'];
var BN=['Rex','Nova','Blitz','Kai','Ziggy','Dash','Echo','Rogue','Volt','Gizmo','Tank','Ace'];
var dAt=0,running=false,isHost=false,myId=0,players=[],bullets=[],events=[],feed=[],phase='play',T=180,overT=0,winner='',target=6,nextId=1,botId=100,peer=null,conns={},hostConn=null,roomCode='',raf=0,acc=0,last=0,sendT=0,inT=0,snapAt=0,lastShot=0,name='Player',camx=0,camy=0,FACES=null,SD=null,SK=null,AC=null;
var inp={l:0,r:0,j:0,a:0,f:0};
function rnd(a){return a[Math.floor(Math.random()*a.length)]}
function stat(t){$('mlmsg').textContent=t}
function mk(id,nm,bot){return{id:id,name:nm,bot:bot,x:0,y:0,vx:0,vy:0,hp:100,dir:1,a:0,fuel:100,on:false,alive:false,rt:0,k:0,d:0,cd:0,inv:0,ait:0,wd:1,ci:id%12,inp:{l:0,r:0,j:0,a:0,f:0}}}
function byId(id){for(var i=0;i<players.length;i++)if(players[i].id==id)return players[i];return null}
function tone(f,d,v,ty){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain();o.type=ty||'square';o.frequency.value=f;g.gain.value=v||.05;o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function pl(a,f){try{a.currentTime=0;var p=a.play();if(p&&p.catch)p.catch(function(){tone(f,.2,.1)})}catch(e){}}
function spawn(p){
 var best=rnd(SP),bd=-1;
 for(var n=0;n<4;n++){var s=rnd(SP),m=1e9;
  players.forEach(function(q){if(q!==p&&q.alive){var d=Math.abs(q.x-s[0])+Math.abs(q.y-s[1]);if(d<m)m=d}});
  if(m>bd){bd=m;best=s}}
 p.x=best[0];p.y=best[1];p.vx=0;p.vy=0;p.hp=100;p.fuel=100;p.alive=true;p.inv=1.5;
}
function hit(x,y,w,h){for(var i=0;i<PLAT.length;i++){var r=PLAT[i];if(x<r[0]+r[2]&&x+w>r[0]&&y<r[1]+r[3]&&y+h>r[1])return r}return null}
function onEv(ev){
 feed.push({t:Date.now(),s:(ev[2]||'World')+' 💥 '+ev[3]});
 if(ev[0]==myId&&ev[1]!=myId&&SK)pl(SK,900);
 if(ev[1]==myId&&SD)pl(SD,150);
}
function kill(v,k){
 v.alive=false;v.rt=5;v.d++;v.hp=0;
 if(k&&k!==v)k.k++;
 var ev=[k?k.id:-1,v.id,k?k.name:'',v.name];
 events.push(ev);onEv(ev);
}
function ai(p,dt){
 var i=p.inp;p.ait-=dt;
 if(p.ait>0)return;
 p.ait=.1+Math.random()*.12;
 var t=null,bd=1e9;
 players.forEach(function(q){if(q!==p&&q.alive){var d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;t=q}}});
 i.l=0;i.r=0;i.j=0;i.f=0;
 if(!t){if(Math.random()<.2)p.wd=-p.wd;if(p.wd<0)i.l=1;else i.r=1;return}
 var dx=t.x-p.x,dy=t.y-p.y,sx=dx>0?1:-1;
 if(bd>340){if(sx>0)i.r=1;else i.l=1}
 else if(bd<150){if(sx>0)i.l=1;else i.r=1}
 else if(Math.random()<.5){if(Math.random()<.5)i.l=1;else i.r=1}
 if(dy<-40||(p.on&&Math.random()<.05)||(Math.abs(p.vx)<5&&(i.l||i.r)))i.j=1;
 if(p.fuel<10)i.j=0;
 i.a=Math.atan2(dy,dx)+(Math.random()-.5)*.25*(1+bd/450);
 if(bd<700&&Math.random()<.8)i.f=1;
}
function stepP(p,dt){
 if(!p.alive){p.rt-=dt;if(p.rt<=0)spawn(p);return}
 if(p.bot)ai(p,dt);
 var i=p.inp,ax=(i.r?1:0)-(i.l?1:0);
 p.vx+=(ax*190-p.vx)*Math.min(1,(p.on?14:4)*dt);
 if(i.j&&p.fuel>0){p.vy-=1500*dt;if(p.vy<-240)p.vy=-240;p.fuel-=40*dt}
 else p.fuel=Math.min(100,p.fuel+(p.on?55:6)*dt);
 p.vy+=900*dt;if(p.vy>620)p.vy=620;
 p.x+=p.vx*dt;
 var r=hit(p.x,p.y,PW,PH);
 if(r){if(p.vx>0)p.x=r[0]-PW;else if(p.vx<0)p.x=r[0]+r[2];p.vx=0}
 p.y+=p.vy*dt;p.on=false;
 r=hit(p.x,p.y,PW,PH);
 if(r){if(p.vy>0){p.y=r[1]-PH;p.on=true}else if(p.vy<0)p.y=r[1]+r[3];p.vy=0}
 if(p.x<0)p.x=0;if(p.x>W-PW)p.x=W-PW;if(p.y<0){p.y=0;if(p.vy<0)p.vy=0}
 var a=i.a;if(!isFinite(a))a=0;p.a=a;
 if(i.f)p.dir=Math.cos(a)>=0?1:-1;else if(ax)p.dir=ax;
 if(p.inv>0)p.inv-=dt;
 p.cd-=dt;
 if(i.f&&p.cd<=0){p.cd=.11;var sp=a+(Math.random()-.5)*.08;bullets.push({x:p.x+12+Math.cos(a)*26,y:p.y+24+Math.sin(a)*26,vx:Math.cos(sp)*760,vy:Math.sin(sp)*760,o:p.id,life:.9})}
}
function stepB(dt){
 for(var n=bullets.length-1;n>=0;n--){
  var b=bullets[n];b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt;
  var dead=b.life<=0||b.x<0||b.x>W||b.y<0||b.y>H||hit(b.x-1,b.y-1,2,2);
  if(!dead){
   for(var j=0;j<players.length;j++){
    var q=players[j];
    if(!q.alive||q.id==b.o||q.inv>0)continue;
    if(b.x>q.x&&b.x<q.x+PW&&b.y>q.y&&b.y<q.y+PH){
     q.hp-=12;dead=true;
     if(q.hp<=0)kill(q,byId(b.o));
     break;
    }
   }
  }
  if(dead)bullets.splice(n,1);
 }
}
function newMatch(){phase='play';T=180;bullets=[];players.forEach(function(p){p.k=0;p.d=0;spawn(p)})}
function simStep(dt){
 if(phase=='over'){overT-=dt;if(overT<=0)newMatch();return}
 T-=dt;
 if(T<=0){T=0;phase='over';overT=8;var w=null;players.forEach(function(p){if(!w||p.k>w.k)w=p});winner=w?w.name+' ('+w.k+' kills)':'';return}
 players.forEach(function(p){stepP(p,dt)});
 stepB(dt);
}
function balance(){
 var humans=players.filter(function(p){return !p.bot}).length;
 var want=Math.max(0,target-humans),bots=players.filter(function(p){return p.bot});
 while(bots.length>want){var b=bots.pop();players.splice(players.indexOf(b),1)}
 while(bots.length<want){var nb=mk(botId,BN[botId%BN.length],true);botId++;nb.rt=.5;players.push(nb);bots.push(nb)}
}
function broadcast(){
 var ids=Object.keys(conns);
 if(!ids.length){events.length=0;return}
 var m={t:'s',p:players.map(function(p){return[p.id,Math.round(p.x),Math.round(p.y),p.hp|0,p.dir,Math.round(p.a*100)/100,p.name,p.k,p.d,p.alive?1:0,p.bot?1:0,Math.round(p.fuel)]}),b:bullets.map(function(b){return[Math.round(b.x),Math.round(b.y),Math.round(b.vx),Math.round(b.vy)]}),e:events,tm:Math.ceil(T),ph:phase,w:winner};
 events=[];
 ids.forEach(function(id){var c=conns[id];if(c&&c.open){try{c.send(m)}catch(e){}}});
}
function onSnap(m){
 snapAt=performance.now();
 var seen={};
 m.p.forEach(function(a){
  var p=byId(a[0]),was=true;
  if(!p){p=mk(a[0],a[6],!!a[10]);p.x=a[1];p.y=a[2];players.push(p);was=false}
  else was=p.alive;
  p.tx=a[1];p.ty=a[2];p.hp=a[3];p.dir=a[4];p.a=a[5];p.name=a[6];p.k=a[7];p.d=a[8];p.alive=!!a[9];p.bot=!!a[10];p.fuel=a[11];
  if(!was&&p.alive){p.x=p.tx;p.y=p.ty}
  seen[a[0]]=1;
 });
 players=players.filter(function(p){return seen[p.id]});
 bullets=m.b.map(function(a){return{x:a[0],y:a[1],vx:a[2],vy:a[3]}});
 (m.e||[]).forEach(onEv);
 T=m.tm;phase=m.ph;winner=m.w||'';
}
function onHostConn(c){
 var pid=null;
 c.on('data',function(m){
  if(!m||typeof m!='object')return;
  if(m.t=='j'&&pid===null){
   var humans=players.filter(function(p){return !p.bot}).length;
   if(humans>=12){try{c.send({t:'full'})}catch(e){}setTimeout(function(){try{c.close()}catch(e){}},300);return}
   pid=nextId++;
   var nm=String(m.n||'Player').replace(/[^\w .\-]/g,'').slice(0,12)||'Player';
   var p=mk(pid,nm,false);p.rt=.3;
   players.push(p);conns[pid]=c;balance();
   c.send({t:'w',id:pid});
  }else if(m.t=='i'&&pid!==null){
   var q=byId(pid);if(!q)return;var i=q.inp;
   i.l=m.l?1:0;i.r=m.r?1:0;i.j=m.j?1:0;i.f=m.f?1:0;i.a=isFinite(+m.a)?+m.a:0;
  }
 });
 function gone(){if(pid===null)return;var p=byId(pid);if(p)players.splice(players.indexOf(p),1);delete conns[pid];pid=null;balance()}
 c.on('close',gone);c.on('error',gone);
}
function onClientData(m){
 if(!m)return;
 if(m.t=='w'){myId=m.id;if(!running)startGame(false)}
 else if(m.t=='s'){if(running)onSnap(m)}
 else if(m.t=='full'){stat('Room is full (12 players).');shut()}
}
function loadPeer(ok,bad){
 if(window.Peer)return ok();
 var s=document.createElement('script');
 s.src='https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js';
 s.onload=ok;s.onerror=bad;document.head.appendChild(s);
}
function mkcode(){var s='ABCDEFGHJKMNPQRSTUVWXYZ23456789',r='';for(var i=0;i<5;i++)r+=s[Math.floor(Math.random()*s.length)];return r}
function create(tries){
 loadPeer(function(){
  var code=mkcode(),p=new Peer('pixlomm-'+code);
  p.on('open',function(){peer=p;roomCode=code;p.on('connection',onHostConn);startGame(true)});
  p.on('error',function(e){
   if(running)return;
   try{p.destroy()}catch(_){}
   if(e.type=='unavailable-id'&&tries<3)return create(tries+1);
   stat('Could not create room ('+e.type+'). Check internet.');
  });
 },function(){stat('Could not load the online service. Check internet.')});
}
function join(code){
 loadPeer(function(){
  var p=new Peer(),done=false;
  var to=setTimeout(function(){if(!done&&!running){stat('Could not reach the room. Check the code or try Wi-Fi.');try{p.destroy()}catch(_){}}},10000);
  p.on('open',function(){
   var c=p.connect('pixlomm-'+code,{serialization:'json'});
   c.on('open',function(){done=true;clearTimeout(to);peer=p;hostConn=c;c.send({t:'j',n:name})});
   c.on('data',onClientData);
   c.on('close',function(){if(running){leave();lb.classList.add('on');stat('Host left the room.')}});
  });
  p.on('error',function(e){
   clearTimeout(to);
   if(running)return;
   stat(e.type=='peer-unavailable'?'Room not found. Check the code.':'Network error ('+e.type+')');
   try{p.destroy()}catch(_){}
  });
 },function(){stat('Could not load the online service. Check internet.')});
}
function shut(){
 try{Object.keys(conns).forEach(function(i){conns[i].close()})}catch(e){}
 try{if(hostConn)hostConn.close()}catch(e){}
 try{if(peer)peer.destroy()}catch(e){}
 peer=null;conns={};hostConn=null;
}
function leave(){
 running=false;cancelAnimationFrame(raf);shut();roomCode='';
 inp.l=0;inp.r=0;inp.j=0;inp.f=0;
 gv.classList.remove('on');
 try{if(document.fullscreenElement)document.exitFullscreen()}catch(e){}
 try{screen.orientation.unlock()}catch(e){}
}
function size(){
 dpr=Math.min(2,window.devicePixelRatio||1);
 cv.width=Math.round(innerWidth*dpr);cv.height=Math.round(innerHeight*dpr);
 $('mmrot').style.display=innerHeight>innerWidth?'flex':'none';
}
window.addEventListener('resize',function(){if(running)size()});
function startGame(host){
 isHost=host;running=true;players=[];bullets=[];events=[];feed=[];phase='play';T=180;winner='';last=0;acc=0;
 if(!FACES){FACES=[new Image(),new Image()];FACES[0].src='friend.png';FACES[1].src='flappy.png'}
 SD=SD||new Audio('wasted.mp3');SK=SK||new Audio('kill.m4a');
 lb.classList.remove('on');gv.classList.add('on');
 if(host){
  myId=0;nextId=1;botId=100;
  var me=mk(0,name,false);me.inp=inp;players.push(me);spawn(me);balance();
 }
 var cb=$('mmcode');cb.style.display=roomCode?'block':'none';cb.textContent=roomCode?'ROOM '+roomCode+' 📋':'';
 try{var el=document.documentElement,f=el.requestFullscreen||el.webkitRequestFullscreen,pr=f.call(el);if(pr&&pr.catch)pr.catch(function(){})}catch(e){}
 try{var q=screen.orientation.lock('landscape');if(q&&q.catch)q.catch(function(){})}catch(e){}
 size();raf=requestAnimationFrame(frame);
}
function frame(ts){
 if(!running)return;
 raf=requestAnimationFrame(frame);
 var dt=last?Math.min(.1,(ts-last)/1000):0;last=ts;
 if(isHost){
  acc+=dt;var n=0;
  while(acc>=STEP&&n<6){simStep(STEP);acc-=STEP;n++}
  if(n>=6)acc=0;
  sendT-=dt;if(sendT<=0){sendT=.05;if(peer)broadcast();else events.length=0}
 }else{
  inT-=dt;
  if(inT<=0){inT=.033;if(hostConn&&hostConn.open){try{hostConn.send({t:'i',l:inp.l,r:inp.r,j:inp.j,a:inp.a,f:inp.f})}catch(e){}}}
  var k=Math.min(1,dt*14);
  players.forEach(function(p){if(p.tx!==undefined){p.x+=(p.tx-p.x)*k;p.y+=(p.ty-p.y)*k}});
 }
 var me=byId(myId);
 if(me&&me.alive&&inp.f&&ts-lastShot>120){lastShot=ts;tone(130+Math.random()*50,.05,.035,'sawtooth')}
 draw(me);
}
function drawP(p){
 if(!p.alive)return;
 var px=p.x,py=p.y,col=COL[p.ci%12];
 if(p.inv>0&&Math.floor(Date.now()/100)%2)ctx.globalAlpha=.5;
 var rising=p.ly!==undefined&&p.y<p.ly-.4;p.ly=p.y;
 if(rising){ctx.fillStyle='#ff9a3d';ctx.beginPath();ctx.moveTo(px+6,py+40);ctx.lineTo(px+18,py+40);ctx.lineTo(px+12,py+50+Math.random()*8);ctx.fill()}
 ctx.fillStyle=col;ctx.fillRect(px+4,py+20,16,20);
 ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(px+(p.dir>0?2:18),py+22,4,12);
ctx.fillStyle=col;ctx.beginPath();ctx.arc(px+12,py+10,12,0,7);ctx.fill();ctx.fillStyle='rgba(0,0,0,.75)';ctx.fillRect(px+(p.dir>0?10:2),py+6,12,7);ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillRect(px+(p.dir>0?17:4),py+8,3,2);ctx.lineWidth=2;ctx.strokeStyle='#fff';ctx.beginPath();ctx.arc(px+12,py+10,12,0,7);ctx.stroke();
 ctx.strokeStyle='#ddd';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(px+12,py+24);ctx.lineTo(px+12+Math.cos(p.a)*26,py+24+Math.sin(p.a)*26);ctx.stroke();
 ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(px-3,py-14,30,4);
 ctx.fillStyle=p.hp>40?'#39e61f':'#ff4d4d';ctx.fillRect(px-3,py-14,30*Math.max(0,p.hp)/100,4);
 ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillStyle=p.id==myId?'#39e61f':'#fff';ctx.fillText(p.name,px+12,py-18);
 ctx.globalAlpha=1;
}
function draw(me){
 var k=cv.height/360,vw=cv.width/k,vh=360;
 if(me){
  var ccx=me.x+12,ccy=me.y+20;
  camx=Math.max(0,Math.min(W-vw,ccx-vw/2));
  camy=Math.max(0,Math.min(H-vh,ccy-vh/2));
 }
 if(vw>=W)camx=(W-vw)/2;
 ctx.setTransform(1,0,0,1,0,0);
 var g=ctx.createLinearGradient(0,0,0,cv.height);g.addColorStop(0,'#04120a');g.addColorStop(1,'#0b2a10');
 ctx.fillStyle=g;ctx.fillRect(0,0,cv.width,cv.height);
 ctx.setTransform(k,0,0,k,-camx*k,-camy*k);
 ctx.strokeStyle='rgba(57,230,31,.06)';ctx.lineWidth=1;ctx.beginPath();
 for(var gx=0;gx<=W;gx+=100){ctx.moveTo(gx,0);ctx.lineTo(gx,H)}
 for(var gy=0;gy<=H;gy+=100){ctx.moveTo(0,gy);ctx.lineTo(W,gy)}
 ctx.stroke();
 ctx.strokeStyle='rgba(57,230,31,.5)';ctx.strokeRect(0,0,W,H);
 ctx.shadowColor='#39e61f';ctx.shadowBlur=8;ctx.fillStyle='#0b1f0f';ctx.strokeStyle='#39e61f';ctx.lineWidth=2;
 PLAT.forEach(function(r){ctx.fillRect(r[0],r[1],r[2],r[3]);ctx.strokeRect(r[0],r[1],r[2],r[3])});
 ctx.shadowBlur=0;
 var bt=isHost?0:Math.min(.12,(performance.now()-snapAt)/1000);
 ctx.fillStyle='#fff6a0';ctx.shadowColor='#ffd24d';ctx.shadowBlur=6;
 bullets.forEach(function(b){ctx.beginPath();ctx.arc(b.x+b.vx*bt,b.y+b.vy*bt,2.5,0,7);ctx.fill()});
 ctx.shadowBlur=0;
 players.forEach(drawP);
 hud(me);
}
function hud(me){
 ctx.setTransform(1,0,0,1,0,0);
 var d=dpr,fs=Math.round(13*d);
 ctx.textAlign='center';ctx.font='bold '+fs+'px sans-serif';
 var tm=Math.max(0,Math.ceil(T)),mm=Math.floor(tm/60),ss=tm%60;
 ctx.fillStyle='#fff';ctx.fillText(mm+':'+(ss<10?'0':'')+ss,cv.width/2,fs+6*d);
 var sb=players.slice().sort(function(a,b){return b.k-a.k||a.d-b.d}).slice(0,5);
 ctx.textAlign='right';ctx.font=Math.round(11*d)+'px sans-serif';
 sb.forEach(function(p,i){ctx.fillStyle=p.id==myId?'#39e61f':'#ddd';ctx.fillText((i+1)+'. '+p.name+'  '+p.k,cv.width-10*d,(16+i*14)*d)});
 ctx.textAlign='left';var nw=Date.now();
 feed=feed.filter(function(f){return nw-f.t<5000});
 feed.slice(-4).forEach(function(f,i){ctx.fillStyle='rgba(255,255,255,.9)';ctx.fillText(f.s,10*d,(64+i*14)*d)});
 if(me){
  var bw=150*d,bx=cv.width/2-bw/2,by=cv.height-26*d;
  ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(bx,by,bw,8*d);
  ctx.fillStyle=me.hp>40?'#39e61f':'#ff4d4d';ctx.fillRect(bx,by,bw*Math.max(0,me.hp)/100,8*d);
  ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(bx,by+11*d,bw,6*d);
  ctx.fillStyle='#4da6ff';ctx.fillRect(bx,by+11*d,bw*Math.max(0,me.fuel)/100,6*d);
  if(me.alive){dAt=0}else if(!dAt){dAt=performance.now()}
  if(!me.alive&&phase!='over'){
   var el=(performance.now()-dAt)/1000,left=Math.max(0,5-el),cw=cv.width,ch=cv.height;
   ctx.fillStyle='rgba(255,0,0,'+(.1+.3*(.5+.5*Math.sin(el*10)))+')';ctx.fillRect(0,0,cw,ch);
   var vg=ctx.createRadialGradient(cw/2,ch/2,ch*.25,cw/2,ch/2,ch*.95);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(90,0,0,.7)');ctx.fillStyle=vg;ctx.fillRect(0,0,cw,ch);
   ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,ch*.36,cw,ch*.26);
   ctx.globalAlpha=Math.min(1,el*3);ctx.textAlign='center';ctx.font='bold '+Math.round(70*d)+'px Impact,sans-serif';ctx.shadowColor='#000';ctx.shadowBlur=12*d;ctx.fillStyle='#d4141f';ctx.fillText('WASTED',cw/2,ch*.52);ctx.shadowBlur=0;ctx.globalAlpha=1;
   ctx.font='bold '+Math.round(15*d)+'px sans-serif';ctx.fillStyle='#fff';ctx.fillText('Respawning in '+Math.max(1,Math.ceil(left))+'s',cw/2,ch-46*d);
   ctx.fillStyle='rgba(255,255,255,.2)';ctx.fillRect(cw/2-100*d,ch-40*d,200*d,5*d);ctx.fillStyle='#ff4d4d';ctx.fillRect(cw/2-100*d,ch-40*d,200*d*(1-left/5),5*d);
  }
 }else{ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='bold '+Math.round(18*d)+'px sans-serif';ctx.fillText('Connecting…',cv.width/2,cv.height/2)}
 if(phase=='over'){
  ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(0,0,cv.width,cv.height);
  ctx.textAlign='center';ctx.fillStyle='#39e61f';ctx.font='bold '+Math.round(26*d)+'px sans-serif';
  ctx.fillText('MATCH OVER',cv.width/2,cv.height*.3);
  ctx.fillStyle='#fff';ctx.font=Math.round(15*d)+'px sans-serif';
  ctx.fillText('Winner: '+winner,cv.width/2,cv.height*.3+26*d);
  sb.forEach(function(p,i){ctx.fillStyle=p.id==myId?'#39e61f':'#ddd';ctx.fillText((i+1)+'. '+p.name+' - '+p.k+' kills',cv.width/2,cv.height*.3+(54+i*20)*d)});
  ctx.fillStyle='#aaa';ctx.fillText('Next match starting…',cv.width/2,cv.height*.3+(70+sb.length*20)*d);
 }
}
function stick(el,cb){
 var id=null,cx=0,cy=0,R=55,knob=el.firstChild;
 function upd(e){var dx=e.clientX-cx,dy=e.clientY-cy,m=Math.hypot(dx,dy);if(m>R){dx*=R/m;dy*=R/m}knob.style.transform='translate('+dx+'px,'+dy+'px)';cb(dx/R,dy/R,true)}
 el.addEventListener('pointerdown',function(e){e.preventDefault();id=e.pointerId;try{el.setPointerCapture(id)}catch(_){}var r=el.getBoundingClientRect();cx=r.left+r.width/2;cy=r.top+r.height/2;upd(e)});
 el.addEventListener('pointermove',function(e){if(e.pointerId==id)upd(e)});
 function end(e){if(e.pointerId==id){id=null;knob.style.transform='';cb(0,0,false)}}
 el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
}
stick($('mmjl'),function(dx,dy,on){inp.l=on&&dx<-.3?1:0;inp.r=on&&dx>.3?1:0;inp.j=on&&dy<-.45?1:0});
stick($('mmjr'),function(dx,dy,on){var m=Math.hypot(dx,dy);if(on&&m>.2)inp.a=Math.atan2(dy,dx);inp.f=on&&m>.25?1:0});
function kb(e,v){var k=(e.key||'').toLowerCase();if(k=='a'||k=='arrowleft')inp.l=v;else if(k=='d'||k=='arrowright')inp.r=v;else if(k=='w'||k=='arrowup'||k==' ')inp.j=v;else return;e.preventDefault()}
document.addEventListener('keydown',function(e){if(running)kb(e,1)});
document.addEventListener('keyup',function(e){if(running)kb(e,0)});
function aimM(e){var me=byId(myId);if(!me)return;var k=cv.height/360;inp.a=Math.atan2(e.clientY-(me.y+24-camy)*k/dpr,e.clientX-(me.x+12-camx)*k/dpr)}
cv.addEventListener('pointerdown',function(e){if(e.pointerType=='mouse'){inp.f=1;aimM(e)}});
cv.addEventListener('pointermove',function(e){if(e.pointerType=='mouse')aimM(e)});
cv.addEventListener('pointerup',function(e){if(e.pointerType=='mouse')inp.f=0});
$('mmx').onclick=function(){leave();lb.classList.add('on');stat('2-12 players. Bots fill empty slots. Play in landscape.')};
$('mmcode').onclick=function(){
 var t='Join my Mini Militia! Open '+location.href.split('#')[0]+' then Gaming > Mini Militia > Join Room. Code: '+roomCode;
 try{if(navigator.share){navigator.share({text:t});return}}catch(e){}
 try{navigator.clipboard.writeText(t);feed.push({t:Date.now(),s:'Invite copied!'})}catch(e){}
};
function getName(){
 var n=$('mlname').value.replace(/[^\w .\-]/g,'').trim().slice(0,12);
 if(!n)n='Player'+Math.floor(Math.random()*90+10);
 try{localStorage.setItem('mmname',n)}catch(e){}
 return n;
}
try{$('mlname').value=localStorage.getItem('mmname')||''}catch(e){}
$('mlsolo').onclick=function(){name=getName();target=+$('mln').value;roomCode='';startGame(true)};
$('mlcre').onclick=function(){name=getName();target=+$('mln').value;stat('Creating room…');create(0)};
$('mljoin').onclick=function(){
 name=getName();
 var c=$('mlcode').value.toUpperCase().replace(/[^A-Z0-9]/g,'');
 if(c.length<4){stat('Type the room code first');return}
 stat('Joining…');join(c);
};
btn.onclick=function(){pk.classList.remove('on');lb.classList.add('on')};
$('mlx').onclick=function(){lb.classList.remove('on')};
})();
