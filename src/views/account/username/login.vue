<template>
    <div class="p-account p-account-username__login">
        <login :app="app"></login>
    </div>
</template>

<script>
import login from "@/components/account/username/login.vue";
export default {
    name: "AccountUsernameLogin",
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
@import "@/assets/css/account/common.less";
@import "@/assets/css/account/username/login.less";
</style>
