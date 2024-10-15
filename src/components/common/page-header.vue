<template>
    <div class="c-header">
        <div class="c-header_main">
            <div class="c-header-left">
                <div class="m-title" v-if="routeMeta?.title">{{ routeMeta.title }}</div>
                <div class="m-desc" v-if="routeMeta?.desc">{{ routeMeta.desc }}</div>
            </div>
            <div class="c-header-right">
                <div class="m-profile">
                    <lang-select @change="onLangChange" :lang="lang"></lang-select>
                    <span class="u-name">{{ profile.name }}</span>
                    <el-dropdown trigger="click">
                        <el-avatar class="u-avatar" :src="avatar" shape="square"></el-avatar>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click.stop="logout">
                                    {{ $t("account.logout") }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from "@iruxu/pkg-common/utils/user";
import { logout, updateProfile } from "@/service/account";
import LangSelect from "@iruxu/pkg-widget/src/components/common/lang-select.vue";
export default {
    name: "PageHeader",
    components: {
        LangSelect,
    },
    data: function () {
        return {};
    },
    computed: {
        routeMeta() {
            return this.$route.meta;
        },
        profile() {
            return User.getInfo();
        },
        avatar() {
            return (this.profile?.avatar && this.profile.avatar != "null") || require("@/assets/img/test.png");
        },
        app() {
            return this.$store.state.app;
        },
        lang() {
            return User.getLocale();
        },
    },
    watch: {},
    methods: {
        logout() {
            logout().then(() => {
                User.logout();
                this.$router.push({ name: "email-login" });
            });
        },
        onLangChange(lang) {
            updateProfile({ lang }, { app: this.app }).then(() => {
                // User.setLocale(lang);
                // this.$i18n.locale = lang;
                location.reload();
            });
        },
    },
};
</script>

<style lang="less">
@import "@/assets/css/common/page-header.less";
</style>
