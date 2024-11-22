<template>
    <div class="p-account p-account-email p-account-email--register">
        <el-row class="m-container" justify="center">
            <div class="m-register">
                <logo :app="app" />
                <resetPassword :app="app" :loginLink="loginLink" />
            </div>
        </el-row>
        <Footer />
    </div>
</template>

<script>
import resetPassword from "@/components/account/phone/reset-password.vue";
import Footer from "@/components/account/common/footer.vue";
export default {
    name: "AccountPhoneResetPassword",
    components: {
        resetPassword,
        Footer,
    },
    data() {
        return {
            app: "",
        };
    },
    computed: {
        loginLink() {
            const path = this.$router.resolve({ name: "phone-login" });
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
@import "@/assets/css/account/email/register.less";
</style>
