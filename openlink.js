(function(){
var m=location.search.match(/[?&]open=(games|photo)/);
if(!m)return;
var id=m[1]=='games'?'playGame':'work';
(window.pxWait||Promise.resolve()).then(function(){setTimeout(function(){var c=document.getElementById(id);if(c)c.click()},600)});
})();
