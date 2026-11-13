(function(){
var card=document.getElementById('work');
if(!card)return;
card.style.cursor='pointer';
var F=[['Original','none'],['Neon','sepia(1) hue-rotate(55deg) saturate(3) contrast(1.1)'],['B&W','grayscale(1) contrast(1.2)'],['Vintage','sepia(.7) contrast(1.1) brightness(.95) saturate(1.3)'],['Warm','sepia(.35) saturate(1.4) brightness(1.05)'],['Cinema','contrast(1.25) saturate(.85) brightness(.9)'],['Pop','saturate(2) contrast(1.1)'],['Fade','contrast(.85) brightness(1.15) saturate(.8)'],['Dark','brightness(.75) contrast(1.4) saturate(1.2)']];
var m=document.createElement('div');m.className='gm';
m.innerHTML='<div class="gbox fbox"><button class="gx" id="fx">✕</button><h3>PHOTO <b>FILTERS</b></h3><div class="fprev"><canvas id="fc" width="320" height="320"></canvas><p id="fhint">Choose a photo or take one</p></div><div class="frow"><label class="fbtn">📁 Choose<input type="file" accept="image/*" id="fin" hidden></label><label class="fbtn">📷 Camera<input type="file" accept="image/*" capture="environment" id="fcam" hidden></label></div><div class="fstrip" id="fs"></div><div class="fsl"><span>Brightness</span><input type="range" id="fb" min="50" max="150" value="100"></div><div class="fsl"><span>Contrast</span><input type="range" id="fk" min="50" max="150" value="100"></div><button class="gbtn" id="fdl">DOWNLOAD</button></div>';
document.body.appendChild(m);
function $(i){return document.getElementById(i)}
var c=$('fc'),x=c.getContext('2d'),img=null,cur=0,strip=$('fs');
function flt(){var f=F[cur][1];if(f=='none')f='';return (f+' brightness('+$('fb').value/100+') contrast('+$('fk').value/100+')').trim()}
function apply(){c.style.filter=flt()}
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
 ox.filter=flt()||'none';ox.drawImage(img,0,0,o.width,o.height);
 o.toBlob(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='pixlo-edit.jpg';document.body.appendChild(a);a.click();a.remove()},'image/jpeg',.92);
};
card.onclick=function(){m.classList.add('on')};
$('fx').onclick=function(){m.classList.remove('on')};
})();
