(this["webpackJsonphicetnunc-radio-component"]=this["webpackJsonphicetnunc-radio-component"]||[]).push([[0],{15:function(t,e,a){t.exports={currentPlaylistImage:"styles_currentPlaylistImage__3s-ro",currentPlaylistText:"styles_currentPlaylistText__2jvnf",currentPlaylistArtist:"styles_currentPlaylistArtist__1DOl2",currentPlaylistDescription:"styles_currentPlaylistDescription__3QVmU",currentPlaylistWrapper:"styles_currentPlaylistWrapper__KS8aq",currentPlaylistRow:"styles_currentPlaylistRow__3ZySe",currentPlaylistColumnImage:"styles_currentPlaylistColumnImage__3i_Yh",currentPlaylistColumnInfo:"styles_currentPlaylistColumnInfo__3Iqho"}},17:function(t,e,a){t.exports={radioView:"styles_radioView__1fwni",headerBar:"styles_headerBar__3p023",navBar:"styles_navBar__1Dmbv",navBar_link:"styles_navBar_link__2j2Mu"}},23:function(t,e,a){t.exports={walletIdEntry:"styles_walletIdEntry__3DbJd",walletInput:"styles_walletInput__1VMfH",selectPlaylist:"styles_selectPlaylist__2Ccgx",button_getObjktData:"styles_button_getObjktData__3PaTK",errorText:"styles_errorText__1OQsm"}},24:function(t,e,a){t.exports={footerBar:"styles_footerBar__335pE",footerTitle:"styles_footerTitle__2EpZ1",footerText:"styles_footerText__3Quiy"}},4:function(t,e,a){t.exports={radioPlayerContainer:"styles_radioPlayerContainer__3gHdN",button:"styles_button__11O9h",controlsHolder:"styles_controlsHolder__1dbWm",button_playerControl:"styles_button_playerControl__2TTBC",button_play:"styles_button_play__3BZ6t",button_pause:"styles_button_pause__2eiIn",button_mute:"styles_button_mute__2hVIR",button_unmute:"styles_button_unmute__2dpAa",playerBar:"styles_playerBar__BMBLc",runningTime:"styles_runningTime__3bAI_",currentTrack:"styles_currentTrack__BT_jR",nextPrevControls:"styles_nextPrevControls__2JAWU",button_nextTrack:"styles_button_nextTrack__2ru0Q",button_prevTrack:"styles_button_prevTrack__hn9ZL",errorText:"styles_errorText__tMSu-",radioRange:"styles_radioRange__Lv3sV"}},47:function(t,e,a){t.exports={logo:"styles_logo__1Krvx"}},53:function(t,e,a){},7:function(t,e,a){t.exports={trackRow:"styles_trackRow__1O3yj",trackRow_text:"styles_trackRow_text__3ikZu",trackRow_link:"styles_trackRow_link__1R894",trackRow_avatar:"styles_trackRow_avatar__1h-dM",button:"styles_button__1pWle",button_playerControl_small:"styles_button_playerControl_small__3ZnKp",button_play_small:"styles_button_play_small__1aQ6w",button_pause_small:"styles_button_pause_small__1c1jY",filterTabs:"styles_filterTabs__11id8",filterButton:"styles_filterButton__2Oq6y",selected:"styles_selected__3bU8G"}},79:function(t,e,a){},8:function(t,e,a){t.exports={playlistContainer:"styles_playlistContainer__12hSv",playlistGrid:"styles_playlistGrid__15RGc",playlistTitle:"styles_playlistTitle__1h0bA",playlistButton:"styles_playlistButton__2EpPR",playlistImage:"styles_playlistImage__2s5Qc",playlistText:"styles_playlistText__1tbcN",searchInput:"styles_searchInput__1DX1N",filteredPlaylists:"styles_filteredPlaylists__1otUi",filteredPlaylists_row:"styles_filteredPlaylists_row__3iFN-",filteredPlaylists_info:"styles_filteredPlaylists_info__2R_9x",filteredPlaylists_title:"styles_filteredPlaylists_title__3AFWs",filteredPlaylists_subTitle:"styles_filteredPlaylists_subTitle__A4WLS",filteredPlaylistsRow_tracks:"styles_filteredPlaylistsRow_tracks__1_NRp",trackRow:"styles_trackRow__22L1A",trackRow_text:"styles_trackRow_text__3aD_a",trackRow_link:"styles_trackRow_link__UGrt6",trackRow_avatar:"styles_trackRow_avatar__2yhh2"}},84:function(t,e,a){"use strict";a.r(e);var n,r,c=a(1),s=a.n(c),l=a(44),i=a.n(l),o=(a(53),a(20)),u=a(5),d=a(3),j=a(23),b=a.n(j),f=a(6),m=a.n(f),h=a(19),p=a(11),y=a(2),_=a(25),O=a.n(_),x=["audio/ogg","audio/mpeg","audio/wav"],v=function(t){return O.a.get("".concat("https://api.tzkt.io/v1/accounts","/").concat(t,"/metadata"))},g=a(7),k=a.n(g),C=a(0),w=function(){return Object(C.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",children:[Object(C.jsx)("title",{children:"Pause"}),Object(C.jsx)("path",{fill:"currentColor",d:"M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"})]})},T=function(){return Object(C.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",children:[Object(C.jsx)("title",{children:"Play"}),Object(C.jsx)("path",{fill:"currentColor",d:"M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"})]})},N=function(t){return t.slice(0,5)+"..."+t.slice(-5)},P=function(t,e){return t.creator in e?e[t.creator].alias:""},I=function(t){var e=t.tracks,a=t.isTrackPlaying,n=t.handlePause,r=t.handleSelectTrack,c=t.creatorMetadata;return Object(C.jsx)(C.Fragment,{children:e.length?Object(C.jsx)("div",{children:e.map((function(t,e){return Object(C.jsxs)("div",{className:k.a.trackRow,children:[a(t.id)?Object(C.jsx)("button",{className:"".concat(k.a.button," ").concat(k.a.button_pause_small," ").concat(k.a.button_playerControl_small),onClick:n,children:Object(C.jsx)(w,{})}):Object(C.jsx)("button",{className:"".concat(k.a.button," ").concat(k.a.button_play_small," ").concat(k.a.button_playerControl_small),onClick:r(e),children:Object(C.jsx)(T,{})}),Object(C.jsxs)("span",{className:k.a.trackRow_text,children:[Object(C.jsxs)("a",{href:"https://hicetnunc.xyz/objkt/".concat(t.id),className:k.a.trackRow_link,children:["#",t.id," ",t.name]}),Object(C.jsx)("br",{}),"By ",Object(C.jsxs)("a",{href:"https://hicetnunc.xyz/tz/".concat(t.creator),className:k.a.trackRow_link,children:[N(t.creator)," ",P(t,c)]})]}),Object(C.jsx)("img",{alt:"Artist's avatar",className:k.a.trackRow_avatar,src:"https://services.tzkt.io/v1/avatars2/".concat(t.creator)})]},t.id)}))}):Object(C.jsx)("p",{children:"No audio tracks available"})})},A=Object.freeze({ALL:0,CREATIONS:1,COLLECTIONS:2}),E=function(t){var e=t.filter,a=t.setFilter;return Object(C.jsxs)("div",{className:k.a.filterTabs,children:[Object(C.jsx)("button",{className:"".concat(k.a.filterButton," ").concat(e===A.ALL?k.a.selected:""),onClick:function(){return a(A.ALL)},children:"All"}),Object(C.jsx)("button",{className:"".concat(k.a.filterButton," ").concat(e===A.CREATIONS?k.a.selected:""),onClick:function(){return a(A.CREATIONS)},children:"Creations"}),Object(C.jsx)("button",{className:"".concat(k.a.filterButton," ").concat(e===A.COLLECTIONS?k.a.selected:""),onClick:function(){return a(A.COLLECTIONS)},children:"Collections"})]})},L=Object(c.createContext)({audioRef:null}),Q=function(t){var e=t.children,a=new Audio,n=window.AudioContext?new window.AudioContext:new window.webkitAudioContext,r=n.createMediaElementSource(a),c=n.createGain(),s=n.createAnalyser();return s.connect(n.destination),r.connect(s),r.connect(c),s.fftSize=64,Object(C.jsx)(L.Provider,{value:{audio:a,audioContext:n},children:e})},R=function(){return Object(c.useContext)(L)},B=Object(c.createContext)({audioRef:null}),S=function(t){var e=t.children,a=R(),r=a.audio,s=a.audioContext,l=Object(c.useState)({playing:!1,currentTrackKey:0,currentId:null,isPlaying:null,isMuted:!1,volume:.5,stateUpdatedBy:null}),i=Object(d.a)(l,2),o=i[0],u=i[1],j=Object(c.useState)(0),b=Object(d.a)(j,2),f=b[0],h=b[1],_=Object(c.useState)(null),O=Object(d.a)(_,2),x=O[0],v=O[1],g=function t(e){return function(){n=requestAnimationFrame(t(e)),h(e.currentTime)}},k=function(){var t=Object(p.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,cancelAnimationFrame(n),n=requestAnimationFrame(g(r)),t.next=5,s.resume();case 5:return t.next=7,r.play();case 7:t.next=14;break;case 9:t.prev=9,t.t0=t.catch(0),v("Failed to play track, possibly unsupported media."),setTimeout((function(){v(null)}),4e3),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(){return t.apply(this,arguments)}}(),w=function(){var t=Object(p.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,k();case 4:u((function(t){return Object(y.a)(Object(y.a)({},t),{},{isPlaying:!0})}));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(C.jsx)(B.Provider,{value:{audio:r,audioContext:s,audioError:x,playerState:o,setPlayerState:u,isTrackPlaying:function(t){return o.isPlaying&&o.currentId===t},runningTime:f,controls:{play:w,pause:function(){r&&(cancelAnimationFrame(n),r.pause(),u((function(t){return Object(y.a)(Object(y.a)({},t),{},{isPlaying:!1})})))},mute:function(){r&&(r.volume=0,u((function(t){return Object(y.a)(Object(y.a)({},t),{},{isMuted:!0})})))},unmute:function(){r&&(r.volume=o.volume,u((function(t){return Object(y.a)(Object(y.a)({},t),{},{isMuted:!1})})))},volume:function(t){if(r){var e=t.target.value;r.volume=e,u((function(t){return Object(y.a)(Object(y.a)({},t),{},{volume:e})}))}},next:function(t){return function(){var e=o.currentTrackKey;if(t.length){var a=(e+1)%t.length;r.src=t[a].src,r.mimeType=t[a].mimeType,o.isPlaying&&(s.resume(),r.play()),u((function(e){return Object(y.a)(Object(y.a)({},e),{},{currentTrackKey:a,currentId:t[a].id})}))}}},previous:function(t){return function(){var e=o.currentTrackKey;if(t.length){var a=e-1;a<0&&(a=t.length-1),r.src=t[a].src,r.mimeType=t[a].mimeType,o.isPlaying&&(s.resume(),r.play()),u((function(e){return Object(y.a)(Object(y.a)({},e),{},{currentTrackKey:a,currentId:t[a].id})}))}}},selectTrack:function(t){return function(e){return Object(p.a)(m.a.mark((function a(){return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return cancelAnimationFrame(n),n=requestAnimationFrame(g(r)),r.src=t[e].src,r.mimeType=t[e].mimeType,a.next=6,k();case 6:h(0),u((function(a){return Object(y.a)(Object(y.a)({},a),{},{currentTrackKey:e,currentId:t[e].id,isPlaying:!0})}));case 8:case"end":return a.stop()}}),a)})))}}}},children:e})},F=function(){return Object(c.useContext)(B)},z=a(4),q=a.n(z),V=function(){var t=F(),e=t.controls,a=t.playerState;return Object(C.jsx)(C.Fragment,{children:a.isPlaying?Object(C.jsx)("button",{className:"".concat(q.a.button," ").concat(q.a.button_play," ").concat(q.a.button_playerControl),onClick:e.pause,children:Object(C.jsx)(w,{})}):Object(C.jsx)("button",{className:"".concat(q.a.button," ").concat(q.a.button_pause," ").concat(q.a.button_playerControl),onClick:e.play,children:Object(C.jsx)(T,{})})})},W=function(){return Object(C.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:[Object(C.jsx)("title",{children:"Unmute"}),Object(C.jsx)("path",{fill:"currentColor",d:"M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"})]})},K=function(){return Object(C.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512",children:[Object(C.jsx)("title",{children:"Mute"}),Object(C.jsx)("path",{fill:"currentColor",d:"M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"})]})},M=function(){var t=F(),e=t.controls,a=t.playerState;return Object(C.jsx)(C.Fragment,{children:a.isMuted?Object(C.jsx)("button",{className:"".concat(q.a.button," ").concat(q.a.button_unmute," ").concat(q.a.button_playerControl),onClick:e.unmute,children:Object(C.jsx)(W,{})}):Object(C.jsx)("button",{className:"".concat(q.a.button," ").concat(q.a.button_mute," ").concat(q.a.button_playerControl),onClick:e.mute,children:Object(C.jsx)(K,{})})})},D=function(t){var e,a,n,r=~~(t/60),c=t-60*r;return"".concat(r,".").concat((e=~~c,n=n||"0",(e+="").length>=(a=2)?e:new Array(a-e.length+1).join(n)+e))},U=function(t){var e,a=t.tracks,n=F(),r=n.audio,c=n.audioError,s=n.playerState,l=n.controls,i=n.runningTime;return Object(C.jsxs)("div",{className:q.a.radioPlayerContainer,children:[Object(C.jsxs)("div",{className:q.a.playerBar,children:[Object(C.jsxs)("div",{className:q.a.controlsHolder,children:[Object(C.jsx)(V,{}),Object(C.jsx)("input",{className:q.a.radioRange,title:"volume",type:"range",value:s.volume,min:"0",max:"1",step:"0.01",onChange:l.volume}),Object(C.jsx)(M,{})]}),Object(C.jsxs)("div",{className:q.a.runningTime,children:[D(i)," of ",D(r.duration)]})]}),Object(C.jsxs)("div",{className:q.a.nextPrevControls,children:[Object(C.jsx)("button",{className:q.a.button_prevTrack,onClick:l.previous(a),children:"Prev"}),Object(C.jsx)("button",{className:q.a.button_nextTrack,onClick:l.next(a),children:"Next"}),null!==s.currentTrackKey?Object(C.jsx)("div",{className:q.a.currentTrack,children:(null===(e=a[s.currentTrackKey])||void 0===e?void 0:e.name)||""}):null]}),c&&Object(C.jsx)("p",{className:q.a.errorText,children:c})]})},H=function(t){var e=t.audioObjkts,a=t.walletId,n=F(),r=n.audio,s=n.playerState,l=n.setPlayerState,i=n.controls,o=n.isTrackPlaying,u=Object(c.useState)(null),j=Object(d.a)(u,2),b=j[0],f=j[1],_=Object(c.useState)([]),O=Object(d.a)(_,2),x=O[0],g=O[1],k=Object(c.useState)(A.ALL),w=Object(d.a)(k,2),T=w[0],N=w[1],P=Object(c.useState)({}),L=Object(d.a)(P,2),Q=L[0],R=L[1];return r.onended=function(){if(x.length){var t=(s.currentTrackKey+1)%x.length;r.src=x[t].src,i.play(),l((function(e){return Object(y.a)(Object(y.a)({},e),{},{currentTrackKey:t,currentId:x[t].id})}))}},Object(c.useEffect)((function(){f(e.map((function(t){return{id:t.token_id,creator:t.token_info.creators[0],name:t.token_info.name,src:"https://cloudflare-ipfs.com/ipfs/".concat(t.token_info.artifactUri.slice(7)),mimeType:t.token_info.formats[0].mimeType}})))}),[e]),Object(c.useEffect)((function(){(null===b||void 0===b?void 0:b.length)&&r&&(r.src||(r.crossOrigin="anonymous",r.src=b[0].src,r.volume=s.volume,r.mimeType=b[0].mimeType))}),[b]),Object(c.useEffect)((function(){b&&g(b.filter((function(t){switch(T){case A.ALL:return!0;case A.CREATIONS:return t.creator===a;case A.COLLECTIONS:return t.creator!==a;default:return!0}})))}),[b,T]),Object(c.useEffect)((function(){b&&Object(p.a)(m.a.mark((function t(){var e,a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new Set(b.map((function(t){return t.creator}))),t.next=3,Promise.allSettled(Object(h.a)(e).map((function(t){return v(t)})));case 3:a=t.sent.filter((function(t){return"fulfilled"===t.status})).reduce((function(t,e){try{t[e.value.data.logo.split(".")[0]]=e.value.data}catch(a){console.warn("Error fetching metadata:",a)}return t}),{}),R(a);case 5:case"end":return t.stop()}}),t)})))()}),[b,T]),b?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(U,{tracks:x}),Object(C.jsx)(E,{filter:T,setFilter:N}),Object(C.jsx)(I,{tracks:x,isTrackPlaying:o,handlePause:i.pause,handleSelectTrack:i.selectTrack(x),creatorMetadata:Q})]}):Object(C.jsx)("p",{children:"Loading..."})},G=a(1).useEffect,Z=function(t){G((function(){var e=document.title;return document.title=t,function(){document.title=e}}),[t])},Y=function(t){return O.a.get("".concat("https://1xgf1e26jb.execute-api.us-east-1.amazonaws.com/dev","/tz?tz=").concat(t))},X=Object(c.createContext)({tz:null}),J=function(t){var e=t.children,a=Object(c.useState)(null),n=Object(d.a)(a,2),r=n[0],s=n[1],l=Object(c.useState)(null),i=Object(d.a)(l,2),o=i[0],u=i[1],j=Object(c.useState)(!1),b=Object(d.a)(j,2),f=b[0],h=b[1],y=Object(c.useState)(null),_=Object(d.a)(y,2),O=_[0],v=_[1];Object(c.useEffect)((function(){r&&Object(p.a)(m.a.mark((function t(){var e,a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Y(r);case 3:a=t.sent,u(g((null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.result)||[])),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),v("Failed to load wallet address"),setTimeout((function(){return v(null)}),3e3);case 11:return t.prev=11,h(!1),t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[0,7,11,14]])})))()}),[r]);var g=function(t){return t.filter((function(t){return x.includes(t.token_info.formats[0].mimeType)}))};return Object(C.jsx)(X.Provider,{value:{walletId:r,setWalletId:s,objktData:o,isLoading:f,setIsLoading:h,error:O,setError:v},children:e})},$=function(){return Object(c.useContext)(X)},tt=function(){var t=Object(u.g)().tz,e=$(),a=e.walletId,n=e.setWalletId,r=e.objktData,s=e.isLoading,l=e.setIsLoading,i=e.error;Z("H=N Radio ".concat(a?"| ".concat(a):"")),Object(c.useEffect)((function(){t&&t!==a&&(console.log("tz",t),n(t))}),[t]);var o=Object(u.f)(),j=Object(c.useState)(""),f=Object(d.a)(j,2),m=f[0],h=f[1];return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)("div",{className:b.a.walletIdEntry,children:[Object(C.jsx)("input",{className:b.a.walletInput,value:m,placeholder:"Enter a wallet address",onChange:function(t){h(t.target.value)}}),Object(C.jsx)("button",{className:b.a.button_getObjktData,onClick:function(){n(m),h(""),l(!0),o.push("/tz/".concat(m))},disabled:!m,children:"Get Tracks"})]}),i&&Object(C.jsx)("p",{className:b.a.errorText,children:i}),r?Object(C.jsx)(C.Fragment,{children:s?Object(C.jsx)("p",{children:"Loading..."}):Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(H,{audioObjkts:r,walletId:a})})}):Object(C.jsx)(C.Fragment,{children:s?Object(C.jsx)("p",{children:"Loading..."}):null})]})},et=(a(79),a(17)),at=a.n(et),nt=[{name:"H=N Radio One",curator:"HEN Radio",description:"A cyber rasta dub reggae playlist for virtual zion",tracks:[{id:48594,name:"A l'Ouest",src:"https://cloudflare-ipfs.com/ipfs/QmawLCNM666CsHajN7MfJH9baWq2JRshxXX7QETL9dR4NA",mimeType:"audio/ogg",creator:"tz2EaL8HTqjZhVAWrQ3Ddp4wNCxPeE8CtM5f"},{id:5302,name:"Dub Stars",src:"https://cloudflare-ipfs.com/ipfs/Qmd8vTe22AdcYV84hTD2UEZFDicZZNf4j9bUBfDQsidy11",mimeType:"audio/mpeg",creator:"tz2EaL8HTqjZhVAWrQ3Ddp4wNCxPeE8CtM5f"},{id:5298,name:"Melancome",src:"https://cloudflare-ipfs.com/ipfs/QmNNrraeevcUhDT4saUA6W1AqiukZvvyRtroCf57PhjjyV",mimeType:"audio/mpeg",creator:"tz2EaL8HTqjZhVAWrQ3Ddp4wNCxPeE8CtM5f"}]}],rt=function(t){var e=t.playlist,a=F(),n=a.audio,r=a.playerState,s=a.setPlayerState,l=a.controls,i=a.isTrackPlaying,o=Object(c.useState)({}),u=Object(d.a)(o,2),j=u[0],b=u[1];return n.onended=function(){if(e.tracks.length){var t=(r.currentTrackKey+1)%e.tracks.length;n.src=e.tracks[t].src,l.play(),s((function(a){return Object(y.a)(Object(y.a)({},a),{},{currentTrackKey:t,currentId:e.tracks[t].id})}))}},Object(c.useEffect)((function(){var t;(null===(t=e.tracks)||void 0===t?void 0:t.length)&&n&&(n.src||(n.crossOrigin="anonymous",n.src=e.tracks[0].src,n.volume=r.volume,n.mimeType=e.tracks[0].mimeType))}),[e.tracks]),Object(c.useEffect)((function(){e.tracks&&Object(p.a)(m.a.mark((function t(){var a,n;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=new Set(e.tracks.map((function(t){return t.creator}))),t.next=3,Promise.allSettled(Object(h.a)(a).map((function(t){return v(t)})));case 3:n=t.sent.filter((function(t){return"fulfilled"===t.status})).reduce((function(t,e){try{t[e.value.data.logo.split(".")[0]]=e.value.data}catch(a){console.warn("Error fetching metadata:",a)}return t}),{}),b(n);case 5:case"end":return t.stop()}}),t)})))()}),[e]),e.tracks?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(U,{tracks:e.tracks}),Object(C.jsx)(I,{tracks:e.tracks,isTrackPlaying:i,handlePause:l.pause,handleSelectTrack:l.selectTrack(e.tracks),creatorMetadata:j})]}):Object(C.jsx)("p",{children:"Loading..."})},ct=a(46),st=a(8),lt=a.n(st),it="data:image/png;base64,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",ot=function(t){var e=t.handlePlaylistChange,a=Object(c.useState)([]),n=Object(d.a)(a,2),r=n[0],s=n[1];return Object(C.jsxs)("div",{className:lt.a.playlistContainer,children:[Object(C.jsx)("h2",{className:lt.a.playlistTitle,children:"Playlists"}),Object(C.jsx)("input",{className:lt.a.searchInput,onKeyUp:function(t){var e=t.target.value.toLowerCase(),a=nt.filter((function(t){if(e.length<2)return!1;if(t.name.toLowerCase().includes(e))return!0;if(t.curator.toLowerCase().includes(e))return!0;var a,n=Object(ct.a)(t.tracks);try{for(n.s();!(a=n.n()).done;){var r=a.value;if(r.name.toLowerCase().includes(e))return!0;if(r.id.toString().toLowerCase().includes(e))return!0;if(r.creator.toLowerCase().includes(e))return!0}}catch(c){n.e(c)}finally{n.f()}return!1}));s(a)}}),r.length?Object(C.jsx)("div",{className:lt.a.filteredPlaylists,children:r.map((function(t){return Object(C.jsxs)("div",{className:lt.a.filteredPlaylists_row,children:[Object(C.jsx)("button",{onClick:e(t),className:lt.a.playlistButton,children:Object(C.jsx)("img",{src:t.img||it,alt:"",className:lt.a.playlistImage})},t.name),Object(C.jsxs)("div",{className:lt.a.filteredPlaylists_info,children:[Object(C.jsx)("h3",{className:lt.a.filteredPlaylists_title,children:t.name}),Object(C.jsx)("p",{className:lt.a.filteredPlaylists_subTitle,children:t.curator}),t.tracks.map((function(t){return Object(C.jsxs)("div",{className:lt.a.trackRow,children:[Object(C.jsxs)("span",{className:lt.a.trackRow_text,children:[Object(C.jsxs)("a",{href:"https://hicetnunc.xyz/objkt/".concat(t.id),className:lt.a.trackRow_link,children:["#",t.id," ",t.name]}),Object(C.jsx)("br",{}),"By ",Object(C.jsx)("a",{href:"https://hicetnunc.xyz/tz/".concat(t.creator),className:lt.a.trackRow_link,children:N(t.creator)})]}),Object(C.jsx)("img",{alt:"Artist's avatar",className:lt.a.trackRow_avatar,src:"https://services.tzkt.io/v1/avatars2/".concat(t.creator)})]})}))]})]})}))}):Object(C.jsx)("div",{className:lt.a.playlistGrid,children:nt.map((function(t){return Object(C.jsxs)("button",{onClick:e(t),className:lt.a.playlistButton,children:[Object(C.jsx)("img",{src:t.img||it,alt:"",className:lt.a.playlistImage}),Object(C.jsx)("p",{className:lt.a.playlistText,children:t.name})]},t.name)}))})]})},ut=a(15),dt=a.n(ut),jt=function(t){var e=t.playlist;return Object(C.jsx)("div",{className:dt.a.currentPlaylistWrapper,children:Object(C.jsxs)("div",{className:dt.a.currentPlaylistRow,children:[Object(C.jsx)("div",{className:dt.a.currentPlaylistColumnImage,children:Object(C.jsx)("img",{src:e.img||it,alt:"",className:dt.a.currentPlaylistImage})}),Object(C.jsxs)("div",{className:dt.a.currentPlaylistColumnInfo,children:[Object(C.jsx)("h1",{className:dt.a.currentPlaylistText,children:e.name}),Object(C.jsxs)("p",{className:dt.a.currentPlaylistArtist,children:["By ",Object(C.jsx)("a",{href:"https://hicetnunc.xyz",children:e.curator})]}),Object(C.jsx)("p",{className:dt.a.currentPlaylistDescription,children:e.description})]})]})})},bt=function(){Z("H=N Radio Playlists");var t=Object(c.useState)(nt[0]),e=Object(d.a)(t,2),a=e[0],n=e[1];return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(jt,{playlist:a}),Object(C.jsx)(rt,{playlist:a}),Object(C.jsx)(ot,{handlePlaylistChange:function(t){return function(){return n(t)}}})]})},ft=a(47),mt=a.n(ft),ht=function(){return Object(C.jsxs)("svg",{className:mt.a.logo,width:"100%",height:"100%",viewBox:"0 0 714 216",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:[Object(C.jsx)("g",{transform:"matrix(1,0,0,1,-67.94,-316.92)",children:Object(C.jsx)("path",{d:"M359.49,532.59C354.508,532.574 349.614,531.265 345.29,528.79C336.261,523.737 330.677,514.137 330.75,503.79L330.75,345.7C330.75,345.697 330.75,345.693 330.75,345.69C330.75,329.924 343.724,316.95 359.49,316.95C364.668,316.95 369.751,318.35 374.2,321L506.74,400.06C515.421,405.237 520.754,414.628 520.754,424.735C520.754,434.842 515.421,444.233 506.74,449.41L374.2,528.48C369.758,531.152 364.674,532.572 359.49,532.59Z"})}),Object(C.jsx)("g",{transform:"matrix(1,0,0,1,-67.94,-316.92)",children:Object(C.jsx)("path",{d:"M136.64,321.33L67.94,321.33L67.94,528.18L136.64,528.18L136.64,458.76L206.72,458.76L206.72,528.18L275.42,528.18L275.42,321.33L206.72,321.33L206.72,389.33L136.64,389.33L136.64,321.33ZM561.08,321.33L768.56,321.33L768.56,528.18L699.86,528.18L699.86,389.35L629.79,389.35L629.79,528.18L561.08,528.18L561.08,321.33Z"})})]})},pt=a(24),yt=a.n(pt),_t=function(){return Object(C.jsxs)("div",{className:yt.a.footerBar,children:[Object(C.jsx)("h2",{className:yt.a.footerTitle,children:"Created as part of Hicathon Hackday 2021"}),Object(C.jsxs)("p",{className:yt.a.footerText,children:["Working Group:",Object(C.jsx)("br",{}),Object(C.jsx)("a",{href:"https://twitter.com/lauzaki",children:"@lauzaki"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/andreasrau_eu",children:"@andreasrau_eu"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/uvdsc",children:"@uvdsc"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/__orderandchaos",children:"@__orderandchaos"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/webidente",children:"@webidente"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/BabyCommando_",children:"@BabyCommando_"}),","," ",Object(C.jsx)("a",{href:"https://twitter.com/jclayton",children:"@jclayton"})]}),Object(C.jsxs)("p",{className:yt.a.footerText,children:["View on ",Object(C.jsx)("a",{href:"https://github.com/OrderAndCh4oS/hicetnunc-radio",children:"GitHub"})]})]})},Ot=a(48),xt=a(32),vt=Object(xt.gql)(r||(r=Object(Ot.a)(['\n    query AudioObjktData {\n        hic_et_nunc_token(where: {mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]}}) {\n            id\n            display_uri\n            level\n            description\n            title\n            token_holders {\n                holder_id\n                quantity\n            }\n            thumbnail_uri\n            mime\n            creator_id\n            artifact_uri\n        }\n    }\n']))),gt=function(){Z("H=N Radio Tracks");var t=F(),e=t.audio,a=t.playerState,n=t.setPlayerState,r=t.controls,s=t.isTrackPlaying,l=Object(c.useState)(null),i=Object(d.a)(l,2),o=i[0],u=i[1],j=Object(c.useState)({}),b=Object(d.a)(j,2),f=b[0],_=b[1];return e.onended=function(){if(o.length){var t=(a.currentTrackKey+1)%o.length;e.src=o[t].src,r.play(),n((function(e){return Object(y.a)(Object(y.a)({},e),{},{currentTrackKey:t,currentId:o[t].id})}))}},Object(c.useEffect)((function(){Object(p.a)(m.a.mark((function t(){var e,a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(xt.request)("https://api.hicdex.com/v1/graphql",vt);case 2:a=t.sent,console.log(a),u(null===a||void 0===a||null===(e=a.hic_et_nunc_token)||void 0===e?void 0:e.map((function(t){return{id:t.id,creator:t.creator_id,name:t.title,src:"https://cloudflare-ipfs.com/ipfs/".concat(t.artifact_uri.slice(7)),mimeType:t.mime}})));case 5:case"end":return t.stop()}}),t)})))()}),[]),Object(c.useEffect)((function(){(null===o||void 0===o?void 0:o.length)&&e&&(e.src||(e.crossOrigin="anonymous",e.src=o[0].src,e.volume=a.volume,e.mimeType=o[0].mimeType))}),[o]),Object(c.useEffect)((function(){o&&Object(p.a)(m.a.mark((function t(){var e,a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new Set(o.map((function(t){return t.creator}))),t.next=3,Promise.allSettled(Object(h.a)(e).map((function(t){return v(t)})));case 3:a=t.sent.filter((function(t){return"fulfilled"===t.status})).reduce((function(t,e){try{t[e.value.data.logo.split(".")[0]]=e.value.data}catch(a){console.warn("Error fetching metadata:",a)}return t}),{}),_(a);case 5:case"end":return t.stop()}}),t)})))()}),[o]),o?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(U,{tracks:o}),Object(C.jsx)(I,{tracks:o,isTrackPlaying:s,handlePause:r.pause,handleSelectTrack:r.selectTrack(o),creatorMetadata:f})]}):Object(C.jsx)("p",{children:"Loading..."})};var kt=function(){var t=$().walletId;return Object(C.jsxs)("div",{className:at.a.radioView,children:[Object(C.jsxs)("div",{className:at.a.headerBar,children:[Object(C.jsx)(ht,{}),Object(C.jsxs)("div",{className:at.a.navBar,children:[Object(C.jsx)(o.b,{className:at.a.navBar_link,to:t?"/tz/".concat(t):"/",children:"By Wallet"}),Object(C.jsx)(o.b,{className:at.a.navBar_link,to:"/playlists",children:"Playlists"}),Object(C.jsx)(o.b,{className:at.a.navBar_link,to:"/all-tracks",children:"All Tracks"})]})]}),Object(C.jsxs)(u.c,{children:[Object(C.jsx)(u.a,{exact:!0,path:"/",component:tt}),Object(C.jsx)(u.a,{path:"/tz/:tz",component:tt}),Object(C.jsx)(u.a,{path:"/playlists",component:bt}),Object(C.jsx)(u.a,{path:"/all-tracks",component:gt})]}),Object(C.jsx)(_t,{})]})},Ct=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,86)).then((function(e){var a=e.getCLS,n=e.getFID,r=e.getFCP,c=e.getLCP,s=e.getTTFB;a(t),n(t),r(t),c(t),s(t)}))};i.a.render(Object(C.jsx)(s.a.StrictMode,{children:Object(C.jsx)(o.a,{children:Object(C.jsx)(J,{children:Object(C.jsx)(Q,{children:Object(C.jsx)(S,{children:Object(C.jsx)(kt,{})})})})})}),document.getElementById("root")),Ct()}},[[84,1,2]]]);
//# sourceMappingURL=main.0b32838d.chunk.js.map