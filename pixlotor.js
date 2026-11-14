(function(){
var pf=document.getElementById('pkf');
if(!pf)return;
var pk=pf.parentNode.parentNode;
var btn=document.createElement('button');
btn.className='gpick';btn.id='pkpx';btn.textContent='🔮 PIXLOTOR';
pf.parentNode.appendChild(btn);
function $(i){return document.getElementById(i)}
var Q={real:'Is your character a real person?',male:'Is your character male?',fb:'Is your character a footballer?',cr:'Is your character a cricketer?',oth:'Is your character an athlete in another sport?',ind:'Is your character from India?',act:'Is your character an actor or from movies?',bolly:'Is your character from Bollywood?',sic:'Is your character from South Indian cinema?',tam:'Is your character from Tamil cinema?',tel:'Is your character from Telugu cinema?',mal:'Is your character from Malayalam cinema?',ker:'Is your character from Kerala?',sp:'Does your character have superpowers?',mar:'Is your character from Marvel?',dc:'Is your character from DC Comics?',mask:'Does your character wear a mask or costume?',vil:'Is your character a villain?',vg:'Is your character from a video game?',nin2:'Is your character from Nintendo?',an:'Is your character from anime or a cartoon?',jp:'Is your character from Japan?',nin:'Is your character a ninja?',kid:"Is your character from a kids' show?",ani:'Is your character an animal or non-human?',yt:'Is your character a YouTuber or streamer?',sing:'Is your character a singer or rapper?',rich:'Is your character rich or an inventor?',sci:'Is your character a scientist or tech person?',pol:'Is your character a politician?',dead:'Has your character retired or passed away?',wc:'Has your character won a football World Cup?',bd:"Has your character won the Ballon d'Or?",sa:'Is your character from South America?',eur:'Is your character from Europe?',bar:'Did your character play for Barcelona?',rm:'Did your character play for Real Madrid?',pl:'Did your character play in the Premier League?',cap:'Is your character a team captain?',wk:'Is your character a wicketkeeper?',bowl:'Is your character a bowler?'};
Object.assign(Q,{dir:'Is your character a film director?',wr:'Is your character a writer or poet?',jr:'Is your character a journalist?',bus:'Is your character a businessperson?',mus:'Is your character a musician or composer?',e1:'Was your character born before 1950?',e2:'Was your character born between 1950 and 1979?',e3:'Was your character born between 1980 and 1999?',e4:'Was your character born in 2000 or later?',lA:"Does your character's name start with a letter from A to D?",lB:"Does your character's name start with a letter from E to K?",lC:"Does your character's name start with L or M?",lD:"Does your character's name start with a letter from N to Q?",lE:"Does your character's name start with R or S?",lF:"Does your character's name start with a letter from T to Z?"});
function LG(n){var c=(n||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().match(/[A-Z]/);c=c?c[0]:'Z';return[c<='D'?'lA':c<='K'?'lB':c<='M'?'lC':c<='Q'?'lD':c<='S'?'lE':'lF']}
Object.assign(Q,{dir:'Is your character a film director?',wr:'Is your character a writer or poet?',jr:'Is your character a journalist?',bus:'Is your character a businessperson?',mus:'Is your character a musician or composer?',e1:'Was your character born before 1950?',e2:'Was your character born between 1950 and 1979?',e3:'Was your character born between 1980 and 1999?',e4:'Was your character born in 2000 or later?',lA:"Does your character's name start with a letter from A to D?",lB:"Does your character's name start with a letter from E to K?",lC:"Does your character's name start with L or M?",lD:"Does your character's name start with a letter from N to Q?",lE:"Does your character's name start with R or S?",lF:"Does your character's name start with a letter from T to Z?"});
function LG(n){var c=(n||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().match(/[A-Z]/);c=c?c[0]:'Z';return[c<='D'?'lA':c<='K'?'lB':c<='M'?'lC':c<='Q'?'lD':c<='S'?'lE':'lF']}
var KEYS=Object.keys(Q);
var RAW=[['Lionel Messi','real male fb wc bd sa bar'],['Cristiano Ronaldo','real male fb bd eur pl rm cap'],['Neymar','real male fb sa bar'],['Kylian Mbappé','real male fb wc eur rm'],['Pelé','real male fb wc sa dead'],['Diego Maradona','real male fb wc sa bar dead'],['Zinedine Zidane','real male fb wc bd eur rm dead'],['Ronaldinho','real male fb wc bd sa bar dead'],['Erling Haaland','real male fb eur pl'],['Mohamed Salah','real male fb pl'],['Sunil Chhetri','real male fb ind cap'],['David Beckham','real male fb eur pl rm dead'],['Luka Modrić','real male fb bd eur rm pl cap'],['Vinícius Júnior','real male fb sa rm'],['Karim Benzema','real male fb bd eur rm'],['Thierry Henry','real male fb wc eur pl bar dead'],['Andrés Iniesta','real male fb wc eur bar dead'],['Virat Kohli','real male cr ind cap'],['Sachin Tendulkar','real male cr ind dead'],['MS Dhoni','real male cr ind wk cap dead'],['Rohit Sharma','real male cr ind cap'],['Jasprit Bumrah','real male cr ind bowl'],['Hardik Pandya','real male cr ind bowl'],['Ravindra Jadeja','real male cr ind bowl'],['Yuvraj Singh','real male cr ind dead'],['Rishabh Pant','real male cr ind wk'],['Sanju Samson','real male cr ind wk ker'],['AB de Villiers','real male cr dead'],['Chris Gayle','real male cr dead'],['Babar Azam','real male cr cap'],['Shah Rukh Khan','real male act ind bolly'],['Salman Khan','real male act ind bolly'],['Amitabh Bachchan','real male act ind bolly'],['Allu Arjun','real male act ind sic tel'],['Prabhas','real male act ind sic tel'],['Mahesh Babu','real male act ind sic tel'],['Jr NTR','real male act ind sic tel'],['Rajinikanth','real male act ind sic tam'],['Vijay','real male act ind sic tam pol'],['Dhanush','real male act ind sic tam sing'],['Yash','real male act ind sic'],['Mohanlal','real male act ind sic mal ker'],['Mammootty','real male act ind sic mal ker'],['Dulquer Salmaan','real male act ind sic mal ker'],['Fahadh Faasil','real male act ind sic mal ker'],['Tovino Thomas','real male act ind sic mal ker'],['Prithviraj Sukumaran','real male act ind sic mal ker'],['Nivin Pauly','real male act ind sic mal ker'],['Dwayne Johnson','real male act oth'],['Robert Downey Jr.','real male act'],['MrBeast','real male yt rich'],['PewDiePie','real male yt vg'],['CarryMinati','real male yt ind sing'],['Techno Gamerz','real male yt ind vg'],['Triggered Insaan','real male yt ind'],['Total Gaming','real male yt ind vg'],['Mythpat','real male yt ind vg'],['Bhuvan Bam','real male yt ind act'],['Arijit Singh','real male sing ind bolly'],['A. R. Rahman','real male sing ind sic tam'],['Badshah','real male sing ind'],['Taylor Swift','real sing'],['Eminem','real male sing'],['Drake','real male sing'],['Justin Bieber','real male sing'],['Michael Jackson','real male sing dead'],['Elon Musk','real male rich sci'],['Narendra Modi','real male ind pol'],['APJ Abdul Kalam','real male ind sci pol dead'],['Albert Einstein','real male sci dead'],['Usain Bolt','real male oth dead'],['LeBron James','real male oth'],['Mike Tyson','real male oth dead'],['PV Sindhu','real ind oth'],['Neeraj Chopra','real male ind oth'],['Spider-Man','male sp mask mar act'],['Iron Man','male mask mar act rich sci'],['Captain America','male sp mar act'],['Thor','male sp mar act'],['Hulk','male sp mar act'],['Black Panther','male sp mask mar act'],['Deadpool','male sp mask mar act'],['Thanos','male sp mar vil act'],['Loki','male sp mar vil act'],['Batman','male mask dc rich act'],['Superman','male sp mask dc act'],['Joker','male dc vil act'],['Wonder Woman','sp dc act'],['Goku','male sp an jp'],['Naruto','male sp an jp nin'],['Sasuke','male sp an jp nin'],['Luffy','male sp an jp'],['Light Yagami','male an jp vil'],['Levi Ackerman','male an jp'],['Tanjiro','male sp an jp'],['Saitama','male sp an jp'],['Gojo Satoru','male sp an jp mask'],['Vegeta','male sp an jp'],['Doraemon','male an jp ani kid'],['Shinchan','male an jp kid'],['Chhota Bheem','male sp an ind kid'],['Tom','male an ani kid'],['Jerry','male an ani kid'],['Mickey Mouse','male an ani kid'],['SpongeBob','male an ani kid'],['Mr. Bean','male act'],['Pikachu','sp an ani vg nin2 jp'],['Mario','male vg nin2 jp'],['Link','male vg nin2 jp'],['Kirby','vg nin2 jp'],['Sonic','male sp vg ani jp'],['Pac-Man','vg jp'],['Steve (Minecraft)','male vg'],['Lara Croft','vg'],['Kratos','male sp vg'],['Among Us Crewmate','vg'],['Harry Potter','male sp act'],['Jack Sparrow','male act'],['Darth Vader','male sp act vil mask'],['Yoda','male sp act ani'],['Shrek','male act ani kid']];
var DB=RAW.map(function(r){return{n:r[0],t:r[1].split(' ').concat(LG(r[0])),f:null,p:4}});
var kLoaded=false;
function loadK(){if(kLoaded)return;kLoaded=true;
 fetch('kerala.json?v=1').then(function(r){return r.json()}).then(function(a){
  if(!Array.isArray(a))return;
  var seen={};DB.forEach(function(c){seen[c.n.toLowerCase()]=1});
  a.forEach(function(r){if(!r||!r[0])return;var k=String(r[0]).toLowerCase();if(seen[k])return;seen[k]=1;DB.push({n:String(r[0]),t:String(r[1]).split(' ').concat(LG(r[0])),f:null,p:+r[2]||1})});
 }).catch(function(){});
}
var learned=[];
try{learned=JSON.parse(localStorage.getItem('pxlearn2')||'[]')}catch(e){}
if(!Array.isArray(learned))learned=[];
learned=learned.filter(function(c){return c&&typeof c.n=='string'&&Array.isArray(c.t)&&Array.isArray(c.f)});
var hist=[],wrongs=[],cur='';
var m=document.createElement('div');m.className='gm';
m.innerHTML='<div class="gbox fbox"><button class="gx" id="pxx">✕</button><h3>PIXLO<b>TOR</b></h3><div class="pxorb">🔮</div><p class="pxq" id="pxq"></p><p class="pxn" id="pxn"></p><input id="pxin" class="pxin" maxlength="30" placeholder="Character name"><div class="pxa" id="pxa"></div><button class="pxback" id="pxback">↩ Back</button></div>';
document.body.appendChild(m);
function show(q,n,inp){$('pxq').textContent=q;$('pxn').textContent=n||'';$('pxin').style.display=inp?'block':'none';$('pxback').style.display=hist.length?'inline-block':'none'}
function btns(list){var A=$('pxa');A.innerHTML='';list.forEach(function(b){var e=document.createElement('button');e.className='pxbtn';e.textContent=b[0];e.onclick=b[1];A.appendChild(e)})}
function all(){return DB.concat(learned)}
function has(c,k){if(c.t.indexOf(k)>-1)return 1;if(c.f)return c.f.indexOf(k)>-1?0:.5;return 0}
function compute(){
 return all().map(function(c){
  var w=wrongs.indexOf(c.n)>-1?0:(c.p||1);
  hist.forEach(function(h){if(h[1]==.5)return;w*=Math.max(.05,1-Math.abs(h[1]-has(c,h[0])))});
  return{c:c,w:w};
 });
}
function next(){
 var ch=compute(),S=0,top=null;
 ch.forEach(function(o){S+=o.w;if(!top||o.w>top.w)top=o});
 if(S<=0.0001)return learn();
 var used={};hist.forEach(function(h){used[h[0]]=1});
 var best=null,bs=9;
 KEYS.forEach(function(k){
  if(used[k])return;
  var p=0;ch.forEach(function(o){p+=o.w*has(o.c,k)});p/=S;
  if(p<.02||p>.98)return;
  var sc=Math.abs(p-.5)+Math.random()*.01;
  if(sc<bs){bs=sc;best=k}
 });
 var share=top.w/S,a=hist.length;
 if(best===null||a>=45||(a>=10&&share>.5)||(a>=18&&share>.3)||(a>=30&&share>.12))return guess(top.c);
 cur=best;show(Q[best],'Question '+(a+1));
 btns([['Yes',function(){ans(1)}],['Probably',function(){ans(.75)}],["Don't know",function(){ans(.5)}],['Probably not',function(){ans(.25)}],['No',function(){ans(0)}]]);
}
function ans(a){hist.push([cur,a]);next()}
function guess(c){
 show('Is it '+c.n+'?','I think I know…');
 btns([['✅ Yes, correct!',function(){win(c)}],['❌ No',function(){wrongs.push(c.n);if(wrongs.length>=5)learn();else next()}]]);
}
function win(c){
 hist=[];show('I knew it! 🎉 You were thinking of '+c.n+'.','');
 btns([['PLAY AGAIN',intro]]);
}
function learn(){
 show('You beat me! Who were you thinking of?','Teach me',true);
 $('pxin').value='';
 btns([['SAVE CHARACTER',function(){
  var n=$('pxin').value.trim().slice(0,30);
  if(!n){$('pxn').textContent='Type a name first';return}
  var t=[],f=[];
  hist.forEach(function(h){if(h[1]>=.75&&t.indexOf(h[0])<0)t.push(h[0]);else if(h[1]<=.25&&f.indexOf(h[0])<0)f.push(h[0])});
  learned=learned.filter(function(c){return c.n.toLowerCase()!=n.toLowerCase()});
  learned.push({n:n,t:t,f:f});if(learned.length>200)learned.shift();
  try{localStorage.setItem('pxlearn2',JSON.stringify(learned))}catch(e){}
  hist=[];show('Thanks! I learned '+n+'. 🧠','');
  btns([['PLAY AGAIN',intro]]);
 }],['SKIP',intro]]);
}
function intro(){
 hist=[];wrongs=[];
 show('Think of a real or fictional character. This time I will beat you!','Ready?');
 btns([['START',next]]);
}
$('pxback').onclick=function(){if(hist.length){hist.pop();wrongs=[];next()}};
btn.onclick=function(){pk.classList.remove('on');m.classList.add('on');loadK();intro()};
$('pxx').onclick=function(){m.classList.remove('on')};
})();
