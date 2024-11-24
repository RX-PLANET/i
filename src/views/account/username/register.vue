<template>
    <div class="p-account p-account-username--register">
        <el-row class="m-container" justify="center">
            <div class="m-register">
                <logo :app="app" />
                <register :app="app" :loginLink="loginLink" />
            </div>
        </el-row>
        <Footer />
    </div>
</template>

<script>
import Register from "@/components/account/username/register.vue";
import Footer from "@/components/account/common/footer.vue";
export default {
    name: "AccountUsernameRegister",
    components: {
        Register,
        Footer,
    },
    data() {
        return {
            app: "",
        };
    },
    computed: {
        loginLink() {
            const path = this.$router.resolve({ name: "username-login" });
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
@import "@/assets/css/account/username/register.less";
</style>
