<template>
    <div class="p-bind">
        <page-header></page-header>
        <div class="m-bind-email m-bind-block">
            <div class="m-bind-block__pic"></div>
            <div class="m-bind-block__main">
                <h1 class="u-header">{{ $t("notification.email.bindEmail") }}</h1>
                <div class="u-slogan">{{ $t("notification.email.bindEmailAlert") }}</div>
                <div class="m-current">
                    {{ $t("notification.email.currentBind") }}:
                    <span class="u-current">{{ profile.email || $t("notification.email.noBind") }}</span>
                    <span class="u-status--success" v-if="profile.email"
                        ><el-icon><CircleCheckFilled /></el-icon
                    ></span>
                </div>
                <div class="m-login-card m-card-main">
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
                        <el-form-item prop="email">
                            <template #label>
                                <div class="m-card-form-label">
                                    <span>{{ $t("notification.email.address") }}<i class="is-required">*</i></span>
                                </div>
                            </template>
                            <el-input v-model.trim="form.email" size="large"> </el-input>
                        </el-form-item>
                        <el-form-item prop="code" class="u-code">
                            <template #label>
                                <div class="m-card-form-label">
                                    <span>{{ $t("notification.email.code") }}<i class="is-required">*</i></span>
                                </div>
                            </template>
                            <el-input
                                v-model.trim="form.code"
                                :placeholder="$t('notification.email.code')"
                                size="large"
                            ></el-input>
                            <el-button
                                class="u-btn-send"
                                size="small"
                                @click="sendCode"
                                :disabled="interval > 0 || !form.email"
                                >{{ $t("notification.email.send")
                                }}<span v-if="interval">({{ interval }}s)</span></el-button
                            >
                        </el-form-item>
                    </el-form>
                    <el-button
                        type="primary"
                        size="large"
                        :disabled="!form.email || loading"
                        @click="submit"
                        :loading="loading"
                        style="width: 100%"
                        >{{ $t("notification.email.confirm") }}</el-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { bindEmail, verifyEmail } from "@/service/email";
import pageHeader from "@/components/common/page-header.vue";
export default {
    name: "dashboard-bind-email",
    components: {
        pageHeader,
    },
    props: {
        app: {
            type: String,
            default: "miipet",
        },
    },
    data() {
        return {
            form: {
                email: "",
                code: "",
            },
            rules: {
                email: [
                    { required: true, message: this.$t("notification.email.addressPlaceholder"), trigger: "change" },
                    {
                        validator: (rule, value, callback) => {
                            if (value === this.profile.email) {
                                callback(new Error(this.$t("notification.email.sameError")));
                            } else {
                                callback();
                            }
                        },
                        trigger: "change",
                    },
                    { type: "email", message: this.$t("notification.email.addressError"), trigger: "change" },
                ],
                code: [{ required: true, message: this.$t("notification.phone.codePlaceholder"), trigger: "change" }],
            },

            interval: 0,
            timer: null,
            loading: false,
        };
    },
    computed: {
        profile() {
            return this.$store.state.user;
        },
    },
    methods: {
        sendCode() {
            bindEmail({ email: this.form.email }, { app: this.app }).then(() => {
                this.$message.success(this.$t("notification.email.sendSuccess"));
                this.interval = 60;
                const timer = setInterval(() => {
                    this.interval--;
                    if (this.interval <= 0) {
                        clearInterval(timer);
                    }
                }, 1000);
            });
        },
        submit() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    verifyEmail({ code: this.form.code }, { app: this.app })
                        .then(() => {
                            this.$message.success(this.$t("common.bindSuccess"));

                            this.$store.dispatch("getUserInfo");
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.m-bind-email {
    .m-login-card {
        .w(400px);
    }
}
</style>

<style lang="less">
@import "~@/assets/css/account/common.less";
@import "~@/assets/css/account/email/login.less";
@import "~@/assets/css/notification/bind/bind.less";
</style>
