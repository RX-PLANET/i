<template>
    <div class="p-account p-account-phone--login">
        <el-row class="m-container" justify="center">
            <div class="m-login">
                <logo :app="app" />
                <login :app="app" :registerLink="registerLink" :resetPwdLink="resetPwdLink"></login>
            </div>
        </el-row>
        <Footer />
    </div>
</template>

<script>
import login from "@/components/account/phone/login.vue";
import Footer from "@/components/account/common/footer.vue";
export default {
    name: "AccountPhoneLogin",
    components: {
        login,
        Footer,
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
            const path = this.$router.resolve({ name: "phone-reset-password" });
            return path.href;
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
