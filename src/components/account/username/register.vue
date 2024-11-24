<!-- 公共组件 用户名注册 -->
<template>
    <div class="m-card m-register-card">
        <card-header :title="$t('account.common.register')">
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
                <el-form-item prop="username">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.username.name") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.username" size="large"> </el-input>
                </el-form-item>
                <el-form-item prop="password" class="m-password">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.common.password") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.password" type="password" size="large" show-password> </el-input>
                </el-form-item>
            </el-form>
            <div class="u-terms">
                <el-checkbox v-model="agreement" class="u-checkbox"
                    >{{ $t("account.common.read") }}
                    <a :href="terms" target="_blank">《{{ $t("account.common.terms") }}》 </a>
                </el-checkbox>
            </div>
            <el-button class="u-button u-submit" type="primary" @click="onRegister" :disabled="!canSubmit">{{
                $t("account.common.register")
            }}</el-button>
        </div>

        <main class="m-card-main" v-if="success == true">
            <el-alert
                class="m-alert"
                :title="$t('account.email.registerSuccess')"
                type="success"
                :description="$t('account.email.registerSuccessDesc')"
                show-icon
                :closable="false"
            >
            </el-alert>
            <el-button size="large" class="u-btn u-back" type="primary" @click="goLogin">{{
                $t("account.common.login")
            }}</el-button>
        </main>

        <main class="m-card-main" v-if="success == false">
            <el-alert
                class="m-alert"
                :title="$t('account.email.registerFailed')"
                type="error"
                :description="$t('account.email.registerFailedDesc')"
                show-icon
                :closable="false"
            >
            </el-alert>
            <el-button size="large" class="u-btn u-back" type="primary" @click="onBack">{{
                $t("account.common.back")
            }}</el-button>
        </main>
    </div>
    <div class="m-footer">
        <div class="m-footer-skip">
            {{ $t("account.common.hadAccount") }}
            <a class="u-link" :href="loginLink">{{ $t("account.common.login") }} &raquo;</a>
        </div>
    </div>
</template>

<script>
import { checkUsername, registerByUsername } from "@/service/username";
import User from "@iruxu/pkg-common/utils/user";
export default {
    name: "UsernameRegister",
    props: {
        app: {
            type: String,
            default: "",
        },
        agreements: {
            // 协议
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            form: {
                username: "",
                password: "",
                lang: "",
            },

            rules: {
                username: [
                    { required: true, message: this.$t("account.username.namePlaceholder"), trigger: "blur" },
                    { validator: this.check, trigger: "blur" },
                    { min: 3, max: 20, message: this.$t("account.username.nameError"), trigger: "blur" },
                ],
                password: [
                    { required: true, message: this.$t("account.common.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.common.passwordError"), trigger: "blur" },
                ],
            },

            agreement: false,

            success: null,

            terms: "/doc/terms",
        };
    },
    computed: {
        canSubmit() {
            return this.form.username && this.form.password && this.agreement;
        },
        loginLink() {
            const path = this.$router.resolve({ name: "username-login", query: { app: this.app } });
            return path.href;
        },
    },
    async mounted() {
        // 生成特征码
        User.generateFingerprint();

        // 获取浏览器语言|系统语言
        this.form.lang = User.getLocale();
    },
    methods: {
        async check(rule, value, callback) {
            if (!value) {
                callback(new Error(this.$t("account.username.namePlaceholder")));
            } else {
                // 长度最小3，最大20，禁止任何符号，不能是纯数字，必须以字母开头
                const regex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/;
                if (!regex.test(value)) {
                    callback(new Error(this.$t("account.username.nameValidate")));
                } else {
                    const res = await checkUsername(value);
                    if (res) {
                        callback(new Error(this.$t("account.username.nameExist")));
                    } else {
                        callback();
                    }
                }
            }
        },
        onRegister() {
            this.$refs.registerForm.validate(async (valid) => {
                if (valid) {
                    registerByUsername(this.form, { app: this.app })
                        .then(() => {
                            this.$message.success(this.$t("account.username.registerSuccess"));
                            // this.$router.push({ name: "username-login", query: { app: this.app } });
                            this.success = true;
                        })
                        .catch(() => {
                            this.success = false;
                        });
                }
            });
        },
        changeLang(lang) {
            this.form.lang = lang;
        },
        goLogin() {
            location.href = this.loginLink;
        },
        onBack() {
            this.success = null;
        },
    },
};
</script>
