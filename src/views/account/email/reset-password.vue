<template>
    <div class="p-account-email__register p-reset-password">
        <el-card class="m-account-email__register">
            <card-header></card-header>
            <el-alert
                type="warning"
                show-icon
                :title="$t('email.findPassword')"
                class="u-alert"
                :closable="false"
            ></el-alert>
            <el-form :model="form" ref="resetForm" :rules="rules" size="large" v-if="step != 3">
                <el-form-item prop="email">
                    <el-input
                        v-model.trim="form.email"
                        :disabled="!!interval"
                        size="large"
                        :placeholder="$t('email.address')"
                    >
                        <template #prepend
                            ><el-icon><Message></Message></el-icon
                        ></template>
                        <template #append v-if="sent">
                            <span @click="onResetPassword"
                                >{{ $t("email.resend") }} (<span>{{ interval }}s</span>)</span
                            >
                        </template>
                    </el-input>
                </el-form-item>
                <template v-if="step == 1">
                    <el-form-item prop="code">
                        <el-input v-model.trim="form.code" size="large" :placeholder="$t('email.code')">
                            <template #prepend
                                ><el-icon><Message></Message></el-icon
                            ></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password1">
                        <el-input
                            v-model.trim="form.password1"
                            type="password"
                            size="large"
                            show-password
                            :placeholder="$t('email.newPassword')"
                        >
                            <template #prepend
                                ><el-icon><Lock></Lock></el-icon
                            ></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password2">
                        <el-input
                            v-model.trim="form.password2"
                            type="password"
                            size="large"
                            show-password
                            :placeholder="$t('email.confirmPassword')"
                        >
                            <template #prepend
                                ><el-icon><Lock></Lock></el-icon
                            ></template>
                        </el-input>
                    </el-form-item>
                </template>
                <el-form-item>
                    <el-button class="u-button" type="primary" @click="onNextStep">{{ $t("email.next") }}</el-button>
                </el-form-item>
            </el-form>
            <main class="m-main" v-if="step == 3">
                <el-alert
                    :title="$t('email.resetSuccess')"
                    type="success"
                    :description="$t('email.resetSuccessDesc')"
                    show-icon
                    :closable="false"
                >
                </el-alert>
                <a class="u-skip el-button u-button el-button--primary" :href="loginLink">{{ $t("common.login") }}</a>
            </main>
        </el-card>
    </div>
</template>

<script>
import CardHeader from "@/components/common/card-header.vue";
import { checkEmail, findPassword, resetPassword } from "@/service/email";
export default {
    name: "ResetPassword",
    components: {
        CardHeader,
    },
    data() {
        return {
            form: {
                email: "",
            },

            rules: {
                email: [
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
                    { validator: this.check, trigger: "blur" },
                ],
                code: [
                    // 数字与大写字母组合
                    { required: true, message: "请输入验证码", trigger: "blur" },
                    { pattern: /^[0-9A-Z]+$/, message: "验证码格式错误", trigger: "blur" },
                ],
                // password1和password2必须相同，且均在6-30位之间
                password1: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 30, message: "密码长度在6-30位之间", trigger: "blur" },
                ],
                password2: [
                    { required: true, message: "请再次输入密码", trigger: "blur" },
                    { min: 6, max: 30, message: "密码长度在6-30位之间", trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.form.password1) {
                                callback(new Error("两次输入密码不一致"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
            },

            timer: null,
            interval: 0,
            app: "",
            sent: false,
            step: 0,
        };
    },
    computed: {
        loginLink() {
            const path = this.$router.resolve({ name: "email-login", query: { app: this.app } });
            return path.href;
        },
    },
    mounted() {
        const search = new URLSearchParams(location.search);
        this.app = search.get("app");

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.interval = 10;
        }
    },
    methods: {
        async check(rule, value, callback) {
            if (!value) {
                callback(new Error("请输入邮箱地址"));
            } else {
                const res = await checkEmail(value);
                if (!res) {
                    callback(new Error("邮箱地址不存在"));
                }
                callback();
            }
        },
        onNextStep() {
            if (this.step == 0) {
                // 发送验证码
                this.sendCode();
            }

            if (this.step == 1) {
                // 重置密码
                this.resetPwd();
            }
        },
        sendCode() {
            this.$refs.resetForm.validate(async (valid) => {
                if (valid) {
                    findPassword({ email: this.form.email }, { app: this.app }).then(() => {
                        this.$message.success("验证码已发送至您的邮箱，请查收");
                        this.sent = true;
                        this.step = 1;
                        // 定时180s才能再次发送
                        this.interval = 10;
                        this.timer = setInterval(() => {
                            this.interval--;
                            if (this.interval <= 0) {
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000);
                    });
                }
            });
        },
        resetPwd() {
            this.$refs.resetForm.validate(async (valid) => {
                if (valid) {
                    const data = {
                        email: this.form.email,
                        code: this.form.code,
                        password: this.form.password1,
                    };
                    resetPassword(data, { app: this.app }).then(() => {
                        this.$message.success("密码重置成功");
                        this.step = 3;
                    });
                }
            });
        },
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/email/register.less";
</style>
