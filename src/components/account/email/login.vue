<!-- 公共组件 邮件地址注册 -->
<template>
    <el-card class="m-account-email__login">
        <card-header></card-header>
        <el-form ref="loginForm" :model="form" :rules="rules" size="large" v-if="!success">
            <el-form-item prop="email">
                <el-input v-model.trim="form.email" size="large" placeholder="邮件地址">
                    <template #prepend
                        ><el-icon><Message></Message></el-icon
                    ></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model.trim="form.password"
                    @keydown.enter="onLogin"
                    type="password"
                    size="large"
                    show-password
                    placeholder="密码"
                >
                    <template #prepend
                        ><el-icon><Lock></Lock></el-icon
                    ></template>
                </el-input>
            </el-form-item>
            <el-alert class="u-alert" v-if="error" type="error" show-icon :title="error"></el-alert>
            <el-form-item>
                <el-button class="u-button u-submit" type="primary" @click="onLogin" :disabled="!canSubmit"
                    >登录</el-button
                >
            </el-form-item>
            <el-form-item class="m-footer">
                <p class="u-login">还没有账号? <a :href="registerLink">立即注册 &raquo;</a></p>
                <p class="u-resetpwd">
                    <a :href="resetPwdLink">忘记密码?</a>
                </p>
            </el-form-item>
        </el-form>

        <main v-else class="m-main">
            <el-alert title="登录成功" type="success" description="欢迎回来(#^.^#)" show-icon :closable="false">
            </el-alert>
            <a class="u-skip el-button u-button el-button--primary" :href="redirect">{{ redirect_button }}</a>
        </main>
    </el-card>
</template>

<script>
import { loginByEmail } from "@/service/account";
import CardHeader from "@/components/common/card-header.vue";
import User from "@/utils/user";
export default {
    name: "EmailLogin",
    components: {
        CardHeader,
    },
    props: {
        app: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
            },

            rules: {
                email: [
                    { required: true, message: "请输入邮件地址", trigger: "blur" },
                    { type: "email", message: "请输入正确的邮件地址", trigger: ["blur", "change"] },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
                ],
            },

            error: "",
            success: false,

            redirect: "",
            redirect_button: "",
            homepage: "/",
        };
    },
    computed: {
        canSubmit() {
            return this.form.email && this.form.password;
        },
        registerLink() {
            const path = this.$router.resolve({
                name: "email-register",
                query: { app: this.app, redirect: this.redirect },
            });

            return path.href;
        },
        resetPwdLink() {
            const path = this.$router.resolve({
                name: "email-reset-password",
                query: { app: this.app, redirect: this.redirect },
            });

            return path.href;
        },
    },
    mounted() {
        // 生成特征码
        User.generateFingerprint();

        this.checkDirect();
    },
    methods: {
        onLogin() {
            this.error = "";
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    loginByEmail(this.form, { app: this.app })
                        .then((res) => {
                            this.$message.success("登录成功");
                            this.success = true;

                            User.update(res.data.data).then(() => {
                                this.skip();
                            });
                        })
                        .catch((err) => {
                            this.success = false;
                            this.error = err.data?.msg || "登录失败, 请检查邮件地址和密码";
                        });
                }
            });
        },
        checkDirect() {
            let search = new URLSearchParams(document.location.search);
            let redirect = search.get("redirect");
            if (redirect) {
                this.redirect = redirect;
                this.redirect_button = "即将跳转";
            } else {
                this.redirect = this.homepage;
                this.redirect_button = "返回首页";
            }
        },
        skip() {
            if (this.redirect) {
                setTimeout(() => {
                    location.href = decodeURIComponent(this.redirect);
                }, 1200);
            }
        },
    },
};
</script>
