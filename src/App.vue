<template>
    <router-view />
</template>

<script>
import User from "@iruxu/pkg-common/utils/user";
export default {
    name: "App",
    props: [],
    components: {},
    data: function () {
        return {};
    },
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {
        if (User.isLogin()) {
            this.$store.dispatch("getProfile").then((res) => {
                if (res.lang && User.getLocale() !== res.lang) {
                    User.setLocale(res.lang);
                    location.reload();
                } else if (!res.lang && User.getLocale() !== "en-US") {
                    User.setLocale("en-US");
                    location.reload();
                }
            });
        }
    },
};
</script>

<style lang="less">
@import "@/assets/css/app.less";
</style>
