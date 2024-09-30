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
        redirect: {
            name: "dashboard-notification-message",
        },
        children: [
            {
                path: "notification/message",
                name: "dashboard-notification-message",
                component: () => import("@/views/dashboard/message"),
                meta: {
                    title: t("dashboard.message"),
                },
            },
            {
                path: "notification/bind",
                name: "dashboard-notification-bind",
                component: () => import("@/views/dashboard/bind"),
                meta: {
                    title: t("dashboard.bind"),
                },
            },
        ],
    },
];
