import Icon from "@/components/common/icon.vue";

const requireContext = require.context("@/assets/img/icon", false, /\.svg$/);
requireContext.keys().forEach(requireContext);

export default function install(app) {
    app.component("svgIcon", Icon);
}
