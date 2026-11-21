(function(){
var sp=document.getElementById('splash');
if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches){if(sp)sp.remove();return}
var first=true;try{first=!sessionStorage.getItem('pxs');sessionStorage.setItem('pxs','1')}catch(e){}
if(!first&&sp)sp.remove();
var base=(first&&sp)?1.35:.1;
if(sp)setTimeout(function(){if(sp.parentNode)sp.remove()},2300);
function $$(s){return [].slice.call(document.querySelectorAll(s))}
var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);show(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'}):null;
function show(el){
 var d=+el.getAttribute('data-d')||0;
 el.style.transitionDelay=d+'s';
 requestAnimationFrame(function(){el.classList.add('in')});
 setTimeout(function(){el.classList.remove('rv','in');el.style.transitionDelay=''},(d+1.4)*1000);
}
function rv(sel,step,from){$$(sel).forEach(function(el,i){el.classList.add('rv');el.setAttribute('data-d',(from||0)+i*step);if(io)io.observe(el);else show(el)})}
rv('.top',0,base);rv('.shot',0,base);
rv('.hi',0,base+.1);rv('h1',0,base+.22);rv('.role',0,base+.34);rv('.bio',0,base+.46);
rv('.stats li',.14,base+.35);
rv('.ttl',0,0);rv('.card',.12,0);rv('.about',0,0);rv('.tag',0,0);rv('.big',0,0);rv('.sub',0,.1);
var nums=$$('.stats b').map(function(b){var n=b.firstChild;if(!n||n.nodeType!=3)return null;var t=parseInt(n.nodeValue,10);if(!t)return null;n.nodeValue='0';return{n:n,t:t}}).filter(Boolean);
function count(){nums.forEach(function(o){var t0=null;function f(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/1500);o.n.nodeValue=Math.round(o.t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)}setTimeout(function(){requestAnimationFrame(f)},base*1000+300)})}
var st=document.querySelector('.stats');
if(nums.length&&st){if('IntersectionObserver' in window){var so=new IntersectionObserver(function(es){if(es[0].isIntersecting){so.disconnect();count()}},{threshold:.2});so.observe(st)}else{nums.forEach(function(o){o.n.nodeValue=o.t})}}
var role=document.querySelector('.role');
if(role){
 var full=role.textContent.trim(),seq=['Gamer','Photo Editor','Video Editor','Content Creator',full],wi=0,ci=0,del=false;
 role.style.minHeight=role.offsetHeight+'px';role.textContent='';role.classList.add('typing');
 (function tick(){
  var w=seq[wi],last=wi==seq.length-1;
  if(!del){ci++;role.textContent=w.slice(0,ci);if(ci>=w.length){if(last){role.classList.add('done');return}del=true;return setTimeout(tick,900)}return setTimeout(tick,70)}
  ci--;role.textContent=w.slice(0,ci);if(ci<=0){del=false;wi++;return setTimeout(tick,200)}
  setTimeout(tick,35);
 });
 setTimeout(function t0(){var w=seq[0];ci=1;role.textContent=w.slice(0,1);(function tick(){
  var w2=seq[wi],last=wi==seq.length-1;
  if(!del){if(ci<w2.length){ci++;role.textContent=w2.slice(0,ci);return setTimeout(tick,70)}if(last){role.classList.add('done');return}del=true;return setTimeout(tick,900)}
  if(ci>0){ci--;role.textContent=w2.slice(0,ci);return setTimeout(tick,35)}
  del=false;wi++;ci=0;setTimeout(tick,200);
 })()},base*1000+700);
}
var bar=document.createElement('div');bar.id='sprog';document.body.appendChild(bar);
var img=document.querySelector('.shot img'),busy=0;
function onS(){if(busy)return;busy=1;requestAnimationFrame(function(){busy=0;var y=window.pageYOffset||0,h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(1,y/h):0)+')';if(img&&y<900)img.style.transform='translate3d(0,'+Math.min(40,y*.1)+'px,0)'})}
addEventListener('scroll',onS,{passive:true});onS();
})();
