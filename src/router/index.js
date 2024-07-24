// 1.Dependency
import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
} from "vue-router";

// 2.Components
const Index = () => import("../views/Index.vue");
const UsernameLogin = () => import("../views/account/username/login.vue");
const UsernameRegister = () => import("../views/account/username/register.vue");

// 3.Routes
const routes = [
    { path: "/", component: Index },
    {
        path: "/account/username/login",
        name: "username-login",
        component: UsernameLogin,
        meta: {
            title: "登录",
        },
    },
    {
        path: "/account/username/register",
        name: "username-register",
        component: UsernameRegister,
        meta: {
            title: "注册",
        },
    },
];

// 4.Build An Instance
const router = createRouter({
    history: createWebHashHistory(), //hash
    // history: createWebHistory(),  //history api
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
