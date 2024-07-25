<template>
    <div class="p-account-email__register p-reset-password">
        <el-card class="m-account-email__register">
            <card-header></card-header>

            <el-form :model="form" ref="resetForm" :rules="rules">
                <el-form-item prop="email">
                    <el-input v-model.trim="form.email" size="large" placeholder="邮箱地址">
                        <template #prepend
                            ><el-icon><Message></Message></el-icon
                        ></template>
                        <template #append v-if="timer">
                            <span @click="onResetPassword"
                                >重新发送 (<span>{{ interval }}s</span>)</span
                            >
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="u-button" type="primary" @click="onResetPassword">下一步</el-button>
                </el-form-item>
            </el-form>
            <main class="m-main"></main>
        </el-card>
    </div>
</template>

<script>
import CardHeader from "@/components/common/card-header.vue";
import { checkEmail, findPassword } from "@/service/account";
export default {
    name: "ResetPassword",
    components: {
        CardHeader,
    },
    data() {
        return {
            form: {
                email: "",
            },

            rules: {
                email: [
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
                    { validator: this.check, trigger: "blur" },
                ],
            },

            timer: null,
            interval: 180,
            app: "",
        };
    },
    mounted() {
        const search = new URLSearchParams(location.search);
        this.app = search.get("app");

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.interval = 180;
        }
    },
    methods: {
        async check(rule, value, callback) {
            if (!value) {
                callback(new Error("请输入邮箱地址"));
            } else {
                const res = await checkEmail(value);
                if (!res) {
                    callback(new Error("邮箱地址不存在"));
                }
                callback();
            }
        },
        onResetPassword() {
            this.$refs.resetForm.validate(async (valid) => {
                if (valid) {
                    findPassword(this.form, { app: this.app }).then(() => {
                        this.$message.success("验证码已发送至您的邮箱，请查收");

                        // 定时180s才能再次发送
                        this.timer = setInterval(() => {
                            this.interval--;
                            if (this.interval <= 0) {
                                clearInterval(this.timer);
                                this.timer = null;
                                this.interval = 180;
                            }
                        }, 1000);
                    });
                }
            });
        },
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/email/register.less";
</style>
