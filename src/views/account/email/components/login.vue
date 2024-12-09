<!-- 公共组件 邮件地址注册 -->
<template>
    <div class="m-card m-login-card">
        <card-header :title="$t('account.common.login')">
            <template #right>
                <lang-select :lang="lang" />
            </template>
        </card-header>

        <div class="m-card-main" v-if="!success">
            <el-form
                class="m-card-form"
                hide-required-asterisk
                ref="loginForm"
                label-position="top"
                :model="form"
                :rules="rules"
                size="large"
            >
                <el-form-item prop="email">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.email.address") }}</span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.email" size="large" tabindex="1"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.common.password") }}</span>
                            <span class="u-resetpwd">
                                <a :href="resetPwdLink">{{ $t("account.email.forgetPassword") }}?</a>
                            </span>
                        </div>
                    </template>
                    <el-input
                        v-model.trim="form.password"
                        @keydown.enter="onLogin"
                        type="password"
                        size="large"
                        show-password
                        tabindex="2"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <el-alert class="u-alert" v-if="error" type="error" show-icon :title="error"></el-alert>
            <el-button class="u-btn u-submit" type="primary" @click="onLogin" tabindex="3">{{
                $t("account.common.login")
            }}</el-button>
            <union mode="login" :includes="['wechat']" />
        </div>

        <div class="m-card-main" v-else>
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
        </div>
    </div>
    <div class="m-footer">
        <div class="m-footer-skip">
            {{ $t("account.common.noAccount") }}
            <a class="u-link" :href="registerLink">{{ $t("account.common.registerNow") }} 👉</a>
        </div>
    </div>
</template>

<script>
import { loginByEmail } from "@/service/email";
import User from "@iruxu/rx-common/utils/user";
import union from "@/components/account/common/union.vue";
export default {
    name: "EmailLogin",
    components: {
        union,
    },
    props: {
        app: {
            type: String,
            default: "",
        },
        registerLink: {
            type: String,
            default: "",
        },
        resetPwdLink: {
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
                    { required: true, message: this.$t("account.email.addressPlaceholder"), trigger: "blur" },
                    { type: "email", message: this.$t("account.email.addressError"), trigger: ["blur"] },
                ],
                password: [
                    { required: true, message: this.$t("account.common.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.common.passwordError"), trigger: "blur" },
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
        lang() {
            return User.getLocale();
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
                            this.$message.success(this.$t("account.common.loginSuccess"));
                            this.success = true;

                            User.update(res.data.data).then(() => {
                                this.skip();
                            });
                        })
                        .catch((err) => {
                            this.success = false;
                            this.error = err.data?.msg || this.$t("account.email.loginFailed");
                        });
                }
            });
        },
        checkDirect() {
            const search = new URLSearchParams(document.location.search);
            const redirect = search.get("redirect");

            // 第三方登录跳转
            sessionStorage.setItem("redirect", redirect);

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
};
</script>
