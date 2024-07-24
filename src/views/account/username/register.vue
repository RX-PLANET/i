<template>
    <div class="p-account-username__register">
        <register app="" />
    </div>
</template>

<script>
import Register from "@/components/account/username/register.vue";
export default {
    name: "AccountUsernameRegister",
    components: {
        Register,
    },
    data() {
        return {};
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/username/register.less";
</style>
