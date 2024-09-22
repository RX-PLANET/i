import { createI18n } from "vue-i18n";
import User from "@/utils/user";

// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
import enUs from "./en-us";
import zhCn from "./zh-cn";
const lang = {
    "en-us": enUs,
    "zh-cn": zhCn,
};

// 2. Create i18n instance with options
const i18n = createI18n({
    locale: User.getLocale(), // set locale
    fallbackLocale: "en-us", // set fallback locale
    messages: lang, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
    warnHtmlInMessage: "off",
});

export { i18n };
