<template>
    <header class="m-header">
        <a :href="homepage"><img class="u-logo" svg-inline src="@/assets/img/test.svg" /></a>
        <el-divider class="u-title">User Center</el-divider>
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
