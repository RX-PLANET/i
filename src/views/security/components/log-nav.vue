<template>
    <div class="m-log-filter w-card">
        <div class="m-log-filter__group">
            <div
                class="m-log-filter__item"
                :class="type === item.value ? 'is-active' : ''"
                v-for="item in types"
                :key="item.value"
                @click="typeChange(item.value)"
            >
                <img class="u-img" :src="getIcon(item.value)" v-svg-inline />
                <b>{{ item.label }}</b>
            </div>
        </div>
    </div>
</template>

<script>
import { types } from "@/assets/data/log.js";
export default {
    name: "LogFilter",
    data() {
        return {
            types,
            type: "login",
        };
    },
    computed: {
        params() {
            const { type } = this.$route.params;
            return { type };
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function (params) {
                this.type = params.type || "login";
                this.$router.push({
                    params,
                });
            },
        },
    },
    methods: {
        typeChange(type) {
            const params = { type };
            this.$router.push({
                params,
            });
        },
        getIcon(key) {
            return require(`../../../assets/img/dashboard/${key}_log.svg`);
        },
    },
};
</script>

<style lang="less"></style>
