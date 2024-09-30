<template>
    <div class="m-email-result">
        <div v-html="emailResult"></div>

        <router-link class="u-back el-button el-button--primary el-button--large" :to="{ path: '/user/profile' }">{{
            $t("user.email.back_to_profile")
        }}</router-link>
    </div>
</template>

<script>
export default {
    name: "EmailResult",
    props: {
        email: {
            type: String,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        emailResult() {
            return this.$t("dashboard.verifyContent", { url: this.email });
        },
    },
    methods: {},
    mounted() {},
};
</script>

<style lang="less">
.m-email-result {
    min-width: 600px;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.8;
    // border: 1px solid #ebeef5;
    // border-radius: 4px;
    padding: 20px;
    margin-top: 20px;

    h1 {
        .bold;
        font-size: 32px;
        margin-bottom: 10px;
        .x;
    }

    b {
        color: orange;
        .bold;
    }

    .u-back {
        margin: 20px auto;
        .db;
        .w(200px);
    }
}
</style>
