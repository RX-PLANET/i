// 1.Dependency
import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
} from "vue-router";

// 2.Components
const Index = () => import("../views/Index.vue");
const Login = () => import("../views/Login.vue");
const Signup = () => import("../views/Signup.vue");

// 3.Routes
const routes = [
    { path: "/", component: Index },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
];

// 4.Build An Instance
const router = createRouter({
    history: createWebHashHistory(), //hash
    // history: createWebHistory(),  //history api
    // base : '/rewrite root',
    routes,
});

export default router;
