const files = require.context("./", true, /\.js$/);

// 读取locale文件夹下的所有js文件 除开index.js
const modules = files.keys().reduce((modules, modulePath) => {
    if (modulePath === "./index.js") return modules;
    const value = files(modulePath);
    modules[modulePath.replace(/(\.\/|\.js)/g, "")] = value.default;
    return modules;
}, {});

export default modules;
