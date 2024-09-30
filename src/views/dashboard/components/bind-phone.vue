<template>
    <div class="m-bind-phone">
        <div class="u-pic"></div>
        <div class="m-info">
            <h1 class="u-header">{{ $t("dashboard.bindPhone") }}</h1>
            <div class="u-slogan">{{ $t("dashboard.bindPhoneAlert") }}</div>
            <div class="m-current">
                {{ $t("dashboard.currentBind") }}:
                <span class="u-current">{{ profile.phone || $t("dashboard.noBind") }}</span>
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
                        <el-input
                            v-model.trim="form.code"
                            :placeholder="$t('account.phone.code')"
                            size="large"
                        ></el-input>
                        <el-button
                            class="u-btn-send"
                            size="small"
                            @click="sendCode"
                            :disabled="interval > 0 || !phoneChecked"
                            >{{ $t("account.phone.send") }}<span v-if="interval">({{ interval }}s)</span></el-button
                        >
                    </el-form-item>
                </el-form>
                <el-button
                    type="primary"
                    size="large"
                    :disabled="!form.phone || !form.code"
                    @click="submit"
                    :loading="loading"
                    style="width: 100%"
                    >{{ $t("common.confirm") }}</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import phoneCodeSelect from "@iruxu/pkg-widget/src/components/common/phone-code-select.vue";
import { sendBindCode, checkPhoneCode, bindPhoneCode } from "@/service/phone";
import { parsePhoneNumberFromString } from "libphonenumber-js";
export default {
    name: "dashboard-bind-phone",
    components: {
        phoneCodeSelect,
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
                phone: "",
                code: "",
            },
            phoneCode: 86,
            rules: {
                phone: [
                    { required: true, message: this.$t("account.phone.numberPlaceholder"), trigger: "change" },
                    {
                        validator: (rule, value, callback) => {
                            const phone = `+${this.phoneCode}${value}`;

                            if (phone === this.profile.phone) {
                                this.phoneChecked = false;
                                callback(new Error(this.$t("dashboard.sameError")));
                            }

                            const phoneNumber = parsePhoneNumberFromString(phone);
                            if (!phoneNumber || !phoneNumber?.isValid()) {
                                this.phoneChecked = false;
                                callback(new Error(this.$t("account.phone.numberError")));
                            } else {
                                this.phoneChecked = true;
                                callback();
                            }
                        },
                        trigger: "change",
                    },
                ],
                code: [{ required: true, message: this.$t("account.phone.codePlaceholder"), trigger: "change" }],
            },

            interval: 0,
            phoneChecked: false,
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
            sendBindCode({ phone: `+${this.phoneCode}${this.form.phone}` }, { app: this.app }).then(() => {
                this.$message.success(this.$t("account.phone.sendSuccess"));
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
                    const params = {
                        phone: `+${this.phoneCode}${this.form.phone}`,
                        code: this.form.code,
                    };
                    checkPhoneCode(params)
                        .then(() => {
                            bindPhoneCode(params, { app: this.app })
                                .then(() => {
                                    this.$message.success(this.$t("common.bindSuccess"));

                                    this.$store.dispatch("getUserInfo");
                                })
                                .finally(() => {
                                    this.loading = false;
                                });
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                }
            });
        },
    },
};
</script>

<style lang="less"></style>
