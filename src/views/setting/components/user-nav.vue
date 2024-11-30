<template>
    <div class="m-user-nav w-card">
        <div class="m-user-nav__group">
            <router-link
                class="m-user-nav__item"
                v-for="item in routes"
                :key="item.routeName"
                :to="{ name: item.routeName }"
                :class="item.routeName === $route.name ? 'is-active' : ''"
            >
                <img class="u-img" v-if="item.key" :src="getAppIcon(item.key)" v-svg-inline />
                <b>{{ item.title }}</b>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "user-nav",
    data() {
        return {
            routes: [
                {
                    title: this.$t("setting.nav.info"),
                    routeName: "dashboard-setting-info",
                },
                {
                    title: this.$t("setting.nav.profile"),
                    routeName: "dashboard-setting-profile",
                },
            ],
        };
    },
};
</script>
