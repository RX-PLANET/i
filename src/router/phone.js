const DefaultLayout = () => import("@/layouts/default.vue");
const PhoneRegister = () => import("@/views/account/phone/register.vue");
const PhoneLogin = () => import("@/views/account/phone/login.vue");
const PhoneCodeLogin = () => import("@/views/account/phone/code-login.vue");
const PhoneResetPassword = () => import("@/views/account/phone/reset-password.vue");
import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

export default [
    {
        path: "/account/phone",
        component: DefaultLayout,
        redirect: {
            name: "phone-login",
        },
        children: [
            {
                path: "register",
                name: "phone-register",
                component: PhoneRegister,
                meta: {
                    title: t("common.phoneRegister"),
                },
            },
            {
                path: "login/code",
                name: "phone-code-login",
                component: PhoneCodeLogin,
                meta: {
                    title: t("common.phoneCodeLogin"),
                },
            },
            {
                path: "login",
                name: "phone-login",
                component: PhoneLogin,
                meta: {
                    title: t("common.phoneLogin"),
                },
            },
            {
                path: "reset-password",
                name: "phone-reset-password",
                component: PhoneResetPassword,
                meta: {
                    title: t("common.phoneResetPassword"),
                },
            },
        ],
    },
];
