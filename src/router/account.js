const DefaultLayout = () => import("@/layouts/default.vue");

const EmailRegister = () => import("@/views/account/email/register.vue");
const EmailLogin = () => import("@/views/account/email/login.vue");
const EmailResetPassword = () => import("@/views/account/email/reset-password.vue");

const PhoneRegister = () => import("@/views/account/phone/register.vue");
const PhoneLogin = () => import("@/views/account/phone/login.vue");
const PhoneCodeLogin = () => import("@/views/account/phone/code-login.vue");
const PhoneResetPassword = () => import("@/views/account/phone/reset-password.vue");

const UsernameLogin = () => import("../views/account/username/login.vue");
const UsernameRegister = () => import("../views/account/username/register.vue");
import User from "@iruxu/rx-common/utils/user.js";

import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

export default [
    {
        path: "/account",
        component: DefaultLayout,
        children: [
            {
                path: "email/register",
                name: "email-register",
                component: EmailRegister,
                meta: {
                    title: t("common.routes.emailRegister"),
                },
            },
            {
                path: "email/login",
                name: "email-login",
                component: EmailLogin,
                beforeEnter: () => {
                    if (User.isLogin()) {
                        return "/dashboard";
                    }
                },
                meta: {
                    title: t("common.routes.emailLogin"),
                },
            },
            {
                path: "email/reset-password",
                name: "email-reset-password",
                component: EmailResetPassword,
                meta: {
                    title: t("common.routes.emailResetPassword"),
                },
            },

            {
                path: "phone/register",
                name: "phone-register",
                component: PhoneRegister,
                meta: {
                    title: t("common.routes.phoneRegister"),
                },
            },
            {
                path: "phone/login",
                name: "phone-login",
                component: PhoneLogin,
                beforeEnter: () => {
                    if (User.isLogin()) {
                        return "/dashboard";
                    }
                },
                meta: {
                    title: t("common.routes.phoneLogin"),
                },
            },
            {
                path: "phone/login/code",
                name: "phone-code-login",
                component: PhoneCodeLogin,
                meta: {
                    title: t("common.routes.phoneCodeLogin"),
                },
            },
            {
                path: "phone/reset-password",
                name: "phone-reset-password",
                component: PhoneResetPassword,
                meta: {
                    title: t("common.routes.phoneResetPassword"),
                },
            },

            {
                path: "username/login",
                name: "username-login",
                component: UsernameLogin,
                beforeEnter: () => {
                    if (User.isLogin()) {
                        return "/dashboard";
                    }
                },
                meta: {
                    title: t("common.routes.usernameLogin"),
                },
            },
            {
                path: "username/register",
                name: "username-register",
                component: UsernameRegister,
                meta: {
                    title: t("common.routes.usernameRegister"),
                },
            },
        ],
    },
];
