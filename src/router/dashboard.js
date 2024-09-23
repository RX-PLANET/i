import layout from "@/layouts/dashboard";

export default [
    {
        path: "/dashboard",
        name: "dashboard",
        component: layout,
        redirect: "/dashboard/index",
        children: [
            {
                path: "index",
                name: "dashboard-index",
                component: () => import("@/views/dashboard/index"),
                meta: {
                    title: "个人中心",
                },
            },
        ],
    },
];
