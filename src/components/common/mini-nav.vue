<template>
    <aside class="c-aside c-aside-sm">
        <nav class="c-nav">
            <div class="c-aside__apps">
                <img class="u-app-item" src="../../assets/img/test.png" alt="" />
                <img class="u-app-item" src="../../assets/img/test.svg" alt="" />
                <img
                    class="u-app-item u-toggle"
                    :class="{ 'u-toggle--active': navExpanded }"
                    src="../../assets/img/icon/expanded.svg"
                    svg-inline
                    @click="toggle"
                />
            </div>
            <div class="c-aside__toggle"></div>
        </nav>
    </aside>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
    name: "MiniNav",
    data() {
        return {};
    },
    computed: {
        ...mapState(["navExpanded"]),
    },
    methods: {
        ...mapMutations({
            setNav: "SET_NAV",
        }),
        toggle() {
            this.setNav(!this.navExpanded);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/common/nav.less";
</style>
