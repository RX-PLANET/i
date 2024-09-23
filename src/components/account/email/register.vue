<template>
    <div class="m-card m-register-card">
        <card-header class="m-card__header" :title="$t('common.register')"></card-header>

        <div class="m-primary" v-if="success === null">
            <el-form
                class="m-form"
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
                        <div class="m-form-label">
                            <span>{{ $t("email.nickname") }}</span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.nickname" size="large"> </el-input>
                </el-form-item>
                <el-form-item prop="lang">
                    <template #label>
                        <div class="m-form-label">
                            <span>{{ $t("email.lang") }}</span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.lang" size="large"> </el-input>
                </el-form-item>
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
                <el-form-item prop="_code">
                    <template #label>
                        <div class="m-form-label">
                            <span>{{ $t("email.code") }}</span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.email" size="large">
                        <!-- <template #prepend
                        ><el-icon><Message></Message></el-icon
                    ></template> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" class="m-password">
                    <template #label>
                        <div class="m-form-label">
                            <span>{{ $t("common.password") }}</span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.password" type="password" size="large" show-password>
                        <!-- <template #prepend
                        ><el-icon><Lock></Lock></el-icon
                    ></template> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" class="m-password">
                    <template #label>
                        <div class="m-form-label">
                            <span>{{ $t("common.passwordConfirm") }}</span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.password" type="password" size="large" show-password>
                        <!-- <template #prepend
                        ><el-icon><Lock></Lock></el-icon
                    ></template> -->
                    </el-input>
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

        <main class="m-primary" v-if="success == true">
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

        <main class="m-primary" v-if="success == false">
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
