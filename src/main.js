// 1.Create APP
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 2.Components
import { createHead } from "@vueuse/head";
const head = createHead();
app.use(head);

import router from "./router/index";
app.use(router);

import store from "./store/index";
app.use(store);

require(`./assets/css/common/element.scss`);
import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
app.use(ElementPlus);
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// import Vue plugin
import VueSvgInlinePlugin from "vue-svg-inline-plugin";

// import polyfills for IE if you want to support it
import "vue-svg-inline-plugin/src/polyfills";

// use Vue plugin with options
app.use(VueSvgInlinePlugin, {
    attributes: {
        data: ["src"],
        remove: ["alt"],
    },
});

// global components
import cardHeader from "./components/common/card-header.vue";
app.component("card-header", cardHeader);
import Logo from "./components/common/logo.vue";
app.component("logo", Logo);
import langSelect from "@iruxu/pkg-widget/src/components/common/lang-select.vue";
app.component("lang-select", langSelect);
import phoneCodeSelect from "@iruxu/pkg-widget/src/components/common/phone-code-select.vue";
app.component("phone-code-select", phoneCodeSelect);

import { i18n } from "@/locale";
app.use(i18n);

// 3.Mount DOM
app.mount("#app");
