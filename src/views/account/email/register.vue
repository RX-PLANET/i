<template>
    <div class="p-account-email__register">
        <register app="miipet" />
    </div>
</template>

<script>
import register from "@/components/account/email/register.vue";
export default {
    name: "AccountEmailRegister",
    components: {
        register,
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/email/register.less";
</style>
