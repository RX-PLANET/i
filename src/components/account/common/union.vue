<template>
    <div class="m-account-union">
        <div class="m-account-union__header">
            <span
                ><el-icon><Star /></el-icon
            ></span>
        </div>
        <div class="m-account-union__content">
            <a class="m-account-union__item m-account-union__item--wechat" :href="getUnionLink('/user/union/wesite/')">
                <img class="u-icon" src="@/assets/img/union/wechat.svg" />
                <span class="u-label">微信</span>
            </a>
        </div>
    </div>
</template>

<script>
import User from "@iruxu/rx-common/utils/user";
import GlobalData from "@iruxu/rx-common/data/global.json";
export default {
    name: "AccountUnion",
    props: ["mode"],
    components: {},
    data: function () {
        return {
            uc: GlobalData.__uc + "/api/uc",
        };
    },
    computed: {
        app() {
            return this.$store.state.app;
        },
        lang() {
            let lang = User.getLocale();
            return lang === "zh-CN" ? "cn" : "en";
        },
        unionLinkSuffix() {
            return "?app=" + this.app + "&lang=" + this.lang;
        },
    },
    watch: {},
    methods: {
        getUnionLink(path) {
            return this.uc + path + this.mode + this.unionLinkSuffix;
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
.m-account-union {
    margin-top: 20px;
}
.m-account-union__header {
    .x;
    .pr;
    &:before {
        content: "";
        display: block;
        width: 100%;
        border-bottom: 1px solid #eee;
        top: 50%;
        left: 0;
        .pa;
    }
    .flex;
    justify-content: center;
    span {
        background-color: #fff;
        .pr;
        .z(2);
        padding: 0 10px;
        color: #cbcccd;
        .fz(16px);
        .db;
        .h(16px);
    }
    margin-bottom: 20px;
}
.m-account-union__item {
    .r(6px);
    .flex;
    align-items: center;
    height: 42px;
    .pointer;
}
.m-account-union__item--wechat {
    background-color: #00b30d;
    &:hover {
        background-color: lighten(#00b30d, 2%);
    }
    color: #fff;
    justify-content: center;

    .fz(12.2px);
    font-weight: bold;

    .u-icon {
        .size(18px);
        margin-right: 10px;
    }
}
</style>
