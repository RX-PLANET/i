import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

import layout from "@/layouts/dashboard";

export default [
    {
        path: "/dashboard/profile",
        name: "profile",
        component: layout,
        redirect: {
            name: "dashboard-profile-address",
        },
        children: [
            // 地址管理
            {
                path: "address",
                name: "dashboard-profile-address",
                component: () => import("@/views/profile/address"),
                meta: {
                    title: t("common.routes.addressTitle"),
                    desc: t("common.routes.addressDesc"),
                },
            },
        ],
    },
];
