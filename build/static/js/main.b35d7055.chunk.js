(this.webpackJsonpreactportfolio=this.webpackJsonpreactportfolio||[]).push([[0],{113:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(52),o=a.n(i),l=(a(62),a(26)),c=a(27),s=a(29),m=a(28),d=(a(23),a(21));var u=function(){return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},r.a.createElement(d.b,{className:"title nav-link",to:"/"},r.a.createElement("h1",null,"Logan Moss")),r.a.createElement("ul",{className:"nav-links navbar-nav"},r.a.createElement(d.b,{to:"/resume",className:"nav-link"},r.a.createElement("li",{className:"nav-item"},"Resume")),r.a.createElement(d.b,{to:"/projects",className:"nav-link"},r.a.createElement("li",{className:"nav-item"},"Projects")),r.a.createElement(d.b,{to:"/contact",className:"nav-link"},r.a.createElement("li",{className:"nav-item"},"Contact"))))},p=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("h1",null,"Hello")}}]),a}(n.Component);var h=function(){return r.a.createElement("div",{className:"wrapper"},r.a.createElement("h1",null,"Contact Page"))};var g=function(e){var t;return""!==e.deployed_url&&(t=r.a.createElement("a",{href:e.deployed_url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-primary"},e.deployed_tag)),r.a.createElement("div",{className:"card"},r.a.createElement("img",{className:"card-img-top hoverable",src:e.image,alt:e.alt,height:"250px",width:"400px"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},e.name),r.a.createElement("p",{className:"card-text"},e.description)),r.a.createElement("div",null,t,r.a.createElement("a",{href:e.github_url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-primary"},"Github")))},b=a(55),f=(a(67),a(56)),y=a.n(f),v=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={projects:b},e}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"row"},this.state.projects.map((function(e){return r.a.createElement("div",{className:"col-md-3"},r.a.createElement(y.a,{delay:300,animateIn:"fadeIn"},r.a.createElement(g,{name:e.name,image:e.image,description:e.description,deployed_url:e.deployed_url,github_url:e.github_url,deployed_github:e.deployed_github,deployed_tag:e.deployed_tag,alt:e.alt})))})))}}]),a}(n.Component),_=(a(69),function(){return r.a.createElement("div",null)}),j=a(19),E=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement(d.a,{basename:"/portfolio"},r.a.createElement("div",{className:"App"},r.a.createElement(u,null),r.a.createElement(j.c,null,r.a.createElement(j.a,{exact:!0,path:"/portfolio",component:p}),r.a.createElement(j.a,{exact:!0,path:"/",component:p}),r.a.createElement(j.a,{exact:!0,path:"/resume",component:_}),r.a.createElement(j.a,{exact:!0,path:"/projects",component:v}),r.a.createElement(j.a,{exact:!0,path:"/contact",component:h}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},23:function(e,t,a){},32:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=32},55:function(e){e.exports=JSON.parse('[{"id":1,"name":"Recipe and Restaurant Roulette","image":"https://github.com/Loganrdj/Team4/blob/master/RRRoulette.gif?raw=true","description":"This website takes in multiple ingredients and returns a recipe that contains all of them or randomly returns a restaurant from a selected cuisine. ","deployed_url":"https://loganrdj.github.io/Team4/","github_url":"https://github.com/Loganrdj/Team4","deployed_tag":"Website","alt":"RRRoulette GIF"},{"id":2,"name":"Harry Potter RPG Game","image":"https://media.giphy.com/media/dzOxouPFjSjo65i0Oa/giphy.gif","description":"This application utilizes Passport, database, front-end and back-end tools to create a simulated Harry Potter game","deployed_url":"https://guarded-harbor-00220.herokuapp.com/","github_url":"https://github.com/K8F/project-2","deployed_tag":"Game","alt":"Harry Potter RPG GIF"},{"id":3,"name":"Node mySQL","image":"https://github.com/Loganrdj/Node-MySQL/blob/master/bamazonCustomer.gif?raw=true","description":"This application utilizes node to run queries against a mySQL database.","deployed_url":"","github_url":"https://github.com/Loganrdj/Node-MySQL","deployed_tag":"Github","alt":"Node mySQL Bamazon GIF"},{"id":4,"name":"Pokemon Clicky Game","image":"https://github.com/Loganrdj/ClickyGame/blob/master/clickygamegif.gif?raw=true","description":"This is a reactJS front-end application that is a fun memory game.","deployed_url":"https://loganrdj.github.io/ClickyGame/","github_url":"https://github.com/Loganrdj/ClickyGame","deployed_tag":"Game","alt":"Pokemon Clicky Game GIF"},{"id":5,"name":"FriendFinder","image":"https://github.com/Loganrdj/FriendFinder/blob/master/Friendfinder.gif?raw=true","description":"This is a Node and Express application that utilizes routes to communicate to both front-end and back-end.","deployed_url":"https://hw-friendfinder-logan.herokuapp.com/","github_url":"https://github.com/Loganrdj/FriendFinder","deployed_tag":"Website","alt":"FriendFinder"},{"id":6,"name":"LIRI Bot","image":"https://github.com/Loganrdj/Liri-Bot/blob/master/HW-liriBot.gif?raw=true","description":"The LIRI bot is an application that takes command line inputs to run commands against multiple APIs that provide information. ","deployed_url":"","github_url":"https://github.com/Loganrdj/Liri-Bot","deployed_tag":"Github","alt":"LIRI Bot GIF"},{"id":7,"name":"Rocky Maguire INC Website","image":"https://media.giphy.com/media/U6SoVeKecyeZeTyN7T/giphy.gif","description":"This is a website that I had created for my friend\'s company. It was a work in progress and was stopped before completion.","deployed_url":"https://loganrdj.github.io/RockyMaguire/","github_url":"https://github.com/Loganrdj/RockyMaguire","deployed_tag":"Website","alt":"Rocky Maguire GIF"},{"id":8,"name":"GifTastic","image":"https://github.com/Loganrdj/GifTastic/blob/master/GifTasticGif.gif?raw=true","description":"This is a front-end web application with the purpose to educate based on Ajax as well as to create a Gif Finder.","deployed_url":"https://loganrdj.github.io/GifTastic/","github_url":"https://github.com/Loganrdj/GifTastic","deployed_tag":"Website","alt":"GifTastic GIF (lol)"},{"id":9,"name":"Trivia Game","image":"https://github.com/Loganrdj/TriviaGame/blob/master/TriviaGame.gif?raw=true","description":"This was designed to be a quick and simple quiz for a fun activity.","deployed_url":"https://loganrdj.github.io/TriviaGame/","github_url":"https://github.com/Loganrdj/TriviaGame","deployed_tag":"Website","alt":"Trivia Game GIF"}]')},57:function(e,t,a){e.exports=a(113)},62:function(e,t,a){},73:function(e,t){},75:function(e,t){},76:function(e,t){},77:function(e,t){},78:function(e,t){}},[[57,1,2]]]);
//# sourceMappingURL=main.b35d7055.chunk.js.map