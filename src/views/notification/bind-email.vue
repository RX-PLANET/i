<template>
    <div class="p-bind p-bind-email">
        <page-header></page-header>
        <div class="m-bind-email m-bind-block">
            <div class="m-bind-block__pic">
                <img src="@/assets/img/bind/email.svg" />
            </div>
            <div class="m-bind-block__main">
                <h1 class="u-header">{{ $t("notification.email.bindEmail") }}</h1>
                <div class="u-slogan">{{ $t("notification.email.bindEmailAlert") }}</div>
                <template v-if="profile.email && !isEdit">
                    <div class="m-current">
                        {{ $t("notification.email.currentBind") }}:
                        <span class="u-current">{{ profile.email || $t("notification.email.noBind") }}</span>
                        <span class="u-status--success" v-if="profile.email"
                            ><el-icon><CircleCheckFilled /></el-icon
                        ></span>
                    </div>
                    <div class="u-bind-tips">{{ $t("account.common.accountBind") }}</div>
                    <el-button class="u-edit-btn" @click="onEditBind">{{ $t("account.common.editBind") }}</el-button>
                </template>
                <div class="m-login-card m-card-main" v-if="!profile.email || isEdit">
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

                    <a class="u-back" @click="onCancelEdit" v-if="isEdit"
                        ><el-icon><ArrowLeftBold /></el-icon>{{ $t("account.common.back") }}</a
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { bindEmail, verifyEmail } from "@/service/account";
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
                    { required: true, message: this.$t("notification.email.addressPlaceholder"), trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                            if (value === this.profile.email) {
                                callback(new Error(this.$t("notification.email.sameError")));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                    { type: "email", message: this.$t("notification.email.addressError"), trigger: "blur" },
                ],
                code: [{ required: true, message: this.$t("notification.phone.codePlaceholder"), trigger: "blur" }],
            },

            interval: 0,
            timer: null,
            loading: false,

            isEdit: false,
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
                            this.$message.success(this.$t("account.common.bindSuccess"));

                            this.$store.dispatch("getProfile");
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
        },

        onEditBind() {
            this.isEdit = true;
        },
        onCancelEdit() {
            this.isEdit = false;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/account/common.less";
@import "~@/assets/css/account/email/login.less";
@import "~@/assets/css/notification/bind/bind.less";

.p-bind-email {
    .is-required {
        color: @primary-danger;
        font-style: normal;
        padding: 0 5px;
        font-style: normal;
    }
}
</style>
