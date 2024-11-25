<template>
    <div class="p-account p-account-username--login">
        <el-row class="m-container" justify="center">
            <div class="m-login">
                <logo :app="app" />
                <login :app="app" :registerLink="registerLink"></login>
            </div>
        </el-row>
        <Footer />
    </div>
</template>

<script>
import login from "./components/login.vue";
import Footer from "@/components/account/common/footer.vue";
export default {
    name: "AccountUsernameLogin",
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
            const path = this.$router.resolve({ name: "username-register" });
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
