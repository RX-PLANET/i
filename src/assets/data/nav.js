import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

const data = [
    {
        title: t("dashboard.notification"),
        icon: "message", // 对应地址 @assets/img/icon/message.svg
        children: [
            {
                title: t("dashboard.message"),
                route: "/dashboard/notification/message",
                routeName: "dashboard-notification-message",
            },
            {
                title: t("dashboard.bind"),
                route: "/dashboard/notification/bind",
                routeName: "dashboard-notification-bind",
            },
        ],
    },
];

export default data;
