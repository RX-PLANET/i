<template>
    <div class="m-message-filter w-card">
        <div class="m-group">
            <div
                class="u-item"
                :class="app === item.value ? 'is-active' : ''"
                v-for="item in apps"
                :key="item.value"
                @click="appChange(item.value)"
            >
                <img class="u-img" src="@/assets/img/test.svg" />
                <b>{{ item.label }}</b>
            </div>
        </div>
        <div class="m-group">
            <div
                class="u-item"
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
        data: {
            type: Object,
            default: null,
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
    methods: {
        levelChange(val) {
            this.level = val === this.level ? "" : val;
        },
        appChange(val) {
            this.app = val === this.app ? "" : val;
        },
    },
};
</script>

<style lang="less">
.m-message-filter {
    .flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 280px;
    padding: 2rem 2.5rem;
    box-sizing: border-box;
    .r(10px);
    @media screen and (max-width: @phone) {
        width: 100%;
    }
    .m-group {
        .flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .u-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0.64rem 1rem;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
        .r(0.85rem);
        font-size: 14px;
        user-select: none;
        font-size: 13px;

        .u-img {
            .size(20px);
        }

        .u-icon {
            @size: 14px;
            position: relative;
            border: 2px solid rgba(#ccc, 0.3);
            .size(@size);
            .r(50%);
            box-sizing: border-box;
            &::after {
                width: calc(@size / 2);
                height: calc(@size);
                border: 2px solid #ccc;
                border-radius: 0 100% 100% 0/50%;
                border-left: none;

                position: absolute;
                right: -2px;
                top: -2px;
                content: "";
                box-sizing: border-box;
            }
            &-3 {
                border-color: rgba(#f14c41, 0.3);
                &::after {
                    border-color: #f14c41;
                }
            }
            &-2 {
                border-color: rgba(#75cc68, 0.3);
                &::after {
                    border-color: #75cc68;
                }
            }
            &-1 {
                border-color: rgba(#7239ea, 0.3);
                &::after {
                    border-color: #7239ea;
                }
            }
        }

        &:hover,
        &.is-active {
            color: #409eff;
            background-color: #f9f9f9;
        }
    }
}
</style>
