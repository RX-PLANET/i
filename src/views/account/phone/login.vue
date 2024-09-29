<template>
    <div class="p-account p-account-phone--login">
        <el-row class="m-container" justify="center">
            <div class="m-login">
                <logo :app="app" />
                <login :app="app" :registerLink="registerLink" :resetPwdLink="resetPwdLink"></login>
            </div>
        </el-row>
    </div>
</template>

<script>
import login from "@iruxu/pkg-widget/src/components/account/phone/login.vue";
import Logo from "@iruxu/pkg-widget/src/components/common/logo.vue";
export default {
    name: "AccountPhoneLogin",
    components: {
        login,
        Logo,
    },
    data() {
        return {
            app: "",
        };
    },
    computed: {
        registerLink() {
            const path = this.$router.resolve({ name: "phone-register" });
            return path.href;
        },
        resetPwdLink() {
            // const path = this.$router.resolve({ name: "phone-reset-password" });
            // return path.href;
            return "";
        },
    },
    mounted() {
        const search = new URLSearchParams(document.location.search);

        if (search.has("app")) {
            this.app = search.get("app");
        } else {
            this.app = "miipet";
        }
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/common.less";
@import "@/assets/css/account/email/login.less";
</style>
