"use strict";(self["webpackChunki"]=self["webpackChunki"]||[]).push([[570],{8026:function(e,a,t){t.d(a,{FP:function(){return o},Iq:function(){return i},oP:function(){return r},pI:function(){return n}});var s=t(6102);async function r(e){return(0,s.VM)().get("/api/uc/user/account/email/valid",{params:{email:e}}).then((e=>{var a;return null===(a=e.data.data)||void 0===a?void 0:a.isExist}))}function n(e,a){return(0,s.VM)().post("/api/uc/user/account/email/register",e,{params:a})}function o(e,a){return(0,s.VM)({mute:!0}).post("/api/uc/user/account/email/active",e,{params:a})}function i(e,a){return(0,s.VM)({mute:!0}).post("/api/uc/user/account/email/login",e,{params:a})}},650:function(e,a,t){t.d(a,{Z:function(){return l}});var s=t(6252);const r={class:"m-footer"};function n(e,a,t,n,o,i){return(0,s.wg)(),(0,s.iD)("footer",r,"© RX-PLANET")}var o={name:"RX-Footer",props:[],components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){}},i=t(3744);const c=(0,i.Z)(o,[["render",n]]);var l=c},1424:function(e,a,t){t.d(a,{Z:function(){return h}});var s=t(6252),r=t.p+"img/wechat.2b3ccab9.svg";const n={key:0,class:"m-account-union"},o={class:"m-account-union__header"},i={class:"m-account-union__content"},c=["href"];function l(e,a,t,l,u,m){const d=(0,s.up)("Star"),p=(0,s.up)("el-icon");return t.includes.length?((0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("div",o,[(0,s._)("span",null,[(0,s.Wm)(p,null,{default:(0,s.w5)((()=>[(0,s.Wm)(d)])),_:1})])]),(0,s._)("div",i,[t.includes.includes("wechat")?((0,s.wg)(),(0,s.iD)("a",{key:0,class:"m-account-union__item m-account-union__item--wechat",href:m.getUnionLink("/user/union/wesite/")},a[0]||(a[0]=[(0,s._)("img",{class:"u-icon",src:r},null,-1),(0,s._)("span",{class:"u-label"},"微信",-1)]),8,c)):(0,s.kq)("",!0)])])):(0,s.kq)("",!0)}var u=t(9158),m=t(1814),d={name:"AccountUnion",props:{mode:{type:String,default:"login"},includes:{type:Array,default:()=>[]}},components:{},data:function(){return{uc:m.v+"/api/uc"}},computed:{app(){return this.$store.state.app},lang(){let e=u.Z.getLocale();return"zh-CN"===e?"cn":"en"},unionLinkSuffix(){return"?app="+this.app+"&lang="+this.lang}},watch:{},methods:{getUnionLink(e){return this.uc+e+this.mode+this.unionLinkSuffix}},created:function(){},mounted:function(){}},p=t(3744);const g=(0,p.Z)(d,[["render",l]]);var h=g},4842:function(e,a,t){t.r(a),t.d(a,{default:function(){return D}});var s=t(6252);const r={class:"p-account p-account-email p-account-email--register"},n={class:"m-register"};function o(e,a,t,o,i,c){const l=(0,s.up)("logo"),u=(0,s.up)("register",!0),m=(0,s.up)("el-row"),d=(0,s.up)("Footer");return(0,s.wg)(),(0,s.iD)("div",r,[(0,s.Wm)(m,{class:"m-container",justify:"center"},{default:(0,s.w5)((()=>[(0,s._)("div",n,[(0,s.Wm)(l,{app:i.app},null,8,["app"]),(0,s.Wm)(u,{app:i.app,loginLink:c.loginLink},null,8,["app","loginLink"])])])),_:1}),(0,s.Wm)(d)])}var i=t(3577);const c={class:"m-card m-register-card"},l={key:0,class:"m-card-main"},u={class:"m-card-form-label"},m={class:"m-card-form-label"},d={key:0},p={class:"m-card-form-label"},g={class:"m-card-form-label"},h={class:"u-terms"},f=["href"],w={key:1,class:"m-card-main"},k={key:2,class:"m-card-main"},v={class:"m-footer"},_={class:"m-footer-skip"},b=["href"];function $(e,a,t,r,n,o){const $=(0,s.up)("lang-select"),y=(0,s.up)("card-header"),W=(0,s.up)("el-input"),z=(0,s.up)("el-form-item"),C=(0,s.up)("el-button"),L=(0,s.up)("el-form"),U=(0,s.up)("el-checkbox"),V=(0,s.up)("union"),q=(0,s.up)("el-alert");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",c,[(0,s.Wm)(y,{title:e.$t("account.common.register")},{right:(0,s.w5)((()=>[(0,s.Wm)($,{lang:n.form.lang,onChange:o.changeLang},null,8,["lang","onChange"])])),_:1},8,["title"]),null===n.success?((0,s.wg)(),(0,s.iD)("div",l,[(0,s.Wm)(L,{class:"m-card-form","hide-required-asterisk":"",ref:"registerForm",model:n.form,rules:n.rules,size:"large","status-icon":"","label-position":"top"},{default:(0,s.w5)((()=>[(0,s.Wm)(z,{prop:"email"},{label:(0,s.w5)((()=>[(0,s._)("div",u,[(0,s._)("span",null,[(0,s.Uk)((0,i.zw)(e.$t("account.email.address")),1),a[5]||(a[5]=(0,s._)("i",{class:"is-required"},"*",-1))])])])),default:(0,s.w5)((()=>[(0,s.Wm)(W,{modelValue:n.form.email,"onUpdate:modelValue":a[0]||(a[0]=e=>n.form.email=e),modelModifiers:{trim:!0,lazy:!0},size:"large"},null,8,["modelValue"])])),_:1}),(0,s.Wm)(z,{prop:"code",class:"u-code"},{label:(0,s.w5)((()=>[(0,s._)("div",m,[(0,s._)("span",null,[(0,s.Uk)((0,i.zw)(e.$t("account.email.code")),1),a[6]||(a[6]=(0,s._)("i",{class:"is-required"},"*",-1))])])])),default:(0,s.w5)((()=>[(0,s.Wm)(W,{modelValue:n.form.code,"onUpdate:modelValue":a[1]||(a[1]=e=>n.form.code=e),modelModifiers:{trim:!0},size:"large"},null,8,["modelValue"]),(0,s.Wm)(C,{class:"u-btn-send",size:"small",onClick:o.senCode,disabled:n.interval>0||!n.emailChecked},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(e.$t("account.email.send")),1),n.interval?((0,s.wg)(),(0,s.iD)("span",d,"("+(0,i.zw)(n.interval)+"s)",1)):(0,s.kq)("",!0)])),_:1},8,["onClick","disabled"])])),_:1}),(0,s.Wm)(z,{prop:"password",class:"m-password"},{label:(0,s.w5)((()=>[(0,s._)("div",p,[(0,s._)("span",null,[(0,s.Uk)((0,i.zw)(e.$t("account.common.password")),1),a[7]||(a[7]=(0,s._)("i",{class:"is-required"},"*",-1))])])])),default:(0,s.w5)((()=>[(0,s.Wm)(W,{modelValue:n.form.password,"onUpdate:modelValue":a[2]||(a[2]=e=>n.form.password=e),modelModifiers:{trim:!0},type:"password",size:"large","show-password":""},null,8,["modelValue"])])),_:1}),(0,s.Wm)(z,{prop:"password1",class:"m-password"},{label:(0,s.w5)((()=>[(0,s._)("div",g,[(0,s._)("span",null,[(0,s.Uk)((0,i.zw)(e.$t("account.common.passwordConfirm")),1),a[8]||(a[8]=(0,s._)("i",{class:"is-required"},"*",-1))])])])),default:(0,s.w5)((()=>[(0,s.Wm)(W,{modelValue:n.form.password1,"onUpdate:modelValue":a[3]||(a[3]=e=>n.form.password1=e),modelModifiers:{trim:!0},type:"password",size:"large","show-password":""},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules"]),(0,s._)("div",h,[(0,s.Wm)(U,{modelValue:n.agreement,"onUpdate:modelValue":a[4]||(a[4]=e=>n.agreement=e),class:"u-checkbox"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(e.$t("account.common.read"))+" ",1),(0,s._)("a",{href:n.terms,target:"_blank"},"《"+(0,i.zw)(e.$t("account.common.terms"))+"》 ",9,f)])),_:1},8,["modelValue"])]),(0,s.Wm)(C,{class:"u-btn u-submit",type:"primary",disabled:!o.canRegister,onClick:o.onRegister},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(e.$t("account.common.register")),1)])),_:1},8,["disabled","onClick"]),(0,s.Wm)(V,{mode:"register",includes:["wechat"]})])):(0,s.kq)("",!0),1==n.success?((0,s.wg)(),(0,s.iD)("main",w,[(0,s.Wm)(q,{class:"m-alert",title:e.$t("account.email.registerSuccess"),type:"success",description:e.$t("account.email.registerSuccessDesc"),"show-icon":"",closable:!1},null,8,["title","description"]),(0,s.Wm)(C,{size:"large",class:"u-btn u-back",type:"primary",onClick:o.goLogin},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(e.$t("account.common.login")),1)])),_:1},8,["onClick"])])):(0,s.kq)("",!0),0==n.success?((0,s.wg)(),(0,s.iD)("main",k,[(0,s.Wm)(q,{class:"m-alert",title:e.$t("account.email.registerFailed"),type:"error",description:e.$t("account.email.registerFailedDesc"),"show-icon":"",closable:!1},null,8,["title","description"]),(0,s.Wm)(C,{size:"large",class:"u-btn u-back",type:"primary",onClick:o.onBack},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(e.$t("account.common.back")),1)])),_:1},8,["onClick"])])):(0,s.kq)("",!0)]),(0,s._)("div",v,[(0,s._)("div",_,[(0,s.Uk)((0,i.zw)(e.$t("account.common.hadAccount"))+" ",1),(0,s._)("a",{class:"u-link",href:t.loginLink},(0,i.zw)(e.$t("account.common.login"))+" »",9,b)])])],64)}var y=t(8026),W=t(9158),z=t(1424),C={name:"EmailRegister",components:{union:z.Z},props:{app:{type:String,default:""},loginLink:{type:String,default:""}},data(){return{form:{email:"",password:"",password1:"",lang:"",code:""},rules:{email:[{required:!0,message:this.$t("account.email.addressPlaceholder"),trigger:"blur"},{type:"email",message:this.$t("account.email.addressError"),trigger:"blur"},{validator:this.check,trigger:"blur"}],password:[{required:!0,message:this.$t("account.common.passwordPlaceholder"),trigger:"blur"},{min:6,max:30,message:this.$t("account.common.passwordError"),trigger:"blur"}],password1:[{required:!0,message:this.$t("account.common.password2Placeholder"),trigger:"blur"},{min:6,max:30,message:this.$t("account.common.passwordError"),trigger:"blur"},{validator:(e,a,t)=>{a!==this.form.password?t(new Error(this.$t("account.common.passwordError2"))):t()},trigger:"blur"}]},agreement:!1,success:null,emailChecked:!1,terms:"/document/terms",interval:0,timer:null}},computed:{canRegister(){return this.form.email&&this.form.password&&this.form.code&&this.form.password1&&this.agreement}},mounted(){W.Z.generateFingerprint(),this.form.lang=W.Z.getLocale()},methods:{async check(e,a,t){if(a){const e=await(0,y.oP)(a);if(e)return this.emailChecked=!1,void t(new Error(this.$t("account.email.emailRegistered")));this.emailChecked=!0,t()}else this.emailChecked=!1,t(new Error(this.$t("account.email.addressPlaceholder")))},senCode(){this.form.email?(0,y.pI)({email:this.form.email},{app:this.app}).then((()=>{this.$message.success(this.$t("account.email.sendSuccess")),this.interval=60,this.timer=setInterval((()=>{this.interval--,this.interval<=0&&clearInterval(this.timer)}),1e3)})):this.$refs.registerForm.validateField("email")},onRegister(){this.$refs.registerForm.validate((async e=>{if(e){const e={lang:this.form.lang,email:this.form.email,password:this.form.password,code:this.form.code};(0,y.FP)(e,{app:this.app}).then((()=>{this.success=!0})).catch((()=>{this.success=!1}))}}))},goLogin(){location.href=this.loginLink},onBack(){this.success=null},changeLang(e){this.form.lang=e}}},L=t(3744);const U=(0,L.Z)(C,[["render",$]]);var V=U,q=t(650),F={name:"AccountEmailRegister",components:{register:V,Footer:q.Z},data(){return{app:""}},computed:{loginLink(){const e=this.$router.resolve({name:"email-login"});return e.href}},mounted(){const e=new URLSearchParams(document.location.search);e.has("app")?this.app=e.get("app"):this.app="miipet"}};const S=(0,L.Z)(F,[["render",o]]);var D=S},1814:function(e){e.exports=JSON.parse('{"S":"https://cdn.iruxu.com","v":"https://uc.iruxu.com"}')}}]);
//# sourceMappingURL=570.9a583bc0.js.map