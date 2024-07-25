// 1.Dependency
import {
    createRouter,
    createWebHistory,
    // createWebHashHistory,
} from "vue-router";

// 2.Components
const Index = () => import("../views/Index.vue");
const UsernameLogin = () => import("../views/account/username/login.vue");
const UsernameRegister = () => import("../views/account/username/register.vue");
const EmailRegister = () => import("../views/account/email/register.vue");
const EmailLogin = () => import("../views/account/email/login.vue");
const EmailRegisterCallback = () => import("../views/account/email/callback-register.vue");
const EmailResetPassword = () => import("../views/account/email/reset-password.vue");

// 3.Routes
const routes = [
    { path: "/", component: Index },
    {
        path: "/account/username/login",
        name: "username-login",
        component: UsernameLogin,
        meta: {
            title: "登录 - 用户名登录",
        },
    },
    {
        path: "/account/username/register",
        name: "username-register",
        component: UsernameRegister,
        meta: {
            title: "注册 - 用户名注册",
        },
    },
    {
        path: "/account/email/register",
        name: "email-register",
        component: EmailRegister,
        meta: {
            title: "注册 - 邮箱注册",
        },
    },
    {
        path: "/account/email/callback-register",
        name: "email-register-callback",
        component: EmailRegisterCallback,
        meta: {
            title: "注册 - 邮箱激活",
        },
    },
    {
        path: "/account/email/login",
        name: "email-login",
        component: EmailLogin,
        meta: {
            title: "登录 - 邮箱登录",
        },
    },
    {
        path: "/account/email/reset-password",
        name: "email-reset-password",
        component: EmailResetPassword,
        meta: {
            title: "重置密码 - 邮箱重置",
        },
    },
];

// 4.Build An Instance
const router = createRouter({
    // history: createWebHashHistory(), //hash
    history: createWebHistory(), //history api
    // base : '/rewrite root',
    routes,
});

// 5.Global Guard
router.beforeEach((to, from, next) => {
    // Set Title
    document.title = to.meta.title || "Mii";
    next();
});

export default router;
