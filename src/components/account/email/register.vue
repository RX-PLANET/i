<template>
    <div class="m-card m-register-card">
        <card-header :title="$t('common.register')"></card-header>

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
                <el-form-item prop="nickname">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("email.nickname") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.nickname" size="large"> </el-input>
                </el-form-item>
                <el-form-item prop="_invite_code">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("email.invite_code") }}</span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.lang" size="large"> </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("email.address") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.email" size="large"> </el-input>
                </el-form-item>
                <el-form-item prop="_code">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("email.code") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.email" size="large"> </el-input>
                </el-form-item>
                <el-form-item prop="password" class="m-password">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("common.password") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.password" type="password" size="large" show-password> </el-input>
                </el-form-item>
                <el-form-item prop="password" class="m-password">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("common.passwordConfirm") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.password" type="password" size="large" show-password> </el-input>
                </el-form-item>
            </el-form>
            <div class="u-terms">
                <el-checkbox v-model="agreement" class="u-checkbox"
                    >{{ $t("common.read") }}
                    <a :href="terms" target="_blank">《{{ $t("common.terms") }}》 </a>
                </el-checkbox>
            </div>
            <el-button class="u-btn u-submit" type="primary" @click="onRegister" :disabled="!canSubmit">{{
                $t("common.register")
            }}</el-button>
        </div>

        <main class="m-card-main" v-if="success == true">
            <el-alert
                class="m-alert"
                :title="$t('email.registerSuccess')"
                type="success"
                :description="$t('email.registerSuccessDesc')"
                show-icon
                :closable="false"
            >
            </el-alert>
            <el-button size="large" class="u-btn u-back" type="primary" @click="goLogin">{{
                $t("common.login")
            }}</el-button>
        </main>

        <main class="m-card-main" v-if="success == false">
            <el-alert
                class="m-alert"
                :title="$t('email.registerFailed')"
                type="error"
                :description="$t('email.registerFailedDesc')"
                show-icon
                :closable="false"
            >
            </el-alert>
            <el-button size="large" class="u-btn u-back" type="primary" @click="onBack">{{
                $t("common.back")
            }}</el-button>
        </main>
    </div>
    <div class="m-footer">
        <div class="m-footer-skip">
            {{ $t("common.hadAccount") }} <a class="u-link" :href="loginLink">{{ $t("common.login") }} &raquo;</a>
        </div>
    </div>
</template>

<script>
import { checkEmail, registerByEmail } from "@/service/email";
import CardHeader from "@/components/common/card-header.vue";
import User from "@/utils/user";

export default {
    name: "EmailRegister",
    props: {
        app: {
            type: String,
            default: "",
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
                    { required: true, message: this.$t("email.addressPlaceholder"), trigger: "blur" },
                    { type: "email", message: this.$t("email.addressError"), trigger: ["blur", "change"] },
                    { validator: this.check, trigger: "blur" },
                ],
                password: [
                    { required: true, message: this.$t("common.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("common.passwordError"), trigger: "blur" },
                ],
            },

            agreement: false,

            success: null,

            terms: "/doc/terms",
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
    },
    mounted() {
        // 生成特征码
        User.generateFingerprint();
    },
    methods: {
        async check(rule, value, callback) {
            if (!value) {
                callback(new Error(this.$t("email.addressPlaceholder")));
            } else {
                const res = await checkEmail(value);
                if (res) {
                    callback(new Error(this.$t("email.emailRegistered")));
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
        goLogin() {
            this.$router.push({ name: "email-login", query: { app: this.app } });
        },
        onBack() {
            this.success = null;
        },
    },
};
</script>
