<template>
    <div class="c-header">
        <div class="c-header_main">
            <div class="c-header-left">
                <div class="c-header__title" v-if="routeMeta?.title">{{ routeMeta.title }}</div>
                <div class="c-header__desc" v-if="routeMeta?.desc">{{ routeMeta.desc }}</div>
            </div>
            <div class="c-header-right">
                <lang-select class="c-header__lang" @change="onLangChange" :lang="lang"></lang-select>
                <el-dropdown trigger="click">
                    <div class="c-header__profile">
                        <span class="u-name">{{ profile.name }}</span>
                        <!-- <el-avatar class="u-avatar" :src="avatar" shape="square"></el-avatar> -->
                    </div>
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
</template>

<script>
import User from "@iruxu/pkg-common/utils/user";
import { logout, updateUserInfo } from "@/service/account";
export default {
    name: "PageHeader",
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
            updateUserInfo({ lang }, { app: this.app }).then(() => {
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
