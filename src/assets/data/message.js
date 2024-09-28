import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

export const levels = [
    { value: "3", label: t("message.toolbar.urgent") },
    { value: "2", label: t("message.toolbar.important") },
    { value: "1", label: t("message.toolbar.normal") },
    { value: "", label: t("message.all") },
];

export const statusList = [
    { value: "", label: t("message.all") },
    { value: "0", label: t("message.toolbar.unread") },
    { value: "1", label: t("message.toolbar.read") },
];
