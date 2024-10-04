import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

export const apps = [
    {
        value: "",
        label: t("notification.message.all"),
        key: "all",
    },
    {
        value: "miipet",
        label: t("common.app.miipet"),
        key: "miipet",
    },
    {
        value: "2kog",
        label: t("common.app.2kog"),
        key: "2kog",
    },
];
