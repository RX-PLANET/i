import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

export const levels = [
    { value: "", label: t("notification.message.all") },
    { value: "3", label: t("notification.message.toolbar.urgent") },
    { value: "2", label: t("notification.message.toolbar.important") },
    { value: "1", label: t("notification.message.toolbar.normal") },
];

export const statusList = [
    { value: "", label: t("notification.message.all") },
    { value: "0", label: t("notification.message.toolbar.unread") },
    { value: "1", label: t("notification.message.toolbar.read") },
];
