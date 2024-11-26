import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

export const types = [
    { value: "login", label: t("security.log.type.login") },
    { value: "account", label: t("security.log.type.account") },
    { value: "action", label: t("security.log.type.action") },
];

export const statusList = [
    { value: "", label: t("security.log.status.all") },
    { value: 1, label: t("security.log.status.success") },
    { value: 0, label: t("security.log.status.fail") },
];
