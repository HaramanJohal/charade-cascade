(this["webpackJsonpcharade-cascade"]=this["webpackJsonpcharade-cascade"]||[]).push([[0],[,,,,,,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(6),m=n.n(l),c=(n(12),n(13),n(14),n(1)),u=n(2);function o(e){var t=e.prompts.map((function(t,n){return r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),r.a.createElement("input",{type:"text",value:t,onChange:function(t){return function(t,n){var a=Object(u.a)(e.prompts);a[t]=n.target.value,e.setPrompts(a)}(n,t)}}))}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,"Please provide some prompts:",t),r.a.createElement("br",null))}function s(e){var t=Object(a.useState)(""),n=Object(c.a)(t,2),l=n[0],m=n[1],s=Object(a.useState)(""),i=Object(c.a)(s,2),g=i[0],p=i[1],f=Object(a.useState)(["","","","",""]),d=Object(c.a)(f,2),E=d[0],b=d[1];E.map((function(e,t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),r.a.createElement("input",{type:"text",value:e,onChange:function(e){return function(e,t){var n=Object(u.a)(E);n[e]=t.target.value,b(n)}(t,e)}}))}));return r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),fetch("/create-game?game_name=".concat(g,"&user_name=").concat(l,"&prompts=").concat(E.join("\xa3"))).then((function(e){return e.json()})).then((function(t){console.log("created game",t),e.setUserName(l),e.setUserTeam(t.users.find((function(e){return e.user_name===l})).team),e.setGame(t)}))}},r.a.createElement("label",null,"User name:",r.a.createElement("input",{type:"text",value:l,onChange:function(e){m(e.target.value)}})),r.a.createElement("br",null),r.a.createElement("label",null,"Game name:",r.a.createElement("input",{type:"text",value:g,onChange:function(e){p(e.target.value)}})),r.a.createElement("br",null),r.a.createElement(o,{prompts:E,setPrompts:b}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Submit"}))}function i(e){var t=Object(a.useState)(["","","","",""]),n=Object(c.a)(t,2),l=n[0],m=n[1],u=Object(a.useState)(""),s=Object(c.a)(u,2),i=s[0],g=s[1],p=Object(a.useState)(""),f=Object(c.a)(p,2),d=f[0],E=f[1];return r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),fetch("/join-game?game_name=".concat(i,"&user_name=").concat(d,"&prompts=").concat(l.join("\xa3"))).then((function(e){return e.json()})).then((function(t){console.log("joined game",t),e.setUserName(d),e.setUserTeam(t.users.find((function(e){return e.user_name===d})).team),e.setGame(t)}))}},r.a.createElement("label",null,"Game name:",r.a.createElement("input",{type:"text",value:i,onChange:function(e){g(e.target.value)}})),r.a.createElement("br",null),r.a.createElement("label",null,"User name:",r.a.createElement("input",{type:"text",value:d,onChange:function(e){E(e.target.value)}})),r.a.createElement("br",null),r.a.createElement(o,{prompts:l,setPrompts:m}),r.a.createElement("input",{type:"submit",value:"Submit"}))}function g(e){var t=Object(a.useState)(""),n=Object(c.a)(t,2),l=n[0],m=n[1],u=Object(a.useState)(""),o=Object(c.a)(u,2),s=o[0],i=o[1];return r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),fetch("/rejoin-game?game_name=".concat(l,"&user_name=").concat(s)).then((function(e){return e.json()})).then((function(t){console.log("rejoined game",t),e.setUserName(s),e.setUserTeam(t.users.find((function(e){return e.user_name===s})).team),e.setGame(t)}))}},r.a.createElement("label",null,"Game name:",r.a.createElement("input",{type:"text",value:l,onChange:function(e){m(e.target.value)}})),r.a.createElement("br",null),r.a.createElement("label",null,"User name:",r.a.createElement("input",{type:"text",value:s,onChange:function(e){i(e.target.value)}})),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Submit"}))}function p(e){var t=Object(a.useState)("none"),n=Object(c.a)(t,2),l=n[0],m=n[1];return"none"===l?r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){return m("create")}},"Create Game"),r.a.createElement("p",null," or "),r.a.createElement("button",{onClick:function(){return m("join")}},"Join Game"),r.a.createElement("p",null," or "),r.a.createElement("button",{onClick:function(){return m("rejoin")}},"Rejoin Game")):"create"===l?r.a.createElement(s,{setGame:e.setGame,setUserName:e.setUserName,setUserTeam:e.setUserTeam}):"join"===l?r.a.createElement(i,{setGame:e.setGame,setUserName:e.setUserName,setUserTeam:e.setUserTeam}):"rejoin"===l?r.a.createElement(g,{setGame:e.setGame,setUserName:e.setUserName,setUserTeam:e.setUserTeam}):void 0}function f(e){return r.a.createElement("button",{onClick:function(){fetch("/refresh-game?game_name=".concat(e.gameName)).then((function(e){return e.json()})).then((function(t){console.log("refreshed game:",t),e.setGame(t)}))}},"Refresh")}function d(e){var t=Object(a.useState)(e.game.prompts),n=Object(c.a)(t,2),l=n[0],m=n[1],u=Object(a.useState)(void 0),o=Object(c.a)(u,2),s=o[0],i=o[1];Object(a.useEffect)((function(){var e=g(l);i(e);var t=l.indexOf(e),n=JSON.parse(JSON.stringify(l));n.splice(t,1),m(n)}),[]);var g=function(e){var t,n=e.filter((function(e){return"speech"===e.game_round})),a=e.filter((function(e){return"word"===e.game_round})),r=e.filter((function(e){return"charade"===e.game_round}));if(0!==n.length)t=n[Math.floor(Math.random()*n.length)];else if(0!==a.length)t=a[Math.floor(Math.random()*a.length)];else{if(0===r.length)return null;t=r[Math.floor(Math.random()*r.length)]}return t};return console.log("remaining:",l),r.a.createElement(r.a.Fragment,null,void 0!==s&&null!==s?r.a.createElement(r.a.Fragment,null,"speech"===s.game_round?r.a.createElement("p",null,"Use words to describe the prompt"):null,"word"===s.game_round?r.a.createElement("p",null,"Use a single word to describe the prompt"):null,"charade"===s.game_round?r.a.createElement("p",null,"Act our the prompt in silence"):null,r.a.createElement("p",null,s.prompt),r.a.createElement("button",{onClick:function(){var t=JSON.parse(JSON.stringify(e.turnUpdate));t.prompts_to_delete.push(s),t["".concat(e.userTeam,"_score")]+=1,e.setTurnUpdate(t);var n=g(l);null===n&&(console.log("GAME OVER"),e.endTurn(!0));var a=l.indexOf(n),r=JSON.parse(JSON.stringify(l));r.splice(a,1),m(r),i(n)}},"Got it!")):r.a.createElement("p",null,"Loading"))}function E(e){var t=Object(a.useState)(void 0),n=Object(c.a)(t,2),l=n[0],m=n[1],u=Object(a.useState)({red_score:e.game.game.red_score,blue_score:e.game.game.blue_score,prompts_to_delete:[],turn:(e.game.game.turn+1)%e.game.users.length,game_name:e.game.game.game_name}),o=Object(c.a)(u,2),s=o[0],i=o[1],g=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(t){console.log("ending game");var n={red_score:s.red_score,blue_score:s.blue_score};n["".concat(e.userTeam,"_score")]=n["".concat(e.userTeam,"_score")]+1,fetch("/end-game?game_name=".concat(s.game_name),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(t){console.log(t),e.setGame(t)}))}else console.log("ending turn",s),fetch("/end-turn?game_name=".concat(s.game_name),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}).then((function(e){return e.json()})).then((function(t){console.log(t),e.setGame(t)}))};return Object(a.useEffect)((function(){l>0&&setTimeout((function(){return m(l-1)}),1e3),0===l?g():60===l&&i({red_score:e.game.game.red_score,blue_score:e.game.game.blue_score,prompts_to_delete:[],turn:(e.game.game.turn+1)%e.game.users.length,game_name:e.game.game.game_name})}),[l]),void 0===l?r.a.createElement("button",{onClick:function(){return m(60)}},"Start"):0===l?r.a.createElement("p",null,"Time's up!"):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Time remaining: ",l),r.a.createElement(d,{game:e.game,turnUpdate:s,setTurnUpdate:i,endTurn:g,userTeam:e.userTeam}))}function b(e){var t=Object(u.a)(e.game.users);t.sort((function(e,t){return e.id-t.id}));var n=t[e.game.game.turn].user_name;return n===e.userName?r.a.createElement(E,{game:e.game,setGame:e.setGame,userTeam:e.userTeam}):"It's ".concat(n,"'s turn")}function h(e){var t=Object(a.useState)(void 0),n=Object(c.a)(t,2),l=n[0],m=n[1],u=Object(a.useState)(void 0),o=Object(c.a)(u,2),s=o[0],i=o[1],g=Object(a.useState)(void 0),d=Object(c.a)(g,2),E=d[0],h=d[1];return void 0===l?r.a.createElement(p,{setGame:m,setUserName:i,setUserTeam:h}):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Welcome to Charade Cascade ",s,"!"),r.a.createElement("p",null,"Game name: ",l.game.game_name),r.a.createElement("p",null,"You are on the ",E," team"),r.a.createElement("p",null,"Red Team (",l.game.red_score,"):"),l.users.filter((function(e){return"red"===e.team})).map((function(e){return r.a.createElement("p",null,e.user_name)})),r.a.createElement("p",null,"Blue Team (",l.game.blue_score,"):"),l.users.filter((function(e){return"blue"===e.team})).map((function(e){return r.a.createElement("p",null,e.user_name)})),r.a.createElement("p",null,"There are ",l.prompts.length," prompts left"),r.a.createElement(f,{gameName:l.game.game_name,setGame:m}),l.game.game_over?r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Game Over!"),r.a.createElement("p",null,"Final scores"),r.a.createElement("p",null,"Red ",l.game.red_score," - ",l.game.blue_score," Blue")):r.a.createElement(r.a.Fragment,null,r.a.createElement(b,{game:l,userName:s,userTeam:E,setGame:m})))}var v=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(h,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));m.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[7,1,2]]]);
//# sourceMappingURL=main.18674c48.chunk.js.map