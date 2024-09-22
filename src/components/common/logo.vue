<template>
    <header class="w-logo">
        <a :href="homepage" class="u-logo"><img class="u-img" svg-inline src="@/assets/img/test.svg" /></a>
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
    .flex;
    align-items: center;
    justify-content: center;
    .u-img {
        width: 75%;
        height: 75%;
    }

    .u-logo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
        .db;
        .flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
