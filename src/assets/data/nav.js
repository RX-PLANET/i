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
                title: t("dashboard.email"),
                route: "/dashboard/notification/email",
                routeName: "dashboard-notification-email",
            },
            {
                title: t("dashboard.phone"),
                route: "/dashboard/notification/phone",
                routeName: "dashboard-notification-phone",
            },
        ],
    },
];

export default data;
