<template>
    <aside class="c-aside" :class="{ 'is-close': !navExpanded }">
        <nav class="c-nav">
            <a class="c-nav__brand" href="/dashboard">
                {{ appLabel || $t("notification.nav.dashboard") }}
            </a>

            <div class="c-collapse">
                <nav class="c-collapse-nav">
                    <div class="m-nav-item" @click="onNavItemClick" v-for="item in nav" :key="item.title">
                        <a href="#" class="u-nav-link" :class="{ active: isParentActive(item.children) }">
                            <el-icon class="u-icon"><component :is="item.icon"></component></el-icon>
                            <span class="u-title">{{ item.title }}</span>
                        </a>

                        <div class="m-collapse" :class="{ expanded: false }">
                            <nav class="m-collapse-nav">
                                <a
                                    class="u-nav-link u-nav-link--child"
                                    :class="{ active: isActive(child.routeName) }"
                                    v-for="child in item.children"
                                    :key="child.title"
                                    @click.stop="onChildClick(child)"
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
import { mapState, mapGetters } from "vuex";
import nav from "@/assets/data/nav";
export default {
    name: "Nav",
    data() {
        return {
            nav,

            active: "",
        };
    },
    computed: {
        ...mapState(["navExpanded"]),
        ...mapGetters(["appLabel"]),
        routeName() {
            return this.$route.name;
        },
    },
    watch: {
        routeName: {
            immediate: true,
            handler(newVal) {
                this.active = newVal;
            },
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        onNavItemClick(e) {
            e.preventDefault();

            // 确保点击的是父元素
            if (e.target.classList.contains("u-title") || e.target.classList.contains("u-nav-link")) {
                // 找到最近的 .m-nav-item 元素
                const navItem = e.target.closest(".m-nav-item");
                if (!navItem) return;

                navItem.classList.toggle("collapsed");

                const nextElement = navItem.querySelector(".m-collapse");

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
            }
        },
        // 判断是否激活, 用于高亮,子激活父也激活
        isActive(routeName) {
            return this.active === routeName;
        },
        isParentActive(children) {
            return children.some((child) => child.routeName === this.active);
        },
        // 初始化
        init() {
            // 为当前激活的菜单添加.show
            const activeNav = document.querySelector(`.u-nav-link.active`);
            if (activeNav) {
                const parent = activeNav.closest(".m-nav-item");
                if (parent) {
                    parent.classList.add("collapsed");
                    const nextElement = parent.querySelector(".m-collapse");
                    if (nextElement) {
                        nextElement.classList.add("show");
                        nextElement.style.height = nextElement.scrollHeight + "px";
                    }
                }
            }
        },
        onChildClick(child) {
            this.active = child.routeName;
            this.$router.push({ name: child.routeName });
        },
    },
};
</script>

<!-- <style lang="less">
@import "~@/assets/css/common/nav.less";
</style> -->
