<template>
    <div class="p-account p-account-email--register">
        <el-card class="m-card">
            <card-header></card-header>

            <main class="m-card-main">
                <el-alert v-if="!success" :title="title" type="error" show-icon :closable="false" center> </el-alert>
                <el-alert v-else type="success" show-icon :closable="false">
                    <template #title
                        >{{ $t("account.union.verifySuccess") }}，<a :href="loginLink">{{
                            $t("account.common.login")
                        }}</a></template
                    >
                </el-alert>
            </main>
        </el-card>
        <Footer />
    </div>
</template>

<script>
import { activeByEmail } from "@/service/account";
import Footer from "@/components/account/common/footer.vue";
export default {
    name: "AccountEmailActive",
    components: {
        Footer,
    },
    data() {
        return {
            success: false,
            title: this.$t("email.illegalRequest"),

            token: "",
            app: "",
        };
    },
    computed: {
        loginLink() {
            const path = this.$router.resolve({ name: "email-login", query: { app: this.app } });
            return path.href;
        },
    },
    mounted() {
        // 解析请求字符串
        this.parse();

        // 不合法字符串
        if (!this.token) {
            this.success = false;
            return;
        }

        // 验证
        this.verify();
    },
    methods: {
        parse() {
            let search = new URLSearchParams(document.location.search);
            this.token = search.get("token");
            this.app = search.get("app") || "miipet";
        },
        verify() {
            activeByEmail({ token: this.token }, { app: this.app })
                .then(() => {
                    this.success = true;
                })
                .catch((err) => {
                    this.success = false;
                    this.title = err.data?.msg;
                });
        },
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/common.less";
@import "@/assets/css/account/email/register.less";
</style>
