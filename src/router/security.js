import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

import layout from "@/layouts/dashboard";

export default [
    {
        path: "/security",
        name: "security",
        component: layout,
        redirect: {
            name: "dashboard-security-log",
        },
        children: [
            // 安全中心
            {
                path: "log/:type(\\w+)?",
                name: "dashboard-security-log",
                component: () => import("@/views/security/log"),
                meta: {
                    title: t("common.routes.logTitle"),
                    desc: t("common.routes.logDesc"),
                },
            },
        ],
    },
];
