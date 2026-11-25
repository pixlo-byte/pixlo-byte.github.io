(function(){
var HASH='792a3e5532390dd7b21c4f4172a199bf16e6a84b72b7e11fb689347c6199dc78',D=document;
function $(i){return D.getElementById(i)}
var st=D.createElement('style');
st.textContent='#lkm{position:fixed;inset:0;z-index:140;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.88)}#lkm.on{display:flex}.lkb{position:relative;width:100%;max-width:360px;padding:26px 22px;border-radius:24px;text-align:center;color:#fff;font-family:Outfit,system-ui,sans-serif;background:linear-gradient(145deg,#0f160f,#050805);border:1px solid #39e61f;box-shadow:0 0 50px rgba(57,230,31,.3)}.lkb h3{font-size:1.25rem;letter-spacing:.08em;margin:6px 0}.lkb h3 b{color:#39e61f}.lkb .lkd{color:#ffcc66;font-weight:600;margin-bottom:6px}.lkb p{color:#aab5a8;font-size:.9rem;font-weight:300}.lkb input{width:100%;margin-top:16px;padding:14px;border-radius:14px;border:1px solid #333;background:#111;color:#fff;font-size:1.6rem;letter-spacing:.5em;text-align:center;outline:none}.lkb input:focus{border-color:#39e61f}.lkb button.lkg{margin-top:14px;width:100%;padding:14px;border-radius:40px;border:1.5px solid #39e61f;background:transparent;color:#fff;font-size:1rem;letter-spacing:.15em}.lkb button.lkg:active{background:#39e61f;color:#000}.lkb .lkc{background:none;border:0;color:#aaa;margin-top:10px;font-size:.85rem}#lke{min-height:1.4em;margin-top:10px;color:#ff6b6b;font-size:.85rem}.lkshake{animation:lks .35s}@keyframes lks{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';
D.head.appendChild(st);
var m=D.createElement('div');m.id='lkm';
m.innerHTML='<div class="lkb" id="lkb"><div style="font-size:2.2rem">🚧</div><h3>PRINCY <b>SHOOTOUT</b></h3><div class="lkd">This game is in developing mode</div><p>Admin access only. Enter the PIN to continue.</p><input id="lkp" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" aria-label="Admin PIN" placeholder="••••"><div id="lke"></div><button class="lkg" id="lku" type="button">UNLOCK</button><button class="lkc" id="lkx" type="button">Close</button></div>';
D.body.appendChild(m);
var unlocked=false;try{unlocked=sessionStorage.getItem('pxadm')==='1'}catch(e){}
function label(){var b=$('pkp');if(b)b.textContent=unlocked?'⚽ PRINCY SHOOTOUT':'🔒 PRINCY SHOOTOUT · IN DEV'}
label();
function openL(){m.classList.add('on');$('lkp').value='';$('lke').textContent='';setTimeout(function(){$('lkp').focus()},60)}
function closeL(){m.classList.remove('on')}
function sha(s){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(b){return [].map.call(new Uint8Array(b),function(x){return ('0'+x.toString(16)).slice(-2)}).join('')})}
function tries(){var n=0,u=0;try{n=+sessionStorage.getItem('pxtry')||0;u=+sessionStorage.getItem('pxuntil')||0}catch(e){}return{n:n,u:u}}
function check(){
 var e=$('lke'),pin=$('lkp').value.trim(),t=tries(),now=Date.now();
 if(t.u>now){e.textContent='Too many tries. Wait '+Math.ceil((t.u-now)/1000)+'s.';return}
 if(!/^\d{4}$/.test(pin)){e.textContent='Enter the 4-digit PIN.';return}
 if(!(window.crypto&&crypto.subtle)){e.textContent='Unlock needs a secure (https) page.';return}
 sha('pxadm:'+pin).then(function(h){
  if(h===HASH){
   unlocked=true;try{sessionStorage.setItem('pxadm','1');sessionStorage.removeItem('pxtry')}catch(x){}
   label();closeL();var b=$('pkp');if(b)setTimeout(function(){b.click()},120);
  }else{
   var n=t.n+1;
   try{if(n>=5){sessionStorage.setItem('pxuntil',String(now+60000));sessionStorage.setItem('pxtry','0')}else sessionStorage.setItem('pxtry',String(n))}catch(x){}
   e.textContent=n>=5?'Too many tries. Locked for 60s.':'Wrong PIN.';
   var bx=$('lkb');bx.classList.remove('lkshake');void bx.offsetWidth;bx.classList.add('lkshake');$('lkp').value='';
  }
 });
}
D.addEventListener('click',function(ev){
 var b=ev.target.closest&&ev.target.closest('#pkp');
 if(!b||unlocked)return;
 ev.preventDefault();ev.stopImmediatePropagation();openL();
},true);
$('lku').addEventListener('click',check);
$('lkx').addEventListener('click',closeL);
$('lkp').addEventListener('keydown',function(e){if(e.key==='Enter')check()});
})();
