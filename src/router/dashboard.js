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
                path: "notification/message-detail/:id(\\d+)?",
                name: "dashboard-notification-message-detail",
                component: () => import("@/views/dashboard/message-detail"),
                hidden: true,
                meta: {
                    title: t("dashboard.message"),
                    activeMenu: "/dashboard/notification/message",
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

            // TODO:接入discord或slack等
        ],
    },
];
