<template>
    <div class="p-bind p-account p-bind-phone">
        <page-header></page-header>
        <main class="m-bind-main">
            <div class="m-bind--header">
                <el-radio-group v-model="active">
                    <el-radio-button value="phone">{{ $t("dashboard.bindPhone") }}</el-radio-button>
                    <el-radio-button value="email">{{ $t("dashboard.bindEmail") }}</el-radio-button>
                </el-radio-group>
            </div>

            <component :is="activeComponent"></component>
        </main>
    </div>
</template>

<script>
import pageHeader from "@/components/common/page-header.vue";
import bindEmail from "./components/bind-email.vue";
import bindPhone from "./components/bind-phone.vue";
export default {
    name: "dashboard-bind-phone",
    components: {
        pageHeader,
        bindEmail,
        bindPhone,
    },
    computed: {
        activeComponent() {
            return this.active === "phone" ? "bindPhone" : "bindEmail";
        },
    },
    data() {
        return {
            active: "phone",
        };
    },
};
</script>

<style lang="less">
@import "~@/assets/css/account/common.less";
@import "~@/assets/css/account/email/login.less";
.p-bind {
    .m-bind-main {
        margin: 0 60px;
        padding: 2rem 2.5rem;
        background-color: #fff;
        border-radius: 4px;
    }

    .m-bind--header {
        .x;
    }
}
</style>
