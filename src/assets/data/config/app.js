import { i18n } from "@/locale";

const {
    global: { t },
} = i18n;

export const apps = [
    {
        value: "",
        label: t("message.all"),
    },
    {
        value: "miipet",
        label: t("message.app.miipet"),
    },
    {
        value: "2kog",
        label: t("message.app.2kog"),
    },
];
