(this["webpackJsonphicetnunc-radio-component"]=this["webpackJsonphicetnunc-radio-component"]||[]).push([[0],{14:function(t,e,n){t.exports={walletIdEntry:"styles_walletIdEntry__3DbJd",walletInput:"styles_walletInput__1VMfH",selectPlaylist:"styles_selectPlaylist__2Ccgx",button_getObjktData:"styles_button_getObjktData__3PaTK",errorText:"styles_errorText__1OQsm",currentPlaylistText:"styles_currentPlaylistText__1BPt5"}},16:function(t,e,n){t.exports={playlistContainer:"styles_playlistContainer__12hSv",playlistGrid:"styles_playlistGrid__15RGc",playlistTitle:"styles_playlistTitle__1h0bA",playlistButton:"styles_playlistButton__2EpPR",playlistImage:"styles_playlistImage__2s5Qc",playlistText:"styles_playlistText__1tbcN"}},17:function(t,e,n){t.exports={radioView:"styles_radioView__1fwni",headerBar:"styles_headerBar__3p023",navBar:"styles_navBar__1Dmbv",navBar_link:"styles_navBar_link__2j2Mu"}},2:function(t,e,n){t.exports={radioPlayerContainer:"styles_radioPlayerContainer__3gHdN",button:"styles_button__11O9h",controlsHolder:"styles_controlsHolder__1dbWm",button_playerControl:"styles_button_playerControl__2TTBC",button_play:"styles_button_play__3BZ6t",button_pause:"styles_button_pause__2eiIn",button_mute:"styles_button_mute__2hVIR",button_unmute:"styles_button_unmute__2dpAa",playerBar:"styles_playerBar__BMBLc",runningTime:"styles_runningTime__3bAI_",currentTrack:"styles_currentTrack__BT_jR",nextPrevControls:"styles_nextPrevControls__2JAWU",button_nextTrack:"styles_button_nextTrack__2ru0Q",button_prevTrack:"styles_button_prevTrack__hn9ZL",errorText:"styles_errorText__tMSu-",radioRange:"styles_radioRange__Lv3sV"}},21:function(t,e,n){t.exports={footerBar:"styles_footerBar__335pE",footerTitle:"styles_footerTitle__2EpZ1",footerText:"styles_footerText__3Quiy"}},40:function(t,e,n){t.exports={logo:"styles_logo__1Krvx"}},45:function(t,e,n){},6:function(t,e,n){t.exports={trackRow:"styles_trackRow__1O3yj",trackRow_text:"styles_trackRow_text__3ikZu",trackRow_link:"styles_trackRow_link__1R894",trackRow_avatar:"styles_trackRow_avatar__1h-dM",button:"styles_button__1pWle",button_playerControl_small:"styles_button_playerControl_small__3ZnKp",button_play_small:"styles_button_play_small__1aQ6w",button_pause_small:"styles_button_pause_small__1c1jY",filterTabs:"styles_filterTabs__11id8",filterButton:"styles_filterButton__2Oq6y",selected:"styles_selected__3bU8G"}},71:function(t,e,n){},72:function(t,e,n){"use strict";n.r(e);var a,c=n(1),r=n.n(c),s=n(38),o=n.n(s),l=(n(45),n(20)),i=n(3),u=n(5),d=n(14),j=n.n(d),b=n(8),h=n.n(b),m=n(24),f=n(13),p=n(4),x=n(23),O=n.n(x),y=["audio/ogg","audio/mpeg","audio/wav"],_=function(t){return O.a.get("".concat("https://api.tzkt.io/v1/accounts","/").concat(t,"/metadata"))},v=n(6),g=n.n(v),C=n(0),k=function(){return Object(C.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",children:[Object(C.jsx)("title",{children:"Pause"}),Object(C.jsx)("path",{fill:"currentColor",d:"M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"})]})},T=function(){return Object(C.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",children:[Object(C.jsx)("title",{children:"Play"}),Object(C.jsx)("path",{fill:"currentColor",d:"M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"})]})},w=function(t,e){return t.creator in e?e[t.creator].alias:""},E=function(t){var e=t.tracks,n=t.isTrackPlaying,a=t.handlePause,c=t.handleSelectTrack,r=t.creatorMetadata;return Object(C.jsx)(C.Fragment,{children:e.length?Object(C.jsx)("div",{children:e.map((function(t,e){return Object(C.jsxs)("div",{className:g.a.trackRow,children:[n(t.id)?Object(C.jsx)("button",{className:"".concat(g.a.button," ").concat(g.a.button_pause_small," ").concat(g.a.button_playerControl_small),onClick:a,children:Object(C.jsx)(k,{})}):Object(C.jsx)("button",{className:"".concat(g.a.button," ").concat(g.a.button_play_small," ").concat(g.a.button_playerControl_small),onClick:c(e),children:Object(C.jsx)(T,{})}),Object(C.jsxs)("span",{className:g.a.trackRow_text,children:[Object(C.jsxs)("a",{href:"https://hicetnunc.xyz/objkt/".concat(t.id),className:g.a.trackRow_link,children:["#",t.id," ",t.name]}),Object(C.jsx)("br",{}),"By ",Object(C.jsxs)("a",{href:"https://hicetnunc.xyz/tz/".concat(t.creator),className:g.a.trackRow_link,children:[(s=t.creator,s.slice(0,5)+"..."+s.slice(-5))," ",w(t,r)]})]}),Object(C.jsx)("img",{alt:"Artist's avatar",className:g.a.trackRow_avatar,src:"https://services.tzkt.io/v1/avatars2/".concat(t.creator)})]},t.id);var s}))}):Object(C.jsx)("p",{children:"No audio tracks available"})})},N=Object.freeze({ALL:0,CREATIONS:1,COLLECTIONS:2}),A=function(t){var e=t.filter,n=t.setFilter;return Object(C.jsxs)("div",{className:g.a.filterTabs,children:[Object(C.jsx)("button",{className:"".concat(g.a.filterButton," ").concat(e===N.ALL?g.a.selected:""),onClick:function(){return n(N.ALL)},children:"All"}),Object(C.jsx)("button",{className:"".concat(g.a.filterButton," ").concat(e===N.CREATIONS?g.a.selected:""),onClick:function(){return n(N.CREATIONS)},children:"Creations"}),Object(C.jsx)("button",{className:"".concat(g.a.filterButton," ").concat(e===N.COLLECTIONS?g.a.selected:""),onClick:function(){return n(N.COLLECTIONS)},children:"Collections"})]})},L=Object(c.createContext)({audioRef:null}),I=function(t){var e=t.children,n=new Audio,a=window.AudioContext?new window.AudioContext:new window.webkitAudioContext,c=a.createMediaElementSource(n),r=a.createGain(),s=a.createAnalyser();return s.connect(a.destination),c.connect(s),c.connect(r),s.fftSize=64,Object(C.jsx)(L.Provider,{value:{audio:n,audioContext:a},children:e})},Q=function(){return Object(c.useContext)(L)},B=Object(c.createContext)({audioRef:null}),P=function(t){var e=t.children,n=Q(),r=n.audio,s=n.audioContext,o=Object(c.useState)({playing:!1,currentTrackKey:0,currentId:null,isPlaying:null,isMuted:!1,volume:.5,stateUpdatedBy:null}),l=Object(u.a)(o,2),i=l[0],d=l[1],j=Object(c.useState)(0),b=Object(u.a)(j,2),m=b[0],x=b[1],O=Object(c.useState)(null),y=Object(u.a)(O,2),_=y[0],v=y[1],g=function t(e){return function(){a=requestAnimationFrame(t(e)),x(e.currentTime)}},k=function(){var t=Object(f.a)(h.a.mark((function t(){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,cancelAnimationFrame(a),a=requestAnimationFrame(g(r)),t.next=5,s.resume();case 5:return t.next=7,r.play();case 7:t.next=14;break;case 9:t.prev=9,t.t0=t.catch(0),v("Failed to play track, possibly unsupported media."),setTimeout((function(){v(null)}),4e3),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(){return t.apply(this,arguments)}}(),T=function(){var t=Object(f.a)(h.a.mark((function t(){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,k();case 4:d((function(t){return Object(p.a)(Object(p.a)({},t),{},{isPlaying:!0})}));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(C.jsx)(B.Provider,{value:{audio:r,audioContext:s,audioError:_,playerState:i,setPlayerState:d,isTrackPlaying:function(t){return i.isPlaying&&i.currentId===t},runningTime:m,controls:{play:T,pause:function(){r&&(cancelAnimationFrame(a),r.pause(),d((function(t){return Object(p.a)(Object(p.a)({},t),{},{isPlaying:!1})})))},mute:function(){r&&(r.volume=0,d((function(t){return Object(p.a)(Object(p.a)({},t),{},{isMuted:!0})})))},unmute:function(){r&&(r.volume=i.volume,d((function(t){return Object(p.a)(Object(p.a)({},t),{},{isMuted:!1})})))},volume:function(t){if(r){var e=t.target.value;r.volume=e,d((function(t){return Object(p.a)(Object(p.a)({},t),{},{volume:e})}))}},next:function(t){return function(){var e=i.currentTrackKey;if(t.length){var n=(e+1)%t.length;r.src=t[n].src,r.mimeType=t[n].mimeType,i.isPlaying&&(s.resume(),r.play()),d((function(e){return Object(p.a)(Object(p.a)({},e),{},{currentTrackKey:n,currentId:t[n].id})}))}}},previous:function(t){return function(){var e=i.currentTrackKey;if(t.length){var n=e-1;n<0&&(n=t.length-1),r.src=t[n].src,r.mimeType=t[n].mimeType,i.isPlaying&&(s.resume(),r.play()),d((function(e){return Object(p.a)(Object(p.a)({},e),{},{currentTrackKey:n,currentId:t[n].id})}))}}},selectTrack:function(t){return function(e){return Object(f.a)(h.a.mark((function n(){return h.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return cancelAnimationFrame(a),a=requestAnimationFrame(g(r)),r.src=t[e].src,r.mimeType=t[e].mimeType,n.next=6,k();case 6:x(0),d((function(n){return Object(p.a)(Object(p.a)({},n),{},{currentTrackKey:e,currentId:t[e].id,isPlaying:!0})}));case 8:case"end":return n.stop()}}),n)})))}}}},children:e})},S=function(){return Object(c.useContext)(B)},R=n(2),F=n.n(R),z=function(){var t=S(),e=t.controls,n=t.playerState;return Object(C.jsx)(C.Fragment,{children:n.isPlaying?Object(C.jsx)("button",{className:"".concat(F.a.button," ").concat(F.a.button_play," ").concat(F.a.button_playerControl),onClick:e.pause,children:Object(C.jsx)(k,{})}):Object(C.jsx)("button",{className:"".concat(F.a.button," ").concat(F.a.button_pause," ").concat(F.a.button_playerControl),onClick:e.play,children:Object(C.jsx)(T,{})})})},V=function(){return Object(C.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:[Object(C.jsx)("title",{children:"Unmute"}),Object(C.jsx)("path",{fill:"currentColor",d:"M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"})]})},q=function(){return Object(C.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512",children:[Object(C.jsx)("title",{children:"Mute"}),Object(C.jsx)("path",{fill:"currentColor",d:"M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"})]})},M=function(){var t=S(),e=t.controls,n=t.playerState;return Object(C.jsx)(C.Fragment,{children:n.isMuted?Object(C.jsx)("button",{className:"".concat(F.a.button," ").concat(F.a.button_unmute," ").concat(F.a.button_playerControl),onClick:e.unmute,children:Object(C.jsx)(V,{})}):Object(C.jsx)("button",{className:"".concat(F.a.button," ").concat(F.a.button_mute," ").concat(F.a.button_playerControl),onClick:e.mute,children:Object(C.jsx)(q,{})})})},W=function(t){var e,n,a,c=~~(t/60),r=t-60*c;return"".concat(c,".").concat((e=~~r,a=a||"0",(e+="").length>=(n=2)?e:new Array(n-e.length+1).join(a)+e))},K=function(t){var e,n=t.tracks,a=S(),c=a.audio,r=a.audioError,s=a.playerState,o=a.controls,l=a.runningTime;return Object(C.jsxs)("div",{className:F.a.radioPlayerContainer,children:[Object(C.jsxs)("div",{className:F.a.playerBar,children:[Object(C.jsxs)("div",{className:F.a.controlsHolder,children:[Object(C.jsx)(z,{}),Object(C.jsx)("input",{className:F.a.radioRange,title:"volume",type:"range",value:s.volume,min:"0",max:"1",step:"0.01",onChange:o.volume}),Object(C.jsx)(M,{})]}),Object(C.jsxs)("div",{className:F.a.runningTime,children:[W(l)," of ",W(c.duration)]})]}),Object(C.jsxs)("div",{className:F.a.nextPrevControls,children:[Object(C.jsx)("button",{className:F.a.button_prevTrack,onClick:o.previous(n),children:"Prev"}),Object(C.jsx)("button",{className:F.a.button_nextTrack,onClick:o.next(n),children:"Next"}),null!==s.currentTrackKey?Object(C.jsx)("div",{className:F.a.currentTrack,children:(null===(e=n[s.currentTrackKey])||void 0===e?void 0:e.name)||""}):null]}),r&&Object(C.jsx)("p",{className:F.a.errorText,children:r})]})},U=function(t){var e=t.audioObjkts,n=t.walletId,a=S(),r=a.audio,s=a.playerState,o=a.setPlayerState,l=a.controls,i=a.isTrackPlaying,d=Object(c.useState)(null),j=Object(u.a)(d,2),b=j[0],x=j[1],O=Object(c.useState)([]),y=Object(u.a)(O,2),v=y[0],g=y[1],k=Object(c.useState)(N.ALL),T=Object(u.a)(k,2),w=T[0],L=T[1],I=Object(c.useState)({}),Q=Object(u.a)(I,2),B=Q[0],P=Q[1];return r.onended=function(){if(v.length){var t=(s.currentTrackKey+1)%v.length;r.src=v[t].src,l.play(),o((function(e){return Object(p.a)(Object(p.a)({},e),{},{currentTrackKey:t,currentId:v[t].id})}))}},Object(c.useEffect)((function(){x(e.map((function(t){return{id:t.token_id,creator:t.token_info.creators[0],name:t.token_info.name,src:"https://cloudflare-ipfs.com/ipfs/".concat(t.token_info.artifactUri.slice(7)),mimeType:t.token_info.formats[0].mimeType}})))}),[e]),Object(c.useEffect)((function(){(null===b||void 0===b?void 0:b.length)&&r&&(r.src||(r.crossOrigin="anonymous",r.src=b[0].src,r.volume=s.volume,r.mimeType=b[0].mimeType))}),[b]),Object(c.useEffect)((function(){b&&g(b.filter((function(t){switch(w){case N.ALL:return!0;case N.CREATIONS:return t.creator===n;case N.COLLECTIONS:return t.creator!==n;default:return!0}})))}),[b,w]),Object(c.useEffect)((function(){b&&Object(f.a)(h.a.mark((function t(){var e,n;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new Set(b.map((function(t){return t.creator}))),t.next=3,Promise.allSettled(Object(m.a)(e).map((function(t){return _(t)})));case 3:n=t.sent.filter((function(t){return"fulfilled"===t.status})).reduce((function(t,e){try{t[e.value.data.logo.split(".")[0]]=e.value.data}catch(n){console.warn("Error fetching metadata:",n)}return t}),{}),P(n);case 5:case"end":return t.stop()}}),t)})))()}),[b,w]),b?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(K,{tracks:v}),Object(C.jsx)(A,{filter:w,setFilter:L}),Object(C.jsx)(E,{tracks:v,isTrackPlaying:i,handlePause:l.pause,handleSelectTrack:l.selectTrack(v),creatorMetadata:B})]}):Object(C.jsx)("p",{children:"Loading..."})},D=n(1).useEffect,H=function(t){D((function(){var e=document.title;return document.title=t,function(){document.title=e}}),[t])},G=function(t){return O.a.get("".concat("https://1xgf1e26jb.execute-api.us-east-1.amazonaws.com/dev","/tz?tz=").concat(t))},Z=Object(c.createContext)({tz:null}),Y=function(t){var e=t.children,n=Object(c.useState)(null),a=Object(u.a)(n,2),r=a[0],s=a[1],o=Object(c.useState)(null),l=Object(u.a)(o,2),i=l[0],d=l[1],j=Object(c.useState)(!1),b=Object(u.a)(j,2),m=b[0],p=b[1],x=Object(c.useState)(null),O=Object(u.a)(x,2),_=O[0],v=O[1];Object(c.useEffect)((function(){r&&Object(f.a)(h.a.mark((function t(){var e,n;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,G(r);case 3:n=t.sent,d(g((null===n||void 0===n||null===(e=n.data)||void 0===e?void 0:e.result)||[])),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),v("Failed to load wallet address"),setTimeout((function(){return v(null)}),3e3);case 11:return t.prev=11,p(!1),t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[0,7,11,14]])})))()}),[r]);var g=function(t){return t.filter((function(t){return y.includes(t.token_info.formats[0].mimeType)}))};return Object(C.jsx)(Z.Provider,{value:{walletId:r,setWalletId:s,objktData:i,isLoading:m,setIsLoading:p,error:_,setError:v},children:e})},X=function(){return Object(c.useContext)(Z)},J=function(){var t=Object(i.g)().tz,e=X(),n=e.walletId,a=e.setWalletId,r=e.objktData,s=e.isLoading,o=e.setIsLoading,l=e.error;H("H=N Radio ".concat(n?"| ".concat(n):"")),Object(c.useEffect)((function(){t&&t!==n&&(console.log("tz",t),a(t))}),[t]);var d=Object(i.f)(),b=Object(c.useState)(""),h=Object(u.a)(b,2),m=h[0],f=h[1];return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)("div",{className:j.a.walletIdEntry,children:[Object(C.jsx)("input",{className:j.a.walletInput,value:m,placeholder:"Enter a wallet address",onChange:function(t){f(t.target.value)}}),Object(C.jsx)("button",{className:j.a.button_getObjktData,onClick:function(){a(m),f(""),o(!0),d.push("/tz/".concat(m))},disabled:!m,children:"Get Tracks"})]}),l&&Object(C.jsx)("p",{className:j.a.errorText,children:l}),r?Object(C.jsx)(C.Fragment,{children:s?Object(C.jsx)("p",{children:"Loading..."}):Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(U,{audioObjkts:r,walletId:n})})}):Object(C.jsx)(C.Fragment,{children:s?Object(C.jsx)("p",{children:"Loading..."}):null})]})},$=(n(71),n(17)),tt=n.n($),et=[{name:"H=N Radio One",curator:"hen-radio",tracks:[{id:48594,name:"A l'Ouest",src:"https://cloudflare-ipfs.com/ipfs/QmawLCNM666CsHajN7MfJH9baWq2JRshxXX7QETL9dR4NA",mimeType:"audio/ogg",creator:"tz2EaL8HTqjZhVAWrQ3Ddp4wNCxPeE8CtM5f",tags:["music","psychedelic","hip hop","objkt4objkt"]},{id:5302,name:"Dub Stars",src:"https://cloudflare-ipfs.com/ipfs/Qmd8vTe22AdcYV84hTD2UEZFDicZZNf4j9bUBfDQsidy11",mimeType:"audio/mpeg",creator:"tz2EaL8HTqjZhVAWrQ3Ddp4wNCxPeE8CtM5f",tags:["music","dub"]},{id:5298,name:"Melancome",src:"https://cloudflare-ipfs.com/ipfs/QmNNrraeevcUhDT4saUA6W1AqiukZvvyRtroCf57PhjjyV",mimeType:"audio/mpeg",creator:"tz2EaL8HTqjZhVAWrQ3Ddp4wNCxPeE8CtM5f",tags:["music","cypherpunk"]}]}],nt=function(t){var e=t.playlist,n=S(),a=n.audio,r=n.playerState,s=n.setPlayerState,o=n.controls,l=n.isTrackPlaying,i=Object(c.useState)({}),d=Object(u.a)(i,2),j=d[0],b=d[1];return a.onended=function(){if(e.tracks.length){var t=(r.currentTrackKey+1)%e.tracks.length;a.src=e.tracks[t].src,o.play(),s((function(n){return Object(p.a)(Object(p.a)({},n),{},{currentTrackKey:t,currentId:e.tracks[t].id})}))}},Object(c.useEffect)((function(){var t;(null===(t=e.tracks)||void 0===t?void 0:t.length)&&a&&(a.src||(a.crossOrigin="anonymous",a.src=e.tracks[0].src,a.volume=r.volume,a.mimeType=e.tracks[0].mimeType))}),[e.tracks]),Object(c.useEffect)((function(){e.tracks&&Object(f.a)(h.a.mark((function t(){var n,a;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=new Set(e.tracks.map((function(t){return t.creator}))),t.next=3,Promise.allSettled(Object(m.a)(n).map((function(t){return _(t)})));case 3:a=t.sent.filter((function(t){return"fulfilled"===t.status})).reduce((function(t,e){try{t[e.value.data.logo.split(".")[0]]=e.value.data}catch(n){console.warn("Error fetching metadata:",n)}return t}),{}),b(a);case 5:case"end":return t.stop()}}),t)})))()}),[e]),e.tracks?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(K,{tracks:e.tracks}),Object(C.jsx)(E,{tracks:e.tracks,isTrackPlaying:l,handlePause:o.pause,handleSelectTrack:o.selectTrack(e.tracks),creatorMetadata:j})]}):Object(C.jsx)("p",{children:"Loading..."})},at=n(16),ct=n.n(at),rt=function(t){var e=t.handlePlaylistChange;return Object(C.jsxs)("div",{className:ct.a.playlistContainer,children:[Object(C.jsx)("h2",{className:ct.a.playlistTitle,children:"Playlists"}),Object(C.jsx)("div",{className:ct.a.playlistGrid,children:et.map((function(t){return Object(C.jsxs)("button",{onClick:e(t),className:ct.a.playlistButton,children:[Object(C.jsx)("img",{src:t.img||"data:image/png;base64,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",alt:"",className:ct.a.playlistImage}),Object(C.jsx)("p",{className:ct.a.playlistText,children:t.name})]},t.name)}))})]})},st=function(){H("H=N Radio Playlists");var t=Object(c.useState)(et[0]),e=Object(u.a)(t,2),n=e[0],a=e[1];return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)("p",{className:j.a.currentPlaylistText,children:["Playlist: ",n.name]}),Object(C.jsx)(nt,{playlist:n}),Object(C.jsx)(rt,{handlePlaylistChange:function(t){return function(){return a(t)}}})]})},ot=n(40),lt=n.n(ot),it=function(){return Object(C.jsxs)("svg",{className:lt.a.logo,width:"100%",height:"100%",viewBox:"0 0 714 216",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:[Object(C.jsx)("g",{transform:"matrix(1,0,0,1,-67.94,-316.92)",children:Object(C.jsx)("path",{d:"M359.49,532.59C354.508,532.574 349.614,531.265 345.29,528.79C336.261,523.737 330.677,514.137 330.75,503.79L330.75,345.7C330.75,345.697 330.75,345.693 330.75,345.69C330.75,329.924 343.724,316.95 359.49,316.95C364.668,316.95 369.751,318.35 374.2,321L506.74,400.06C515.421,405.237 520.754,414.628 520.754,424.735C520.754,434.842 515.421,444.233 506.74,449.41L374.2,528.48C369.758,531.152 364.674,532.572 359.49,532.59Z"})}),Object(C.jsx)("g",{transform:"matrix(1,0,0,1,-67.94,-316.92)",children:Object(C.jsx)("path",{d:"M136.64,321.33L67.94,321.33L67.94,528.18L136.64,528.18L136.64,458.76L206.72,458.76L206.72,528.18L275.42,528.18L275.42,321.33L206.72,321.33L206.72,389.33L136.64,389.33L136.64,321.33ZM561.08,321.33L768.56,321.33L768.56,528.18L699.86,528.18L699.86,389.35L629.79,389.35L629.79,528.18L561.08,528.18L561.08,321.33Z"})})]})},ut=n(21),dt=n.n(ut),jt=function(){return Object(C.jsxs)("div",{className:dt.a.footerBar,children:[Object(C.jsx)("h2",{className:dt.a.footerTitle,children:"Created as part of Hicathon Hackday 2021"}),Object(C.jsxs)("p",{className:dt.a.footerText,children:["Working Group:",Object(C.jsx)("br",{}),Object(C.jsx)("a",{href:"https://twitter.com/lauzaki",children:"@lauzaki"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/andreasrau_eu",children:"@andreasrau_eu"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/uvdsc",children:"@uvdsc"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/__orderandchaos",children:"@__orderandchaos"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/webidente",children:"@webidente"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/BabyCommando_",children:"@BabyCommando_"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/jclayton",children:"@jclayton"})]}),Object(C.jsxs)("p",{className:dt.a.footerText,children:["View on ",Object(C.jsx)("a",{href:"https://github.com/OrderAndCh4oS/hicetnunc-radio",children:"GitHub"})]})]})};var bt=function(){var t=X().walletId;return Object(C.jsxs)("div",{className:tt.a.radioView,children:[Object(C.jsxs)("div",{className:tt.a.headerBar,children:[Object(C.jsx)(it,{}),Object(C.jsxs)("div",{className:tt.a.navBar,children:[Object(C.jsx)(l.b,{className:tt.a.navBar_link,to:t?"/tz/".concat(t):"/",children:"By Wallet"}),Object(C.jsx)(l.b,{className:tt.a.navBar_link,to:"/playlists",children:"Playlists"})]})]}),Object(C.jsxs)(i.c,{children:[Object(C.jsx)(i.a,{exact:!0,path:"/",component:J}),Object(C.jsx)(i.a,{path:"/tz/:tz",component:J}),Object(C.jsx)(i.a,{path:"/playlists",component:st})]}),Object(C.jsx)(jt,{})]})},ht=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,73)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,r=e.getLCP,s=e.getTTFB;n(t),a(t),c(t),r(t),s(t)}))};o.a.render(Object(C.jsx)(r.a.StrictMode,{children:Object(C.jsx)(l.a,{children:Object(C.jsx)(Y,{children:Object(C.jsx)(I,{children:Object(C.jsx)(P,{children:Object(C.jsx)(bt,{})})})})})}),document.getElementById("root")),ht()}},[[72,1,2]]]);
//# sourceMappingURL=main.cdf38f5b.chunk.js.map