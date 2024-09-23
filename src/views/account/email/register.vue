<template>
    <div class="p-account p-account-email p-account-email--register">
        <el-row class="m-container" justify="center">
            <div class="m-register">
                <logo :app="app" />
                <register :app="app" />
            </div>
        </el-row>
    </div>
</template>

<script>
import register from "@/components/account/email/register.vue";
import Logo from "@/components/common/logo.vue";
export default {
    name: "AccountEmailRegister",
    components: {
        register,
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
@import "@/assets/css/account/common.less";
@import "@/assets/css/account/email/register.less";
</style>
