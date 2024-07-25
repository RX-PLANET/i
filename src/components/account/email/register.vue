<template>
    <el-card class="m-account-email__register">
        <card-header></card-header>

        <el-form ref="registerForm" :model="form" :rules="rules" size="large" status-icon v-if="success === null">
            <el-form-item prop="email">
                <el-input v-model.trim="form.email" size="large" placeholder="邮箱地址">
                    <template #prepend
                        ><el-icon><Message></Message></el-icon
                    ></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model.trim="form.password"
                    type="password"
                    size="large"
                    show-password
                    placeholder="输入密码"
                >
                    <template #prepend
                        ><el-icon><Lock></Lock></el-icon
                    ></template>
                </el-input>
            </el-form-item>
            <el-form-item class="u-terms">
                <el-checkbox v-model="agreement" class="u-checkbox"
                    >我已阅读同意
                    <a v-for="(item, index) in agreements" :key="index" :href="item.href" target="_blank"
                        >《{{ item.name }}》
                        {{ index === agreements.length - 1 ? "" : "、" }}
                    </a>
                </el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="u-button u-submit" type="primary" @click="onRegister" :disabled="!canSubmit"
                    >注册</el-button
                >
            </el-form-item>
            <el-form-item class="m-footer">
                <p class="u-login">已有账号? <a :href="loginLink">登录 &raquo;</a></p>
            </el-form-item>
        </el-form>

        <main class="m-main" v-if="success == true">
            <el-alert title="等待验证" type="success" :description="successDesc" show-icon :closable="false">
            </el-alert>
        </main>

        <main class="m-main" v-if="success == false"></main>
    </el-card>
</template>

<script>
import { checkEmail, registerByEmail } from "@/service/account";
import CardHeader from "@/components/common/card-header.vue";
import User from "@/utils/user";

export default {
    name: "EmailRegister",
    props: {
        app: {
            type: String,
            default: "",
        },
        agreements: {
            // 协议
            type: Array,
            default: () => [
                {
                    name: "用户协议",
                    href: "https://www.jx3box.com/about/license",
                },
                {
                    name: "隐私政策",
                    href: "https://www.jx3box.com/about/privacy",
                },
            ],
        },
    },
    components: {
        CardHeader,
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
            },

            rules: {
                email: [
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
                    { validator: this.check, trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
                ],
            },

            agreement: false,

            success: null,
        };
    },
    computed: {
        canSubmit() {
            return this.form.email && this.form.password && this.agreement;
        },
        loginLink() {
            const path = this.$router.resolve({ name: "email-login", query: { app: this.app } });
            return path.href;
        },
        successDesc() {
            return `已向您的邮箱${this.form.email}发送了一封验证邮件，点击激活链接即可注册成功！邮件有效期为24小时。`;
        },
    },
    mounted() {
        // 生成特征码
        User.generateFingerprint();
    },
    methods: {
        async check(rule, value, callback) {
            if (!value) {
                callback(new Error("请输入邮箱地址"));
            } else {
                const res = await checkEmail(value);
                if (res) {
                    callback(new Error("邮箱已被注册"));
                }
                callback();
            }
        },
        onRegister() {
            this.$refs.registerForm.validate(async (valid) => {
                if (valid) {
                    registerByEmail(this.form, { app: this.app }).then(() => {
                        this.success = true;
                    });
                }
            });
        },
    },
};
</script>
