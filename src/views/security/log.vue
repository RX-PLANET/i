<template>
    <div class="p-log">
        <page-header></page-header>
        <div class="l-dashboard-primary m-log-box">
            <logNav></logNav>
            <component v-if="isInTypes" :app="app" :is="type"></component>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import logNav from "./components/log-nav.vue";
import pageHeader from "@/components/common/page-header.vue";
import loginLog from "./components/login-log.vue";
import accountLog from "./components/account-log.vue";
import actionLog from "./components/action-log.vue";
import { types } from "@/assets/data/log";
export default {
    name: "dashboard-security-log",
    components: {
        pageHeader,
        logNav,
        login: loginLog,
        account: accountLog,
        action: actionLog,
    },
    computed: {
        ...mapState(["app"]),
        type() {
            return this.$route.params.type || "login";
        },
        isInTypes() {
            return types.findIndex((item) => item.value === this.type) > -1;
        },
    },
};
</script>

<style lang="less">
.p-log {
    min-height: 100vh;
}
</style>
<style lang="less">
@import "@/assets/css/security/log/log.less";
</style>
