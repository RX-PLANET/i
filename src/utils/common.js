// 获取文档标题
const { Title } = require("@/settings");

export function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${Title}`;
    }
    return Title || "Admin";
}
