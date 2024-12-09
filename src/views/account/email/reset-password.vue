<template>
    <div class="p-account p-reset-password">
        <el-row class="m-container" justify="center">
            <div class="m-reset-password">
                <logo :app="app" />
                <div class="m-card">
                    <card-header :title="$t('account.email.resetPassword')"></card-header>
                    <div class="m-card-main" v-if="step != 3">
                        <el-form
                            class="m-card-form"
                            :model="form"
                            ref="resetForm"
                            label-position="top"
                            hide-required-asterisk
                            :rules="rules"
                            size="large"
                        >
                            <p class="u-tips" v-if="step == 0">🌟 {{ $t("account.email.findPassword") }}</p>
                            <el-form-item prop="email">
                                <template #label>
                                    <div class="m-card-form-label">
                                        <span>{{ $t("account.email.address") }}</span>
                                    </div>
                                </template>
                                <div class="m-reset-password__email">
                                    <el-input
                                        v-model.trim="form.email"
                                        :disabled="step != 0"
                                        size="large"
                                        placeholder="yourname@example.com"
                                    >
                                    </el-input>
                                    <el-button v-if="sent" class="u-btn" type="primary" plain @click="resetPwd"
                                        >{{ $t("account.email.resend") }}
                                        <template v-if="interval"
                                            >(<span>{{ interval }}s</span>)
                                        </template></el-button
                                    >
                                </div>
                            </el-form-item>
                            <template v-if="step == 1">
                                <el-form-item prop="code">
                                    <template #label>
                                        <div class="m-card-form-label">
                                            <span>{{ $t("account.email.code") }}</span>
                                        </div>
                                    </template>
                                    <el-input
                                        v-model.trim="form.code"
                                        size="large"
                                        :placeholder="$t('account.email.code')"
                                    >
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="password1">
                                    <template #label>
                                        <div class="m-card-form-label">
                                            <span>{{ $t("account.email.newPassword") }}</span>
                                        </div>
                                    </template>
                                    <el-input
                                        v-model.trim="form.password1"
                                        type="password"
                                        size="large"
                                        show-password
                                        :placeholder="$t('account.email.newPassword')"
                                    >
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="password2">
                                    <template #label>
                                        <div class="m-card-form-label">
                                            <span>{{ $t("account.email.confirmPassword") }}</span>
                                        </div>
                                    </template>
                                    <el-input
                                        v-model.trim="form.password2"
                                        type="password"
                                        size="large"
                                        show-password
                                        :placeholder="$t('account.email.confirmPassword')"
                                    >
                                    </el-input>
                                </el-form-item>
                            </template>
                            <el-form-item>
                                <el-button class="u-button u-submit" type="primary" @click="onNextStep">{{
                                    $t("account.email.next")
                                }}</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                    <!-- 重置完成 -->
                    <main class="m-card-main" v-if="step == 3">
                        <el-alert
                            class="m-alert"
                            :title="$t('account.email.resetSuccess')"
                            type="success"
                            :description="$t('account.email.resetSuccessDesc')"
                            show-icon
                            :closable="false"
                        >
                        </el-alert>
                        <a class="u-skip el-button u-btn el-button--primary" :href="loginLink">{{
                            $t("account.common.login")
                        }}</a>
                    </main>
                </div>

                <div class="m-footer">
                    <div class="m-footer-skip">
                        <a class="u-link" :href="loginLink"
                            >← {{ $t("account.common.back") + $t("account.common.login") }}</a
                        >
                    </div>
                </div>
            </div>
        </el-row>
        <Footer />
    </div>
</template>

<script>
import { checkEmail, findPassword, resetPassword } from "@/service/account";
import Footer from "@/components/account/common/footer.vue";
export default {
    name: "ResetPassword",
    components: {
        Footer,
    },
    data() {
        return {
            form: {
                email: "",
            },

            rules: {
                email: [
                    { required: true, message: this.$t("account.email.addressPlaceholder"), trigger: "blur" },
                    { type: "email", message: this.$t("account.email.addressError"), trigger: "blur" },
                    { validator: this.check, trigger: "blur" },
                ],
                code: [
                    // 数字与大写字母组合
                    { required: true, message: "请输入验证码", trigger: "blur" },
                    { pattern: /^[0-9A-Z]+$/, message: "验证码格式错误", trigger: "blur" },
                ],
                // password1和password2必须相同，且均在6-30位之间
                password1: [
                    { required: true, message: this.$t("account.common.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.common.passwordError"), trigger: "blur" },
                ],
                password2: [
                    { required: true, message: this.$t("account.common.password2Placeholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.common.passwordError"), trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.form.password1) {
                                callback(new Error(this.$t("account.common.passwordError2")));
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
        this.app = search.get("app") || "miipet";

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
                        this.$message.success(this.$t("account.email.sendResetSuccess"));
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
                        this.$message.success(this.$t("account.email.resetSuccessDesc"));
                        this.step = 3;
                    });
                }
            });
        },
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/common.less";
@import "@/assets/css/account/email/forgot.less";
</style>
