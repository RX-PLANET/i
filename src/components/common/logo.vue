<template>
    <header class="w-logo">
        <a :href="homepage"><img class="u-img" svg-inline src="@/assets/img/test.svg" /></a>
    </header>
</template>

<script>
export default {
    name: "CardHeader",
    data: function () {
        return {
            homepage: "https://www.jx3box.com",
        };
    },
};
</script>

<style lang="less">
.w-logo {
    margin: 20px 0;
    margin-bottom: 40px;
    text-align: center;
    .u-img {
        width: 100px;
        height: 100px;
    }
}
</style>
