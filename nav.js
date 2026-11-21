(function(){
var red=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches,raf=0;
function ease(p){return p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2}
document.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('nav a[href^="#"]');if(!a)return;
 var id=a.getAttribute('href').slice(1),t=document.getElementById(id);if(!t)return;
 e.preventDefault();
 var start=window.pageYOffset||0,y=id=='home'?0:t.getBoundingClientRect().top+start-14,max=document.documentElement.scrollHeight-innerHeight;
 y=Math.max(0,Math.min(max,y));
 var d=y-start;if(!d)return;
 if(red){window.scrollTo(0,y);return}
 var dur=Math.min(1000,Math.max(550,Math.abs(d)*.55)),t0=null;
 cancelAnimationFrame(raf);
 function f(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/dur);window.scrollTo(0,start+d*ease(p));if(p<1)raf=requestAnimationFrame(f)}
 raf=requestAnimationFrame(f);
});
addEventListener('wheel',function(){cancelAnimationFrame(raf)},{passive:true});
addEventListener('touchstart',function(){cancelAnimationFrame(raf)},{passive:true});
})();
