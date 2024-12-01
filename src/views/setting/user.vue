<template>
    <div class="p-setting-user">
        <page-header></page-header>

        <main class="m-user-main l-dashboard-primary">
            <user-nav></user-nav>

            <section class="m-user-main__right">
                <router-view></router-view>
            </section>
        </main>
    </div>
</template>

<script>
import pageHeader from "@/components/common/page-header.vue";
import UserNav from "./components/user-nav.vue";
export default {
    name: "UserProfile",
    components: {
        pageHeader,
        UserNav,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="less">
@import "@/assets/css/setting/user.less";
</style>
