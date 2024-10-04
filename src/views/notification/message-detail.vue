<template>
    <div class="p-message-detail" v-loading="loading">
        <page-header></page-header>
        <div class="l-dashboard-primary">
            <messageFilter @update="toList"></messageFilter>
            <div class="w-card m-detail">
                <div class="m-op">
                    <div class="u-op">
                        <el-tooltip
                            class="u-box-item"
                            effect="light"
                            :content="$t('notification.message.toolbar.back')"
                            placement="top"
                        >
                            <div class="u-op-icon u-back" @click="handleBack">
                                <el-icon><Back /></el-icon>
                            </div>
                        </el-tooltip>
                        <el-tooltip
                            class="u-box-item"
                            effect="light"
                            :content="$t('notification.message.toolbar.delete')"
                            placement="top"
                        >
                            <div class="u-op-icon u-delete" @click="handleDelete">
                                <el-icon><Delete /></el-icon>
                            </div>
                        </el-tooltip>
                    </div>
                    <div class="u-op">
                        <span class="u-page">{{ index + 1 }} - {{ per > total ? total : per }} / {{ total }}</span>

                        <el-tooltip
                            class="u-box-item"
                            effect="light"
                            :content="$t('notification.message.toolbar.previous')"
                            placement="top"
                        >
                            <div
                                class="u-op-icon u-page-btn"
                                :class="previewDisabled ? 'is-disabled' : ''"
                                @click="handlePrevious"
                            >
                                <el-icon><ArrowLeft /></el-icon>
                            </div>
                        </el-tooltip>
                        <el-tooltip
                            class="u-box-item"
                            effect="light"
                            :content="$t('notification.message.toolbar.next')"
                            placement="top"
                        >
                            <div
                                class="u-op-icon u-page-btn"
                                :class="nextDisabled ? 'is-disabled' : ''"
                                @click="handleNext"
                            >
                                <el-icon><ArrowRight /></el-icon>
                            </div>
                        </el-tooltip>
                    </div>
                </div>
                <div class="m-content" :class="detail.status === 1 ? 'is-read' : ''">
                    <div class="u-title">
                        <span>{{ detail.title || "-" }}</span>
                        <span v-if="levelMap[detail.level]?.label" class="u-level" :class="`u-level-${detail.level}`">
                            {{ levelMap[detail.level]?.label }}
                        </span>
                    </div>
                    <div class="u-desc">
                        <div v-if="detail.app" class="u-avatar">
                            <img class="u-img" src="@/assets/img/test.svg" />
                            <span>{{ detail.app || "-" }}</span>
                        </div>
                        <div class="u-time">{{ formatDate(detail.created_at, "datetime") }}</div>
                    </div>
                    <div class="u-content" v-html="detail.content"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getMessages, delMessages, getMessage } from "@/service/message";
import pageHeader from "@/components/common/page-header.vue";
import messageFilter from "./components/message-filter.vue";
import { arr2map } from "@/utils/index";
import { levels, statusList } from "@/assets/data/message.js";
import { formatDate } from "@/utils/index";
export default {
    name: "MessageDetail",
    components: {
        pageHeader,
        messageFilter,
    },
    data() {
        return {
            loading: false,
            page: 1,
            per: 10,
            index: 0,
            total: 0,
            detail: {},
            ids: [],
        };
    },
    computed: {
        id() {
            return ~~this.$route.params.id;
        },
        previewDisabled() {
            return this.page === 1 && this.index === 0;
        },
        nextDisabled() {
            return this.total <= (this.page - 1) * this.per + this.index + 1;
        },
        levelMap() {
            return arr2map({ array: levels, key: "value" });
        },
        statusMap() {
            return arr2map({ array: statusList, key: "value" });
        },
    },
    watch: {
        id(id) {
            if (!id) return;
            this.init();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const query = this.$route.query;
            if (query.page) {
                this.page = Number(query.page);
            }
            if (query.per) {
                this.per = Number(query.per);
            }
            if (query.total) {
                this.total = Number(query.total);
            }
            if (query.index) {
                this.index = Number(query.index);
            }
            this.loadMessages();
            this.loadData();
        },
        formatDate,
        toList(params) {
            this.$router.push({ name: "dashboard-notification-message", params });
        },
        handleBack() {
            const params = {
                page: this.page,
                per: this.per,
            };
            this.$router.push({ name: "dashboard-notification-message", params });
        },
        handleDelete() {
            const id = this.id;
            if (!id) return;
            this.$confirm(this.$t("notification.message.table.del_message"), this.$t("common.messagebox.title"), {
                confirmButtonText: this.$t("common.messagebox.confirm"),
                cancelButtonText: this.$t("common.messagebox.cancel"),
                type: "warning",
            })
                .then(() => {
                    this.loading = true;
                    delMessages(id)
                        .then(() => {
                            this.$notify({
                                title: this.$t("common.messagebox.success"),
                                type: "success",
                                duration: 2000,
                            });

                            this.handleBack();
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                })
                .catch(() => {});
        },
        loadData() {
            this.loading = true;
            getMessage(this.id)
                .then((res) => {
                    this.detail = res.data.data || {};
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async loadMessages() {
            await getMessages({
                page: this.page,
                per: this.per,
            }).then((res) => {
                const { list, total } = res.data.data;
                const ids = list.map((item) => item.id);
                this.ids = ids;
                this.total = total;
            });
        },

        handlePrevious() {
            if (this.previewDisabled) return;
            if (this.index === 0 && this.page === 1) {
                return;
            }
            if (this.index === 0 && this.page > 1) {
                this.page = this.page - 1;
                this.loadMessages().then(() => {
                    const id = this.ids[this.ids.length - 1];
                    this.$router.push({
                        path: `/dashboard/notification/message-detail/${id}`,
                        query: {
                            page: this.page,
                            per: this.per,
                            index: this.ids.length - 1,
                            total: this.total,
                        },
                    });
                });
            }
            if (this.index > 0) {
                const index = this.index - 1;
                const id = this.ids[index];
                this.$router.push({
                    path: `/dashboard/notification/message-detail/${id}`,
                    query: {
                        page: this.page,
                        per: this.per,
                        index,
                        total: this.total,
                    },
                });
            }
        },
        handleNext() {
            if (this.nextDisabled) return;
            const isLastPage = this.page === Math.floor(this.total / this.per);
            const isLastMessage = this.index >= this.per - 1;
            if (isLastMessage && isLastPage) {
                return;
            }
            if (isLastMessage && !isLastPage) {
                this.page = this.page + 1;
                this.loadMessages().then(() => {
                    const id = this.ids[this.ids.length - 1];
                    this.$router.push({
                        path: `/dashboard/notification/message-detail/${id}`,
                        query: {
                            page: this.page,
                            per: this.per,
                            index: this.ids.length - 1,
                            total: this.total,
                        },
                    });
                });
            }
            if (!isLastMessage) {
                const index = this.index + 1;
                const id = this.ids[index];
                this.$router.push({
                    path: `/dashboard/notification/message-detail/${id}`,
                    query: {
                        page: this.page,
                        per: this.per,
                        index,
                        total: this.total,
                    },
                });
            }
        },
    },
};
</script>

<style lang="less">
@import "@/assets/css/notification/message/detail.less";
</style>
