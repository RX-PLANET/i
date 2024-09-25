import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

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
                    title: t("common.dashboard"),
                },
            },
            {
                path: "notification/message",
                name: "dashboard-notification-message",
                component: () => import("@/views/dashboard/message"),
                meta: {
                    title: t("dashboard.message"),
                },
            },
        ],
    },
];
