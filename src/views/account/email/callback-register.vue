<template>
    <div class="p-account p-account-email__register">
        <el-card class="m-card">
            <card-header></card-header>

            <main class="m-main">
                <el-alert v-if="!success" :title="title" type="error" show-icon :closable="false" center> </el-alert>
                <el-alert v-else type="success" show-icon :closable="false">
                    <template #title
                        >验证成功，<a :href="loginLink">{{ $t("common.login") }}</a></template
                    >
                </el-alert>
            </main>
        </el-card>
    </div>
</template>

<script>
import CardHeader from "@/components/common/card-header.vue";
import { activeByEmail } from "@/service/email";
export default {
    name: "AccountEmailActive",
    components: {
        CardHeader,
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
            this.app = search.get("app");
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
@import "@/assets/css/account/index.less";
@import "@/assets/css/account/email/register.less";
</style>
