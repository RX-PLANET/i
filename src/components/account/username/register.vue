<!-- 公共组件 用户名注册 -->
<template>
    <el-card class="m-account-username__register">
        <card-header></card-header>
        <el-form ref="registerForm" :model="form" :rules="rules" size="large" status-icon>
            <el-form-item prop="username">
                <el-input v-model.trim="form.username" size="large" placeholder="用户名">
                    <template #prepend
                        ><el-icon><UserFilled></UserFilled></el-icon
                    ></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model.trim="form.password" type="password" size="large" show-password placeholder="密码">
                    <template #prepend
                        ><el-icon><Lock></Lock></el-icon
                    ></template>
                </el-input>
            </el-form-item>
            <el-form-item class="u-terms">
                <el-checkbox v-model="agreement" class="u-checkbox"
                    >我已阅读同意
                    <a v-for="(item, index) in agreements" :key="index" :href="item.href" target="_blank"
                        >《{{ item.name }}》
                        {{ index === agreements.length - 1 ? "" : "、" }}
                    </a>
                </el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="u-button u-submit" type="primary" @click="onRegister" :disabled="!canSubmit"
                    >注册</el-button
                >
            </el-form-item>
            <el-form-item class="m-footer">
                <p class="u-login">已有账号? <a href="/">登录 &raquo;</a></p>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { checkUsername, registerByUsername } from "@/service/account";
import CardHeader from "@/components/common/card_header.vue";
import User from "@/utils/user";
export default {
    name: "UsernameRegister",
    components: {
        CardHeader,
    },
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
    data() {
        return {
            form: {
                username: "",
                password: "",
            },

            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { validator: this.check, trigger: "blur" },
                    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
                ],
            },

            agreement: false,
        };
    },
    computed: {
        canSubmit() {
            return this.form.username && this.form.password && this.agreement;
        },
    },
    async mounted() {
        // 生成特征码
        await User.generateFingerprint();
    },
    methods: {
        async check(rule, value, callback) {
            if (!value) {
                return callback(new Error("请输入用户名"));
            } else {
                // 长度最小3，最大20，禁止任何符号，不能是纯数字，必须以字母开头
                const regex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/;
                if (!regex.test(value)) {
                    callback(new Error("用户名需以字母开头，长度在 3 到 20 个字符"));
                } else {
                    const res = await checkUsername(value);
                    if (res) {
                        callback(new Error("用户名已存在"));
                    } else {
                        callback();
                    }
                }
            }
        },
        onRegister() {
            this.$refs.registerForm.validate(async (valid) => {
                if (valid) {
                    registerByUsername(this.form, { app: this.app }).then((res) => {
                        console.log(res);
                    });
                }
            });
        },
    },
};
</script>
