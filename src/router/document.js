import { i18n } from "@/locale";

const DocumentTerms = () => import("@/views/document/terms.vue");

const {
    global: { t },
} = i18n;

const DefaultLayout = () => import("@/layouts/default.vue");

export default [
    {
        path: "/document",
        name: "document",
        component: DefaultLayout,
        children: [
            // 服务条款
            {
                path: "terms",
                name: "document-terms",
                component: DocumentTerms,
                meta: {
                    title: t("common.routes.termsTitle"),
                },
            },
        ],
    },
];
