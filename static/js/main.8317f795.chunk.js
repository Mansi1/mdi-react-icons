(this["webpackJsonpmdi-react-icons-demo"]=this["webpackJsonpmdi-react-icons-demo"]||[]).push([[0],{160:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(11),i=a.n(o),c=a(202),l=a(208),s=a(201),m=a(6),u=a(48),d=a.n(u),p=a(10),g=a(51),f=a.n(g),h=a(52),E=a.n(h);a(151);d.a.registerLanguage("javascript",f.a),d.a.registerLanguage("typescript",E.a);var v=function(e){var t=e.children,a=Object(n.useState)(void 0),o=Object(m.a)(a,2),i=o[0],c=o[1];return Object(n.useEffect)((function(){c(d.a.highlight("typescript",t))}),[t,c]),r.a.createElement("div",null,r.a.createElement("pre",null,r.a.createElement("code",{className:"language-typescript hljs"},r.a.createElement(p.a,{rawHTML:(null===i||void 0===i?void 0:i.value)||""}))))},b=a(14),y=a(189),O=a(53),j=function(e){var t,a=e.children,n=e.style;return r.a.cloneElement(a,{style:Object(O.a)(Object(O.a)({},Object(p.c)(null===a||void 0===a||null===(t=a.props)||void 0===t?void 0:t.style,{})),n)})},w=a(42),N=Object(y.a)((function(e){return{root:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",color:e.palette.primary.main,backgroundSize:"40px 40px",backgroundPosition:"0 0, 20px 20px",backgroundColor:"#fff",backgroundImage:"linear-gradient(45deg, #f4f4f4 25%, transparent 25%, transparent 75%, #f4f4f4 75%, #f4f4f4),\nlinear-gradient(45deg, #f4f4f4 25%, transparent 25%, transparent 75%, #f4f4f4 75%, #f4f4f4)"},community:{color:"#ff814a"}}})),x=function(e){var t,a=e.icon,n=N();return r.a.createElement("div",{className:Object(p.f)((t={},Object(b.a)(t,n.root,!0),Object(b.a)(t,n.community,"Google"===a.author),t))},[48,72,96].map((function(e){return r.a.createElement(j,{key:"show-case-"+e,style:{flex:1,textAlign:"center"}},r.a.createElement(w.LazyLoadImage,{alt:a.name,src:window.location.origin+"/mdi-react-icons/"+a.assetsUrl,effect:"blur",height:e,width:e}))})))},k=a(15),C=a.n(k),A=a(69),T=function(){var e=Object(A.a)(C.a.mark((function e(t,a){var n,r;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(a);case 2:return n=e.sent,e.next=5,n.blob();case 5:r=e.sent,Object(p.d)(t,r);case 7:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),L=a(18),F=a(191),S=Object(F.a)(void 0),I=a(193),D=a(45),R=a(194),z=Object(y.a)((function(){return{root:{position:"absolute",bottom:0,top:0,right:0,left:0,display:"flex",flexDirection:"column",pointerEvents:"none"},gridContainer:{margin:"auto",overflowY:"auto"},grid:{backgroundColor:"white",pointerEvents:"auto",overflowY:"auto",height:"100%",borderRadius:5,padding:25,paddingTop:15,maxWidth:500},closeButton:{padding:0,float:"right",marginTop:-5,marginRight:-15,cursor:"pointer",fontSize:28},title:{textOverflow:"ellipsis",overflow:"hidden",textAlign:"center"}}})),B=function(e){var t=e.children,a=e.onClose,n=e.title,o=e.hideClose,i=void 0!==o&&o,c=e.classes,l=void 0===c?{}:c,s=z(),m=l.root,u=void 0===m?"":m,d=l.content,g=void 0===d?"":d,f=l.title;return r.a.createElement("div",{className:s.root},r.a.createElement(I.a,{container:!0,justify:"center",className:s.gridContainer},r.a.createElement(I.a,{item:!0,xs:12,sm:10,lg:6,className:Object(p.f)(s.grid,u)},!i&&r.a.createElement(D.b,{color:"primary",className:s.closeButton,onClick:function(e){e.preventDefault(),a()}}),r.a.createElement("h1",{className:Object(p.f)(s.title,f)},n),r.a.createElement(R.a,{className:g,style:{padding:0}},t))))},P=a(197),W=a(198),M=a(200),G=a(196),H=a(199),U=function(e,t){return e&&0!==e.length?e:[t]},V=function(e){return"import { "+e+' } from "@material-ui-extra/icons/'+e+'";'},J=function(){var e=Object(L.a)(S),t=function(){S.set(void 0)};return r.a.createElement(r.a.Fragment,null,e&&r.a.createElement(l.a,{open:!0,onClick:function(e){return e.stopPropagation()},onClose:t},r.a.createElement(r.a.Fragment,null,r.a.createElement(B,{title:e.name,onClose:t},r.a.createElement(v,null,function(e){var t=[];return t.push("// standard import"),t.push(V(e.componentFileName)),t.push("\n"),e.componentAliasFileNames.length>0&&(t.push("// alias import"),e.componentAliasFileNames.forEach((function(e){t.push(V(e))}))),t.join("\n")}(e)),r.a.createElement(x,{icon:e}),r.a.createElement(G.a,null,r.a.createElement(P.a,null,r.a.createElement(W.a,null,r.a.createElement(H.a,null,r.a.createElement(M.a,{component:"th",scope:"row"},"Author"),r.a.createElement(M.a,null,e.author)),r.a.createElement(H.a,null,r.a.createElement(M.a,{component:"th",scope:"row"},"Alias"),r.a.createElement(M.a,null,U(e.aliases,"-").join(" "))),r.a.createElement(H.a,null,r.a.createElement(M.a,{component:"th",scope:"row"},"Tags"),r.a.createElement(M.a,null,U(e.tags,"-").join(" "))),r.a.createElement(H.a,null,r.a.createElement(M.a,{component:"th",scope:"row"},"License"),r.a.createElement(M.a,null,r.a.createElement("div",{style:{cursor:"pointer"},onClick:function(){return Object(p.g)("https://github.com/Templarian/MaterialDesign/blob/master/LICENSE")}},"click here")))))),r.a.createElement("div",{style:{margin:10,textAlign:"center"}},r.a.createElement(s.a,{variant:"contained",color:"primary",onClick:function(){return T((t=e).name+".svg",window.location.origin+"/mdi-react-icons/"+t.assetsUrl);var t}},"Download svg"))))))},Y=a(210),q=a(209),K=a(204),Q=a(203),X=a(162),Z=a(74),$=a(205),_=Object(F.a)({status:"NONE"}),ee=Object(F.a)(""),te=Object(y.a)((function(e){return{search:Object(b.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:"rgba(255,255,255, 0.15)","&:hover":{backgroundColor:"rgba(255,255,255, 0.25)"},marginRight:e.spacing(2),marginLeft:0,width:"100%",paddingRight:5},e.breakpoints.up("sm"),{marginLeft:e.spacing(3),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(b.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),paddingRight:0,transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:"20ch"})}})),ae=function(){var e=te(),t=Object(L.a)(ee);return r.a.createElement(Y.a,{position:"fixed"},r.a.createElement(c.a,{maxWidth:"lg"},r.a.createElement(Q.a,null,r.a.createElement(X.a,{variant:"h6",noWrap:!0,onClick:function(){return Object(p.g)("https://www.npmjs.com/package/@material-ui-extra/icons")}},"@material-ui-extra/icons"),r.a.createElement("div",{className:e.search},r.a.createElement("div",{className:e.searchIcon},r.a.createElement(Z.a,null)),r.a.createElement("div",{className:e.searchIcon}),r.a.createElement(q.a,{placeholder:"Search\u2026",classes:{root:e.inputRoot,input:e.inputInput},inputProps:{"aria-label":"search"},endAdornment:r.a.createElement(K.a,{position:"end"},r.a.createElement($.a,{size:"small",color:"inherit",onClick:function(){ee.set(""),_.set({status:"NONE"})}},r.a.createElement(D.a,null))),value:t,onChange:function(e){ee.set(e.target.value)}})))))},ne=a(71),re=Object(y.a)((function(e){var t=e.palette;return{root:{borderTop:"2px solid ".concat(t.primary.main),borderBottom:"2px solid ".concat(t.primary.main)},rootWrapper:{textAlign:"center",color:"#fff",fontSize:25,padding:10,marginTop:4,marginBottom:4,backgroundColor:t.primary.main}}})),oe=function(e){var t=e.name,a=e.addLink,n=void 0===a||a,o=re();return r.a.createElement("div",{className:o.root},r.a.createElement("div",{className:o.rootWrapper},t," ",n&&r.a.createElement($.a,{style:{color:"#fff"},onClick:function(){navigator.clipboard.writeText("".concat(window.location.origin,"/mdi-react-icons/#").concat(encodeURIComponent(t)))}},r.a.createElement(ne.a,null))))},ie=a(207),ce=(a(158),Object(y.a)((function(e){var t=e.palette;return{root:{cursor:"pointer",textAlign:"center","& svg":{fontSize:"90px !important"}},arrow:{color:t.common.black},tooltip:{fontSize:14,backgroundColor:t.common.black},iconName:{width:90,margin:"auto",color:"#000"}}}))),le=r.a.memo((function(e){var t=e.icon,a=ce();return r.a.createElement(ie.a,{classes:{tooltip:a.tooltip,arrow:a.arrow},title:r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("div",null,t.name),r.a.createElement("div",{style:{borderTop:"1px dotted #fff"}},t.author)),arrow:!0},r.a.createElement(I.a,{item:!0,xs:4,sm:3,md:2,lg:1,className:Object(p.f)(Object(b.a)({},a.root,!0)),onClick:function(){S.set(t)}},r.a.createElement(w.LazyLoadImage,{alt:t.name,src:window.location.origin+"/mdi-react-icons/"+t.assetsUrl,effect:"blur",height:90,width:90}),r.a.createElement("div",{className:a.iconName},t.name)))})),se=a(38),me=["Account / User","Agriculture","Alert / Error","Alpha / Numeric","Animal","Arrange","Arrow","Audio","Automotive","Banking","Battery","Brand / Logo","Cellphone / Phone","Clothing","Cloud","Color","Currency","Database","Date / Time","Developer / Languages","Device / Tech","Drawing / Art","Edit / Modify","Emoji","Files / Folders","Food / Drink","Form","Gaming / RPG","Geographic Information System","Hardware / Tools","Health / Beauty","Holiday","Home Automation","Lock","Math","Medical / Hospital","Music","Nature","Navigation","None","Notification","People / Family","Photography","Places","Printer","Religion","Science","Settings","Shape","Shopping","Social Media","Sport","Text / Content / Format","Tooltip","Transportation + Flying","Transportation + Other","Transportation + Road","Transportation + Water","Vector","Video / Movie","View","Weather"],ue=Object(p.e)(se,(function(e){return e.id})),de=function(e,t){for(var a={},n=0;n<e.length;n++){var r=e[n],o=t(r);"undefined"===typeof a[o]&&(a[o]=[]),a[o].push(r)}return a}(se,(function(e){return e.tags[0]?e.tags[0]:"NONE"})),pe=Object(y.a)((function(e){return{root:{color:e.palette.primary.main,paddingLeft:15,paddingRight:15}}})),ge=function(){var e=pe(),t=Object(L.a)(_);return r.a.createElement(p.b,{show:"NONE"===t.status},me.filter((function(e){return!!de[e]})).map((function(t){return r.a.createElement("div",{key:"tag-"+t},r.a.createElement(oe,{name:t}),r.a.createElement("div",{style:{height:30}}),r.a.createElement(I.a,{container:!0,spacing:3,className:e.root},de[t].map((function(e){return r.a.createElement(r.a.Fragment,{key:e.id},r.a.createElement(le,{icon:e}))}))),r.a.createElement("div",{id:t,style:{height:70}}))})))},fe=a(206),he=a(73),Ee=a.n(he)()();Ee.addField("name"),Ee.addField("aliases"),Ee.addField("tags"),Ee.setRef("id"),se.forEach((function(e){return Ee.addDoc(e)}));var ve=Object(y.a)((function(e){return{root:{color:e.palette.primary.main,paddingLeft:15,paddingRight:15},loader:{marginTop:30,textAlign:"center"},loadingText:{marginTop:25,fontWeight:"bold",textTransform:"uppercase",color:e.palette.primary.main}}})),be=function(){var e=ve(),t=Object(L.a)(_),a=Object(L.a)(ee),o=Object(p.h)(Object(n.useCallback)((function(){var e=Ee.search(a,{fields:{name:{boost:2},aliases:{boost:2},tags:{boost:1}},expand:!0});_.set({status:"DONE",search:a,data:e})}),[a]),500,Object(n.useCallback)((function(){"LOADING"!==_.get().status&&_.set({status:"LOADING"})}),[]));return Object(n.useEffect)((function(){a?o():_.set({status:"NONE"})}),[a,o]),r.a.createElement(r.a.Fragment,null,"DONE"===t.status&&r.a.createElement("div",null,r.a.createElement(oe,{name:"Search result for '"+t.search+"'",addLink:!1}),r.a.createElement("div",{style:{height:30}}),r.a.createElement(I.a,{container:!0,spacing:3,className:e.root},(t.data||[]).map((function(e){var t=e.ref;return r.a.createElement(r.a.Fragment,{key:"search-icon-"+t},r.a.createElement(le,{icon:ue[t]}))}))),0===t.data.length&&r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("div",{className:e.loadingText},"Sorry, no results ...",r.a.createElement("div",{style:{fontSize:80}},":("))),r.a.createElement("div",{style:{height:70}})),r.a.createElement(p.b,{show:"LOADING"===t.status,wrapperEl:r.a.createElement("div",{className:e.loader})},r.a.createElement(fe.a,null),r.a.createElement("div",{className:e.loadingText},"Loading ...")))},ye=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(ae,null),r.a.createElement("div",{style:{height:70}}),r.a.createElement(c.a,{maxWidth:"lg"},r.a.createElement(be,null),r.a.createElement(ge,null),r.a.createElement(J,null)))};i.a.render(r.a.createElement(n.Suspense,{fallback:null},r.a.createElement(ye,null)),document.getElementById("root"))},83:function(e,t,a){e.exports=a(160)}},[[83,1,2]]]);
//# sourceMappingURL=main.8317f795.chunk.js.map