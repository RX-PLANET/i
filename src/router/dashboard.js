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
            // TODO: 默认跳转到首页
            name: "dashboard-notification-message",
        },
        children: [
            // 通知中心
            {
                path: "notification/message",
                name: "dashboard-notification-message",
                component: () => import("@/views/notification/message"),
                meta: {
                    title: t("notification.nav.message"),
                },
            },
            {
                path: "notification/message-detail/:id(\\d+)?",
                name: "dashboard-notification-message-detail",
                component: () => import("@/views/notification/message-detail"),
                hidden: true,
                meta: {
                    title: t("notification.nav.message"),
                    activeMenu: "/dashboard/notification/message",
                },
            },
            {
                path: "notification/email",
                name: "dashboard-notification-email",
                component: () => import("@/views/notification/bind-email.vue"),
                meta: {
                    title: t("notification.nav.email"),
                },
            },
            {
                path: "notification/phone",
                name: "dashboard-notification-phone",
                component: () => import("@/views/notification/bind-phone.vue"),
                meta: {
                    title: t("notification.nav.phone"),
                },
            },

            // TODO:接入discord或slack等
        ],
    },
];
