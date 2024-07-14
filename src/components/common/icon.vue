<template>
    <i v-if="isEleIcon" class="el-icon" :style="setIconSvgStyle">
        <component :is="getIconName" />
    </i>
    <svg v-else class="i-svg-icon" :width="w" :height="h" :style="{ fill: color }">
        <use v-bind="{ 'xlink:href': `#icon-${name}` }" />
    </svg>
</template>

<script>
export default {
    name: "SvgIcon",
    props: {
        name: {
            type: String,
            required: true,
        },
        w: {
            type: Number,
            default: 20,
        },
        h: {
            type: Number,
            default: 20,
        },
        color: {
            type: String,
            default: "currentColor",
        },
    },
    computed: {
        isEleIcon() {
            return this.name.startsWith("ele-");
        },
        getIconName() {
            return this.isEleIcon ? this.name.replace("ele-", "") : `icon-${this.name}`;
        },
        setIconSvgStyle() {
            return `font-size: 14px;`;
        },
    },
    methods: {},
};
</script>
