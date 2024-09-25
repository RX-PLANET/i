const DefaultLayout = () => import("@/layouts/default.vue");
const UsernameLogin = () => import("../views/account/username/login.vue");
const UsernameRegister = () => import("../views/account/username/register.vue");

import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

export default [
    {
        path: "/account/username",
        component: DefaultLayout,
        redirect: {
            name: "username-login",
        },
        children: [
            {
                path: "login",
                name: "username-login",
                component: UsernameLogin,
                meta: {
                    title: t("common.usernameLogin"),
                },
            },
            {
                path: "register",
                name: "username-register",
                component: UsernameRegister,
                meta: {
                    title: t("common.usernameRegister"),
                },
            },
        ],
    },
];
