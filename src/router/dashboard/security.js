import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

import layout from "@/layouts/dashboard";

export default [
    {
        path: "/dashboard/security",
        name: "security",
        component: layout,
        redirect: {
            name: "dashboard-security-log",
        },
        children: [
            // 修改密码
            {
                path: "password",
                name: "dashboard-security-password",
                component: () => import("@/views/security/password"),
                meta: {
                    title: t("common.routes.passwordTitle"),
                    desc: t("common.routes.passwordDesc"),
                },
            },
            // 日志审计
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
