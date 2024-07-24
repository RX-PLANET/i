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
    { path: "/account/username/login", component: UsernameLogin },
    { path: "/account/username/register", component: UsernameRegister },
];

// 4.Build An Instance
const router = createRouter({
    history: createWebHashHistory(), //hash
    // history: createWebHistory(),  //history api
    // base : '/rewrite root',
    routes,
});

export default router;
