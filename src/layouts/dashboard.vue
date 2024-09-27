<template>
    <div class="l-dashboard" :class="{ 'is-close': !navExpanded }">
        <Nav />
        <MiniNav />
        <main class="l-dashboard-main">
            <router-view />
        </main>
    </div>
</template>

<script>
import User from "@iruxu/pkg-common/utils/user";
import Nav from "@/components/common/nav";
import MiniNav from "@/components/common/mini-nav";
import { mapMutations, mapState } from "vuex";
export default {
    name: "DashboardLayout",
    components: {
        Nav,
        MiniNav,
    },
    data() {
        return {
            // Add data here
        };
    },
    computed: {
        ...mapState(["navExpanded"]),
    },
    mounted() {
        if (!User.isLogin()) {
            this.$router.push({ name: "email-login" });
        }
        this.init();
    },
    methods: {
        ...mapMutations({
            setNav: "SET_NAV",
        }),
        init() {
            try {
                const navExpanded = localStorage.getItem("nav_expanded");
                if (navExpanded) {
                    this.setNav(navExpanded === "true");
                }
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/layouts/dashboard.less";
</style>
