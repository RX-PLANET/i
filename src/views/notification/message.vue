<template>
    <div class="p-message">
        <page-header></page-header>
        <messageBox class="l-dashboard-primary" :initApp="initApp"></messageBox>
    </div>
</template>

<script>
import messageBox from "./components/message-box.vue";
import pageHeader from "@/components/common/page-header.vue";
export default {
    name: "dashboard-notification-message",
    components: {
        messageBox,
        pageHeader,
    },
    computed: {
        initApp() {
            return "";
        },
    },
};
</script>

<style lang="less">
.p-message {
    min-height: 100vh;
}
</style>
<style lang="less">
@import "@/assets/css/notification/message/message.less";
</style>
