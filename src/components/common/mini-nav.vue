<template>
    <aside class="c-aside c-aside-sm">
        <nav class="c-nav">
            <div class="c-aside__apps">
                <el-tooltip v-for="(item, index) in apps" :key="index" :content="item.label" placement="right">
                    <div class="u-app-item" :class="{ active: item.key === app }" @click="toggleApp(item)">
                        <img v-svg-inline :src="imgSrc(item.key)" alt="" />
                    </div>
                </el-tooltip>
                <img
                    class="u-app-item u-toggle"
                    :class="{ 'u-toggle--active': navExpanded }"
                    src="../../assets/img/icon/expanded.svg"
                    @click="toggle"
                />
            </div>
            <div class="c-aside__toggle"></div>
        </nav>
    </aside>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { apps } from "@/assets/data/config/app";
export default {
    name: "MiniNav",
    data() {
        return {
            apps,
        };
    },
    computed: {
        ...mapState(["navExpanded", "app"]),
    },
    methods: {
        ...mapMutations({
            setNav: "SET_NAV",
            setApp: "SET_APP",
        }),
        toggle() {
            this.setNav(!this.navExpanded);
        },
        imgSrc(key) {
            return require(`../../assets/img/app/${key}.svg`);
        },
        toggleApp(item) {
            this.setApp(item.key);
        },
    },
};
</script>

<!-- <style lang="less">
@import "~@/assets/css/common/nav.less";
</style> -->
