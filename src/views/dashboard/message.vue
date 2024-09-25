<template>
    <div class="p-message">
        <messageBox :initApp="initApp"></messageBox>
    </div>
</template>

<script>
import messageBox from "./components/message-box.vue";
export default {
    name: "dashboard-notification-message",
    components: {
        messageBox,
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
    padding: 20px;
}
</style>
