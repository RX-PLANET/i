"use strict";(self["webpackChunki"]=self["webpackChunki"]||[]).push([[139],{2208:function(e,o,r){r.d(o,{CD:function(){return s},Cs:function(){return i},Je:function(){return u},UP:function(){return l},aH:function(){return t},fD:function(){return c},tW:function(){return a}});var n=r(6102);async function t(e){return(0,n.VM)().get("/api/uc/user/account/phone/valid",{params:{phone:e}}).then((e=>{var o;return null===(o=e.data.data)||void 0===o?void 0:o.isExist}))}function s(e,o){return(0,n.VM)().post("/api/uc/user/account/phone/register",e,{params:o})}async function a(e){return(0,n.VM)().get("/api/uc/user/account/phone/check-code",{params:e})}function c(e,o){return(0,n.VM)().post("/api/uc/user/account/phone/active",e,{params:o})}function i(e,o){return(0,n.VM)().post("/api/uc/user/account/phone/login",e,{params:o})}function l(e,o){return(0,n.VM)().post("/api/uc/user/account/phone/login/code-send",e,{params:o})}function u(e,o){return(0,n.VM)().post("/api/uc/user/account/phone/login/code-verify",e,{params:o})}},650:function(e,o,r){r.d(o,{Z:function(){return l}});var n=r(6252);const t={class:"m-footer"};function s(e,o,r,s,a,c){return(0,n.wg)(),(0,n.iD)("footer",t,"© RX-PLANET")}var a={name:"RX-Footer",props:[],components:{},data:function(){return{}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){}},c=r(3744);const i=(0,c.Z)(a,[["render",s]]);var l=i},3139:function(e,o,r){r.r(o),r.d(o,{default:function(){return P}});var n=r(6252);const t={class:"p-account p-account-email p-account-email--register"},s={class:"m-register"};function a(e,o,r,a,c,i){const l=(0,n.up)("logo"),u=(0,n.up)("register",!0),m=(0,n.up)("el-row"),d=(0,n.up)("Footer");return(0,n.wg)(),(0,n.iD)("div",t,[(0,n.Wm)(m,{class:"m-container",justify:"center"},{default:(0,n.w5)((()=>[(0,n._)("div",s,[(0,n.Wm)(l,{app:c.app},null,8,["app"]),(0,n.Wm)(u,{app:c.app,loginLink:i.loginLink},null,8,["app","loginLink"])])])),_:1}),(0,n.Wm)(d)])}var c=r(3577);const i={class:"m-card m-register-card"},l={key:0,class:"m-card-main"},u={class:"m-card-form-label"},m={class:"m-card-form-value"},d={class:"m-card-form-label"},p={key:0},h={class:"m-card-form-label"},g={class:"m-card-form-label"},f={class:"u-terms"},w=["href"],k={key:1,class:"m-card-main"},b={key:2,class:"m-card-main"},v={class:"m-footer"},$={class:"m-footer-skip"},_=["href"];function C(e,o,r,t,s,a){const C=(0,n.up)("lang-select"),V=(0,n.up)("card-header"),W=(0,n.up)("phone-code-select"),y=(0,n.up)("el-input"),z=(0,n.up)("el-form-item"),U=(0,n.up)("el-button"),L=(0,n.up)("el-form"),D=(0,n.up)("el-checkbox"),q=(0,n.up)("el-alert");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",i,[(0,n.Wm)(V,{title:e.$t("account.common.register")},{right:(0,n.w5)((()=>[(0,n.Wm)(C,{lang:s.form.lang,onChange:a.changeLang},null,8,["lang","onChange"])])),_:1},8,["title"]),null===s.success?((0,n.wg)(),(0,n.iD)("div",l,[(0,n.Wm)(L,{class:"m-card-form","hide-required-asterisk":"",ref:"registerForm",model:s.form,rules:s.rules,size:"large","status-icon":"","label-position":"top"},{default:(0,n.w5)((()=>[(0,n.Wm)(z,{prop:"phone"},{label:(0,n.w5)((()=>[(0,n._)("div",u,[(0,n._)("span",null,[(0,n.Uk)((0,c.zw)(e.$t("account.phone.number")),1),o[6]||(o[6]=(0,n._)("i",{class:"is-required"},"*",-1))])])])),default:(0,n.w5)((()=>[(0,n._)("div",m,[(0,n.Wm)(W,{modelValue:s.phoneCode,"onUpdate:modelValue":o[0]||(o[0]=e=>s.phoneCode=e),size:"large"},null,8,["modelValue"]),(0,n.Wm)(y,{modelValue:s.form.phone,"onUpdate:modelValue":o[1]||(o[1]=e=>s.form.phone=e),modelModifiers:{trim:!0},size:"large"},null,8,["modelValue"])])])),_:1}),(0,n.Wm)(z,{prop:"code",class:"u-code"},{label:(0,n.w5)((()=>[(0,n._)("div",d,[(0,n._)("span",null,[(0,n.Uk)((0,c.zw)(e.$t("account.phone.code")),1),o[7]||(o[7]=(0,n._)("i",{class:"is-required"},"*",-1))])])])),default:(0,n.w5)((()=>[(0,n.Wm)(y,{modelValue:s.form.code,"onUpdate:modelValue":o[2]||(o[2]=e=>s.form.code=e),modelModifiers:{trim:!0},size:"large"},null,8,["modelValue"]),(0,n.Wm)(U,{class:"u-btn-send",size:"small",onClick:a.senCode,disabled:s.interval>0||!s.phoneChecked},{default:(0,n.w5)((()=>[(0,n.Uk)((0,c.zw)(e.$t("account.phone.send")),1),s.interval?((0,n.wg)(),(0,n.iD)("span",p,"("+(0,c.zw)(s.interval)+"s)",1)):(0,n.kq)("",!0)])),_:1},8,["onClick","disabled"])])),_:1}),(0,n.Wm)(z,{prop:"password",class:"m-password"},{label:(0,n.w5)((()=>[(0,n._)("div",h,[(0,n._)("span",null,[(0,n.Uk)((0,c.zw)(e.$t("account.common.password")),1),o[8]||(o[8]=(0,n._)("i",{class:"is-required"},"*",-1))])])])),default:(0,n.w5)((()=>[(0,n.Wm)(y,{modelValue:s.form.password,"onUpdate:modelValue":o[3]||(o[3]=e=>s.form.password=e),modelModifiers:{trim:!0},type:"password",size:"large","show-password":""},null,8,["modelValue"])])),_:1}),(0,n.Wm)(z,{prop:"password1",class:"m-password"},{label:(0,n.w5)((()=>[(0,n._)("div",g,[(0,n._)("span",null,[(0,n.Uk)((0,c.zw)(e.$t("account.common.passwordConfirm")),1),o[9]||(o[9]=(0,n._)("i",{class:"is-required"},"*",-1))])])])),default:(0,n.w5)((()=>[(0,n.Wm)(y,{modelValue:s.form.password1,"onUpdate:modelValue":o[4]||(o[4]=e=>s.form.password1=e),modelModifiers:{trim:!0},type:"password",size:"large","show-password":""},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules"]),(0,n._)("div",f,[(0,n.Wm)(D,{modelValue:s.agreement,"onUpdate:modelValue":o[5]||(o[5]=e=>s.agreement=e),class:"u-checkbox"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,c.zw)(e.$t("account.common.read"))+" ",1),(0,n._)("a",{href:s.terms,target:"_blank"},"《"+(0,c.zw)(e.$t("account.common.terms"))+"》 ",9,w)])),_:1},8,["modelValue"])]),(0,n.Wm)(U,{class:"u-btn u-submit",type:"primary",disabled:!a.canSubmit,onClick:a.onRegister},{default:(0,n.w5)((()=>[(0,n.Uk)((0,c.zw)(e.$t("account.common.register")),1)])),_:1},8,["disabled","onClick"])])):(0,n.kq)("",!0),1==s.success?((0,n.wg)(),(0,n.iD)("main",k,[(0,n.Wm)(q,{class:"m-alert",title:e.$t("account.phone.registerSuccess"),type:"success",description:e.$t("account.phone.registerSuccessDesc"),"show-icon":"",closable:!1},null,8,["title","description"]),(0,n.Wm)(U,{size:"large",class:"u-btn u-back",type:"primary",onClick:a.goLogin},{default:(0,n.w5)((()=>[(0,n.Uk)((0,c.zw)(e.$t("account.common.login")),1)])),_:1},8,["onClick"])])):(0,n.kq)("",!0),0==s.success?((0,n.wg)(),(0,n.iD)("main",b,[(0,n.Wm)(q,{class:"m-alert",title:e.$t("account.phone.registerFailed"),type:"error",description:e.$t("account.phone.registerFailedDesc"),"show-icon":"",closable:!1},null,8,["title","description"]),(0,n.Wm)(U,{size:"large",class:"u-btn u-back",type:"primary",onClick:a.onBack},{default:(0,n.w5)((()=>[(0,n.Uk)((0,c.zw)(e.$t("account.common.back")),1)])),_:1},8,["onClick"])])):(0,n.kq)("",!0)]),(0,n._)("div",v,[(0,n._)("div",$,[(0,n.Uk)((0,c.zw)(e.$t("account.common.hadAccount"))+" ",1),(0,n._)("a",{class:"u-link",href:r.loginLink},(0,c.zw)(e.$t("account.common.login"))+" »",9,_)])])],64)}var V=r(2208),W=r(9158),y=r(9709),z={name:"PhoneRegister",props:{app:{type:String,default:""},loginLink:{type:String,default:""}},data(){return{form:{phone:"",password:"",password1:"",lang:"",code:""},phoneCode:86,rules:{phone:[{required:!0,message:this.$t("account.phone.numberPlaceholder"),trigger:"blur"},{validator:(e,o,r)=>{const n=`+${this.phoneCode}${o}`,t=(0,y.S)(n);t||(this.phoneChecked=!1,r(new Error(this.$t("account.phone.numberPlaceholder")))),t.isValid()?(this.phoneChecked=!0,r()):r(new Error(this.$t("account.phone.numberError")))},trigger:"blur"},{validator:this.check,trigger:"blur"}],password:[{required:!0,message:this.$t("account.common.passwordPlaceholder"),trigger:"blur"},{min:6,max:30,message:this.$t("account.common.passwordError"),trigger:"blur"}],password1:[{required:!0,message:this.$t("account.common.password2Placeholder"),trigger:"blur"},{min:6,max:30,message:this.$t("account.common.passwordError"),trigger:"blur"},{validator:(e,o,r)=>{o!==this.form.password?r(new Error(this.$t("account.common.passwordError2"))):r()},trigger:"blur"}]},agreement:!1,success:null,phoneChecked:!1,terms:"/document/terms",interval:0,timer:null}},computed:{canSubmit(){return this.phoneChecked&&this.agreement&&this.form.password&&this.form.code}},mounted(){W.Z.generateFingerprint(),this.form.lang=W.Z.getLocale()},methods:{async check(e,o,r){if(o){const e=`+${this.phoneCode}${o}`,n=await(0,V.aH)(e);if(n)return void r(new Error(this.$t("account.phone.numberError")));this.phoneChecked=!0,r()}else this.phoneChecked=!1,r(new Error(this.$t("account.phone.numberPlaceholder")))},senCode(){if(!this.form.phone)return;const e=`+${this.phoneCode}${this.form.phone}`;(0,V.CD)({phone:e},{app:this.app}).then((()=>{this.$message.success(this.$t("account.phone.sendSuccess")),this.interval=60,this.timer=setInterval((()=>{this.interval--,this.interval<=0&&clearInterval(this.timer)}),1e3)}))},onRegister(){this.$refs.registerForm.validate((async e=>{if(e){const e=`+${this.phoneCode}${this.form.phone}`;(0,V.tW)({phone:e,code:this.form.code}).then((()=>{const o={lang:this.form.lang,phone:e,password:this.form.password,code:this.form.code};(0,V.fD)(o,{app:this.app}).then((()=>{this.success=!0})).catch((()=>{this.success=!1}))}))}}))},goLogin(){location.href=this.loginLink},onBack(){this.success=null},changeLang(e){this.form.lang=e}}},U=r(3744);const L=(0,U.Z)(z,[["render",C]]);var D=L,q=r(650),E={name:"AccountPhoneRegister",components:{register:D,Footer:q.Z},data(){return{app:""}},computed:{loginLink(){const e=this.$router.resolve({name:"phone-login"});return e.href}},mounted(){const e=new URLSearchParams(document.location.search);e.has("app")?this.app=e.get("app"):this.app="miipet"}};const M=(0,U.Z)(E,[["render",a]]);var P=M}}]);
//# sourceMappingURL=139.aec581d1.js.map