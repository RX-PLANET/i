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
    computed: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {
        if (User.isLogin()) {
            this.$store.dispatch("getProfile");
        }
    },
};
</script>

<style lang="less">
@import "@/assets/css/app.less";
</style>
