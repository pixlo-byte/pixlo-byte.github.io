(function(){
if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var SEL='.btn,.contact,nav a,.stats li,.bio,.about,.tag,.socials a,.ic',cur=null;
document.addEventListener('pointerdown',function(e){
 var t=e.target;if(!t.closest||!t.closest('.page'))return;
 var el=t.closest(SEL);if(!el)return;
 var r=el.getBoundingClientRect(),sz=Math.max(r.width,r.height)*2.2,s=document.createElement('span');
 s.className='rip';s.style.width=s.style.height=sz+'px';
 s.style.left=(e.clientX-r.left-sz/2)+'px';s.style.top=(e.clientY-r.top-sz/2)+'px';
 el.appendChild(s);cur=s;
 setTimeout(function(){if(s.parentNode)s.parentNode.removeChild(s)},700);
 try{if(navigator.vibrate)navigator.vibrate(8)}catch(_){}
},{passive:true});
document.addEventListener('pointercancel',function(){if(cur&&cur.parentNode){cur.parentNode.removeChild(cur)}cur=null},{passive:true});
})();
