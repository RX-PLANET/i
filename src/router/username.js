const DefaultLayout = () => import("@/layouts/default.vue");
const UsernameLogin = () => import("../views/account/username/login.vue");
const UsernameRegister = () => import("../views/account/username/register.vue");

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
                    title: "登录 - 用户名登录",
                },
            },
            {
                path: "register",
                name: "username-register",
                component: UsernameRegister,
                meta: {
                    title: "注册 - 用户名注册",
                },
            },
        ],
    },
];
