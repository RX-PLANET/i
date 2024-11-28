<template>
    <div class="p-bind p-destroy-account">
        <page-header></page-header>
        <div class="m-bind-block m-destroy-account" v-if="!isNext">
            <div class="m-bind-block__pic">
                <img src="@/assets/img/bind/destroy.svg" />
            </div>
            <div class="m-bind-block__main">
                <h1 class="u-header">{{ $t("security.nav.destroy") }}</h1>
                <div class="u-slogan" v-html="$t('security.destroy.alert')"></div>
                <div class="m-login-card m-card-main">
                    <el-button type="danger" size="large" @click="onNext" style="width: 100%">{{
                        $t("security.destroy.next")
                    }}</el-button>
                </div>
            </div>
        </div>
        <div class="m-bind-block m-destroy-document" v-else>
            <div class="u-document" v-html="document"></div>
            <div class="u-op">
                <el-checkbox v-model="isAgree">{{ $t("security.destroy.agree") }}</el-checkbox>
                <el-button type="danger" :loading="loading" :disabled="loading || !isAgree" @click="submit">{{
                    $t("security.destroy.confirm")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { destroyAccount } from "@/service/account";
import { getDocument } from "@/service/document";
import pageHeader from "@/components/common/page-header.vue";
import User from "@iruxu/rx-common/utils/user";
import { getCdnLink } from "@iruxu/rx-common/utils/common";
export default {
    name: "dashboard-security-destroy",
    components: {
        pageHeader,
    },
    data() {
        return {
            loading: false,
            isNext: false,
            slug: "destroy_account",
            document: "",
            lang: User.getLocale(),
            isAgree: false,
        };
    },
    computed: {
        ...mapState(["app"]),
        isCn() {
            // 中文
            return this.lang === "zh-CN";
        },
    },
    watch: {
        lang() {
            this.load();
        },
    },
    methods: {
        onNext() {
            this.isNext = true;
            this.load();
        },
        load() {
            const slug = this.slug;
            if (this.isCn) {
                getDocument(slug).then((res) => {
                    this.document = res.data.data?.content || "-";
                });
            } else {
                const path = getCdnLink(`/common/document/${slug}/${slug}-${this.lang}.txt`);
                fetch(path)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(res.status);
                        }
                        return res.text();
                    })
                    .then((data) => {
                        this.document = data;
                    })
                    .catch((error) => {
                        console.error(error);
                        this.document = "-";
                    });
            }
        },
        logout() {
            User.logout();
            this.$router.replace({ name: "email-login" });
        },
        submit() {
            this.$prompt(this.$t("security.destroy.confirmTip"), this.$t("common.messagebox.title"), {
                confirmButtonText: this.$t("common.messagebox.confirm"),
                cancelButtonText: this.$t("common.messagebox.cancel"),
                inputPattern: /^[^\u4e00-\u9fa5]{6,30}$/,
                inputErrorMessage: this.$t("account.common.passwordError"),
            })
                .then(({ value }) => {
                    const data = {
                        password: value,
                    };
                    const params = {};
                    if (this.app !== "iruxu") {
                        params.app = this.app;
                    }
                    this.loading = true;
                    destroyAccount(data, params).then(() => {
                        this.$message.success(this.$t("security.destroy.success"));
                        this.logout();
                    });
                })
                .catch(() => {});
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/account/common.less";
@import "~@/assets/css/account/email/login.less";
@import "~@/assets/css/notification/bind/bind.less";
.m-destroy-document {
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;
    .u-document {
        flex: 1;
        width: 100%;
        height: 100%;
        font-size: 12px;
        color: #999;
        overflow: auto;
    }
    .u-op {
        width: 100%;
        .flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
