import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

import layout from "@/layouts/dashboard";

export default [
    {
        path: "/dashboard/setting",
        name: "setting",
        component: layout,
        redirect: {
            name: "dashboard-setting-user",
        },
        children: [
            {
                path: "user",
                name: "dashboard-setting-user",
                component: () => import("@/views/setting/user"),
                meta: {
                    title: t("common.routes.userTitle"),
                    desc: t("common.routes.userDesc"),
                },
                redirect: {
                    name: "dashboard-setting-info",
                },
                children: [
                    // 基本信息
                    {
                        path: "info",
                        name: "dashboard-setting-info",
                        component: () => import("@/views/setting/info"),
                        meta: {
                            title: t("common.routes.infoTitle"),
                            desc: t("common.routes.infoDesc"),
                            activeMenu: "dashboard-setting-user",
                        },
                    },
                    {
                        path: "profile",
                        name: "dashboard-setting-profile",
                        component: () => import("@/views/setting/profile"),
                        meta: {
                            title: t("common.routes.profileTitle"),
                            desc: t("common.routes.profileDesc"),
                            activeMenu: "dashboard-setting-user",
                        },
                    },
                ],
            },
            // 地址管理
            {
                path: "address",
                name: "dashboard-setting-address",
                component: () => import("@/views/setting/address"),
                meta: {
                    title: t("common.routes.addressTitle"),
                    desc: t("common.routes.addressDesc"),
                },
            },
        ],
    },
];
