(function(){
var D=document;
if(D.getElementById("pxbot"))return;
var U={ig:"https://instagram.com/d.urganandha.n",yt:"https://youtube.com/@pixlo-fx",tg:"https://t.me/PixLo_Fx",dc:"https://discord.gg/AVC9xr9G",mail:"mailto:durganandhan123@gmail.com"};
var FB=["Who is Durganandhan?","Services","Games","Photo filters","Contact","Hire for an edit"];
var A={
 greet:{t:"Hey! 👋 I'm the PIXLO FX helper bot. Ask me about Durganandhan, his services, the games on this page, or how to reach him.",c:FB},
 thanks:{t:"You're welcome! 😊 Anything else you'd like to know?",c:FB},
 praise:{t:"Thank you! 😊 Durganandhan will be happy to hear that. Want to try the games or the photo filters?",b:[["Open games","act:games"],["Photo filters","act:photo"]]},
 bye:{t:"See you! 👋 Come back anytime, and try the games before you go 🎮",b:[["Open games","act:games"]]},
 id:{t:"I'm a simple helper bot built into this page 🤖. I'm not a full AI, so I only know about Durganandhan, PIXLO FX and this site, but I'll do my best!",c:FB},
 studio:{t:"PIXLO FX Edit Studio is Durganandhan's creative studio. The motto: Create. Edit. Inspire. ✨",b:[["See services","act:go-services"]],c:["Services","Contact"]},
 services:{t:"Durganandhan offers:\n🎮 Gaming\n🎬 Video editing\n📷 Photo editing\n\nYou can try the photo filters and the games right here on the page.",b:[["Try photo filters","act:photo"],["Play games","act:games"]],c:["Hire for an edit","Experience","Contact"]},
 who:{t:"Durganandhan ks is a gamer and a creative photo and video editor, and the person behind PIXLO FX. He loves photo and video editing, visual effects and making unique content, and he's always learning fresh styles. 🔥",b:[["Read About","act:go-about"]],c:["Services","Experience","Contact"]},
 exp:{t:"📈 3+ years of experience\n📦 50+ projects completed\n😊 40+ happy clients",c:["Services","Hire for an edit"]},
 hire:{t:"Want an edit or a collab? 🎬 Message Durganandhan directly and tell him what you need. I don't have a fixed price list because it depends on the project, so he'll reply with the details.",b:[["Instagram DM",U.ig],["Telegram",U.tg],["Email",U.mail]],c:["Contact","Services"]},
 contact:{t:"You can reach Durganandhan here:\n✉ durganandhan123@gmail.com\n📸 @d.urganandha.n\n✈ @PixLo_Fx\n▶ @pixlo-fx",b:[["📸 Instagram",U.ig],["▶ YouTube",U.yt],["✈ Telegram",U.tg],["💬 Discord",U.dc],["✉ Email",U.mail]]},
 ig:{t:"📸 Instagram: @d.urganandha.n",b:[["Open Instagram",U.ig]]},
 yt:{t:"▶ YouTube: @pixlo-fx",b:[["Open YouTube",U.yt]]},
 tg:{t:"✈ Telegram: @PixLo_Fx",b:[["Open Telegram",U.tg]]},
 dc:{t:"💬 Join the Discord community:",b:[["Open Discord",U.dc]]},
 games:{t:"There are 3 games under Gaming 🎮\n⚽ Princy Shootout\n🔫 Mini Militia (multiplayer with room codes)\n🚆 Track Rush",b:[["Open games","act:games"]],c:["How to play Track Rush","How to play Mini Militia","How to play Princy Shootout"]},
 mm:{t:"🔫 Mini Militia is a side-view shooter for 2 to 12 players, and bots fill the empty slots.\n• Play in landscape\n• Left stick moves (push up for the jetpack)\n• Right stick aims and shoots\n• 💣 throws grenades, and glowing boxes give a shotgun, sniper or grenades\n• Create a room and send the code to friends to play together",b:[["Open games","act:games"]]},
 pr:{t:"⚽ Princy Shootout: tap the goal where you want to shoot. You get 5 shots against the goalkeeper, and the corners are hardest for him to reach. Score as many goals as you can!",b:[["Open games","act:games"]]},
 tr:{t:"🚆 Track Rush: swipe left or right to change lane, swipe up to jump over low barriers, and swipe down to slide under high bars. Collect coins and dodge the trains. It gets faster over time!",b:[["Open games","act:games"]]},
 photo:{t:"📷 Tap Photo Editing to open the filter tool: choose a photo or take one, pick a filter (Neon, B&W, Vintage, Dreamy, Golden, Misty, Monsoon and more), adjust brightness and contrast, then download it. Your photo stays on your phone and nothing is uploaded.",b:[["Open photo filters","act:photo"]]},
 video:{t:"🎬 Video editing is one of Durganandhan's main services. To order a video edit, message him directly.",b:[["Instagram DM",U.ig],["Telegram",U.tg]],c:["Experience","Hire for an edit"]},
 free:{t:"Yes, everything on this page is free to play and use. No sign-up needed. 🎉"},
 help:{t:"I can help with:\n• Who Durganandhan is\n• Services and experience\n• Games and how to play them\n• Photo filters\n• How to contact or hire him\n\nTap a button below or type your question.",c:FB},
 nope:{t:"Hmm, I'm not sure about that 🤔. I'm a simple bot, so I only know about Durganandhan, PIXLO FX and this site. Try one of these:",c:FB}
};
var I=[
 {k:["hi","hello","hey","hii","hlo","namaste","vanakkam","good morning","good evening"],a:A.greet},
 {k:["thanks","thank you","thankyou","thx","ty","tnx"],a:A.thanks},
 {k:["bye","goodbye","see you","later"],a:A.bye},
 {k:["who are you","are you ai","are you real","are you a bot","what are you","bot","robot","ai","chatgpt"],a:A.id},
 {k:["hire","order","price","prices","pricing","cost","charge","rate","rates","quote","book","booking","collab","collaboration","commission","payment","how much","freelance","custom edit"],a:A.hire},
 {k:["contact","reach","email","mail","gmail","message","dm","number","phone","whatsapp","connect","touch","social","socials","links","follow"],a:A.contact},
 {k:["instagram","insta","ig","reels"],a:A.ig},
 {k:["youtube","yt","channel","subscribe"],a:A.yt},
 {k:["telegram","tg"],a:A.tg},
 {k:["discord","server","community","join"],a:A.dc},
 {k:["mini militia","militia","multiplayer","room","room code","join room","shooter","jetpack","sniper","shotgun","grenade","grenades","bots"],a:A.mm},
 {k:["princy","shootout","penalty","football","goalkeeper","goal","keeper"],a:A.pr},
 {k:["track rush","trackrush","runner","subway","train","swipe","coins","jump","slide"],a:A.tr},
 {k:["photo","photos","filter","filters","picture","camera","dreamy","golden","misty","monsoon","neon","vintage","photography","image","photo editing"],a:A.photo},
 {k:["video","videos","video editing","reel","vfx","visual effects"],a:A.video},
 {k:["game","games","play","gaming","fun","playing","arcade"],a:A.games},
 {k:["service","services","offer","offers","what do you do","what does he do","skills","provide","edit","editing","editor"],a:A.services},
 {k:["experience","years","projects","clients","stats","how long","how many","completed"],a:A.exp},
 {k:["pixlo","studio","pixlo fx","pixlofx","brand"],a:A.studio},
 {k:["durganandhan","owner","creator","founder","who is","who made","who built","made by","built by","about him","about you","bio"],a:A.who},
 {k:["free","download","install","app"],a:A.free},
 {k:["help","menu","options","what can you do","commands","start"],a:A.help},
 {k:["awesome","amazing","cool","nice","great","love","good","wow","super","fire"],a:A.praise}
];
function norm(s){return " "+s.toLowerCase().replace(/[^a-z0-9 ]+/g," ").replace(/\s+/g," ").trim()+" "}
function sc(tx,tk,kw){
 if(kw.indexOf(" ")>-1)return tx.indexOf(" "+kw+" ")>-1?kw.length+3:0;
 for(var i=0;i<tk.length;i++){
  var t=tk[i];
  if(t===kw)return kw.length;
  if(kw.length>3&&t.length>3&&(t.indexOf(kw)===0||kw.indexOf(t)===0))return kw.length-1;
 }
 return 0;
}
function answer(txt){
 var tx=norm(txt),tk=tx.trim().split(" "),best=null,bs=0;
 for(var i=0;i<I.length;i++){
  var s=0;for(var j=0;j<I[i].k.length;j++)s+=sc(tx,tk,I[i].k[j]);
  if(s>bs){bs=s;best=I[i]}
 }
 return best?best.a:A.nope;
}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var root=mk("div");root.id="pxbot";
var tip=mk("div","pxtip","Ask me anything 👋");
var fab=mk("button","pxfab");fab.type="button";fab.setAttribute("aria-label","Open assistant");fab.setAttribute("aria-expanded","false");
fab.innerHTML='<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.7 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="12.5" cy="12" r="1" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="currentColor"/></svg>';
var panel=mk("div","pxpanel");panel.setAttribute("role","dialog");panel.setAttribute("aria-label","PIXLO FX assistant");
var head=mk("div","pxhead"),ht=mk("div","pxht");
ht.appendChild(mk("b","","PIXLO Assistant"));ht.appendChild(mk("span","pxst","● Online"));
var xb=mk("button","pxx","✕");xb.type="button";xb.setAttribute("aria-label","Close");
head.appendChild(ht);head.appendChild(xb);
var msgs=mk("div","pxmsgs");msgs.setAttribute("aria-live","polite");
var chips=mk("div","pxchips");
var form=mk("form","pxform");
var input=mk("input","pxin");input.type="text";input.maxLength=120;input.placeholder="Ask something…";input.setAttribute("aria-label","Your question");input.autocomplete="off";
var sb=mk("button","pxsend","➤");sb.type="submit";sb.setAttribute("aria-label","Send");
form.appendChild(input);form.appendChild(sb);
panel.appendChild(head);panel.appendChild(msgs);panel.appendChild(chips);panel.appendChild(form);
root.appendChild(tip);root.appendChild(panel);root.appendChild(fab);D.body.appendChild(root);
var busy=false,greeted=false,isOpen=false;
function act(a){
 if(a=="games"||a=="photo"){
  var c=D.getElementById(a=="games"?"playGame":"work");
  if(c){close();setTimeout(function(){c.click()},260)}else add("bot","That section isn't on the page right now.");
 }else if(a.indexOf("go-")==0){
  var e=D.getElementById(a.slice(3));
  if(e){close();setTimeout(function(){e.scrollIntoView({behavior:"smooth",block:"start"})},260)}
 }
}
function add(kind,text,btns){
 var m=mk("div","pxm "+kind);
 m.appendChild(mk("div","pxt",text));
 if(btns&&btns.length){
  var bw=mk("div","pxbs");
  btns.forEach(function(b){
   var el;
   if(/^(https?:|mailto:)/.test(b[1])){el=mk("a","pxbl",b[0]);el.href=b[1];if(b[1].indexOf("mailto:")!==0){el.target="_blank";el.rel="noopener"}}
   else{el=mk("button","pxbl",b[0]);el.type="button";el.addEventListener("click",function(){act(b[1].replace("act:",""))})}
   bw.appendChild(el);
  });
  m.appendChild(bw);
 }
 msgs.appendChild(m);msgs.scrollTop=msgs.scrollHeight;
}
function setChips(list){
 chips.innerHTML="";
 list.forEach(function(s){var c=mk("button","pxchip",s);c.type="button";c.addEventListener("click",function(){send(s)});chips.appendChild(c)});
}
function reply(a){
 busy=true;
 var w=mk("div","pxm bot"),d=mk("div","pxdots");d.innerHTML="<i></i><i></i><i></i>";w.appendChild(d);
 msgs.appendChild(w);msgs.scrollTop=msgs.scrollHeight;
 setTimeout(function(){if(w.parentNode)w.parentNode.removeChild(w);add("bot",a.t,a.b);setChips(a.c||FB);busy=false},380+Math.min(500,a.t.length*3));
}
function send(txt){
 txt=String(txt||"").trim().slice(0,120);
 if(!txt||busy)return;
 add("me",txt);input.value="";reply(answer(txt));
}
function open(){
 isOpen=true;root.classList.add("pxopen");fab.setAttribute("aria-expanded","true");tip.classList.remove("pxshow");
 if(!greeted){greeted=true;reply(A.greet)}
}
function close(){isOpen=false;root.classList.remove("pxopen");fab.setAttribute("aria-expanded","false")}
fab.addEventListener("click",function(){isOpen?close():open()});
xb.addEventListener("click",close);
form.addEventListener("submit",function(e){e.preventDefault();send(input.value)});
D.addEventListener("keydown",function(e){if(e.key=="Escape"&&isOpen)close()});
setTimeout(function(){
 var shown=false;try{shown=sessionStorage.getItem("pxtip")}catch(e){}
 if(isOpen||shown||D.getElementById("swm")||D.documentElement.classList.contains("sflock"))return;
 try{sessionStorage.setItem("pxtip","1")}catch(e){}
 tip.classList.add("pxshow");setTimeout(function(){tip.classList.remove("pxshow")},5000);
},8000);
})();
