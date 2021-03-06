//Chrome Drop Down Menu- Author: Dynamic Drive (http://www.dynamicdrive.com)
//Last updated: June 14th, 06'

var cssdropdown={
disappeardelay: 10, //set delay in miliseconds before menu disappears onmouseout
disablemenuclick: true, //when user clicks on a menu item with a drop down menu, disable menu item's link?
enableswipe: 1, //enable swipe effect? 1 for yes, 0 for no

//No need to edit beyond here////////////////////////
dropmenuobj: null, ie: document.all, firefox: document.getElementById&&!document.all, swipetimer: undefined, bottomclip:0,

getposOffset:function(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
},

swipeeffect:function(){
if (this.bottomclip<parseInt(this.dropmenuobj.offsetHeight)){
this.bottomclip+=10+(this.bottomclip/10) //unclip drop down menu visibility gradually
this.dropmenuobj.style.clip="rect(0 auto "+this.bottomclip+"px 0)"
}
else
return
this.swipetimer=setTimeout("cssdropdown.swipeeffect()", 10)
},

showhide:function(obj, e){
if (this.ie || this.firefox)
this.dropmenuobj.style.left=this.dropmenuobj.style.top="-500px"
if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover"){
if (this.enableswipe==1){
if (typeof this.swipetimer!="undefined")
clearTimeout(this.swipetimer)
obj.clip="rect(0 auto 0 0)" //hide menu via clipping
this.bottomclip=0
this.swipeeffect()
}
obj.visibility="visible"
}
else if (e.type=="click")
obj.visibility="hidden"
},

iecompattest:function(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
},

clearbrowseredge:function(obj, whichedge){
var edgeoffset=0
if (whichedge=="rightedge"){
var windowedge=this.ie && !window.opera? this.iecompattest().scrollLeft+this.iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetWidth
if (windowedge-this.dropmenuobj.x < this.dropmenuobj.contentmeasure)  //move menu to the left?
edgeoffset=this.dropmenuobj.contentmeasure-obj.offsetWidth
}
else{
var topedge=this.ie && !window.opera? this.iecompattest().scrollTop : window.pageYOffset
var windowedge=this.ie && !window.opera? this.iecompattest().scrollTop+this.iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetHeight
if (windowedge-this.dropmenuobj.y < this.dropmenuobj.contentmeasure){ //move up?
edgeoffset=this.dropmenuobj.contentmeasure+obj.offsetHeight
if ((this.dropmenuobj.y-topedge)<this.dropmenuobj.contentmeasure) //up no good either?
edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
}
}
return edgeoffset
},

dropit:function(obj, e, dropmenuID){
    //window.alert(this.dropmenuobj);
    //swindow.alert(dropmenuID);
    //document.write(dropmenuID);//dropmenu1
    if (dropmenuID=="subdropmenu1"){
    }else{
        if (this.dropmenuobj!=null){ //hide previous menu
            //document.write(this.dropmenuobj);
            this.dropmenuobj.style.visibility="hidden"//hide menu
            this.clearhidemenu()
        }
    }
    
    if (this.ie||this.firefox){
        if (dropmenuID=="subdropmenu1" || dropmenuID=="subdropmenu2"){
            //obj.onmouseout=function(){cssdropdown.delayhidemenu()}
            //obj.onclick=function(){return !cssdropdown.disablemenuclick} //disable main menu item link onclick?
            this.dropmenuobj=document.getElementById(dropmenuID)
            this.dropmenuobj.onmouseover=function(){cssdropdown.clearhidemenu()}
            this.dropmenuobj.onmouseout=function(){cssdropdown.dynamichide(e)}
            this.dropmenuobj.onclick=function(){cssdropdown.delayhidemenu()}
            this.showhide(this.dropmenuobj.style, e)
            this.dropmenuobj.x=this.getposOffset(obj, "left")+155
            this.dropmenuobj.y=this.getposOffset(obj, "top")-22
            this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj, "rightedge")+"px"
            this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+1+"px"
        }else{
            obj.onmouseout=function(){cssdropdown.delayhidemenu()}
            obj.onclick=function(){return !cssdropdown.disablemenuclick} //disable main menu item link onclick?
            this.dropmenuobj=document.getElementById(dropmenuID)
            //document.write(obj);
            this.dropmenuobj.onmouseover=function(){cssdropdown.clearhidemenu()}
            this.dropmenuobj.onmouseout=function(){cssdropdown.dynamichide(e)}
            this.dropmenuobj.onclick=function(){cssdropdown.delayhidemenu()}
            this.showhide(this.dropmenuobj.style, e)
            this.dropmenuobj.x=this.getposOffset(obj, "left")
            this.dropmenuobj.y=this.getposOffset(obj, "top")
            this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj, "rightedge")+"px"
            this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+1+"px"
        }
    }
},

contains_firefox:function(a, b) {
while (b.parentNode)
if ((b = b.parentNode) == a)
return true;
return false;
},

dynamichide:function(e){
var evtobj=window.event? window.event : e
if (this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
this.delayhidemenu()
else if (this.firefox&&e.currentTarget!= evtobj.relatedTarget&& !this.contains_firefox(evtobj.currentTarget, evtobj.relatedTarget))
this.delayhidemenu()
},

delayhidemenu:function(){
this.delayhide=setTimeout("cssdropdown.dropmenuobj.style.visibility='hidden'",this.disappeardelay) //hide menu
},

clearhidemenu:function(){
if (this.delayhide!="undefined")
clearTimeout(this.delayhide)
},

startchrome:function(){
    //arguments.length indicate the number of chromemenu
    //document.write(arguments[1]);chromemenu2 
    for (var ids=0; ids<arguments.length; ids++){
        var menuitems=document.getElementById(arguments[ids]).getElementsByTagName("a")
        //document.write(menuitems[1]);
        for (var i=0; i<menuitems.length; i++){
            //document.write(i);
            //document.write(menuitems[1].getAttribute("rel"));dropmenu2 or subdropmenu2
            if (menuitems[i].getAttribute("rel")){
                var relvalue=menuitems[i].getAttribute("rel")
                //document.write(relvalue);dropmenu1dropmenu2dropmenu3dropmenu4dropmenu5dropmenu6subdropmenu1subdropmenu2
                menuitems[i].onmouseover=function(e){
                    var event=typeof e!="undefined"? e : window.event
                    cssdropdown.dropit(this,event,this.getAttribute("rel"))
                }
            }
        }
    }
}

}


function checkUncheckAll(theElement) {
 var theForm = theElement.form, z = 0;
 for(z=0; z<theForm.length;z++){
  if(theForm[z].type == 'checkbox' && theForm[z].name != 'checkall'&& theForm[z].name != 'homd'){
  theForm[z].checked = theElement.checked;
  }
 }
}

