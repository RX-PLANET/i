<template>
    <div class="m-message-filter w-card">
        <div
            class="u-item"
            :class="level === item.value ? 'is-active' : ''"
            v-for="item in levelList"
            :key="item.value"
            @click="levelChange(item.value)"
        >
            <el-icon v-if="level !== item.value"><Star /></el-icon>
            <el-icon v-else color="#409EFF"><StarFilled /></el-icon>
            <b>{{ item.label }}</b>
        </div>
        <el-divider></el-divider>
        <div
            class="u-item"
            :class="status === item.value ? 'is-active' : ''"
            v-for="item in statusList"
            :key="item.value"
            @click="statusChange(item.value)"
        >
            <el-icon v-if="status !== item.value"><Star /></el-icon>
            <el-icon v-else color="#409EFF"><StarFilled /></el-icon>
            <b>{{ item.label }}</b>
        </div>
        <el-divider></el-divider>
        <div
            class="u-item"
            :class="app === item.value ? 'is-active' : ''"
            v-for="item in appList"
            :key="item.value"
            @click="appChange(item.value)"
        >
            <el-icon v-if="app !== item.value"><Star /></el-icon>
            <el-icon v-else color="#409EFF"><StarFilled /></el-icon>
            <b>{{ item.label }}</b>
        </div>
    </div>
</template>

<script>
import { apps } from "@/assets/data/config/app";
const { level, status } = require("@/assets/data/message.json");
export default {
    name: "MessageFilter",
    props: {
        initApp: {
            type: String,
            default: "",
        },
        data: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            levelList: level,
            statusList: status,
            appList: apps,

            app: "",
            level: "",
            status: "",
        };
    },
    computed: {
        params() {
            const { status, level, app } = this;
            return { status, level, app };
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
    methods: {
        levelChange(val) {
            this.level = val === this.level ? "" : val;
        },
        statusChange(val) {
            this.status = val === this.status ? "" : val;
        },
        appChange(val) {
            this.app = val === this.app ? "" : val;
        },
    },
};
</script>

<style lang="less">
.m-message-filter {
    width: 280px;
    padding: 20px;
    box-sizing: border-box;
    .r(10px);
    @media screen and (max-width: @phone) {
        width: 100%;
    }

    .u-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
        .r(10px);
        font-size: 14px;
        user-select: none;

        &:hover,
        &.is-active {
            color: #409eff;
            background-color: #f8f8f8;
        }
    }
}
</style>
