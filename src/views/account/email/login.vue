<template>
    <div class="p-account p-account-email__login">
        <login :app="app"></login>
    </div>
</template>

<script>
import login from "@/components/account/email/login.vue";
export default {
    name: "AccountEmailLogin",
    components: {
        login,
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
@import "@/assets/css/account/email/login.less";
</style>
