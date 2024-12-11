<template>
    <div class="p-account p-account-email p-account-email--register">
        <el-row class="m-container" justify="center">
            <div class="m-register">
                <logo :app="app" />
                <div class="m-card m-register-card">
                    <main class="m-card-main">
                        <el-alert
                            class="m-alert"
                            :title="$t('account.email.registerSuccess')"
                            type="success"
                            :description="$t('account.email.registerSuccessDesc')"
                            show-icon
                            :closable="false"
                        >
                        </el-alert>
                        <!-- <el-button size="large" class="u-btn u-back" type="primary" @click="goLogin">{{
                            $t("account.common.login")
                        }}</el-button> -->
                        <union mode="login" :includes="[from]" />
                    </main>
                </div>
            </div>
        </el-row>
        <Footer />
    </div>
</template>

<script>
import Footer from "@/components/account/common/footer.vue";
import union from "@/components/account/common/union.vue";
export default {
    name: "UnionRegisterCallback",
    props: [],
    components: {
        Footer,
        union,
    },
    data: function () {
        return {
            app: "",
        };
    },
    computed: {
        loginLink() {
            const path = this.$router.resolve({ name: "email-login" });
            return path.href;
        },
        from() {
            return this.$route.query.from;
        },
    },
    watch: {},
    methods: {
        goLogin() {
            location.href = this.loginLink;
        },
    },
    created: function () {},
    mounted: function () {
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
