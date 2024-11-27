import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

const data = [
    {
        title: t("notification.nav.index"),
        icon: "message", // 对应地址 @assets/img/icon/message.svg
        children: [
            {
                title: t("notification.nav.message"),
                route: "/dashboard/notification/message",
                routeName: "dashboard-notification-message",
            },
            {
                title: t("notification.nav.email"),
                route: "/dashboard/notification/email",
                routeName: "dashboard-notification-email",
            },
            {
                title: t("notification.nav.phone"),
                route: "/dashboard/notification/phone",
                routeName: "dashboard-notification-phone",
            },
        ],
    },
    {
        title: t("security.nav.index"),
        icon: "lock",
        children: [
            {
                title: t("security.nav.log"),
                route: "/dashboard/security/log",
                routeName: "dashboard-security-log",
            },
            {
                title: t("security.nav.password"),
                route: "/dashboard/security/password",
                routeName: "dashboard-security-password",
            },
        ],
    },
];

export default data;
