<template>
    <router-view />
</template>

<script>
import User from "@iruxu/pkg-common/utils/user";
// import { getUserInfo } from "@/service/user";
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
            // TODO: 获取用户信息
            // getUserInfo().then((res) => {
            //     this.$store.commit("SET_USER", res.data.data);
            // });
        }
    },
};
</script>

<style lang="less">
@import "@/assets/css/app.less";
</style>
