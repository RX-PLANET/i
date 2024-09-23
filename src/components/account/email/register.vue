<template>
    <el-card class="m-card">
        <card-header :title="$t('common.register')"></card-header>

        <el-form
            class="m-form"
            hide-required-asterisk
            ref="registerForm"
            :model="form"
            :rules="rules"
            size="large"
            status-icon
            label-position="top"
            v-if="success === null"
        >
            <el-form-item prop="email">
                <template #label>
                    <div class="m-form-label">
                        <span>{{ $t("email.address") }}</span>
                    </div>
                </template>
                <el-input v-model.trim="form.email" size="large" :placeholder="$t('email.address')">
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
                <el-input
                    v-model.trim="form.password"
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
            <el-form-item class="u-terms">
                <el-checkbox v-model="agreement" class="u-checkbox"
                    >{{ $t("common.read") }}
                    <a v-for="(item, index) in agreements" :key="index" :href="item.href" target="_blank"
                        >《{{ item.name }}》
                        {{ index === agreements.length - 1 ? "" : "、" }}
                    </a>
                </el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="u-button u-submit" type="primary" @click="onRegister" :disabled="!canSubmit">{{
                    $t("common.register")
                }}</el-button>
            </el-form-item>
        </el-form>

        <main class="m-main" v-if="success == true">
            <el-alert
                :title="$t('email.waitVerify')"
                type="success"
                :description="successDesc"
                show-icon
                :closable="false"
            >
            </el-alert>
            <el-button class="u-button u-back" type="primary" @click="onBack">{{ $t("common.back") }}</el-button>
        </main>

        <main class="m-main" v-if="success == false"></main>
    </el-card>
    <div class="m-misc">
        {{ $t("common.hadAccount") }} <a class="u-link" :href="loginLink">{{ $t("common.login") }} &raquo;</a>
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
            return this.$t("email.successDesc");
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
        onBack() {
            this.$router.push({ name: "email-login", query: { app: this.app } });
        },
    },
};
</script>
