(function(){
var card=document.getElementById('work');
if(!card)return;
card.style.cursor='pointer';
var F=[['Original','none'],['✨ Dreamy','DREAM'],['🍂 Golden','GOLD'],['🌫️ Misty','MIST'],['🌧️ Monsoon','MONSOON'],['🌸 Magenta','MAG'],['🌸 Magenta + Boxes','MAGB'],['📼 Retro Film','RETRO'],['🥀 Rose Vintage','ROSE'],['Neon','sepia(1) hue-rotate(55deg) saturate(3) contrast(1.1)'],['B&W','grayscale(1) contrast(1.2)'],['Vintage','sepia(.7) contrast(1.1) brightness(.95) saturate(1.3)'],['Warm','sepia(.35) saturate(1.4) brightness(1.05)'],['Cinema','contrast(1.25) saturate(.85) brightness(.9)'],['Pop','saturate(2) contrast(1.1)'],['Fade','contrast(.85) brightness(1.15) saturate(.8)'],['Dark','brightness(.75) contrast(1.4) saturate(1.2)']];
var m=document.createElement('div');m.className='gm';
m.innerHTML='<div class="gbox fbox"><button class="gx" id="fx">✕</button><h3>PHOTO <b>FILTERS</b></h3><div class="fprev"><canvas id="fc" width="320" height="320"></canvas><p id="fhint">Choose a photo or take one</p></div><div class="frow"><label class="fbtn">📁 Choose<input type="file" accept="image/*" id="fin" hidden></label><label class="fbtn">📷 Camera<input type="file" accept="image/*" capture="environment" id="fcam" hidden></label></div><div class="fstrip" id="fs"></div><div class="fsl"><span>Brightness</span><input type="range" id="fb" min="50" max="150" value="100"></div><div class="fsl"><span>Contrast</span><input type="range" id="fk" min="50" max="150" value="100"></div><div class="fsl"><span>Grain</span><input type="range" id="fg" min="0" max="100" value="35"></div><button class="gbtn" id="fdl">DOWNLOAD</button></div>';
document.body.appendChild(m);
function $(i){return document.getElementById(i)}
var c=$('fc'),x=c.getContext('2d'),img=null,cur=0,strip=$('fs');
function flt(){var f=F[cur][1];if(f=='none'||f=='DREAM'||f=='GOLD'||f=='MIST'||f=='MONSOON'||f=='MAG'||f=='MAGB'||f=='RETRO'||f=='ROSE')f='';return (f+' brightness('+$('fb').value/100+') contrast('+$('fk').value/100+')').trim()}
var gp=null;
var GRN=.35,gpK=-1;
function grain(g){
 if(!gp||gpK!==GRN){
  var s0=document.createElement('canvas');s0.width=s0.height=100;
  var q0=s0.getContext('2d'),d=q0.createImageData(100,100),a=GRN*200;
  for(var i=0;i<d.data.length;i+=4){var v=128+(Math.random()-.5)*a;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}
  q0.putImageData(d,0,0);
  var n=document.createElement('canvas');n.width=n.height=200;
  var q=n.getContext('2d');q.imageSmoothingEnabled=true;q.drawImage(s0,0,0,200,200);
  gp=n;gpK=GRN;
 }
 return g.createPattern(gp,'repeat');
}
function dream(g,im,w,h){
 var m=Math.max(w,h);
 g.save();g.globalAlpha=1;g.globalCompositeOperation='source-over';
 g.filter='brightness(.82) contrast(1.12) saturate(.95) sepia(.22)';
 g.drawImage(im,0,0,w,h);
 g.globalCompositeOperation='screen';g.globalAlpha=.55;
 g.filter='blur('+(m*.012)+'px) brightness(1.35) saturate(1.25)';
 g.drawImage(im,0,0,w,h);
 var t=document.createElement('canvas');t.width=w;t.height=h;var tg=t.getContext('2d');
 tg.filter='blur('+(m*.02)+'px) brightness(.9)';tg.drawImage(im,0,0,w,h);tg.filter='none';
 tg.globalCompositeOperation='destination-in';
 var rg=tg.createRadialGradient(w*.55,h*.55,Math.min(w,h)*.2,w*.55,h*.55,m*.75);
 rg.addColorStop(0,'rgba(0,0,0,0)');rg.addColorStop(1,'rgba(0,0,0,1)');
 tg.fillStyle=rg;tg.fillRect(0,0,w,h);
 g.filter='none';g.globalCompositeOperation='source-over';g.globalAlpha=.85;g.drawImage(t,0,0);
 g.globalCompositeOperation='soft-light';g.globalAlpha=.6;g.fillStyle='#ff9a5a';g.fillRect(0,0,w,h);
 var lk=g.createRadialGradient(w*.12,h*.72,0,w*.12,h*.72,m*.5);
 lk.addColorStop(0,'rgba(255,225,190,.8)');lk.addColorStop(.4,'rgba(255,170,110,.25)');lk.addColorStop(1,'rgba(255,140,80,0)');
 g.globalCompositeOperation='screen';g.globalAlpha=.55;g.fillStyle=lk;g.fillRect(0,0,w,h);
 var vg=g.createRadialGradient(w/2,h/2,m*.2,w/2,h/2,m*.75);
 vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.65)');
 g.globalCompositeOperation='multiply';g.globalAlpha=1;g.fillStyle=vg;g.fillRect(0,0,w,h);
 g.globalCompositeOperation='overlay';g.globalAlpha=.22;g.fillStyle=grain(g);g.fillRect(0,0,w,h);
 g.restore();
}
function gold(g,im,w,h){
 var m=Math.max(w,h);
 g.save();g.globalAlpha=1;g.globalCompositeOperation='source-over';
 g.filter='sepia(.55) saturate(1.35) contrast(1.05) brightness(.95) hue-rotate(-8deg)';
 g.drawImage(im,0,0,w,h);
 g.globalCompositeOperation='screen';g.globalAlpha=.35;
 g.filter='blur('+(m*.008)+'px) brightness(1.25) sepia(.4)';
 g.drawImage(im,0,0,w,h);
 g.filter='none';g.globalCompositeOperation='soft-light';g.globalAlpha=.55;g.fillStyle='#ffa23a';g.fillRect(0,0,w,h);
 var lk=g.createRadialGradient(w*.9,h*.05,0,w*.9,h*.05,m*.6);
 lk.addColorStop(0,'rgba(255,214,140,.7)');lk.addColorStop(1,'rgba(255,170,80,0)');
 g.globalCompositeOperation='screen';g.globalAlpha=.5;g.fillStyle=lk;g.fillRect(0,0,w,h);
 g.globalCompositeOperation='lighten';g.globalAlpha=.9;g.fillStyle='#2a1a0c';g.fillRect(0,0,w,h);
 var vg=g.createRadialGradient(w/2,h/2,m*.25,w/2,h/2,m*.8);
 vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(30,12,0,.5)');
 g.globalCompositeOperation='multiply';g.globalAlpha=1;g.fillStyle=vg;g.fillRect(0,0,w,h);
 g.globalCompositeOperation='overlay';g.globalAlpha=.2;g.fillStyle=grain(g);g.fillRect(0,0,w,h);
 g.restore();
}
function mist(g,im,w,h){
 var m=Math.max(w,h);
 g.save();g.globalAlpha=1;g.globalCompositeOperation='source-over';
 g.filter='sepia(.3) hue-rotate(38deg) saturate(.95) contrast(.92) brightness(1.06)';
 g.drawImage(im,0,0,w,h);
 g.filter='none';
 g.globalCompositeOperation='soft-light';g.globalAlpha=.5;g.fillStyle='#6fae4a';g.fillRect(0,0,w,h);
 g.globalCompositeOperation='screen';g.globalAlpha=.3;
 g.filter='blur('+(m*.01)+'px) brightness(1.2)';g.drawImage(im,0,0,w,h);
 g.filter='none';
 var fg=g.createLinearGradient(0,0,0,h*.7);
 fg.addColorStop(0,'rgba(228,240,208,.8)');fg.addColorStop(.55,'rgba(228,240,208,.35)');fg.addColorStop(1,'rgba(228,240,208,0)');
 g.globalCompositeOperation='source-over';g.globalAlpha=1;g.fillStyle=fg;g.fillRect(0,0,w,h);
 g.globalCompositeOperation='lighten';g.globalAlpha=1;g.fillStyle='#1c281a';g.fillRect(0,0,w,h);
 var vg=g.createRadialGradient(w/2,h/2,m*.3,w/2,h/2,m*.8);
 vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(10,25,10,.45)');
 g.globalCompositeOperation='multiply';g.fillStyle=vg;g.fillRect(0,0,w,h);
 g.globalCompositeOperation='overlay';g.globalAlpha=.15;g.fillStyle=grain(g);g.fillRect(0,0,w,h);
 g.restore();
}
function monsoon(g,im,w,h){
 var m=Math.max(w,h);
 g.save();g.globalAlpha=1;g.globalCompositeOperation='source-over';
 g.filter='sepia(.45) saturate(.85) hue-rotate(8deg) contrast(.95) brightness(1.05)';
 g.drawImage(im,0,0,w,h);
 g.filter='none';
 g.globalCompositeOperation='soft-light';g.globalAlpha=.5;g.fillStyle='#b9b46a';g.fillRect(0,0,w,h);
 g.globalCompositeOperation='screen';g.globalAlpha=.4;
 g.filter='blur('+(m*.012)+'px) brightness(1.3) sepia(.3)';g.drawImage(im,0,0,w,h);
 g.filter='none';
 var hz=g.createRadialGradient(w*.12,h*.3,0,w*.12,h*.3,m*.6);
 hz.addColorStop(0,'rgba(252,246,215,.75)');hz.addColorStop(1,'rgba(252,246,215,0)');
 g.globalCompositeOperation='source-over';g.globalAlpha=1;g.fillStyle=hz;g.fillRect(0,0,w,h);
 g.globalCompositeOperation='lighten';g.globalAlpha=1;g.fillStyle='#22251a';g.fillRect(0,0,w,h);
 var vg=g.createRadialGradient(w/2,h/2,m*.3,w/2,h/2,m*.8);
 vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(25,28,10,.4)');
 g.globalCompositeOperation='multiply';g.fillStyle=vg;g.fillRect(0,0,w,h);
 g.globalCompositeOperation='overlay';g.globalAlpha=.18;g.fillStyle=grain(g);g.fillRect(0,0,w,h);
 g.restore();
}
function rp(x,a,b){x=(x-a)/(b-a);return x<0?0:x>1?1:x*x*(3-2*x)}
function tn(v){v=(v-128)*1.16+128;if(v>175)v-=(v-175)*.2;if(v<50)v+=(50-v)*.05;return 10+v*.955}
function magenta(g,im,w,h,boxes){
 var K=im._mg;
 if(!K||K.w!==w||K.h!==h||K.gr!==GRN){
  var cv=document.createElement('canvas');cv.width=w;cv.height=h;
  var q=cv.getContext('2d');q.drawImage(im,0,0,w,h);
  var id=q.getImageData(0,0,w,h),d=id.data,n=d.length,i;
  for(i=0;i<n;i+=4){
   var r=d[i],gr=d[i+1],b=d[i+2],mx=Math.max(r,gr,b),mn=Math.min(r,gr,b),df=mx-mn,s=mx?df/mx:0,hu=0;
   if(df){if(mx===r)hu=((gr-b)/df)%6;else if(mx===gr)hu=(b-r)/df+2;else hu=(r-gr)/df+4;hu*=60;if(hu<0)hu+=360}
   var m=rp(hu,292,312)*(1-rp(hu,344,358))*rp(s,.22,.42)*(mx>45?1:mx/45);
   var y=.299*r+.587*gr+.114*b,wr=y*1.03+3,wg=y,wb=y*.93;
   if(m>0){var cr=y+(r-y)*1.3,cg=y+(gr-y)*1.3,cb=y+(b-y)*1.3;wr+=(cr-wr)*m;wg+=(cg-wg)*m;wb+=(cb-wb)*m}
   d[i]=tn(wr);d[i+1]=tn(wg);d[i+2]=tn(wb);
  }
  q.putImageData(id,0,0);
  var t2=document.createElement('canvas');t2.width=w;t2.height=h;t2.getContext('2d').drawImage(cv,0,0);
  q.save();q.globalCompositeOperation='screen';q.globalAlpha=.1;
  q.filter='blur('+Math.max(2,Math.round(Math.max(w,h)*.006))+'px) brightness(1.4) sepia(.6)';
  q.drawImage(t2,0,0);q.restore();
  var m2=Math.max(w,h),vg=q.createRadialGradient(w/2,h/2,m2*.25,w/2,h/2,m2*.78);
  vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.3)');
  q.save();q.globalCompositeOperation='multiply';q.fillStyle=vg;q.fillRect(0,0,w,h);
  q.globalCompositeOperation='overlay';q.globalAlpha=.28;q.fillStyle=grain(q);q.fillRect(0,0,w,h);q.restore();
  K=im._mg={w:w,h:h,cv:cv,gr:GRN};
 }
 g.save();g.globalAlpha=1;g.globalCompositeOperation='source-over';g.filter='none';
 g.drawImage(K.cv,0,0);
 if(boxes){
  var bx=[[.572,.207,.098,.055],[.137,.372,.22,.123],[.527,.421,.346,.19],[.103,.568,.08,.046]];
  bx.forEach(function(p){var x0=p[0]*w,y0=p[1]*h,bw=p[2]*w,bh=p[3]*h;g.fillStyle='rgba(122,35,20,.45)';g.fillRect(x0,y0,bw,bh);g.lineWidth=Math.max(1.5,w*.0028);g.strokeStyle='rgba(232,69,47,.85)';g.strokeRect(x0,y0,bw,bh)});
 }
 g.restore();
}
function retro(g,im,w,h){
 var K=im._rt;
 if(!K||K.w!==w||K.h!==h||K.gr!==GRN){
  var cv=document.createElement('canvas');cv.width=w;cv.height=h;
  var q=cv.getContext('2d');q.drawImage(im,0,0,w,h);
  var id=q.getImageData(0,0,w,h),d=id.data,n=d.length,i;
  for(i=0;i<n;i+=4){
   var r=d[i],gr=d[i+1],b=d[i+2],y=.299*r+.587*gr+.114*b;
   r=y+(r-y)*1.1;gr=y+(gr-y)*1.1;b=y+(b-y)*1.1;
   r=(r-128)*.9+136;gr=(gr-128)*.9+136;b=(b-128)*.9+136;
   r*=1.08;gr*=1.01;b*=.84;
   var sh=1-y/255;sh*=sh;
   gr+=sh*7;b+=sh*4;r-=sh*3;
   if(y>190){var hl=(y-190)/65;r+=hl*8;gr+=hl*4}
   d[i]=r<0?0:r>255?255:r;d[i+1]=gr<0?0:gr>255?255:gr;d[i+2]=b<0?0:b>255?255:b;
  }
  q.putImageData(id,0,0);
  var m2=Math.max(w,h),t2=document.createElement('canvas');t2.width=w;t2.height=h;t2.getContext('2d').drawImage(cv,0,0);
  q.save();q.globalCompositeOperation='screen';q.globalAlpha=.2;
  q.filter='blur('+Math.max(3,Math.round(m2*.008))+'px) brightness(1.5) sepia(.7) saturate(1.8)';
  q.drawImage(t2,0,0);q.restore();
  var lk=q.createRadialGradient(w*.02,h*.12,0,w*.02,h*.12,m2*.5);
  lk.addColorStop(0,'rgba(255,150,70,.32)');lk.addColorStop(1,'rgba(255,120,40,0)');
  q.save();q.globalCompositeOperation='screen';q.fillStyle=lk;q.fillRect(0,0,w,h);q.restore();
  var vg=q.createRadialGradient(w/2,h/2,m2*.25,w/2,h/2,m2*.78);
  vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(30,16,8,.45)');
  q.save();q.globalCompositeOperation='multiply';q.fillStyle=vg;q.fillRect(0,0,w,h);
  q.globalCompositeOperation='overlay';q.globalAlpha=.42;q.fillStyle=grain(q);q.fillRect(0,0,w,h);q.restore();
  var sd=((w*73856093)^(h*19349663))>>>0;
  function rnd(){sd=(sd+0x6D2B79F5)>>>0;var t=sd;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}
  var sc=w/720,px,py,rs;
  q.save();
  for(i=0;i<130;i++){px=rnd()*w;py=rnd()*h;rs=(.5+rnd()*1.6)*sc;q.fillStyle='rgba(255,248,235,'+(.25+rnd()*.5)+')';q.beginPath();q.arc(px,py,rs,0,7);q.fill()}
  for(i=0;i<35;i++){px=rnd()*w;py=rnd()*h;rs=(.5+rnd()*1.3)*sc;q.fillStyle='rgba(20,10,5,'+(.3+rnd()*.4)+')';q.beginPath();q.arc(px,py,rs,0,7);q.fill()}
  q.strokeStyle='rgba(255,246,232,.35)';q.lineWidth=Math.max(.6,.9*sc);
  for(i=0;i<9;i++){var hx=rnd()*w,hy=rnd()*h,len=(10+rnd()*30)*sc,a=rnd()*6.283;q.beginPath();q.moveTo(hx,hy);q.quadraticCurveTo(hx+Math.cos(a)*len*.6+rnd()*6*sc,hy+Math.sin(a)*len*.6,hx+Math.cos(a)*len,hy+Math.sin(a)*len);q.stroke()}
  q.strokeStyle='rgba(255,246,232,.45)';q.lineWidth=Math.max(1,1.4*sc);q.beginPath();q.moveTo(0,h*.803);q.lineTo(w*.5,h*.8);q.lineTo(w,h*.797);q.stroke();
  q.strokeStyle='rgba(255,246,232,.25)';q.lineWidth=Math.max(.8,.9*sc);
  [.18,.74].forEach(function(f){var vx=w*f;q.beginPath();q.moveTo(vx,0);q.lineTo(vx+rnd()*3*sc,h);q.stroke()});
  q.restore();
  K=im._rt={w:w,h:h,cv:cv,gr:GRN};
 }
 g.save();g.globalAlpha=1;g.globalCompositeOperation='source-over';g.filter='none';
 g.drawImage(K.cv,0,0);g.restore();
}
function rose(g,im,w,h){
 var G0=(typeof GRN==='undefined')?0:GRN,K=im._rs;
 if(!K||K.w!==w||K.h!==h||K.gr!==G0){
  var cv=document.createElement('canvas');cv.width=w;cv.height=h;
  var q=cv.getContext('2d');q.drawImage(im,0,0,w,h);
  var id=q.getImageData(0,0,w,h),d=id.data,n=d.length,i;
  var S=[[0,38,20,20],[90,120,72,66],[170,196,140,128],[255,245,214,200]];
  var LR=new Uint8ClampedArray(256),LG=new Uint8ClampedArray(256),LB=new Uint8ClampedArray(256);
  for(i=0;i<256;i++){
   var a=0;while(a<2&&i>S[a+1][0])a++;
   var p=S[a],c=S[a+1],t=(i-p[0])/(c[0]-p[0]);
   LR[i]=p[1]+(c[1]-p[1])*t;LG[i]=p[2]+(c[2]-p[2])*t;LB[i]=p[3]+(c[3]-p[3])*t;
  }
  for(i=0;i<n;i+=4){
   var r=d[i],gr=d[i+1],b=d[i+2],y=.299*r+.587*gr+.114*b,yy=(y-128)*1.1+128;
   yy=yy<0?0:yy>255?255:yy|0;
   d[i]=LR[yy]*.72+(y+(r-y)*.5)*.28;
   d[i+1]=LG[yy]*.72+(y+(gr-y)*.5)*.28;
   d[i+2]=LB[yy]*.72+(y+(b-y)*.5)*.28;
  }
  q.putImageData(id,0,0);
  var m2=Math.max(w,h),t2=document.createElement('canvas');t2.width=w;t2.height=h;t2.getContext('2d').drawImage(cv,0,0);
  q.save();q.globalAlpha=.3;q.filter='blur('+Math.max(1,Math.round(m2*.0016))+'px)';q.drawImage(t2,0,0);q.restore();
  q.save();q.globalCompositeOperation='screen';q.globalAlpha=.2;q.filter='blur('+Math.max(3,Math.round(m2*.009))+'px) brightness(1.35) sepia(.5)';q.drawImage(t2,0,0);q.restore();
  q.save();q.globalCompositeOperation='soft-light';q.globalAlpha=.28;q.fillStyle='#c46a5a';q.fillRect(0,0,w,h);q.restore();
  var vg=q.createRadialGradient(w/2,h/2,m2*.22,w/2,h/2,m2*.78);
  vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(25,10,8,.55)');
  q.save();q.globalCompositeOperation='multiply';q.fillStyle=vg;q.fillRect(0,0,w,h);
  q.globalCompositeOperation='overlay';q.globalAlpha=.1+.5*G0;q.fillStyle=grain(q);q.fillRect(0,0,w,h);q.restore();
  K=im._rs={w:w,h:h,cv:cv,gr:G0};
 }
 g.save();g.globalAlpha=1;g.globalCompositeOperation='source-over';g.filter='none';
 g.drawImage(K.cv,0,0);g.restore();
}
var pend=0;
function render(){
 if(img){
  if(F[cur][1]=='DREAM'){dream(x,img,c.width,c.height)}else if(F[cur][1]=='GOLD'){gold(x,img,c.width,c.height)}else if(F[cur][1]=='MIST'){mist(x,img,c.width,c.height)}else if(F[cur][1]=='RETRO'){retro(x,img,c.width,c.height)}else if(F[cur][1]=='ROSE'){rose(x,img,c.width,c.height)}else if(F[cur][1]=='MONSOON'){monsoon(x,img,c.width,c.height)}else if(F[cur][1]=='MAG'||F[cur][1]=='MAGB'){magenta(x,img,c.width,c.height,F[cur][1]=='MAGB')}
  else{x.save();x.filter='none';x.globalCompositeOperation='source-over';x.globalAlpha=1;x.drawImage(img,0,0,c.width,c.height);x.restore()}
 }
 c.style.filter=flt();
}
function apply(){if(pend)return;pend=1;requestAnimationFrame(function(){pend=0;render()})}
F.forEach(function(f,i){
 var b=document.createElement('button');
 b.className='fchip'+(i?'':' on');b.textContent=f[0];
 b.onclick=function(){cur=i;[].forEach.call(strip.children,function(e,j){e.classList.toggle('on',j==i)});apply()};
 strip.appendChild(b);
});
function load(file){
 if(!file)return;
 var im=new Image();
 im.onload=function(){
  img=im;var s=Math.min(1,1280/Math.max(im.width,im.height));
  c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
  x.drawImage(im,0,0,c.width,c.height);
  $('fhint').style.display='none';apply();
 };
 im.src=URL.createObjectURL(file);
}
$('fin').onchange=function(){load(this.files[0])};
$('fcam').onchange=function(){load(this.files[0])};
$('fb').oninput=apply;$('fk').oninput=apply;$('fg').oninput=function(){GRN=(+this.value)/100;apply()};
$('fdl').onclick=function(){
 if(!img){$('fhint').style.display='block';$('fhint').textContent='Pick a photo first!';return}
 var o=document.createElement('canvas');o.width=c.width;o.height=c.height;
 var ox=o.getContext('2d');
 if(!('filter' in ox)){alert('This browser cannot save filters. Take a screenshot instead.');return}
 var src=img;var fxn=({ROSE:rose,RETRO:retro,DREAM:dream,GOLD:gold,MIST:mist,MONSOON:monsoon,MAG:function(a,b,w,h){magenta(a,b,w,h,false)},MAGB:function(a,b,w,h){magenta(a,b,w,h,true)}})[F[cur][1]];if(fxn){var tc=document.createElement('canvas');tc.width=o.width;tc.height=o.height;fxn(tc.getContext('2d'),img,o.width,o.height);src=tc}ox.filter=flt()||'none';ox.drawImage(src,0,0,o.width,o.height);
 o.toBlob(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='pixlo-edit.jpg';document.body.appendChild(a);a.click();a.remove()},'image/jpeg',.92);
};
card.onclick=function(){m.classList.add('on')};
$('fx').onclick=function(){m.classList.remove('on')};
})();
