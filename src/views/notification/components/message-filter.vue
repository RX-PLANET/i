<template>
    <div class="m-message-filter w-card">
        <div class="m-message-filter__group">
            <div
                class="m-message-filter__item"
                :class="app === item.value ? 'is-active' : ''"
                v-for="item in apps"
                :key="item.value"
                @click="appChange(item.value)"
            >
                <img class="u-img" :src="getAppIcon(item.key)" v-svg-inline />
                <b>{{ item.label }}</b>
            </div>
        </div>
        <div class="m-message-filter__group">
            <div
                class="m-message-filter__item"
                :class="level === item.value ? 'is-active' : ''"
                v-for="item in levels"
                :key="item.value"
                @click="levelChange(item.value)"
            >
                <div class="u-icon" :class="`u-icon-${item.value}`"></div>
                <b>{{ item.label }}</b>
            </div>
        </div>
    </div>
</template>

<script>
import { apps } from "@/assets/data/config/app";
import { levels } from "@/assets/data/message.js";
export default {
    name: "MessageFilter",
    props: {
        initApp: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            levels,
            apps,

            app: "",
            level: "",
        };
    },
    computed: {
        params() {
            const { level, app } = this;
            return { level, app };
        },
    },
    watch: {
        initApp: {
            immediate: true,
            handler(app) {
                if (app) {
                    this.app = app;
                }
            },
        },
        params: {
            deep: true,
            handler: function (obj) {
                this.$emit("update", obj);
            },
        },
    },
    mounted() {
        const params = this.$route.params;
        if (params.app) {
            this.app = params.app;
        }
        if (params.level) {
            this.level = params.level;
        }
    },
    methods: {
        levelChange(val) {
            this.level = val === this.level ? "" : val;
        },
        appChange(val) {
            this.app = val === this.app ? "" : val;
        },
        getAppIcon(key) {
            return require(`../../../assets/img/nav/${key}.svg`);
        },
    },
};
</script>

<style lang="less"></style>
