(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{105:function(e,t,n){"use strict";n.r(t);var r=n(4),a=n(0),c=n.n(a),i=n(11),s=n.n(i),o=(n(96),n(42)),u=n(13),l=n(22),j=n.n(l),p=n(31),h=n(14),b=n(29),d=n(156),O=n(159),f=n(160),x=n(161),m=n(158),g=n(153),v=Object(g.a)({card:{height:"250px"}}),k=function(){var e=v(),t=Object(a.useState)(),n=Object(h.a)(t,2),i=n[0],s=n[1];return Object(a.useEffect)((function(){(function(){var e=Object(p.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat("https://fierce-dawn-51159.herokuapp.com/","api/recipes"));case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,s(n),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),alert("Error! ".concat(e.t0));case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(r.jsxs)(d.a,{children:[Object(r.jsx)(b.a,{variant:"h1",children:"Reseptit"}),Object(r.jsx)(b.a,{variant:"body1",children:"Rutkasti herkullisia reseptej\xe4, uudessa ulkoasussa!"}),Object(r.jsx)(m.a,{container:!0,spacing:1,children:i&&i.map((function(t){return Object(r.jsx)(m.a,{item:!0,xs:12,sm:6,md:4,lg:3,children:Object(r.jsxs)(O.a,{className:e.card,children:[Object(r.jsx)(f.a,{title:t.name,subheader:t.description}),Object(r.jsx)(x.a,{children:Object(r.jsxs)(b.a,{variant:"body2",color:"textSecondary",component:"p",children:[t.ingredients.map((function(e){return Object(r.jsxs)(c.a.Fragment,{children:[Object(r.jsxs)("span",{children:[e.name," ",":"," ",e.amount]}),Object(r.jsx)("br",{})]},e.name)})),t.instruction]})})]})},t._id)}))})]})},y=function(){return Object(r.jsxs)(d.a,{children:[Object(r.jsx)(b.a,{variant:"h1",children:"Kotiverkko 2.0"}),Object(r.jsx)(b.a,{variant:"body1",children:"Kaikki palvelut, joita kotona voi tarvita! Typescriptill\xe4!"})]})},D=n(19),w=n(179),S=n(180),N=n(165),C=function(e){var t=e.handleChange,n=c.a.useState(!1),i=Object(h.a)(n,2),s=i[0],o=i[1],u=c.a.useState([]),l=Object(h.a)(u,2),b=l[0],d=l[1],O=c.a.useState([]),f=Object(h.a)(O,2),x=f[0],m=f[1],g=c.a.useState(""),v=Object(h.a)(g,2),k=v[0],y=v[1],C=!1,I=s&&C&&k.length>2;return Object(a.useEffect)((function(){var e=function(){var e=Object(p.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C=!0,e.prev=1,e.next=4,fetch("".concat("https://fierce-dawn-51159.herokuapp.com/","api/stops?name=").concat(k));case 4:return t=e.sent,e.next=7,t.json();case 7:n=e.sent,d(n),C=!1,e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),C=!1,alert("Error! ".concat(e.t0));case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(){return e.apply(this,arguments)}}();3===k.length&&e(),k.length<3&&d([])}),[k]),Object(r.jsx)(S.a,{id:"selectstops",multiple:!0,style:{width:300},open:s,onOpen:function(){o(!0)},onClose:function(){o(!1)},getOptionSelected:function(e,t){return e.name===t.name},getOptionLabel:function(e){return e.name},renderOption:function(e){return Object(r.jsx)(r.Fragment,{children:"".concat(e.name," (").concat(e.code,")")})},options:b,loading:I,inputValue:k,onInputChange:function(e,t){y(t)},renderInput:function(e){return Object(r.jsx)(w.a,Object(D.a)(Object(D.a)({},e),{},{label:"Pys\xe4kki",variant:"outlined",InputProps:Object(D.a)(Object(D.a)({},e.InputProps),{},{endAdornment:Object(r.jsxs)(r.Fragment,{children:[I?Object(r.jsx)(N.a,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))},onChange:function(e,n){console.log("new value is",n),m(n),t(n)},value:x})},I=function(e){var t=e.handleChange,n=e.stopValue,i=c.a.useState([]),s=Object(h.a)(i,2),o=s[0],u=s[1],l=c.a.useState([]),b=Object(h.a)(l,2),d=b[0],O=b[1],f=c.a.useState(""),x=Object(h.a)(f,2),m=x[0],g=x[1],v=c.a.useState(!1),k=Object(h.a)(v,2),y=k[0],C=k[1],I=y&&0===o.length;return Object(a.useEffect)((function(){(function(){var e=Object(p.a)(j.a.mark((function e(){var t,r,a,c,i,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==n.length){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,fetch("".concat("https://fierce-dawn-51159.herokuapp.com/","api/routes"));case 5:return t=e.sent,e.next=8,t.json();case 8:r=e.sent,a=n.map((function(e){return e.routes.map((function(e){return e.id}))})),c=a.flat(),i=c.filter((function(e,t,n){return n.indexOf(e)===t})),console.log(i),s=r.filter((function(e){return null===i||void 0===i?void 0:i.includes(e.id)})),u(s),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(2),alert("Error! ".concat(e.t0));case 20:case"end":return e.stop()}}),e,null,[[2,17]])})));return function(){return e.apply(this,arguments)}})()()}),[n]),Object(r.jsx)(S.a,{id:"selectstops",multiple:!0,style:{width:300},open:y,onOpen:function(){C(!0)},onClose:function(){C(!1)},getOptionSelected:function(e,t){return e.name===t.shortName},getOptionLabel:function(e){return e.shortName},renderOption:function(e){return Object(r.jsx)(r.Fragment,{children:"".concat(e.shortName," (").concat(e.longName,")")})},options:o,loading:I,inputValue:m,onInputChange:function(e,t){g(t)},renderInput:function(e){return Object(r.jsx)(w.a,Object(D.a)(Object(D.a)({},e),{},{label:"Linjat",variant:"outlined",InputProps:Object(D.a)(Object(D.a)({},e.InputProps),{},{endAdornment:Object(r.jsxs)(r.Fragment,{children:[I?Object(r.jsx)(N.a,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))},onChange:function(e,n){O(n),t(n)},value:d})},E=n(168),F=n(172),T=n(171),P=n(167),L=n(169),A=n(170),V=n(80),B=n(75),J=n.n(B),K=n(166),M=function(){var e=c.a.useState(new Date),t=Object(h.a)(e,2),n=t[0],i=t[1],s=function(){i(new Date)};Object(a.useEffect)((function(){var e=setInterval(s,1e3);return function(){clearInterval(e)}}),[]);var o;return Object(r.jsxs)("p",{children:[n.toLocaleTimeString().replaceAll(".",":")," ","and",(o=n.getTime(),new Date(o).toLocaleTimeString().replaceAll(".",":"))]})},R=function(e){var t=e.stopValue,n=e.routeValue,i=c.a.useState([]),s=Object(h.a)(i,2),o=s[0],u=s[1],l=c.a.useState(new Date),d=Object(h.a)(l,2),O=d[0],f=d[1],x=function(){var e=Object(p.a)(j.a.mark((function e(){var n,r,a,c,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==t.length){e.next=2;break}return e.abrupt("return");case 2:return f(new Date),e.prev=3,n=t.map((function(e){return"stop=".concat(e.gtfsId)})),r="".concat("https://fierce-dawn-51159.herokuapp.com/","api/departures?").concat(n.join("&")),e.next=8,fetch(r);case 8:return a=e.sent,e.next=11,a.json();case 11:c=e.sent,i=[],c.data.stops.forEach((function(e){e.stoptimesWithoutPatterns.forEach((function(t){i.push(Object(D.a)(Object(D.a)({},t),{},{stopName:e.name}))}))})),u(i.flat().sort((function(e,t){return(e.realtimeDeparture||e.scheduledDeparture)-(t.realtimeDeparture||t.scheduledDeparture)}))),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(3),alert("Error! ".concat(e.t0));case 20:case"end":return e.stop()}}),e,null,[[3,17]])})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){var e=setInterval(x,6e4);return x(),function(){clearInterval(e)}}),[t]);var m=Math.floor(O.getTime()/1e3),g=function(e){return new Date(1e3*e).toLocaleTimeString().replaceAll(".",":").slice(0,-3)};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{children:o.length>0&&function(e){var t=J.a.uniqBy(e,(function(e){return e.trip.route.shortName})).map((function(e){return{shortName:e.trip.route.shortName,alerts:e.trip.route.alerts}}));return(n.length>0?t.filter((function(e){return n.map((function(e){return e.shortName})).includes(e.shortName)})):t).map((function(e){return e.alerts.length>0?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(b.a,{variant:"h6",children:e.shortName}),e.alerts.map((function(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(b.a,{variant:"subtitle1",children:e.alertHeaderText}),Object(r.jsx)(b.a,{variant:"subtitle2",children:e.alertDescriptionText}),Object(r.jsx)(K.a,{href:e.alertUrl,variant:"caption",target:"_blank",rel:"noreferrer",children:"Lis\xe4tietoa"})]})}))]}):null}))}(o)}),Object(r.jsx)(M,{}),Object(r.jsx)(P.a,{component:V.a,children:Object(r.jsxs)(E.a,{"aria-label":"simple table",children:[Object(r.jsx)(L.a,{children:Object(r.jsxs)(A.a,{children:[Object(r.jsx)(T.a,{children:"Linja"}),Object(r.jsx)(T.a,{align:"right",children:"Pys\xe4kki"}),Object(r.jsx)(T.a,{align:"right",children:"M\xe4\xe4r\xe4np\xe4\xe4"}),Object(r.jsx)(T.a,{align:"right",children:"Kello"}),Object(r.jsx)(T.a,{align:"right",children:"Aikaa l\xe4ht\xf6\xf6n"})]})}),Object(r.jsx)(F.a,{children:o.length>0&&o.map((function(e){return 0===n.length||n.map((function(e){return e.shortName})).includes(e.trip.route.shortName)?Object(r.jsxs)(A.a,{children:[Object(r.jsx)(T.a,{component:"th",scope:"row",children:e.trip.route.shortName}),Object(r.jsx)(T.a,{align:"right",children:e.stopName}),Object(r.jsx)(T.a,{align:"right",children:e.headsign}),Object(r.jsx)(T.a,{align:"right",children:e.departureDelay>60?"".concat(g(e.scheduledDeparture+e.serviceDay)," -> ").concat(g(e.realtimeDeparture+e.serviceDay)):g((e.realtimeDeparture||e.scheduledDeparture)+e.serviceDay)}),Object(r.jsxs)(T.a,{align:"right",children:[(e.realtimeDeparture||e.scheduledDeparture)+e.serviceDay-m>0?Math.floor(((e.realtimeDeparture||e.scheduledDeparture)+e.serviceDay-m)/60):0,"min"]})]},"".concat(e.trip.route.shortName).concat(e.scheduledDeparture)):null}))})]})})]})},z=function(){var e=c.a.useState([]),t=Object(h.a)(e,2),n=t[0],a=t[1],i=c.a.useState([]),s=Object(h.a)(i,2),o=s[0],u=s[1];return console.log("in publicTransport, stops and routes",n,o),Object(r.jsxs)(d.a,{children:[Object(r.jsx)(b.a,{variant:"h4",children:"Julkisen liikenteen yhteydet"}),Object(r.jsx)(C,{handleChange:function(e){return a(e)}}),n.length>0?Object(r.jsx)(I,{stopValue:n,handleChange:function(e){return u(e)}}):null,n.length>0&&Object(r.jsx)(R,{stopValue:n,routeValue:o})]})},H=n(77),_=n(173),q=n(174),U=Object(H.a)({palette:{type:"dark"}}),W=function(e){var t=e.children;return Object(r.jsxs)(_.a,{theme:U,children:[Object(r.jsx)(q.a,{}),t]})},G=n(175),Q=n(176),X=n(163),Y=n(76),Z=n.n(Y),$=n(177),ee=n(178),te=n(182),ne=n(164),re=Object(g.a)((function(e){return{menuButton:{},title:{},root:{background:e.palette.primary.dark}}})),ae=function(){var e=re(),t=c.a.useState(!1),n=Object(h.a)(t,2),a=n[0],i=n[1],s=function(){i(!1)};return Object(r.jsxs)("div",{className:e.root,children:[Object(r.jsx)(G.a,{position:"static",children:Object(r.jsxs)(Q.a,{children:[Object(r.jsx)(X.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",onClick:function(){i(!0)},children:Object(r.jsx)(Z.a,{})}),Object(r.jsx)(b.a,{variant:"h6",className:e.title,children:"Kotiverkko 2.0"})]})}),Object(r.jsx)(te.a,{anchor:"left",open:a,onClose:s,children:Object(r.jsxs)(ne.a,{children:[Object(r.jsx)($.a,{button:!0,component:o.b,to:"/",onClick:s,children:Object(r.jsx)(ee.a,{primary:"Home"})},"home"),Object(r.jsx)($.a,{button:!0,component:o.b,to:"/reseptit",onClick:s,children:Object(r.jsx)(ee.a,{primary:"Reseptit"})},"recipes"),Object(r.jsx)($.a,{button:!0,component:o.b,to:"/joukkoliikenne",onClick:s,children:Object(r.jsx)(ee.a,{primary:"Joukkoliikenne"})},"publicTransport")]})})]})},ce=function(){return Object(r.jsx)(W,{children:Object(r.jsxs)(o.a,{basename:"/project",children:[Object(r.jsx)(ae,{}),Object(r.jsxs)(u.c,{children:[Object(r.jsx)(u.a,{exact:!0,path:"/",children:Object(r.jsx)(y,{})}),Object(r.jsx)(u.a,{path:"/reseptit",children:Object(r.jsx)(k,{})}),Object(r.jsx)(u.a,{path:"/joukkoliikenne",children:Object(r.jsx)(z,{})})]})]})})},ie=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,184)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))};s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(ce,{})}),document.getElementById("root")),ie()},96:function(e,t,n){}},[[105,1,2]]]);
//# sourceMappingURL=main.6d062a0c.chunk.js.map