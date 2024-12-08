import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

const data = [
    {
        title: t("setting.nav.index"),
        icon: "user",
        children: [
            {
                title: t("setting.nav.user"),
                route: "/dashboard/setting/user",
                routeName: "dashboard-setting-user",
            },
            {
                title: t("setting.nav.address"),
                route: "/dashboard/setting/address",
                routeName: "dashboard-setting-address",
            },
        ],
    },
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
                title: t("security.nav.password"),
                route: "/dashboard/security/password",
                routeName: "dashboard-security-password",
            },
            {
                title: t("security.nav.device"),
                route: "/dashboard/security/device",
                routeName: "dashboard-security-device",
            },
            {
                title: t("security.nav.log"),
                route: "/dashboard/security/log",
                routeName: "dashboard-security-log",
            },
            {
                title: t("security.nav.destroy"),
                route: "/dashboard/security/destroy",
                routeName: "dashboard-security-destroy",
            },
        ],
    },
];

export default data;
