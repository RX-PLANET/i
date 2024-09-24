<template>
    <aside class="c-aside" :class="{ 'is-close': !navExpanded }">
        <nav class="c-nav">
            <a class="c-nav__brand" href="/dashboard">
                <!-- <img class="u-logo" src="../../assets/img/test.svg" svg-inline alt="" /> -->
                Dashboard
            </a>

            <div class="c-collapse">
                <nav class="c-collapse-nav">
                    <div class="m-nav-item" @click="onNavItemClick" v-for="item in nav" :key="item.title">
                        <a href="#" class="u-nav-link" :class="{ active: active }">
                            <el-icon class="u-icon"><component :is="item.icon"></component></el-icon>
                            <span class="u-title">{{ item.title }}</span>
                        </a>

                        <div class="m-collapse" :class="{ expanded: false }">
                            <nav class="m-collapse-nav">
                                <a
                                    class="u-nav-link u-nav-link--child"
                                    :class="{ active: active }"
                                    v-for="child in item.children"
                                    :key="child.title"
                                    >{{ child.title }}</a
                                >
                            </nav>
                        </div>
                    </div>
                </nav>
            </div>
        </nav>
    </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Nav",
    data() {
        return {
            nav: [
                {
                    title: "Dashboards",
                    icon: "menu",
                    children: [
                        {
                            title: "Default",
                            route: "/dashboard/index",
                            routeName: "dashboard-index",
                        },
                    ],
                },
            ],

            active: "dashboard-index",
        };
    },
    computed: {
        ...mapState(["navExpanded"]),
    },
    methods: {
        onNavItemClick(e) {
            e.preventDefault();

            e.target.classList.toggle("collapsed");

            const nextElement = e.target.nextElementSibling;

            // 判断是否有子菜单
            if (nextElement) {
                nextElement.classList.toggle("show");

                // 设置height实现动画效果
                if (nextElement.classList.contains("show")) {
                    nextElement.style.height = nextElement.scrollHeight + "px";
                } else {
                    nextElement.style.height = "0";
                }
            }
        },
        // 判断是否激活, 用于高亮,子激活父也激活
        isActive(routeName) {
            return this.active === routeName;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/common/nav.less";
</style>
