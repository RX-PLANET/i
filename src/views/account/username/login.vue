<template>
    <div class="p-account-username__login">
        <login app=""></login>
    </div>
</template>

<script>
import login from "@/components/account/username/login.vue";
export default {
    name: "AccountUsernameLogin",
    components: {
        login,
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/username/login.less";
</style>
