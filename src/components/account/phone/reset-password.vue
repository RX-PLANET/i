<template>
    <div class="m-card m-register-card">
        <card-header :title="$t('account.phone.resetPassword')">
            <template #right>
                <lang-select :lang="form.lang" @change="changeLang" />
            </template>
        </card-header>

        <div class="m-card-main" v-if="success === null">
            <el-form
                class="m-card-form"
                hide-required-asterisk
                ref="registerForm"
                :model="form"
                :rules="rules"
                size="large"
                status-icon
                label-position="top"
            >
                <el-form-item prop="phone">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.phone.number") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <div class="m-card-form-value">
                        <phone-code-select v-model="phoneCode" size="large" />
                        <el-input v-model.trim="form.phone" size="large"> </el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="code" class="u-code">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.phone.code") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.code" size="large"> </el-input>
                    <el-button
                        class="u-btn-send"
                        size="small"
                        @click="senCode"
                        :disabled="interval > 0 || !phoneChecked"
                        >{{ $t("account.phone.send") }}<span v-if="interval">({{ interval }}s)</span></el-button
                    >
                </el-form-item>
                <el-form-item prop="password" class="m-password">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.password") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.password" type="password" size="large" show-password> </el-input>
                </el-form-item>
                <el-form-item prop="password1" class="m-password">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.passwordConfirm") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.password1" type="password" size="large" show-password> </el-input>
                </el-form-item>
            </el-form>
            <el-button class="u-btn u-submit u-reset-submit" type="primary" @click="onResetPassword">{{
                $t("account.phone.resetPassword")
            }}</el-button>
        </div>

        <main class="m-card-main" v-if="success == true">
            <el-alert
                class="m-alert"
                :title="$t('account.phone.resetSuccess')"
                type="success"
                :description="$t('account.phone.resetSuccessDesc')"
                show-icon
                :closable="false"
            >
            </el-alert>
            <el-button size="large" class="u-btn u-back" type="primary" @click="goLogin">{{
                $t("account.login")
            }}</el-button>
        </main>
    </div>
    <div class="m-footer">
        <div class="m-footer-skip">
            <a class="u-link" :href="loginLink">← {{ $t("account.back") + $t("account.login") }}</a>
        </div>
    </div>
</template>

<script>
import { checkPhoneCode, sendCode, resetPasswordByPhone } from "@/service/account";
import CardHeader from "@iruxu/pkg-widget/src/components/common/card-header.vue";
import User from "@iruxu/pkg-common/utils/user";
import LangSelect from "@iruxu/pkg-widget/src/components/common/lang-select.vue";
import PhoneCodeSelect from "@iruxu/pkg-widget/src/components/common/phone-code-select.vue";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export default {
    name: "PhoneResetPassword",
    props: {
        app: {
            type: String,
            default: "",
        },
        loginLink: {
            type: String,
            default: "",
        },
    },
    components: {
        CardHeader,
        LangSelect,
        PhoneCodeSelect,
    },
    data() {
        return {
            form: {
                phone: "",
                password: "",
                password1: "",
                lang: "",
                code: "",
            },

            phoneCode: 86,

            rules: {
                phone: [
                    { required: true, message: this.$t("account.phone.numberPlaceholder"), trigger: "change" },
                    {
                        validator: (rule, value, callback) => {
                            const phone = `+${this.phoneCode}${value}`;
                            const phoneNumber = parsePhoneNumberFromString(phone);
                            if (!phoneNumber || !phoneNumber.isValid()) {
                                callback(new Error(this.$t("account.phone.numberError")));
                            } else {
                                this.phoneChecked = true;
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: this.$t("account.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.passwordError"), trigger: "blur" },
                ],
                password1: [
                    { required: true, message: this.$t("account.password2Placeholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.passwordError"), trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.form.password) {
                                callback(new Error(this.$t("account.passwordError2")));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
            },

            success: null,
            phoneChecked: false,

            terms: "/doc/terms",

            interval: 0,
            timer: null,
        };
    },
    mounted() {
        // 生成特征码
        User.generateFingerprint();

        // 获取浏览器语言|系统语言
        this.form.lang = User.getLocale();
    },
    methods: {
        // 发送验证码
        senCode() {
            if (!this.form.phone) {
                return;
            }
            const phone = `+${this.phoneCode}${this.form.phone}`;
            sendCode({ phone: phone }, { app: this.app }).then(() => {
                this.$message.success(this.$t("account.phone.sendSuccess"));
                this.interval = 60;
                this.timer = setInterval(() => {
                    this.interval--;
                    if (this.interval <= 0) {
                        clearInterval(this.timer);
                    }
                }, 1000);
            });
        },
        onResetPassword() {
            this.$refs.registerForm.validate(async (valid) => {
                if (valid) {
                    // 检测验证码
                    const phone = `+${this.phoneCode}${this.form.phone}`;
                    checkPhoneCode({ phone, code: this.form.code }).then(() => {
                        const data = {
                            phone: phone,
                            password: this.form.password,
                            code: this.form.code,
                        };
                        resetPasswordByPhone(data, { app: this.app })
                            .then(() => {
                                this.success = true;
                            })
                            .catch(() => {
                                this.success = false;
                            });
                    });
                }
            });
        },
        goLogin() {
            location.href = this.loginLink;
        },
        onBack() {
            this.success = null;
        },
        changeLang(lang) {
            this.form.lang = lang;
        },
    },
};
</script>

<style lang=""></style>
