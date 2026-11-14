(function(){
var card=document.getElementById('work');
if(!card)return;
card.style.cursor='pointer';
var F=[['Original','none'],['✨ Dreamy','DREAM'],['Neon','sepia(1) hue-rotate(55deg) saturate(3) contrast(1.1)'],['B&W','grayscale(1) contrast(1.2)'],['Vintage','sepia(.7) contrast(1.1) brightness(.95) saturate(1.3)'],['Warm','sepia(.35) saturate(1.4) brightness(1.05)'],['Cinema','contrast(1.25) saturate(.85) brightness(.9)'],['Pop','saturate(2) contrast(1.1)'],['Fade','contrast(.85) brightness(1.15) saturate(.8)'],['Dark','brightness(.75) contrast(1.4) saturate(1.2)']];
var m=document.createElement('div');m.className='gm';
m.innerHTML='<div class="gbox fbox"><button class="gx" id="fx">✕</button><h3>PHOTO <b>FILTERS</b></h3><div class="fprev"><canvas id="fc" width="320" height="320"></canvas><p id="fhint">Choose a photo or take one</p></div><div class="frow"><label class="fbtn">📁 Choose<input type="file" accept="image/*" id="fin" hidden></label><label class="fbtn">📷 Camera<input type="file" accept="image/*" capture="environment" id="fcam" hidden></label></div><div class="fstrip" id="fs"></div><div class="fsl"><span>Brightness</span><input type="range" id="fb" min="50" max="150" value="100"></div><div class="fsl"><span>Contrast</span><input type="range" id="fk" min="50" max="150" value="100"></div><button class="gbtn" id="fdl">DOWNLOAD</button></div>';
document.body.appendChild(m);
function $(i){return document.getElementById(i)}
var c=$('fc'),x=c.getContext('2d'),img=null,cur=0,strip=$('fs');
function flt(){var f=F[cur][1];if(f=='none'||f=='DREAM')f='';return (f+' brightness('+$('fb').value/100+') contrast('+$('fk').value/100+')').trim()}
var gp=null;
function grain(g){if(!gp){var n=document.createElement('canvas');n.width=n.height=200;var q=n.getContext('2d'),d=q.createImageData(200,200);for(var i=0;i<d.data.length;i+=4){var v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}q.putImageData(d,0,0);gp=n}return g.createPattern(gp,'repeat')}
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
var pend=0;
function render(){
 if(img){
  if(F[cur][1]=='DREAM'){dream(x,img,c.width,c.height)}
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
$('fb').oninput=apply;$('fk').oninput=apply;
$('fdl').onclick=function(){
 if(!img){$('fhint').style.display='block';$('fhint').textContent='Pick a photo first!';return}
 var o=document.createElement('canvas');o.width=c.width;o.height=c.height;
 var ox=o.getContext('2d');
 if(!('filter' in ox)){alert('This browser cannot save filters. Take a screenshot instead.');return}
 var src=img;if(F[cur][1]=='DREAM'){var tc=document.createElement('canvas');tc.width=o.width;tc.height=o.height;dream(tc.getContext('2d'),img,o.width,o.height);src=tc}ox.filter=flt()||'none';ox.drawImage(src,0,0,o.width,o.height);
 o.toBlob(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='pixlo-edit.jpg';document.body.appendChild(a);a.click();a.remove()},'image/jpeg',.92);
};
card.onclick=function(){m.classList.add('on')};
$('fx').onclick=function(){m.classList.remove('on')};
})();
