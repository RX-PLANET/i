(self["webpackChunki"]=self["webpackChunki"]||[]).push([[418],{9387:function(t){!function(e,n){t.exports=n()}(0,(function(){"use strict";var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,s){var r,o=function(t,n,i){void 0===i&&(i={});var s=new Date(t),r=function(t,n){void 0===n&&(n={});var i=n.timeZoneName||"short",s=t+"|"+i,r=e[s];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[s]=r),r}(n,i);return r.formatToParts(s)},a=function(e,n){for(var i=o(e,n),r=[],a=0;a<i.length;a+=1){var u=i[a],c=u.type,l=u.value,f=t[c];f>=0&&(r[f]=parseInt(l,10))}var m=r[3],p=24===m?0:m,d=r[0]+"-"+r[1]+"-"+r[2]+" "+p+":"+r[4]+":"+r[5]+":000",v=+e;return(s.utc(d).valueOf()-(v-=v%1e3))/6e4},u=i.prototype;u.tz=function(t,e){void 0===t&&(t=r);var n,i=this.utcOffset(),o=this.toDate(),a=o.toLocaleString("en-US",{timeZone:t}),u=Math.round((o-new Date(a))/1e3/60),c=15*-Math.round(o.getTimezoneOffset()/15)-u;if(Number(c)){if(n=s(a,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(c,!0),e){var l=n.utcOffset();n=n.add(i-l,"minute")}}else n=this.utcOffset(0,e);return n.$x.$timezone=t,n},u.offsetName=function(t){var e=this.$x.$timezone||s.tz.guess(),n=o(this.valueOf(),e,{timeZoneName:t}).find((function(t){return"timezonename"===t.type.toLowerCase()}));return n&&n.value};var c=u.startOf;u.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return c.call(this,t,e);var n=s(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return c.call(n,t,e).tz(this.$x.$timezone,!0)},s.tz=function(t,e,n){var i=n&&e,o=n||e||r,u=a(+s(),o);if("string"!=typeof t)return s(t).tz(o);var c=function(t,e,n){var i=t-60*e*1e3,s=a(i,n);if(e===s)return[i,e];var r=a(i-=60*(s-e)*1e3,n);return s===r?[i,s]:[t-60*Math.min(s,r)*1e3,Math.max(s,r)]}(s.utc(t,i).valueOf(),u,o),l=c[0],f=c[1],m=s(l).utcOffset(f);return m.$x.$timezone=o,m},s.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},s.tz.setDefault=function(t){r=t}}}))},178:function(t){!function(e,n){t.exports=n()}(0,(function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(i,s,r){var o=s.prototype;r.utc=function(t){var e={date:t,utc:!0,args:arguments};return new s(e)},o.utc=function(e){var n=r(this.toDate(),{locale:this.$L,utc:!0});return e?n.add(this.utcOffset(),t):n},o.local=function(){return r(this.toDate(),{locale:this.$L,utc:!1})};var a=o.parse;o.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),a.call(this,t)};var u=o.init;o.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else u.call(this)};var c=o.utcOffset;o.utcOffset=function(i,s){var r=this.$utils().u;if(r(i))return this.$u?0:r(this.$offset)?c.call(this):this.$offset;if("string"==typeof i&&(i=function(t){void 0===t&&(t="");var i=t.match(e);if(!i)return null;var s=(""+i[0]).match(n)||["-",0,0],r=s[0],o=60*+s[1]+ +s[2];return 0===o?0:"+"===r?o:-o}(i),null===i))return this;var o=Math.abs(i)<=16?60*i:i,a=this;if(s)return a.$offset=o,a.$u=0===i,a;if(0!==i){var u=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(a=this.local().add(o+u,t)).$offset=o,a.$x.$localOffset=u}else a=this.utc();return a};var l=o.format;o.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return l.call(this,e)},o.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},o.isUTC=function(){return!!this.$u},o.toISOString=function(){return this.toDate().toISOString()},o.toString=function(){return this.toDate().toUTCString()};var f=o.toDate;o.toDate=function(t){return"s"===t&&this.$offset?r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():f.call(this)};var m=o.diff;o.diff=function(t,e,n){if(t&&this.$u===t.$u)return m.call(this,t,e,n);var i=this.local(),s=r(t).local();return m.call(i,s,e,n)}}}))},9819:function(t,e,n){"use strict";n.d(e,{g:function(){return r},s:function(){return o}});var i=n(2727);const{global:{t:s}}=i.a,r=[{value:"",label:s("notification.message.all")},{value:"3",label:s("notification.message.toolbar.urgent")},{value:"2",label:s("notification.message.toolbar.important")},{value:"1",label:s("notification.message.toolbar.normal")}],o=[{value:"",label:s("notification.message.all")},{value:"0",label:s("notification.message.toolbar.unread")},{value:"1",label:s("notification.message.toolbar.read")}]},6467:function(t,e,n){"use strict";n.d(e,{FC:function(){return r},I2:function(){return a},Zj:function(){return u},_U:function(){return s},o6:function(){return o}});var i=n(6102);function s(t){return(0,i.VM)().get("/api/uc/user/message/inbox",{params:t})}function r(t){return(0,i.VM)().get(`/api/uc/user/message/inbox/${t}`)}function o(t,e){return(0,i.VM)().put(`/api/uc/user/message/${t}`,e)}function a(t,e){const n=t?`/api/uc/user/message/count?id=${t}`:"/api/uc/user/message/count";return(0,i.VM)().put(n,e)}function u(t){return(0,i.VM)().delete("/api/uc/user/message",{params:{id:t}})}},1259:function(t,e,n){"use strict";n.d(e,{$Y:function(){return w},zp:function(){return $},p6:function(){return g},Xj:function(){return x},HO:function(){return h}});var i=n(9996),s=(n(1814),n(7484)),r=n.n(s),o=n(178),a=n.n(o),u=n(9387),c=n.n(u);r().extend(a()),r().extend(c());class l{constructor(t=null){this.userTimezone=t||Intl.DateTimeFormat().resolvedOptions().timeZone,this.storedTimezone="Asia/Shanghai"}convert(t){const e=r()(t).tz(this.storedTimezone);return e.tz(this.userTimezone)}format(t,e){return this.convert(t).format(e)}}var f=l;const m={iPhone:"iphone","Android Phone":"android",Pad:"pad",iPad:"pad","Windows PC":"windows",Mac:"mac",Phone:"phone","Linux PC":"linux","Unknown Device":"pad"};var p=n(2727);const d=new f,{global:{t:v}}=p.a;function g(t,e="date"){if(t){if("date"===e)return d.format(t,"YYYY-MM-DD");if("time"===e)return d.format(t,"HH:mm:ss");if("hour"===e)return d.format(t,"HH:mm");if("datetime"===e)return d.format(t,"YYYY-MM-DD HH:mm:ss")}}function h(t){const e={};for(const n in t)null!==t[n]&&void 0!==t[n]&&""!==t[n]&&(e[n]=t[n]);return e}function $(t){if(navigator.clipboard)navigator.clipboard.writeText(t),(0,i.bM)({title:v("common.messagebox.copySuccess"),message:t,type:"success"});else{const e=document.createElement("input");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),(0,i.bM)({title:v("common.messagebox.copySuccess"),message:t,type:"success"})}}function w({array:t=[],key:e="key",remainKey:n=""}={}){return null===t||void 0===t||!t.length||!t.every((t=>e in t))||n&&!t.every((t=>n in t))?(console.log("【参数错误】",t,e,n),{}):t.reduce(((t,i)=>({...t,[i[e]]:n?i[n]:i})),{})}function x(t){if(!t)return"";const e=m[t]||"";return e?n(2598)(`./${e}.svg`):""}},6430:function(t,e,n){"use strict";n.d(e,{Z:function(){return x}});var i=n(6252),s=n(3577),r=n(9963);const o={class:"c-header"},a={class:"c-header_main"},u={class:"c-header-left"},c={key:0,class:"c-header__title"},l={key:1,class:"c-header__desc"},f={class:"c-header-right"},m={class:"c-header__profile"},p={class:"u-name"};function d(t,e,n,d,v,g){var h,$;const w=(0,i.up)("lang-select"),x=(0,i.up)("el-dropdown-item"),D=(0,i.up)("el-dropdown-menu"),_=(0,i.up)("el-dropdown");return(0,i.wg)(),(0,i.iD)("div",o,[(0,i._)("div",a,[(0,i._)("div",u,[null!==(h=g.routeMeta)&&void 0!==h&&h.title?((0,i.wg)(),(0,i.iD)("div",c,(0,s.zw)(g.routeMeta.title),1)):(0,i.kq)("",!0),null!==($=g.routeMeta)&&void 0!==$&&$.desc?((0,i.wg)(),(0,i.iD)("div",l,(0,s.zw)(g.routeMeta.desc),1)):(0,i.kq)("",!0)]),(0,i._)("div",f,[(0,i.Wm)(w,{class:"c-header__lang",selected:"icon",onChange:g.onLangChange,lang:g.lang},null,8,["onChange","lang"]),(0,i.Wm)(_,{trigger:"click"},{dropdown:(0,i.w5)((()=>[(0,i.Wm)(D,null,{default:(0,i.w5)((()=>[(0,i.Wm)(x,{onClick:(0,r.iM)(g.logout,["stop"])},{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)(t.$t("account.common.logout")),1)])),_:1},8,["onClick"])])),_:1})])),default:(0,i.w5)((()=>[(0,i._)("div",m,[(0,i._)("span",p,(0,s.zw)(g.profile.username||g.profile.nickname),1)])])),_:1})])])])}var v=n(9158),g=n(2878),h={name:"PageHeader",data:function(){return{}},computed:{routeMeta(){return this.$route.meta},profile(){return this.$store.state.user},avatar(){var t;return(null===(t=this.profile)||void 0===t?void 0:t.avatar)&&"null"!=this.profile.avatar||n(9743)},app(){return this.$store.state.app},lang(){return v.Z.getLocale()}},watch:{},methods:{logout(){(0,g.kS)().then((()=>{v.Z.logout(),this.$router.push({name:"email-login"})}))},onLangChange(t){(0,g.gS)({lang:t},{app:this.app}).then((()=>{location.reload()}))}}},$=n(3744);const w=(0,$.Z)(h,[["render",d]]);var x=w},5185:function(t,e,n){"use strict";n.d(e,{Z:function(){return h}});var i=n(6252),s=n(3577);const r={class:"m-message-filter w-card"},o={class:"m-message-filter__group"},a=["onClick"],u=["src"],c={class:"m-message-filter__group"},l=["onClick"];function f(t,e,n,f,m,p){const d=(0,i.Q2)("svg-inline");return(0,i.wg)(),(0,i.iD)("div",r,[(0,i._)("div",o,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(m.apps,(t=>((0,i.wg)(),(0,i.iD)("div",{class:(0,s.C_)(["m-message-filter__item",m.app===t.value?"is-active":""]),key:t.value,onClick:e=>p.appChange(t.value)},[(0,i.wy)((0,i._)("img",{class:"u-img",src:p.getAppIcon(t.key)},null,8,u),[[d]]),(0,i._)("b",null,(0,s.zw)(t.label),1)],10,a)))),128))]),(0,i._)("div",c,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(m.levels,(t=>((0,i.wg)(),(0,i.iD)("div",{class:(0,s.C_)(["m-message-filter__item",m.level===t.value?"is-active":""]),key:t.value,onClick:e=>p.levelChange(t.value)},[(0,i._)("div",{class:(0,s.C_)(["u-icon",`u-icon-${t.value}`])},null,2),(0,i._)("b",null,(0,s.zw)(t.label),1)],10,l)))),128))])])}var m=n(9447),p=n(9819),d={name:"MessageFilter",props:{initApp:{type:String,default:""}},data(){return{levels:p.g,apps:m.h,app:"",level:""}},computed:{params(){const{level:t,app:e}=this;return{level:t,app:e}}},watch:{initApp:{immediate:!0,handler(t){t&&(this.app=t)}},params:{deep:!0,handler:function(t){this.$emit("update",t)}}},mounted(){const t=this.$route.params;t.app&&(this.app=t.app),t.level&&(this.level=t.level)},methods:{levelChange(t){this.level=t===this.level?"":t},appChange(t){this.app=t===this.app?"":t},getAppIcon(t){return n(8051)(`./${t}.svg`)}}},v=n(3744);const g=(0,v.Z)(d,[["render",f]]);var h=g},2598:function(t,e,n){var i={"./android.svg":3044,"./iphone.svg":4581,"./linux.svg":2175,"./mac.svg":864,"./pad.svg":1921,"./pc.svg":5172,"./phone.svg":5519,"./windows.svg":1184};function s(t){var e=r(t);return n(e)}function r(t){if(!n.o(i,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return i[t]}s.keys=function(){return Object.keys(i)},s.resolve=r,t.exports=s,s.id=2598},8051:function(t,e,n){var i={"./2kog.svg":4994,"./iruxu.svg":7562,"./iruxu2.svg":1257,"./miipet.svg":4404};function s(t){var e=r(t);return n(e)}function r(t){if(!n.o(i,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return i[t]}s.keys=function(){return Object.keys(i)},s.resolve=r,t.exports=s,s.id=8051},3044:function(t,e,n){"use strict";t.exports=n.p+"img/android.6e2cae2e.svg"},4581:function(t,e,n){"use strict";t.exports=n.p+"img/iphone.037232b8.svg"},2175:function(t,e,n){"use strict";t.exports=n.p+"img/linux.e999220d.svg"},864:function(t,e,n){"use strict";t.exports=n.p+"img/mac.f2227271.svg"},1921:function(t,e,n){"use strict";t.exports=n.p+"img/pad.955d800a.svg"},5172:function(t,e,n){"use strict";t.exports=n.p+"img/pc.099a1c96.svg"},5519:function(t,e,n){"use strict";t.exports=n.p+"img/phone.67713635.svg"},1184:function(t,e,n){"use strict";t.exports=n.p+"img/windows.1c9c1966.svg"},2570:function(t,e,n){"use strict";t.exports=n.p+"img/logo.e213a56c.svg"},4994:function(t,e,n){"use strict";t.exports=n.p+"img/2kog.22e4ccf0.svg"},7562:function(t,e,n){"use strict";t.exports=n.p+"img/iruxu.ab4f3316.svg"},1257:function(t,e,n){"use strict";t.exports=n.p+"img/iruxu2.d2a47c50.svg"},4404:function(t,e,n){"use strict";t.exports=n.p+"img/miipet.085cb432.svg"},9743:function(t,e,n){"use strict";t.exports=n.p+"img/test.2ffd992c.png"},1814:function(t){"use strict";t.exports=JSON.parse('{"S":"https://cdn.iruxu.com","v":"https://uc.iruxu.com"}')}}]);
//# sourceMappingURL=418.93bbaf55.js.map