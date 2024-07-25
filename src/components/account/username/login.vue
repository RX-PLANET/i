<!-- 公共组件 用户名注册 -->
<template>
    <el-card class="m-account-username__login">
        <card-header></card-header>
        <el-form ref="loginForm" :model="form" :rules="rules" size="large">
            <el-form-item prop="username">
                <el-input v-model.trim="form.username" size="large" placeholder="用户名">
                    <template #prepend
                        ><el-icon><UserFilled></UserFilled></el-icon
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
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { loginByUsername } from "@/service/account";
import CardHeader from "@/components/common/card_header.vue";
import User from "@/utils/user";
export default {
    name: "UsernameLogin",
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
                username: "",
                password: "",
            },

            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
                ],
            },

            error: "",
        };
    },
    computed: {
        canSubmit() {
            return this.form.username && this.form.password;
        },
        registerLink() {
            const path = this.$router.resolve({ name: "username-register", query: { app: this.app } });

            return path.href;
        },
    },
    async mounted() {
        // 生成特征码
        await User.generateFingerprint();
    },
    methods: {
        onLogin() {
            this.error = "";
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    loginByUsername(this.form, { app: this.app })
                        .then(() => {
                            this.$message.success("登录成功");
                            // this.$router.push({ name: "username-login", query: { app: this.app } });
                        })
                        .catch((err) => {
                            this.error = err.data?.msg || "登录失败, 请检查用户名和密码";
                        });
                }
            });
        },
    },
};
</script>
