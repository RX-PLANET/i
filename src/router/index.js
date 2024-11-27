// 1.Dependency
import {
    createRouter,
    createWebHistory,
    // createWebHashHistory,
} from "vue-router";
import { filter, flatten } from "lodash";
import User from "@iruxu/rx-common/utils/user.js";

// 2.Routes
const files = require.context("./", true, /\.js$/);
const routesModules = files.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = files(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});
import dashboard from "./dashboard/index.js";

export const constantRoutes = [
    {
        name: "index",
        path: "/",
        redirect: "/dashboard",
        beforeEnter: () => {
            if (User.isLogin()) {
                return "/dashboard";
            }
        },
    },
    ...flatten(
        filter(routesModules, (module) => {
            return module;
        })
    ),
    ...dashboard,
];

// 3.Build An Instance
const router = createRouter({
    // history: createWebHashHistory(), //hash
    history: createWebHistory(), //history api
    // base : '/rewrite root',
    routes: constantRoutes,
});

// 5.Global Guard
router.beforeEach((to, from, next) => {
    // Set Title
    document.title = to.meta.title || "User Center";
    next();
});

export default router;
