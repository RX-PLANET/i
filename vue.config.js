const path = require("path");
const project = require("./project.json");
module.exports = {
    //❤️ Multiple pages ~
    // pages: {
    //     index: {
    //         title: "Home",
    //         entry: "src/main.js",
    //         template: "public/index.html",
    //         filename: "index.html",
    //     },
    //     $project: {
    //         title: "Project",
    //         entry: "src/core/$project/index.js",
    //         template: "public/$project/index.html",
    //         filename: "$project/index.html",
    //     },
    // },

    //⚛️ Proxy ~
    devServer: {
        proxy: {
            // "/api/cms": {
            //     target: process.env["DEV_SERVER"] == "true" ? "localhost" : "remote",
            // },
        },
        port: 20008,
    },

    //❤️ define path for static files ~
    publicPath: process.env.NODE_ENV === "development" ? "/" : process.env.STATIC_PATH,

    //❤️ Webpack configuration
    chainWebpack: (config) => {
        //💘 html-webpack-plugin ~
        // Multiple pages disable the block below
        config.plugin("html").tap((args) => {
            args[0].meta = {
                //------设置SEO信息
                Keywords: project.keys,
                Description: project.desc,
            };
            args[0].title = project.title; //------自动添加标题后缀
            return args;
        });

        config.plugin("define").tap((definitions) => {
            Object.assign(definitions[0], {
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
            });

            return definitions;
        });

        //💝 in-line small imgs ~
        config.module.rule("images").set("parser", {
            dataUrlCondition: {
                maxSize: 4 * 1024, // 4KiB
            },
        });

        //💝 in-line svg imgs ~
        config.module.rule("vue").use("vue-svg-inline-loader").loader("vue-svg-inline-loader");

        //💖 import common less var * mixin ~
        const types = ["vue-modules", "vue", "normal-modules", "normal"];
        types.forEach((type) => addStyleResource(config.module.rule("less").oneOf(type)));
    },
};

function addStyleResource(rule) {
    var preload_styles = [];
    preload_styles.push(
        path.resolve(__dirname, "./node_modules/csslab/base.less"),
        path.resolve(__dirname, "./src/assets/css/var.less"),
        path.resolve(__dirname, "./src/assets/css/mixin.less")
    );
    rule.use("style-resource").loader("style-resources-loader").options({
        patterns: preload_styles,
    });
}