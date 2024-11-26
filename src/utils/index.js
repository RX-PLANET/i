import { ElNotification } from "element-plus";
import GlobalConf from "@iruxu/rx-common/data/global.json";
import RxTime from "@iruxu/rx-common/utils/rx-time";
const timeInstance = new RxTime();

export function formatDate(value, mode = "date") {
    if (value) {
        if (mode === "date") {
            return timeInstance.format(value, "YYYY-MM-DD");
        }
        if (mode === "time") {
            return timeInstance.format(value, "HH:mm:ss");
        }
        if (mode === "hour") {
            return timeInstance.format(value, "HH:mm");
        }
        if (mode === "datetime") {
            return timeInstance.format(value, "YYYY-MM-DD HH:mm:ss");
        }
    }
}

// 时间转换
export function formatTime(time, format = "YYYY-MM-DD HH:mm:ss") {
    const _time = new Date(time);
    return timeInstance.format(_time, format);
}

/**
 * 头像地址
 * @param {*} url
 */
export function avatarUrl(url) {
    if (url) {
        if (url.startsWith("http")) {
            return url;
        }
        return GlobalConf.__defaultCDN + "/" + url;
    }
    return require("../assets/img/logo/logo.svg");
}

/**
 * 去除对象空值
 * @param {*} obj
 * @returns
 */
export function removeEmpty(obj) {
    const newObj = {};
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

/**
 * 复制文本
 */
export function copyText(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        ElNotification({
            title: "复制成功",
            message: text,
            type: "success",
        });
    } else {
        const input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        ElNotification({
            title: "复制成功",
            message: text,
            type: "success",
        });
    }
}

// params 不确定的对象
export function removeEmptyParams(params) {
    const newParams = {};
    for (const key in params) {
        if (params[key] !== undefined && params[key] !== "") {
            newParams[key] = params[key];
        }
    }
    return newParams;
}

// 数组转tree
export function array2Tree(array, params = { parentKey: "parent_id", parentValue: 0, childrenKey: "children" }) {
    const tree = [];
    // 在数组中查找具有指定父ID的所有子项
    for (let i = 0; i < array.length; i++) {
        if (~~array[i][params.parentKey] === ~~params.parentValue) {
            // 递归调用，将子项转换为子树
            const children = array2Tree(array, { ...params, parentValue: array[i].id });

            if (children.length) {
                array[i][params.childrenKey] = children;
            }

            tree.push(array[i]);
        }
    }

    return tree;
}

// 多字段排序
export function sortBy(filed1, filed2) {
    return function (a, b) {
        if (a[filed1] === b[filed1]) {
            return a[filed2].localeCompare(b[filed2]);
        }
        return a[filed1].localeCompare(b[filed1]);
    };
}

// 导出csv
export function exportCsv(list, titles = []) {
    if (!titles.length) return list;
    const keys = titles.map((item) => item.key);
    const labels = titles.map((item) => item.label);
    const mapList = [];
    list.forEach((item) => {
        const newItem = [];
        keys.forEach((key) => {
            newItem.push(item[key]);
        });
        mapList.push(newItem.join(","));
    });
    mapList.unshift(labels.join(","));
    return mapList.join("\r\n");
}

// 导出xlsx
export function exportXlsx(list, titles = []) {
    if (!titles.length) return list;
    const keys = titles.map((item) => item.key);
    const labels = titles.map((item) => item.label);
    const mapList = [];
    list.forEach((item) => {
        const newItem = [];
        keys.forEach((key) => {
            newItem.push(item[key]);
        });
        mapList.push(newItem);
    });
    mapList.unshift(labels);
    return mapList;
}

// 是否只保留remainKey
export function arr2map({ array = [], key = "key", remainKey = "" } = {}) {
    if (
        !array?.length ||
        !array.every((item) => key in item) ||
        (remainKey && !array.every((item) => remainKey in item))
    ) {
        console.log("【参数错误】", array, key, remainKey);
        return {};
    }
    return array.reduce((acc, cur) => {
        return { ...acc, [cur[key]]: remainKey ? cur[remainKey] : cur };
    }, {});
}

export function map2arr(map) {
    return Object.entries(map).map(([key, value]) => {
        return {
            name: value,
            key: key,
        };
    });
}
