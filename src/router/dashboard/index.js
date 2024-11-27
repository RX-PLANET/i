import { filter, flatten } from "lodash";

const files = require.context("./", true, /\.js$/);
const routesModules = files.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = files(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

export default [
    ...flatten(
        filter(routesModules, (module) => {
            return module;
        })
    ),
];
