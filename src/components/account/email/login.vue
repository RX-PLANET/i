<!-- 公共组件 邮件地址注册 -->
<template>
    <el-card class="m-card">
        <card-header :title="$t('common.login')"></card-header>
        <el-form
            class="m-form"
            hide-required-asterisk
            ref="loginForm"
            label-position="top"
            :model="form"
            :rules="rules"
            size="large"
            v-if="!success"
        >
            <el-form-item prop="email">
                <template #label>
                    <div class="m-form-label">
                        <span>{{ $t("email.address") }}</span>
                    </div>
                </template>
                <el-input v-model.trim="form.email" size="large">
                    <!-- <template #prepend
                        ><el-icon><Message></Message></el-icon
                    ></template> -->
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <template #label>
                    <div class="m-form-label">
                        <span>{{ $t("common.password") }}</span>
                        <span class="u-resetpwd">
                            <a :href="resetPwdLink">{{ $t("email.forgetPassword") }}?</a>
                        </span>
                    </div>
                </template>
                <el-input
                    v-model.trim="form.password"
                    @keydown.enter="onLogin"
                    type="password"
                    size="large"
                    show-password
                    :placeholder="$t('common.password')"
                >
                    <!-- <template #prepend
                        ><el-icon><Lock></Lock></el-icon
                    ></template> -->
                </el-input>
            </el-form-item>
            <el-alert class="u-alert" v-if="error" type="error" show-icon :title="error"></el-alert>
            <el-form-item>
                <el-button class="u-button u-submit" type="primary" @click="onLogin">{{
                    $t("common.login")
                }}</el-button>
            </el-form-item>
            <!-- <el-form-item class="m-footer">
                <p class="u-login">
                    {{ $t("common.noAccount") }} <a :href="registerLink">{{ $t("common.registerNow") }} &raquo;</a>
                </p>
                <p class="u-resetpwd">
                    <a :href="resetPwdLink">{{ $t("email.forgetPassword") }}?</a>
                </p>
            </el-form-item> -->
        </el-form>

        <main v-else class="m-main">
            <el-alert
                :title="$t('common.loginSuccess')"
                type="success"
                :description="`${$t('common.loginSuccess')}(#^.^#)`"
                show-icon
                :closable="false"
            >
            </el-alert>
            <a class="u-skip el-button u-button el-button--primary" :href="redirect">{{ redirect_button }}</a>
        </main>
    </el-card>
    <div class="m-misc">
        {{ $t("common.noAccount") }} <a class="u-link" :href="registerLink">{{ $t("common.registerNow") }} 👉</a>
    </div>
</template>

<script>
import { loginByEmail } from "@/service/email";
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
                    { required: true, message: this.$t("email.addressPlaceholder"), trigger: "blur" },
                    { type: "email", message: this.$t("email.addressError"), trigger: ["blur", "change"] },
                ],
                password: [
                    { required: true, message: this.$t("common.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("common.passwordError"), trigger: "blur" },
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
                            this.$message.success(this.$t("common.loginSuccess"));
                            this.success = true;

                            User.update(res.data.data).then(() => {
                                this.skip();
                            });
                        })
                        .catch((err) => {
                            this.success = false;
                            this.error = err.data?.msg || this.$t("email.loginFailed");
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
