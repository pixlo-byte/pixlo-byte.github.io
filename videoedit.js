(function(){
var card=document.getElementById('videoEd');
if(!card)return;
card.style.cursor='pointer';
var FL=[['Original',''],['Neon','sepia(1) hue-rotate(55deg) saturate(3) contrast(1.1)'],['B&W','grayscale(1) contrast(1.2)'],['Vintage','sepia(.7) contrast(1.1) saturate(1.3)'],['Cinema','contrast(1.25) saturate(.85) brightness(.9)'],['Pop','saturate(2) contrast(1.1)']];
var SP=[.25,.5,.75,1,1.5,2,3];
var m=document.createElement('div');m.className='gm';
m.innerHTML='<div class="gbox fbox"><button class="gx" id="vx">✕</button><h3>VIDEO <b>EDITOR</b></h3><p class="gmsg" id="vmsg">Add clips, trim, change speed, add a song</p><div class="frow"><label class="fbtn">🎬 Add clips<input type="file" accept="video/*" multiple id="vin" hidden></label><label class="fbtn">🎵 Add song<input type="file" accept="audio/*" id="vau" hidden></label></div><div id="vlist"></div><div id="vsong"></div><div class="fsl"><span>Video sound</span><input type="range" id="vo" min="0" max="100" value="100"></div><div class="fsl"><span>Song volume</span><input type="range" id="vs" min="0" max="100" value="80"></div><div class="fsl"><span>Filter</span><select id="vf" class="vsel"></select></div><canvas id="vc" width="360" height="640" style="display:none"></canvas><button class="gbtn" id="vgo">EXPORT VIDEO</button><div class="vbar"><i id="vbar"></i></div><div id="vout"></div></div>';
document.body.appendChild(m);
function $(i){return document.getElementById(i)}
function msg(t){$('vmsg').textContent=t}
function fmt(t){return t.toFixed(1)+'s'}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
FL.forEach(function(f){var o=document.createElement('option');o.value=f[1];o.textContent=f[0];$('vf').appendChild(o)});
var clips=[],song=null,busy=false,AC=null,dest=null;

function addClips(files){
 [].forEach.call(files,function(f){
  var url=URL.createObjectURL(f);
  var v=document.createElement('video');v.preload='auto';v.playsInline=true;v.src=url;
  var c={name:f.name,url:url,v:v,dur:0,start:0,end:0,speed:1};
  v.onloadedmetadata=function(){c.dur=v.duration;c.end=v.duration;render()};
  v.onerror=function(){msg('Could not read '+f.name);var k=clips.indexOf(c);if(k>-1)clips.splice(k,1);render()};
  clips.push(c);
 });
 render();
}
function render(){
 var L=$('vlist');L.innerHTML='';
 clips.forEach(function(c,i){
  var d=document.createElement('div');d.className='vclip';
  d.innerHTML='<div class="vh"><b>'+(i+1)+'.</b><span>'+esc(c.name)+'</span><button class="up">↑</button><button class="rm">✕</button></div><video class="vpv" controls playsinline preload="metadata" src="'+c.url+'"></video><div class="fsl"><span>Start</span><input type="range" class="s1" min="0" max="'+c.dur+'" step="0.1" value="'+c.start+'"><em>'+fmt(c.start)+'</em></div><div class="fsl"><span>End</span><input type="range" class="s2" min="0" max="'+c.dur+'" step="0.1" value="'+c.end+'"><em>'+fmt(c.end)+'</em></div><div class="vsp"></div>';
  var s1=d.querySelector('.s1'),s2=d.querySelector('.s2'),e1=s1.nextSibling,e2=s2.nextSibling;
  s1.oninput=function(){c.start=Math.min(+s1.value,c.end-.2);if(c.start<0)c.start=0;s1.value=c.start;e1.textContent=fmt(c.start)};
  s2.oninput=function(){c.end=Math.max(+s2.value,c.start+.2);if(c.end>c.dur)c.end=c.dur;s2.value=c.end;e2.textContent=fmt(c.end)};
  var sp=d.querySelector('.vsp');
  SP.forEach(function(s){
   var b=document.createElement('button');b.className='fchip'+(c.speed==s?' on':'');b.textContent=s+'x';
   b.onclick=function(){c.speed=s;[].forEach.call(sp.children,function(e){e.classList.toggle('on',e.textContent==s+'x')})};
   sp.appendChild(b);
  });
  d.querySelector('.up').onclick=function(){if(i>0){var t=clips[i-1];clips[i-1]=clips[i];clips[i]=t;render()}};
  d.querySelector('.rm').onclick=function(){clips.splice(i,1);render()};
  L.appendChild(d);
 });
}
$('vin').onchange=function(){addClips(this.files);this.value=''};
$('vau').onchange=function(){
 var f=this.files[0];if(!f)return;
 var a=new Audio();a.src=URL.createObjectURL(f);a.loop=true;
 song={name:f.name,a:a};
 $('vsong').innerHTML='🎵 '+esc(f.name)+' <button class="vrs">✕</button>';
 $('vsong').querySelector('.vrs').onclick=function(){song=null;$('vsong').innerHTML=''};
 this.value='';
};
function pickType(){
 var t=['video/mp4;codecs=avc1,mp4a.40.2','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];
 for(var i=0;i<t.length;i++){if(MediaRecorder.isTypeSupported(t[i]))return t[i]}
 return '';
}
function seek(v,t){
 return new Promise(function(r){
  if(Math.abs(v.currentTime-t)<.05)return r();
  var d=function(){v.removeEventListener('seeked',d);r()};
  v.addEventListener('seeked',d);v.currentTime=t;
 });
}
async function playClip(cl,x,W,H,flt,cb){
 var v=cl.v;
 await seek(v,cl.start);
 v.playbackRate=cl.speed;
 try{await v.play()}catch(e){}
 await new Promise(function(res){
  function tick(){
   if(!busy||v.ended||v.currentTime>=cl.end-.03){v.pause();return res()}
   var vw=v.videoWidth,vh=v.videoHeight,s=Math.min(W/vw,H/vh),w=vw*s,h=vh*s;
   x.fillStyle='#000';x.fillRect(0,0,W,H);
   x.filter=flt||'none';x.drawImage(v,(W-w)/2,(H-h)/2,w,h);x.filter='none';
   cb(v.currentTime);
   requestAnimationFrame(tick);
  }
  tick();
 });
}
function exportVid(list){
 busy=true;$('vgo').textContent='STOP & SAVE';$('vout').innerHTML='';$('vbar').style.width='0';
 var f=list[0].v,vw=f.videoWidth||720,vh=f.videoHeight||1280,sc=Math.min(1,720/Math.max(vw,vh));
 var W=Math.round(vw*sc)&~1,H=Math.round(vh*sc)&~1;
 var c=$('vc');c.width=W;c.height=H;c.style.display='block';
 var x=c.getContext('2d'),flt=$('vf').value;
 AC=AC||new(window.AudioContext||window.webkitAudioContext)();
 if(AC.state=='suspended')AC.resume();
 if(!dest)dest=AC.createMediaStreamDestination();
 var og=$('vo').value/100,sg=$('vs').value/100;
 list.forEach(function(cl){
  try{if(!cl.node){cl.node=AC.createMediaElementSource(cl.v);cl.g=AC.createGain();cl.node.connect(cl.g);cl.g.connect(dest)}cl.g.gain.value=og}catch(e){}
 });
 if(song){try{if(!song.node){song.node=AC.createMediaElementSource(song.a);song.g=AC.createGain();song.node.connect(song.g);song.g.connect(dest)}song.g.gain.value=sg}catch(e){}}
 var stream=c.captureStream(30);
 dest.stream.getAudioTracks().forEach(function(t){stream.addTrack(t)});
 var mt=pickType(),chunks=[];
 var rec=new MediaRecorder(stream,mt?{mimeType:mt,videoBitsPerSecond:4000000}:{});
 rec.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};
 rec.onstop=function(){
  busy=false;$('vgo').textContent='EXPORT VIDEO';c.style.display='none';
  if(song)song.a.pause();
  if(!chunks.length){msg('Export failed. Try shorter clips.');return}
  var ext=(mt||'').indexOf('mp4')>-1?'mp4':'webm';
  var blob=new Blob(chunks,{type:(mt||'video/webm').split(';')[0]});
  var u=URL.createObjectURL(blob);
  $('vout').innerHTML='<video controls playsinline src="'+u+'" class="vres"></video><a class="gbtn vdl" download="pixlo-edit.'+ext+'" href="'+u+'">⬇ SAVE VIDEO</a>';
  $('vbar').style.width='100%';msg('Done! Preview it, then save.');
 };
 var total=list.reduce(function(a,cl){return a+(cl.end-cl.start)/cl.speed},0),done=0;
 rec.start(1000);
 if(song){song.a.currentTime=0;var pp=song.a.play();if(pp&&pp.catch)pp.catch(function(){})}
 (async function(){
  for(var i=0;i<list.length&&busy;i++){
   var cl=list[i];
   msg('Exporting clip '+(i+1)+' of '+list.length+'. Keep this screen open.');
   await playClip(cl,x,W,H,flt,function(t){$('vbar').style.width=Math.min(100,(done+(t-cl.start)/cl.speed)/total*100)+'%'});
   done+=(cl.end-cl.start)/cl.speed;
  }
  rec.stop();
 })();
}
$('vgo').onclick=function(){
 if(busy){busy=false;return}
 var list=clips.filter(function(c){return c.dur>0});
 if(!list.length){msg('Add at least one video first');return}
 if(!window.MediaRecorder){msg('This browser cannot export video. Try Chrome or Brave.');return}
 exportVid(list);
};
card.onclick=function(){m.classList.add('on')};
$('vx').onclick=function(){busy=false;m.classList.remove('on')};
})();
