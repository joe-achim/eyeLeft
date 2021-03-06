qx.$$packageData['22b5199f740f']={"locales":{},"resources":{},"translations":{}};

qx.Part.$$notifyLoad("22b5199f740f", function() {
(function(){var l="move",k="Boolean",j="__qp",i="mouseup",h="mousedown",g="losecapture",f="qx.ui.core.MMovable",d="mousemove",c="maximized",b="__qo",a="move-frame";
qx.Mixin.define(f,{properties:{movable:{check:k,init:true},useMoveFrame:{check:k,init:false}},members:{__qo:null,__qp:null,__qq:null,__qr:null,__qs:null,__qt:null,__qu:null,__qv:false,__qw:null,__qx:0,_activateMoveHandle:function(m){if(this.__qo){throw new Error("The move handle could not be redefined!");
}this.__qo=m;
m.addListener(h,this._onMoveMouseDown,this);
m.addListener(i,this._onMoveMouseUp,this);
m.addListener(d,this._onMoveMouseMove,this);
m.addListener(g,this.__qB,this);
},__qy:function(){var n=this.__qp;

if(!n){n=this.__qp=new qx.ui.core.Widget();
n.setAppearance(a);
n.exclude();
qx.core.Init.getApplication().getRoot().add(n);
}return n;
},__qz:function(){var location=this.getContainerLocation();
var p=this.getBounds();
var o=this.__qy();
o.setUserBounds(location.left,location.top,p.width,p.height);
o.show();
o.setZIndex(this.getZIndex()+1);
},__qA:function(e){var r=this.__qq;
var u=Math.max(r.left,Math.min(r.right,e.getDocumentLeft()));
var t=Math.max(r.top,Math.min(r.bottom,e.getDocumentTop()));
var q=this.__qr+u;
var s=this.__qs+t;
return {viewportLeft:q,viewportTop:s,parentLeft:q-this.__qt,parentTop:s-this.__qu};
},_onMoveMouseDown:function(e){if(!this.getMovable()||this.hasState(c)){return;
}var parent=this.getLayoutParent();
var w=parent.getContentLocation();
var x=parent.getBounds();
if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(!parent.isContentBlocked()){this.__qw=parent.getBlockerColor();
this.__qx=parent.getBlockerOpacity();
parent.setBlockerColor(null);
parent.setBlockerOpacity(1);
parent.blockContent(this.getZIndex()-1);
this.__qv=true;
}}this.__qq={left:w.left,top:w.top,right:w.left+x.width,bottom:w.top+x.height};
var v=this.getContainerLocation();
this.__qt=w.left;
this.__qu=w.top;
this.__qr=v.left-e.getDocumentLeft();
this.__qs=v.top-e.getDocumentTop();
this.addState(l);
this.__qo.capture();
if(this.getUseMoveFrame()){this.__qz();
}e.stop();
},_onMoveMouseMove:function(e){if(!this.hasState(l)){return;
}var y=this.__qA(e);

if(this.getUseMoveFrame()){this.__qy().setDomPosition(y.viewportLeft,y.viewportTop);
}else{this.setDomPosition(y.parentLeft,y.parentTop);
}e.stopPropagation();
},_onMoveMouseUp:function(e){if(!this.hasState(l)){return;
}this.removeState(l);
var parent=this.getLayoutParent();

if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(this.__qv){parent.unblockContent();
parent.setBlockerColor(this.__qw);
parent.setBlockerOpacity(this.__qx);
this.__qw=null;
this.__qx=0;
this.__qv=false;
}}this.__qo.releaseCapture();
var z=this.__qA(e);
this.setLayoutProperties({left:z.parentLeft,top:z.parentTop});
if(this.getUseMoveFrame()){this.__qy().exclude();
}e.stopPropagation();
},__qB:function(e){if(!this.hasState(l)){return;
}this.removeState(l);
if(this.getUseMoveFrame()){this.__qy().exclude();
}}},destruct:function(){this._disposeObjects(j,b);
this.__qq=null;
}});
})();
(function(){var a="qx.ui.window.IWindowManager";
qx.Interface.define(a,{members:{setDesktop:function(b){this.assertInterface(b,qx.ui.window.IDesktop);
},changeActiveWindow:function(c,d){},updateStack:function(){},bringToFront:function(e){this.assertInstance(e,qx.ui.window.Window);
},sendToBack:function(f){this.assertInstance(f,qx.ui.window.Window);
}}});
})();
(function(){var b="qx.ui.window.Manager",a="__qn";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.window.IWindowManager,members:{__qn:null,setDesktop:function(c){this.__qn=c;
this.updateStack();
},getDesktop:function(){return this.__qn;
},changeActiveWindow:function(d,e){if(d){this.bringToFront(d);
d.setActive(true);
}
if(e){e.resetActive();
}},_minZIndex:1e5,updateStack:function(){qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.__qn.forceUnblockContent();
var f=this.__qn.getWindows();
var h=this._minZIndex;
var m=h+f.length*2;
var j=h+f.length*4;
var k=null;

for(var i=0,l=f.length;i<l;i++){var g=f[i];
if(!g.isVisible()){continue;
}k=k||g;
if(g.isModal()){g.setZIndex(j);
this.__qn.blockContent(j-1);
j+=2;
k=g;
}else if(g.isAlwaysOnTop()){g.setZIndex(m);
m+=2;
}else{g.setZIndex(h);
h+=2;
}if(!k.isModal()&&g.isActive()||g.getZIndex()>k.getZIndex()){k=g;
}}this.__qn.setActiveWindow(k);
},bringToFront:function(n){var o=this.__qn.getWindows();
var p=qx.lang.Array.remove(o,n);

if(p){o.push(n);
this.updateStack();
}},sendToBack:function(q){var r=this.__qn.getWindows();
var s=qx.lang.Array.remove(r,q);

if(s){r.unshift(q);
this.updateStack();
}}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var k="Boolean",j="resize",i="mousedown",h="w-resize",g="sw-resize",f="n-resize",d="resizableRight",c="ne-resize",b="se-resize",a="Integer",z="e-resize",y="resizableLeft",x="mousemove",w="move",v="shorthand",u="maximized",t="nw-resize",s="mouseout",r="qx.ui.core.MResizable",q="mouseup",o="losecapture",p="resize-frame",m="resizableBottom",n="s-resize",l="resizableTop";
qx.Mixin.define(r,{construct:function(){var A=this.getContainerElement();
A.addListener(i,this.__qQ,this,true);
A.addListener(q,this.__qR,this);
A.addListener(x,this.__qT,this);
A.addListener(s,this.__qU,this);
A.addListener(o,this.__qS,this);
var B=this.getContainerElement().getDomElement();

if(B==null){B=window;
}this.__qC=qx.event.Registration.getManager(B).getHandler(qx.event.handler.DragDrop);
},properties:{resizableTop:{check:k,init:true},resizableRight:{check:k,init:true},resizableBottom:{check:k,init:true},resizableLeft:{check:k,init:true},resizable:{group:[l,d,m,y],mode:v},resizeSensitivity:{check:a,init:5},useResizeFrame:{check:k,init:true}},members:{__qC:null,__qD:null,__qE:null,__qF:null,__qG:null,__qH:null,__qI:null,RESIZE_TOP:1,RESIZE_BOTTOM:2,RESIZE_LEFT:4,RESIZE_RIGHT:8,__qJ:function(){var C=this.__qD;

if(!C){C=this.__qD=new qx.ui.core.Widget();
C.setAppearance(p);
C.exclude();
qx.core.Init.getApplication().getRoot().add(C);
}return C;
},__qK:function(){var location=this.__qN();
var D=this.__qJ();
D.setUserBounds(location.left,location.top,location.right-location.left,location.bottom-location.top);
D.show();
D.setZIndex(this.getZIndex()+1);
},__qL:function(e){var F=this.__qE;
var G=this.getSizeHint();
var K=this.__qI;
var J=this.__qH;
var E=J.width;
var I=J.height;
var H=J.containerWidth;
var M=J.containerHeight;
var N=J.left;
var top=J.top;
var L;

if((F&this.RESIZE_TOP)||(F&this.RESIZE_BOTTOM)){L=Math.max(K.top,Math.min(K.bottom,e.getDocumentTop()))-this.__qG;

if(F&this.RESIZE_TOP){I-=L;
M-=L;
}else{I+=L;
M+=L;
}
if(M<G.minHeight){I+=(G.minHeight-M);
M=G.minHeight;
}else if(M>G.maxHeight){I-=(G.maxHeight-M);
M=G.maxHeight;
}
if(F&this.RESIZE_TOP){top+=J.containerHeight-M;
}}
if((F&this.RESIZE_LEFT)||(F&this.RESIZE_RIGHT)){L=Math.max(K.left,Math.min(K.right,e.getDocumentLeft()))-this.__qF;

if(F&this.RESIZE_LEFT){E-=L;
H-=L;
}else{E+=L;
H+=L;
}
if(H<G.minWidth){E+=(G.minWidth-H);
H=G.minWidth;
}else if(E>G.maxWidth){E-=(G.maxWidth-H);
H=G.maxWidth;
}
if(F&this.RESIZE_LEFT){N+=J.containerWidth-H;
}}return {viewportLeft:N,viewportTop:top,parentLeft:J.bounds.left+N-J.left,parentTop:J.bounds.top+top-J.top,containerWidth:H,containerHeight:M,width:E,height:I};
},__qM:{1:f,2:n,4:h,8:z,5:t,6:g,9:c,10:b},__qN:function(){var O=this.getDecoratorElement();
if(O&&O.getDomElement()){return qx.bom.element.Location.get(O.getDomElement());
}else{return this.getContentLocation();
}},__qO:function(e){var location=this.__qN();
var P=this.getResizeSensitivity();
var S=e.getDocumentLeft();
var R=e.getDocumentTop();
var Q=this.__qP(location,S,R,P);
if(Q>0){Q=Q|this.__qP(location,S,R,P*2);
}this.__qE=Q;
},__qP:function(location,T,U,V){var W=0;
if(this.getResizableTop()&&Math.abs(location.top-U)<V&&T>location.left-V&&T<location.right+V){W+=this.RESIZE_TOP;
}else if(this.getResizableBottom()&&Math.abs(location.bottom-U)<V&&T>location.left-V&&T<location.right+V){W+=this.RESIZE_BOTTOM;
}if(this.getResizableLeft()&&Math.abs(location.left-T)<V&&U>location.top-V&&U<location.bottom+V){W+=this.RESIZE_LEFT;
}else if(this.getResizableRight()&&Math.abs(location.right-T)<V&&U>location.top-V&&U<location.bottom+V){W+=this.RESIZE_RIGHT;
}return W;
},__qQ:function(e){if(!this.__qE){return;
}this.addState(j);
this.__qF=e.getDocumentLeft();
this.__qG=e.getDocumentTop();
var bb=this.getContainerLocation();
var X=this.__qN();
var ba=this.getBounds();
this.__qH={top:X.top,left:X.left,containerWidth:bb.right-bb.left,containerHeight:bb.bottom-bb.top,width:X.right-X.left,height:X.bottom-X.top,bounds:qx.lang.Object.clone(ba)};
var parent=this.getLayoutParent();
var bc=parent.getContentLocation();
var Y=parent.getBounds();
this.__qI={left:bc.left,top:bc.top,right:bc.left+Y.width,bottom:bc.top+Y.height};
if(this.getUseResizeFrame()){this.__qK();
}this.capture();
e.stop();
},__qR:function(e){if(!this.hasState(j)){return;
}if(this.getUseResizeFrame()){this.__qJ().exclude();
}var bd=this.__qL(e);
this.setWidth(bd.containerWidth);
this.setHeight(bd.containerHeight);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:bd.parentLeft,top:bd.parentTop});
}this.__qE=0;
this.removeState(j);
this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.releaseCapture();
e.stopPropagation();
},__qS:function(e){if(!this.__qE){return;
}this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.removeState(w);
if(this.getUseResizeFrame()){this.__qJ().exclude();
}},__qT:function(e){if(this.hasState(j)){var bh=this.__qL(e);
if(this.getUseResizeFrame()){var bf=this.__qJ();
bf.setUserBounds(bh.viewportLeft,bh.viewportTop,bh.width,bh.height);
}else{this.setWidth(bh.containerWidth);
this.setHeight(bh.containerHeight);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:bh.parentLeft,top:bh.parentTop});
}}e.stopPropagation();
}else if(!this.hasState(u)&&!this.__qC.isSessionActive()){this.__qO(e);
var bi=this.__qE;
var bg=this.getApplicationRoot();

if(bi){var be=this.__qM[bi];
this.setCursor(be);
bg.setGlobalCursor(be);
}else if(this.getCursor()){this.resetCursor();
bg.resetGlobalCursor();
}}},__qU:function(e){if(this.getCursor()&&!this.hasState(j)){this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
}}},destruct:function(){if(this.__qD!=null&&!qx.core.ObjectRegistry.inShutDown){this.__qD.destroy();
this.__qD=null;
}this.__qC=null;
}});
})();
(function(){var k="Boolean",j="qx.event.type.Event",i="captionbar",h="_applyCaptionBarChange",g="maximize-button",f="restore-button",d="minimize-button",c="close-button",b="maximized",a="execute",R="pane",Q="title",P="icon",O="statusbar-text",N="statusbar",M="String",L="showStatusbar",K="normal",J="active",I="beforeClose",r="beforeMinimize",s="mousedown",p="changeStatus",q="changeIcon",n="excluded",o="dblclick",l="_applyActive",m="beforeRestore",t="minimize",u="changeModal",A="changeAlwaysOnTop",z="_applyShowStatusbar",C="_applyStatus",B="qx.ui.window.Window",E="changeCaption",D="focusout",w="beforeMaximize",H="maximize",G="restore",F="window",v="close",x="changeActive",y="minimized";
qx.Class.define(B,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MResizable,qx.ui.core.MMovable,qx.ui.core.MContentPadding],construct:function(S,T){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.VBox());
this._createChildControl(i);
this._createChildControl(R);
if(T!=null){this.setIcon(T);
}
if(S!=null){this.setCaption(S);
}this._updateCaptionBar();
this.addListener(s,this._onWindowMouseDown,this,true);
this.addListener(D,this._onWindowFocusOut,this);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
qx.ui.core.FocusHandler.getInstance().addRoot(this);
},statics:{DEFAULT_MANAGER_CLASS:qx.ui.window.Manager},events:{"beforeClose":j,"close":j,"beforeMinimize":j,"minimize":j,"beforeMaximize":j,"maximize":j,"beforeRestore":j,"restore":j},properties:{appearance:{refine:true,init:F},visibility:{refine:true,init:n},focusable:{refine:true,init:true},active:{check:k,init:false,apply:l,event:x},alwaysOnTop:{check:k,init:false,event:A},modal:{check:k,init:false,event:u},caption:{apply:h,event:E,nullable:true},icon:{check:M,nullable:true,apply:h,event:q,themeable:true},status:{check:M,nullable:true,apply:C,event:p},showClose:{check:k,init:true,apply:h,themeable:true},showMaximize:{check:k,init:true,apply:h,themeable:true},showMinimize:{check:k,init:true,apply:h,themeable:true},allowClose:{check:k,init:true,apply:h},allowMaximize:{check:k,init:true,apply:h},allowMinimize:{check:k,init:true,apply:h},showStatusbar:{check:k,init:false,apply:z}},members:{__qV:null,__qW:null,getChildrenContainer:function(){return this.getChildControl(R);
},_forwardStates:{active:true,maximized:true,showStatusbar:true},setLayoutParent:function(parent){qx.ui.core.Widget.prototype.setLayoutParent.call(this,parent);
},_createChildControlImpl:function(U,V){var W;

switch(U){case N:W=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(W);
W.add(this.getChildControl(O));
break;
case O:W=new qx.ui.basic.Label();
W.setValue(this.getStatus());
break;
case R:W=new qx.ui.container.Composite();
this._add(W,{flex:1});
break;
case i:var Y=new qx.ui.layout.Grid();
Y.setRowFlex(0,1);
Y.setColumnFlex(1,1);
W=new qx.ui.container.Composite(Y);
this._add(W);
W.addListener(o,this._onCaptionMouseDblClick,this);
this._activateMoveHandle(W);
break;
case P:W=new qx.ui.basic.Image(this.getIcon());
this.getChildControl(i).add(W,{row:0,column:0});
break;
case Q:W=new qx.ui.basic.Label(this.getCaption());
W.setWidth(0);
W.setAllowGrowX(true);
var X=this.getChildControl(i);
X.add(W,{row:0,column:1});
break;
case d:W=new qx.ui.form.Button();
W.setFocusable(false);
W.addListener(a,this._onMinimizeButtonClick,this);
this.getChildControl(i).add(W,{row:0,column:2});
break;
case f:W=new qx.ui.form.Button();
W.setFocusable(false);
W.addListener(a,this._onRestoreButtonClick,this);
this.getChildControl(i).add(W,{row:0,column:3});
break;
case g:W=new qx.ui.form.Button();
W.setFocusable(false);
W.addListener(a,this._onMaximizeButtonClick,this);
this.getChildControl(i).add(W,{row:0,column:4});
break;
case c:W=new qx.ui.form.Button();
W.setFocusable(false);
W.addListener(a,this._onCloseButtonClick,this);
this.getChildControl(i).add(W,{row:0,column:6});
break;
}return W||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,U);
},_updateCaptionBar:function(){var bb;
var bc=this.getIcon();

if(bc){this.getChildControl(P).setSource(bc);
this._showChildControl(P);
}else{this._excludeChildControl(P);
}var ba=this.getCaption();

if(ba){this.getChildControl(Q).setValue(ba);
this._showChildControl(Q);
}else{this._excludeChildControl(Q);
}
if(this.getShowMinimize()){this._showChildControl(d);
bb=this.getChildControl(d);
this.getAllowMinimize()?bb.resetEnabled():bb.setEnabled(false);
}else{this._excludeChildControl(d);
}
if(this.getShowMaximize()){if(this.isMaximized()){this._showChildControl(f);
this._excludeChildControl(g);
}else{this._showChildControl(g);
this._excludeChildControl(f);
}bb=this.getChildControl(g);
this.getAllowMaximize()?bb.resetEnabled():bb.setEnabled(false);
}else{this._excludeChildControl(g);
this._excludeChildControl(f);
}
if(this.getShowClose()){this._showChildControl(c);
bb=this.getChildControl(c);
this.getAllowClose()?bb.resetEnabled():bb.setEnabled(false);
}else{this._excludeChildControl(c);
}},close:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(I,qx.event.type.Event,[false,true])){this.hide();
this.fireEvent(v);
}},open:function(){this.show();
this.setActive(true);
this.focus();
},center:function(){var parent=this.getLayoutParent();

if(parent){var be=parent.getBounds();

if(be){var bf=this.getSizeHint();
var bd=Math.round((be.width-bf.width)/2);
var top=Math.round((be.height-bf.height)/2);

if(top<0){top=0;
}this.moveTo(bd,top);
return;
}}},maximize:function(){if(this.isMaximized()){return;
}var parent=this.getLayoutParent();

if(parent!=null&&parent.supportsMaximize()){if(this.fireNonBubblingEvent(w,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var bg=this.getLayoutProperties();
this.__qW=bg.left===undefined?0:bg.left;
this.__qV=bg.top===undefined?0:bg.top;
this.setLayoutProperties({left:null,top:null,edge:0});
this.addState(b);
this._updateCaptionBar();
this.fireEvent(H);
}}},minimize:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(r,qx.event.type.Event,[false,true])){var bh=this.getLayoutProperties();
this.__qW=bh.left===undefined?0:bh.left;
this.__qV=bh.top===undefined?0:bh.top;
this.removeState(b);
this.hide();
this.fireEvent(t);
}},restore:function(){if(this.getMode()===K){return;
}
if(this.fireNonBubblingEvent(m,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var bi=this.__qW;
var top=this.__qV;
this.setLayoutProperties({edge:null,left:bi,top:top});
this.removeState(b);
this._updateCaptionBar();
this.fireEvent(G);
}},moveTo:function(bj,top){if(this.isMaximized()){return;
}this.setLayoutProperties({left:bj,top:top});
},isMaximized:function(){return this.hasState(b);
},getMode:function(){if(!this.isVisible()){return y;
}else{if(this.isMaximized()){return b;
}else{return K;
}}},_applyActive:function(bk,bl){if(bl){this.removeState(J);
}else{this.addState(J);
}},_getContentPaddingTarget:function(){return this.getChildControl(R);
},_applyShowStatusbar:function(bm,bn){bm?this.addState(L):this.removeState(L);

if(bm){this._showChildControl(N);
}else{this._excludeChildControl(N);
}},_applyCaptionBarChange:function(bo,bp){this._updateCaptionBar();
},_applyStatus:function(bq,br){var bs=this.getChildControl(O,true);

if(bs){bs.setValue(bq);
}},_onWindowEventStop:function(e){e.stopPropagation();
},_onWindowMouseDown:function(e){this.setActive(true);
},_onWindowFocusOut:function(e){if(this.getModal()){return;
}var bt=e.getRelatedTarget();

if(bt!=null&&!qx.ui.core.Widget.contains(this,bt)){this.setActive(false);
}},_onCaptionMouseDblClick:function(e){if(this.getAllowMaximize()){this.isMaximized()?this.restore():this.maximize();
}},_onMinimizeButtonClick:function(e){this.minimize();
this.getChildControl(d).reset();
},_onRestoreButtonClick:function(e){this.restore();
this.getChildControl(f).reset();
},_onMaximizeButtonClick:function(e){this.maximize();
this.getChildControl(g).reset();
},_onCloseButtonClick:function(e){this.close();
this.getChildControl(c).reset();
}}});
})();
(function(){var a="qx.ui.window.IDesktop";
qx.Interface.define(a,{members:{setWindowManager:function(b){this.assertInterface(b,qx.ui.window.IWindowManager);
},getWindows:function(){},supportsMaximize:function(){},blockContent:function(c){this.assertInteger(c);
},unblockContent:function(){},isContentBlocked:function(){}}});
})();
(function(){var a="qx.ui.window.Desktop";
qx.Class.define(a,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.window.MDesktop,qx.ui.core.MBlocker],implement:qx.ui.window.IDesktop,construct:function(b){qx.ui.core.Widget.call(this);
b=b||new qx.ui.window.Window.DEFAULT_MANAGER_CLASS();
this.getContentElement().disableScrolling();
this._setLayout(new qx.ui.layout.Canvas());
this.setWindowManager(b);
}});
})();
(function(){var a="showcase.page.AbstractDesktopContent";
qx.Class.define(a,{extend:showcase.AbstractContent,construct:function(b){showcase.AbstractContent.call(this,b);
this.setView(this._createView());
},members:{_createView:function(){var d=new qx.ui.window.Desktop(new qx.ui.window.Manager());
var c=new qx.ui.window.Window();
c.set({showClose:false,showMinimize:false,contentPadding:0});
this._addWindowContent(c);
d.add(c);
c.moveTo(30,20);
c.open();
return d;
},_addWindowContent:function(e){throw new Error("Abstract method call!");
}}});
})();
(function(){var h="checked",g="menu-checkbox",f="Boolean",d="_applyValue",c="changeValue",b="qx.ui.menu.CheckBox",a="execute";
qx.Class.define(b,{extend:qx.ui.menu.AbstractButton,implement:[qx.ui.form.IBooleanForm],construct:function(i,j){qx.ui.menu.AbstractButton.call(this);
if(i!=null){if(i.translate){this.setLabel(i.translate());
}else{this.setLabel(i);
}}
if(j!=null){this.setMenu(j);
}this.addListener(a,this._onExecute,this);
},properties:{appearance:{refine:true,init:g},value:{check:f,init:false,apply:d,event:c,nullable:true}},members:{_applyValue:function(k,l){k?this.addState(h):this.removeState(h);
},_onExecute:function(e){this.toggleValue();
},_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
}else{if(this.getContextMenu()){return;
}}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();

});