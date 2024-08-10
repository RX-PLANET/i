<template>
    <div class="p-account p-account-username__register">
        <register :app="app" />
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
        return {
            app: "",
        };
    },
    mounted() {
        const search = new URLSearchParams(document.location.search);

        if (search.has("app")) {
            this.app = search.get("app");
        }
    },
};
</script>

<style lang="less">
@import "@/assets/css/account/index.less";
@import "@/assets/css/account/username/register.less";
</style>
