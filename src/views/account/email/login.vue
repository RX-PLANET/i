<template>
    <div class="p-account p-account-email__login">
        <el-row class="m-container" justify="center">
            <div class="m-col">
                <logo />
                <login :app="app"></login>
            </div>
        </el-row>
    </div>
</template>

<script>
import login from "@/components/account/email/login.vue";
import Logo from "@/components/common/logo.vue";
export default {
    name: "AccountEmailLogin",
    components: {
        login,
        Logo,
    },
    data() {
        return {
            app: "",
        };
    },
    mounted() {
        const search = new URLSearchParams(document.location.search);

        if (search.has("app")) {
            this.app = search.get("app");
        }
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/index.less";
@import "@/assets/css/account/email/login.less";
</style>
