<template>
    <div class="p-account p-account-email p-account-email--register">
        <el-row class="m-container" justify="center">
            <div class="m-register">
                <logo :app="app" />
                <div class="m-card m-login-card">
                    <main class="m-card-main">
                        <el-alert
                            class="m-alert"
                            :title="$t('account.common.loginSuccess')"
                            type="success"
                            :description="$t('account.common.loginSuccessDesc')"
                            show-icon
                            :closable="false"
                        >
                        </el-alert>
                        <a class="el-button u-btn el-button--primary u-skip" :href="redirect">{{ redirect_button }}</a>
                    </main>
                </div>
            </div>
        </el-row>
        <Footer />
    </div>
</template>

<script>
import Footer from "@/components/account/common/footer.vue";
import User from "@iruxu/rx-common/utils/user";
export default {
    name: "UnionRegisterCallback",
    props: [],
    components: {
        Footer,
    },
    data: function () {
        return {
            app: "",
            redirect: "",
            redirect_button: "",
            homepage: "/",
        };
    },
    computed: {
        from() {
            return this.$route.query.from;
        },
    },
    watch: {},
    methods: {
        init() {
            if (this.$route.query.userdata) {
                const userdata = JSON.parse(atob(this.$route.query.userdata));
                User.update(userdata).then(() => {
                    this.skip();
                });
            }
        },
        checkDirect() {
            // 读取sessionStorage中的redirect
            const redirect = sessionStorage.getItem("redirect");
            if (redirect) {
                this.redirect = redirect;
                this.redirect_button = this.$t("account.common.jump");
            } else {
                this.redirect = this.homepage;
                this.redirect_button = this.$t("account.common.backToHome");
            }
        },
        skip() {
            if (this.redirect) {
                setTimeout(() => {
                    sessionStorage.setItem("redirect", "");
                    location.href = decodeURIComponent(this.redirect);
                }, 1200);
            }
        },
    },
    mounted: function () {
        const search = new URLSearchParams(document.location.search);

        if (search.has("app")) {
            this.app = search.get("app");
        } else {
            this.app = "miipet";
        }

        // 生成特征码
        User.generateFingerprint();

        this.checkDirect();
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/common.less";
@import "@/assets/css/account/email/login.less";
</style>
