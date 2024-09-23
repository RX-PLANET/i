<template>
    <div class="m-header">
        <h4 class="u-title">{{ title }}</h4>
    </div>
</template>

<script>
export default {
    name: "CardHeader",
    props: {
        title: {
            type: String,
            default: "Mii",
        },
    },
    data: function () {
        return {
            homepage: "https://www.jx3box.com",
        };
    },
};
</script>
