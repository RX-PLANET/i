<template>
    <div class="p-bind p-change-password">
        <page-header></page-header>
        <div class="m-change-password m-bind-block">
            <div class="m-bind-block__pic">
                <img src="@/assets/img/bind/password.svg" />
            </div>
            <div class="m-bind-block__main">
                <h1 class="u-header">{{ $t("security.nav.password") }}</h1>
                <div class="u-slogan">{{ $t("security.password.alert") }}</div>
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
                        <el-form-item prop="password1">
                            <template #label>
                                <div class="m-card-form-label">
                                    <span>{{ $t("security.password.new") }}<i class="is-required">*</i></span>
                                </div>
                            </template>
                            <el-input
                                v-model.trim="form.password1"
                                type="password"
                                size="large"
                                show-password
                                :placeholder="$t('security.password.new')"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password2">
                            <template #label>
                                <div class="m-card-form-label">
                                    <span>{{ $t("security.password.repeat") }}<i class="is-required">*</i></span>
                                </div>
                            </template>
                            <el-input
                                v-model.trim="form.password2"
                                type="password"
                                size="large"
                                show-password
                                :placeholder="$t('security.password.repeat')"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button
                        type="primary"
                        size="large"
                        :disabled="!form.password1 || !form.password2 || loading"
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
import { mapState } from "vuex";
import { changePassword, logout } from "@/service/account";
import pageHeader from "@/components/common/page-header.vue";
import User from "@iruxu/rx-common/utils/user";
export default {
    name: "dashboard-security-password",
    components: {
        pageHeader,
    },
    data() {
        return {
            form: {
                password1: "",
                password2: "",
            },
            rules: {
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
            loading: false,
        };
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        logout() {
            logout().then(() => {
                User.logout();
                this.$router.push({ name: "email-login" });
            });
        },
        submit() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    const params = {};
                    if (this.app !== "iruxu") {
                        params.app = this.app;
                    }
                    changePassword(this.form, params)
                        .then(() => {
                            this.$message.success(this.$t("security.password.changeSuccess"));

                            this.logout();
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

<style lang="less">
@import "~@/assets/css/account/common.less";
@import "~@/assets/css/account/email/login.less";
@import "~@/assets/css/notification/bind/bind.less";
.m-change-password {
    .el-input__wrapper.is-focus {
        background-color: @primary-bgc;
    }
    input:-internal-autofill-selected {
        background: none !important;
    }
    input:-webkit-autofill {
        -webkit-appearance: none !important;
        appearance: none !important;
        background: #fff !important;
    }
}
</style>
