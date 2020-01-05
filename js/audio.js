;(function(window,document){var fnName='audioPlay';var _default={controller:'.audio-view',elem:{cover:'.audio-cover',songTitle:'.audio-title',thisTime:'.audio-this-time',countTime:'.audio-count-time',setbacks:'.audio-setbacks',thisSetbacks:'.audio-this-setbacks',cacheSetbacks:'.audio-cache-setbacks',audioBtn:'.audio-select',volume:'.audio-set-volume'},song:null,error:null};var errorMeg=[{tyep:1,meg:'音频路径不存在或者加载失败'},{type:2,meg:'获取不到选择容器！！！'},{type:3,meg:'当前歌单没有歌曲!!!'},{type:4,meg:'浏览器不支持该音频格式'},{type:5,meg:'对象缺省src属性'}];var control=new Audio(),songSelect=0;window[fnName]=function(setConfig){var fn=this;if(typeof(setConfig)=="object"){for(var n in setConfig){_default[n]=setConfig[n];}}
this.errors=function(meg){if(typeof _default.error=='function'){_default.error(meg);}}
if(!control){return;}else{control.onerror=function(){fn.errors(errorMeg[0]);}}
var controller=document.querySelector(_default.controller),elem=new Object(),operation,schedule;if(!controller){return fn.errors(errorMeg[1]);}
for(var e in _default.elem){elem[e]=controller.querySelector(_default.elem[e]);}
control.oncanplay=function(){fn.volume(control.volume);}
control.onended=function(){fn.switch(true);}
var setbacksPer;moveObj(elem.setbacks,function(info){setbacksPer=(info.x/info.maxX*100).toFixed(2);elem.thisTime.innerText=conversion(~~(control.duration*setbacksPer/100));elem.thisSetbacks.style.width=setbacksPer+'%';},{before:function(){fn.schedule(false);},after:function(info){var loadTime=~~(control.duration*setbacksPer/100);if(control.buffered.length>0){control.currentTime=(loadTime>(control.buffered.end(0)-10))?(control.buffered.end(0)-10):loadTime;}
fn.schedule(true);}});moveObj(elem.volume,function(info){fn.volume((info.x/info.maxX).toFixed(2));});var audioBtn={},audioBtnFind=elem.audioBtn.querySelectorAll('*');for(var b=0,bL=audioBtnFind.length;b<bL;b++){var btn=audioBtnFind[b],btnType=btn.getAttribute('action');if(btnType){audioBtn[btnType]=audioBtnFind[b];}}
elem.audioBtn.addEventListener('click',function(e){var obj=e.target;if(obj.getAttribute('action')){switch(obj.getAttribute('action'))
{case 'prev':fn.switch(false);break;case 'play':fn.play(audioBtn.play.playStatus);break;case 'next':fn.switch(true);break;case 'menu':console.log('menu');break;case 'volume':if(elem.volume.className.match('action')){controller.style='';elem.audioBtn.style='';elem.volume.className=elem.volume.className.replace('action','');}else{var width=parseInt(getComputedStyle(elem.volume).width);elem.audioBtn.style.marginRight=width+'px';controller.style.paddingRight=parseInt(getComputedStyle(controller).paddingRight)+width+'px';elem.volume.className+=' action';}
break;default:console.log('default');break;}}},false);this.loadFile=function(playStatus){if(!_default.song){return fn.errors(errorMeg[2]);}
fn.play(false);var song=_default.song[songSelect];if(song['src']){var audioType=song['src'].substr(song['src'].lastIndexOf('.')+1);if(control.canPlayType('audio/'+audioType)){control.src=song['src'];}else{return fn.errors(errorMeg[3]);}}else{return fn.errors(errorMeg[4]);}
elem.cover.style.backgroundImage='url("'+song.cover+'")';elem.songTitle.innerText=song.title;(function getDuration(){if(isNaN(control.duration)){setTimeout(getDuration,80);}else{elem.countTime.innerText=conversion(control.duration);}})();fn.play(playStatus);}
this.schedule=function(status){if(status){schedule=setInterval(function(){if(control.buffered.length>0)
elem.cacheSetbacks.style.width=percentage(control.buffered.end(0)/control.duration);elem.thisSetbacks.style.width=percentage(control.currentTime/control.duration);elem.thisTime.innerText=conversion(control.currentTime);},1000);}else{clearInterval(schedule);}}
this.volume=function(n){control.volume=n||control.volume;elem.volume.querySelector('.volume-box i').style.width=percentage(control.volume);}
this.play=function(action){if(control.src){operation=setTimeout(function(){if(action){control.play();audioBtn.play.className=audioBtn.play.getAttribute('data-off');}else{control.pause();audioBtn.play.className=audioBtn.play.getAttribute('data-on');}
fn.schedule(action);audioBtn.play.playStatus=!action;},100);}}
this.switch=function(action){(action)?songSelect++:songSelect--;songSelect=(songSelect>=_default.song.length)?0:(songSelect<0)?_default.song.length-1:songSelect;fn.loadFile(true);}
this.next=function(){fn.switch(true);}
this.prev=function(){fn.switch(false);}
return this;}
function getOffset(box,direction){var setDirection=(direction=='top')?'offsetTop':'offsetLeft';var offset=box[setDirection];var parentBox=box.offsetParent;while(parentBox){offset+=parentBox[setDirection];parentBox=parentBox.offsetParent;}
parentBox=null;return parseInt(offset);}
function moveObj(obj,fn,ready){obj.addEventListener('mousedown',function(){var X,even
EndX=parseInt(getComputedStyle(obj).width);(ready&&ready.before)&&ready.before();document.onmousemove=function(e){move(e);};document.onmouseup=function(){document.onmousemove=null;document.onmouseup=null;(ready&&ready.after)&&ready.after({even:even,x:X,maxX:EndX});};},false);obj.addEventListener('click',function(e){(ready&&ready.before)&&ready.before();move(e);(ready&&ready.after)&&ready.after({even:even,x:X,maxX:EndX});},false);function move(e){even=e||window.event;X=(e.clientX-getOffset(obj,'left'));X=(X>0)?(X>EndX)?EndX:X:0;(fn)&&fn({even:even,x:X,maxX:EndX});}}
function percentage(n){n*=100;return((n>100)?100:(n<0)?0:n)+"%";}
function twoNum(n){return(n>9)?n:'0'+n;}
function conversion(n){return twoNum(~~(n/60))+':'+twoNum(~~(n%60));}})(window,document)