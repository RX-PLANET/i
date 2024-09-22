const DefaultLayout = () => import("@/layouts/default.vue");
const EmailRegister = () => import("@/views/account/email/register.vue");
const EmailLogin = () => import("@/views/account/email/login.vue");
const EmailRegisterCallback = () => import("@/views/account/email/callback-register.vue");
const EmailResetPassword = () => import("@/views/account/email/reset-password.vue");

export default [
    {
        path: "/account/email",
        component: DefaultLayout,
        redirect: {
            name: "email-login",
        },
        children: [
            {
                path: "register",
                name: "email-register",
                component: EmailRegister,
                meta: {
                    title: "注册 - 邮箱注册",
                },
            },
            {
                path: "callback-register",
                name: "email-register-callback",
                component: EmailRegisterCallback,
                meta: {
                    title: "注册 - 邮箱激活",
                },
            },
            {
                path: "login",
                name: "email-login",
                component: EmailLogin,
                meta: {
                    title: "登录 - 邮箱登录",
                },
            },
            {
                path: "reset-password",
                name: "email-reset-password",
                component: EmailResetPassword,
                meta: {
                    title: "重置密码 - 邮箱重置",
                },
            },
        ],
    },
];
