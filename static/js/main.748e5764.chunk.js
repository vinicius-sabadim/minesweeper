(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,r){e.exports=r(55)},53:function(e,t,r){},54:function(e,t,r){},55:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(10),i=r.n(o),c=r(13),s=r(2),l=r(3),u=r.n(l),d=r(6),m=r(11),b=r(15),g=r(12),p=r(16),v=r(14),f=function(e){return Math.floor(Math.random()*e)},h=function(e,t){var r=[],n=e*t;for(var a in Object(v.a)(Array(n))){var o=parseInt(a,10);r.push({id:o,row:Math.floor(o/t),column:o%t,hasBomb:!1,hasFlag:!1,dangerLevel:0,isHovered:!1,isVisible:!1,neighbors:[]})}return r},E=function(e,t,r,n,a){for(var o=0;o<n;){var i=x(e,t,r,a);e[i].hasBomb||(e[i]=Object(s.a)({},e[i],{hasBomb:!0,explode:!1}),o+=1)}return e},x=function(e,t,r,n){var a=t*r;if(n){for(var o=[e[0].id,e[r-1].id,e[(t-1)*r].id,e[e.length-1].id],i=!1,c=null;!i;)c=f(a),o.includes(c)||(i=!0);return c}return f(a)},C=function(e,t,r){return e.map(function(e){var n=e.neighbors;return w(e)&&y(e)&&n.push(e.id-r-1),w(e)&&n.push(e.id-r),w(e)&&B(e,r)&&n.push(e.id-r+1),y(e)&&n.push(e.id-1),B(e,r)&&n.push(e.id+1),F(e,t)&&y(e)&&n.push(e.id+r-1),F(e,t)&&n.push(e.id+r),F(e,t)&&B(e,r)&&n.push(e.id+r+1),Object(s.a)({},e,{neighbors:n})})},O=function(e){return e.forEach(function(t){t.dangerLevel=j(e,t)}),e},j=function(e,t){var r=0;return t.neighbors.forEach(function(t){r=e[t].hasBomb?r+1:r}),r},w=function(e){return e.row-1>=0},F=function(e,t){return e.row+1<t},y=function(e){return e.column-1>=0},B=function(e,t){return e.column+1<t},k=a.a.createContext(),A={ready:0,playing:1,gameover:2,victory:3},L={Beginner:{rows:9,columns:9},Intermediate:{rows:16,columns:16},Expert:{rows:16,columns:30}},S={Beginner:10,Intermediate:40,Expert:99},T=function(e){function t(){var e,r;Object(m.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(r=Object(b.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(o)))).state={bombs:10,bombsRemaining:10,cellsToDiscover:71,cheat:{cleanBorders:!1,hover:!1},columns:9,grid:[],navigateUsingArrow:0,rows:9,status:A.ready,selectedLevel:"Beginner",time:0},r.timer=function(){},r.componentDidMount=function(){return r.startGrid()},r.startGrid=Object(d.a)(u.a.mark(function e(){var t,n,a,o,i,c;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.state,n=t.columns,a=t.rows,o=t.bombs,i=t.cheat,c=h(a,n),c=E(c,a,n,o,i.cleanBorders),c=C(c,a,n),c=O(c),e.next=7,r.setState({grid:c});case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}},e)})),r.restartGame=function(){var e=Object(d.a)(u.a.mark(function e(t){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t||0!==t.detail){e.next=2;break}return e.abrupt("return");case 2:return r.stopTimer(),r.setState({bombsRemaining:S[r.state.selectedLevel],cellsToDiscover:r.state.rows*r.state.columns-r.state.bombs,cheat:Object(s.a)({},r.state.cheat,{cleanBorders:!1}),navigateUsingArrow:0,status:A.ready,time:0}),e.next=6,r.startGrid();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),r.changeLevel=function(e){r.setState({selectedLevel:e},r.restartGame);var t=S[e],n=L[e],a=n.rows,o=n.columns;r.setState({bombs:t,columns:o,rows:a},r.startGrid)},r.cellClicked=function(e){var t=r.state.status;if(t===A.ready||t===A.playing){var n=r.state.grid,a=!0,o=!1,i=void 0;try{for(var c,s=e[Symbol.iterator]();!(a=(c=s.next()).done);a=!0){var l=c.value;if(l.isVisible)return;if(l.hasFlag)return;if(n=r.changeCellToVisible(r.state.grid,l),l.hasBomb)r.setState({status:A.gameover}),n=r.clickedOnBomb(n,l);else{var u=r.updateCellsToDiscover(n);r.verifyVictory(u)}}}catch(d){o=!0,i=d}finally{try{a||null==s.return||s.return()}finally{if(o)throw i}}t===A.ready&&r.setState({status:A.playing},function(){e.length>1?r.startTimer():e[0].hasBomb||r.startTimer()}),r.setState({grid:n})}},r.updateCellsToDiscover=function(e){var t=r.state.cellsToDiscover,n=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done);n=!0){i.value.isVisible&&(t-=1)}}catch(s){a=!0,o=s}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}return t},r.verifyVictory=function(e){0===e&&(r.stopTimer(),r.setState({status:A.victory}))},r.changeCellToVisible=function(e,t){return e[t.id]=Object(s.a)({},t,{isVisible:!0}),0!==t.dangerLevel||t.hasBomb||t.isVisible||t.neighbors.forEach(function(t){r.changeCellToVisible(e,e[t])}),e},r.clickedOnBomb=function(e,t){return r.stopTimer(),e[t.id]=Object(s.a)({},t,{isVisible:!0,explode:!0}),e=e.map(function(e){return e.hasBomb&&!e.explode?Object(s.a)({},e,{isVisible:!0}):e})},r.toggleFlag=function(e,t){if(t&&t.preventDefault(),!e.isVisible){var n=r.state.grid,a=n[e.id],o=a.hasFlag?r.state.bombsRemaining+1:r.state.bombsRemaining-1;n[e.id]=Object(s.a)({},a,{hasFlag:!a.hasFlag}),r.setState({bombsRemaining:o,grid:n})}},r.setHover=function(e,t){if(r.state.cheat.hover){var n=r.state.grid;n[e.id]=Object(s.a)({},e,{isHovered:t}),e.neighbors.forEach(function(e){n[e].isHovered=t}),r.setState({grid:n})}},r.cleanBorders=function(e){e&&0===e.detail||r.setState({cheat:Object(s.a)({},r.state.cheat,{cleanBorders:!0})},Object(d.a)(u.a.mark(function e(){var t,n,a,o,i,c,s,l;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.restartGame();case 2:t=r.state,n=t.columns,a=t.grid,o=t.rows,i=a[0],c=a[n-1],s=a[(o-1)*n],l=a[a.length-1],r.cellClicked([i,c,s,l]);case 8:case"end":return e.stop()}},e)})))},r.toggleCheatHover=function(){var e=r.state.cheat;r.setState({cheat:Object(s.a)({},e,{hover:!e.hover})})},r.changeNavigation=function(e){var t=r.state.navigateUsingArrow,n=r.state.grid[t],a=r.state,o=a.columns,i=a.rows,c=t;"down"===e&&F(n,i)?c=t+o:"up"===e&&w(n)?c=t-o:"left"===e&&y(n)?c=t-1:"right"===e&&B(n,o)?c=t+1:"trigger"===e?r.cellClicked([n]):"flag"===e?r.toggleFlag(n):"restart"===e?r.restartGame():"clean"===e&&r.cleanBorders(),r.setState({navigateUsingArrow:c})},r.startTimer=function(){r.timer=setInterval(function(){r.setState({time:r.state.time+1})},1e3)},r.stopTimer=function(){clearInterval(r.timer)},r.render=function(){return a.a.createElement(k.Provider,{value:{bombsRemaining:r.state.bombsRemaining,changeLevel:r.changeLevel,changeNavigation:r.changeNavigation,cellClicked:r.cellClicked,cheat:r.state.cheat,cleanBorders:r.cleanBorders,grid:r.state.grid,isGameOver:r.state.status===A.gameover,isVictory:r.state.status===A.victory,navigateUsingArrow:r.state.navigateUsingArrow,restartGame:r.restartGame,selectedLevel:r.state.selectedLevel,time:r.state.time,toggleCheatHover:r.toggleCheatHover,toggleFlag:r.toggleFlag,setHover:r.setHover}},r.props.children)},r}return Object(p.a)(t,e),t}(a.a.Component),N=k,R=r(1),V={alignItems:"center",backgroundColor:"#DDDDDD",cursor:"pointer",display:"flex",fontWeight:"bold",height:"2rem",justifyContent:"center",maxHeight:"40px",maxWidth:"40px",position:"relative",userSelect:"none",width:"2rem"},D={cell:Object(R.css)(Object(s.a)({},V,{borderTop:"2px solid #EEEEEE",borderLeft:"2px solid #EEEEEE",borderBottom:"2px solid #555555",borderRight:"2px solid #555555",":hover":{backgroundColor:"#EEEEEE"}})),cellOver:Object(R.css)(Object(s.a)({},V,{borderTop:"2px solid #EEEEEE",borderLeft:"2px solid #EEEEEE",borderBottom:"2px solid #555555",borderRight:"2px solid #555555"})),cellVisible:Object(R.css)(Object(s.a)({},V,{backgroundColor:"#CCCCCC",borderTop:"2px solid #555555",borderLeft:"2px solid #555555",borderBottom:"2px solid #CCCCCC",borderRight:"2px solid #CCCCCC"})),cellHovered:Object(R.css)({backgroundColor:"#90FC6F"}),cellExploded:Object(R.css)(Object(s.a)({},V,{backgroundColor:"#F76767",borderTop:"2px solid #555555",borderLeft:"2px solid #555555",borderBottom:"2px solid #F76767",borderRight:"2px solid #F76767"})),cellFlag:Object(R.css)(Object(s.a)({},V,{borderTop:"2px solid #EEEEEE",borderLeft:"2px solid #EEEEEE",borderBottom:"2px solid #555555",borderRight:"2px solid #555555"})),cellNavigation:Object(R.css)({backgroundColor:"linen"}),emoji:Object(R.css)({color:"red",fontSize:"20px",height:"1.5rem"}),value:Object(R.css)({fontSize:"22px"})},H=["","#4286F4","#0BA51B","#6E25DB","#DB7325","#E22FB6","#D11F1F","#398452","#683B39"],G=function(e,t){return e.hasFlag?D.cellFlag:e.isVisible&&e.explode?D.cellExploded:e.isVisible?D.cellVisible:t?D.cellOver:D.cell},I=function(e){if(e.isHovered)return D.cellHovered},U=function(e,t){if(e.id===t)return D.cellNavigation},z=function(e){return e.hasFlag?"\ud83d\udea9":e.isVisible?e.hasBomb?"\ud83d\udca3":e.dangerLevel>0?e.dangerLevel:"":""},M=function(e){var t=e.cell,r=Object(n.useContext)(N),o=r.isGameOver,i=r.cellClicked,c=r.navigateUsingArrow,s=r.toggleFlag,l=r.setHover;return a.a.createElement("td",{className:"".concat(G(t,o)," ").concat(I(t)," ").concat(U(t,c)),style:{color:H[t.dangerLevel]},onClick:i.bind(void 0,[t]),onContextMenu:s.bind(void 0,t),onMouseEnter:l.bind(void 0,t,!0),onMouseLeave:l.bind(void 0,t,!1)},a.a.createElement("span",{className:t.hasBomb||t.hasFlag?D.emoji:D.value},z(t)))},W={row:Object(R.css)({display:"flex",justifyContent:"center"})},J=function(e){var t=e.row;return a.a.createElement("tr",{className:W.row},t.map(function(e,t){return a.a.createElement(M,{key:"cell-".concat(t),cell:e})}))},P={grid:Object(R.css)({borderCollapse:"collapse",borderTop:"2px solid #555555",borderLeft:"2px solid #555555",borderBottom:"2px solid #EEEEEE",borderRight:"2px solid #EEEEEE",height:"100%"})},q={ArrowDown:"down",ArrowUp:"up",ArrowLeft:"left",ArrowRight:"right",Enter:"trigger",a:"trigger",f:"flag",r:"restart",c:"clean"},K=function(e){for(var t,r=(t=function(e){return e.row},e.reduce(function(e,r){var n=t(r);return e[n]?e[n].push(r):e[n]=[r],e},{})),n=[],o=Object.entries(r),i=0;i<o.length;i++){var s=o[i],l=Object(c.a)(s,2),u=l[0],d=l[1];n.push(a.a.createElement(J,{key:"row-".concat(u),row:d}))}return n},Q=function(){var e=Object(n.useContext)(N),t=e.changeNavigation,r=e.grid,o=function(e){var r=e.key,n=q[r];n&&t(n)};return Object(n.useEffect)(function(){return window.addEventListener("keydown",o),function(){window.removeEventListener("keydown",o)}},[]),a.a.createElement("table",{className:P.grid},a.a.createElement("tbody",null,K(r)))},X=(r(53),function(e){var t=e.checked,r=e.label,n=e.onChange;return a.a.createElement("label",{className:"container"},r,a.a.createElement("input",{type:"checkbox",checked:t,onChange:n}),a.a.createElement("span",{className:"checkmark"}))}),Y={button:Object(R.css)({alignItems:"center",backgroundColor:"#FFFFFF",border:"1px solid #4286F4",borderRadius:"5px",color:"#4286F4",cursor:"pointer",display:"flex",fontSize:"16px",height:"30px",padding:"5px",":hover":{backgroundColor:"#4286F4",color:"#FFFFFF"},":focus":{outline:"none"}})},Z=function(e){return a.a.createElement("button",Object.assign({className:Y.button},e),e.children)},$={menu:Object(R.css)({display:"flex",listStyle:"none",marginBottom:"30px"}),listItem:Object(R.css)({borderBottom:"2px solid #FFFFFF",cursor:"pointer",marginRight:"20px",padding:"10px 0"}),listItemActive:Object(R.css)({borderBottom:"2px solid #CCCCCC"})},_=function(e){var t=e.action,r=e.level,n=e.selectedLevel;return a.a.createElement("li",Object.assign({},Object(R.css)($.listItem,r===n?$.listItemActive:""),{onClick:t.bind(void 0,r)}),r)},ee=function(){var e=Object(n.useContext)(N),t=e.changeLevel,r=e.selectedLevel;return a.a.createElement("ul",{className:$.menu},["Beginner","Intermediate","Expert"].map(function(e){return a.a.createElement(_,{action:t,key:e,level:e,selectedLevel:r})}))},te={container:Object(R.css)({marginRight:"50px"}),wrapper:Object(R.css)({marginBottom:"30px"}),info:Object(R.css)({color:"#4286F4",fontSize:"20px",fontWeight:"bold"}),button:Object(R.css)({backgroundColor:"#FFFFFF",border:"1px solid #AAAAAA",borderRadius:"5px",color:"#AAAAAA",cursor:"pointer",fontSize:"16px",height:"30px",padding:"5px",":hover":{backgroundColor:"#AAAAAA",color:"#FFFFFF"},":focus":{outline:"none"}}),victory:Object(R.css)({color:"#4286F4",fontSize:"20px",fontWeight:"bold",marginTop:"30px"}),cheatArea:Object(R.css)({border:"1px solid #BBBBBB",marginTop:"30px",padding:"10px","> h1":{color:"#555555",fontSize:"20px",marginBottom:"10px"}}),hints:Object(R.css)({lineHeight:"24px",padding:"20px"})},re=function(){var e=Object(n.useContext)(N),t=e.bombsRemaining,r=e.cheat,o=e.cleanBorders,i=e.isVictory,c=e.restartGame,s=e.time,l=e.toggleCheatHover;return a.a.createElement("div",{className:te.container},a.a.createElement(ee,null),a.a.createElement("div",{className:te.wrapper},a.a.createElement("div",{className:te.container},a.a.createElement("p",null,"Bombs remaining:"," ",a.a.createElement("span",{className:te.info},t)),a.a.createElement("p",null,"Time: ",a.a.createElement("span",{className:te.info},s)))),a.a.createElement(Z,{onClick:c},"Restart"),a.a.createElement("div",{className:te.victory},i?"Victory :)":""),a.a.createElement("div",{className:te.cheatArea},a.a.createElement("h1",null,"Cheat area"),a.a.createElement(X,{checked:r.hover,label:"Show hover",onChange:l}),a.a.createElement(Z,{onClick:o},"Start with clean borders")),a.a.createElement("div",{className:te.hints},a.a.createElement("p",null,a.a.createElement("strong",null,"Arrow keys"),": move"),a.a.createElement("p",null,a.a.createElement("strong",null,"Enter"),": click cell"),a.a.createElement("p",null,a.a.createElement("strong",null,"F"),": toggle flag"),a.a.createElement("p",null,a.a.createElement("strong",null,"R"),": restart"),a.a.createElement("p",null,a.a.createElement("strong",null,"C"),": start with clean border")))},ne={app:Object(R.css)({display:"flex",justifyContent:"center"})},ae=function(){return a.a.createElement("div",{className:ne.app},a.a.createElement(T,null,a.a.createElement(re,null),a.a.createElement(Q,null)))};r(54);i.a.render(a.a.createElement(ae,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.748e5764.chunk.js.map