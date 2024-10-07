<template>
    <div class="m-message-box">
        <messageFilter :initApp="initApp" @update="updateSearch"></messageFilter>
        <div class="m-message-main w-card">
            <div class="m-table">
                <div class="m-table-header">
                    <div class="u-op">
                        <el-checkbox
                            class="u-checkbox-all"
                            v-model="checkAll"
                            :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange"
                        ></el-checkbox>
                        <el-tooltip
                            class="u-box-item"
                            effect="light"
                            :content="$t('notification.message.toolbar.refresh')"
                            placement="top"
                        >
                            <div class="u-op-icon u-refresh" @click="loadData">
                                <el-icon><Refresh /></el-icon>
                            </div>
                        </el-tooltip>
                        <el-tooltip
                            class="u-box-item"
                            effect="light"
                            :content="$t('notification.message.toolbar.read_config')"
                            placement="top"
                        >
                            <div class="u-op-icon u-read" @click="handleReadAll">
                                <el-icon><Message /></el-icon>
                            </div>
                        </el-tooltip>
                        <el-tooltip
                            class="u-box-item"
                            effect="light"
                            :content="$t('notification.message.toolbar.delete')"
                            placement="top"
                        >
                            <div
                                class="u-op-icon u-delete"
                                :class="!multipleSelection.length ? 'is-disabled' : ''"
                                @click="batchDelete"
                            >
                                <el-icon><Delete /></el-icon>
                            </div>
                        </el-tooltip>
                        <el-dropdown>
                            <span class="u-op-icon">
                                <el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item
                                        v-for="item in statusList"
                                        :key="item.value"
                                        @click="onStatusChange(item.value)"
                                    >
                                        {{ item.label }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <el-input
                        class="u-search"
                        v-model="searchKey"
                        :placeholder="$t('notification.message.toolbar.search')"
                    >
                        <template #prefix>
                            <el-icon><Search></Search></el-icon>
                        </template>
                    </el-input>
                </div>
                <!-- table body -->
                <div class="m-table-body" v-loading="loading">
                    <div class="m-table-body__item" v-for="group in tableData" :key="group.id">
                        <div class="m-table-body__title">
                            {{ group.label }}
                            (<b class="u-total">{{ group.children.length }}</b
                            >)
                        </div>
                        <div class="m-table-body__list">
                            <div
                                class="m-table-body__row"
                                :class="row.status === 1 ? 'is-read' : ''"
                                v-for="row in group.children"
                                :key="row.id"
                                @click="toDetail(row)"
                            >
                                <div class="m-table-body__column u-checkbox">
                                    <el-checkbox
                                        v-model="row.checked"
                                        @change="checkChange(row)"
                                        @click.stop
                                    ></el-checkbox>
                                </div>

                                <!-- 等级 -->
                                <!-- <div class="m-table-body__column u-level">
                                    <el-icon :color="getLevel(row.level)?.color" size="16">
                                        <component :is="getLevel(row.level)?.icon"></component>
                                    </el-icon>
                                    <span>{{ getLevel(row.level)?.label }}</span>
                                </div> -->
                                <!-- 标题 -->
                                <div class="m-table-body__column u-content is-flex">
                                    <div class="u-icon" :class="`u-icon-${row.level}`"></div>
                                    <span>{{ row.title || "-" }}</span>
                                </div>
                                <!-- 备注 -->
                                <!-- <div class="m-table-body__column u-remark">
                                    {{ row.remark }}
                                </div> -->
                                <!-- 时间 -->
                                <div class="m-table-body__column u-time">
                                    {{ formatDate(row.created_at, "datetime") }}
                                </div>
                                <!-- 操作 -->
                                <div class="m-table-body__column u-op">
                                    <el-tooltip
                                        class="u-box-item"
                                        effect="light"
                                        :content="$t('notification.message.table.detail')"
                                        placement="top"
                                    >
                                        <el-button class="u-view" circle plain icon="View" @click.stop="toDetail(row)">
                                        </el-button>
                                    </el-tooltip>
                                    <el-tooltip
                                        v-if="row.link"
                                        class="u-box-item"
                                        effect="light"
                                        :content="$t('notification.message.table.link')"
                                        placement="top"
                                    >
                                        <a
                                            class="u-detail el-button is-plain is-circle"
                                            :href="toLink(row)"
                                            target="_blank"
                                            @click.stop="handleRead(row)"
                                        >
                                            <el-icon>
                                                <Link />
                                            </el-icon>
                                        </a>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination
                class="m-pagination"
                v-model:currentPage="page"
                background
                v-model:pageSize="per"
                layout="prev, pager, next"
                :total="total"
                size="small"
                hide-on-single-page
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isoWeek);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
import { flattenDeep, pickBy } from "lodash";
import { v4 as uuidV4 } from "uuid";
import { formatDate, removeEmpty } from "@/utils/index";
import { levels, statusList } from "@/assets/data/message.js";
import { getMessages, delMessages, updateMessage, readAllMessages } from "@/service/notification";

import messageFilter from "./message-filter.vue";
export default {
    name: "message-box",
    components: {
        messageFilter,
    },
    props: {
        initApp: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            loading: false,
            tableData: [],
            originList: [],
            search: {},
            status: "",
            searchKey: "",

            page: 1,
            per: 10,
            total: 0,

            checkAll: false,
            isIndeterminate: false,
            multipleSelection: [],

            levelList: levels,
            statusList: statusList,
            timeTypes: [
                {
                    id: uuidV4(),
                    label: this.$t("notification.message.time.today"),
                    value: 7,
                },
                {
                    id: uuidV4(),
                    label: this.$t("notification.message.time.saturday"),
                    value: 6,
                },
                {
                    id: uuidV4(),
                    label: this.$t("notification.message.time.friday"),
                    value: 5,
                },
                {
                    id: uuidV4(),
                    label: this.$t("notification.message.time.thursday"),
                    value: 4,
                },
                {
                    id: uuidV4(),
                    label: this.$t("notification.message.time.wednesday"),
                    value: 3,
                },
                {
                    id: uuidV4(),
                    label: this.$t("notification.message.time.tuesday"),
                    value: 2,
                },
                {
                    id: uuidV4(),
                    label: this.$t("notification.message.time.monday"),
                    value: 1,
                },
                {
                    id: uuidV4(),
                    label: this.$t("notification.message.time.last"),
                    value: -1,
                },
                {
                    id: uuidV4(),
                    label: this.$t("notification.message.time.earlier"),
                    value: -2,
                },
            ],
        };
    },
    computed: {
        params() {
            const _params = {
                per: this.per,
                page: this.page,
                _search: this.searchKey,
                status: this.status,
                ...this.search,
            };
            return _params;
        },
    },
    watch: {
        originList: {
            immediate: true,
            deep: true,
            handler() {
                this.tableData = this.arr2Tree(this.originList);
            },
        },
        params: {
            immediate: true,
            handler: function () {
                this.loadData();
            },
        },
    },
    methods: {
        onStatusChange(status) {
            this.status = status;
        },
        formatDate,
        loadData() {
            this.loading = true;
            getMessages(removeEmpty(this.params))
                .then((res) => {
                    this.multipleSelection = [];
                    this.checkAll = false;
                    const { list, total } = res.data.data;
                    this.originList = list;
                    this.total = total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        checkChange(row) {
            const index = this.originList.findIndex((item) => item.id === row.id);
            this.originList[index].checked = !!row.checked;
            const mIndex = this.multipleSelection.findIndex((item) => item.id === row.id);
            if (mIndex !== -1) {
                this.multipleSelection.splice(mIndex, 1);
            } else {
                this.multipleSelection.push(row);
            }
            this.isIndeterminate = !!(
                this.multipleSelection.length && this.multipleSelection.length < this.originList.length
            );
        },
        handleRead(row) {
            if (row.status === 1) return;
            const { id, remark } = row;
            const data = {
                status: 1,
                remark: remark,
            };
            updateMessage(id, data).then(() => {
                this.$notify({
                    title: this.$t("common.messagebox.success"),
                    type: "success",
                    duration: 2000,
                });
                this.loadData();
            });
        },
        handleCheckAllChange(val) {
            this.multipleSelection = val ? flattenDeep(this.tableData.map((item) => item.children)) : [];
            this.isIndeterminate = false;
            this.originList = this.originList.map((item) => {
                return {
                    ...item,
                    checked: !!this.multipleSelection.length,
                };
            });
            this.tableData = this.arr2Tree(this.originList);
        },
        updateSearch(data) {
            this.page = 1;
            this.search = pickBy(data, (value) => value !== null && value !== "");
        },
        arr2Tree(data, key = "created_at") {
            const timeTypes = this.timeTypes;
            const categorizedData = [];

            const currentTime = dayjs();
            const thisWeek = {
                start: dayjs().startOf("isoWeek").format("YYYY-MM-DD HH:mm:ss"),
                end: dayjs().endOf("isoWeek").format("YYYY-MM-DD HH:mm:ss"),
            };
            const prevWeek = {
                start: dayjs().startOf("isoWeek").add(-1, "week").format("YYYY-MM-DD HH:mm:ss"),
                end: dayjs().endOf("isoWeek").add(-1, "week").format("YYYY-MM-DD HH:mm:ss"),
            };

            data.forEach((item) => {
                if (!Object.hasOwnProperty.call(item, "checked")) {
                    item.checked = false;
                }
                const createdTime = dayjs(item[key]);
                let matchingTimeType;

                if (dayjs(createdTime).isSameOrBefore(currentTime)) {
                    // 当前时间之前的时间
                    if (dayjs(createdTime).isToday()) {
                        // 今天
                        matchingTimeType = timeTypes.find((type) => type.value === 7);
                    } else {
                        if (dayjs(createdTime).isBetween(thisWeek.start, thisWeek.end)) {
                            // 本周 不会存在星期天为0时，不是今天的情况
                            matchingTimeType = timeTypes.find((type) => type.value === dayjs(createdTime).day());
                            if (dayjs(createdTime).isYesterday()) {
                                // 如果是昨天则替换label为昨天
                                matchingTimeType.label = "昨天";
                            }
                        } else if (dayjs(createdTime).isBetween(prevWeek.start, prevWeek.end)) {
                            // 上周
                            matchingTimeType = timeTypes.find((type) => type.value === -1);
                        } else {
                            // 更早
                            matchingTimeType = timeTypes.find((type) => type.value === -2);
                        }
                    }
                }

                if (matchingTimeType) {
                    const category = categorizedData.find((cat) => cat.value === matchingTimeType.value);

                    if (!category) {
                        categorizedData.push({
                            label: matchingTimeType.label,
                            value: matchingTimeType.value,
                            id: matchingTimeType.id,
                            children: [item],
                        });
                    } else {
                        category.children.push(item);
                    }
                }
            });

            return categorizedData.sort((a, b) => b.value - a.value);
        },
        getLevel(level) {
            return this.levelList.find((item) => item.value == level);
        },

        resetChecked() {
            this.isIndeterminate = false;
            this.checkAll = false;
            this.multipleSelection = [];
        },
        handleRemark(row) {
            const { id, remark } = row;
            this.$prompt(this.$t("notification.message.table.remark_placeholder"), this.$t("common.messagebox.title"), {
                confirmButtonText: this.$t("common.messagebox.confirm"),
                cancelButtonText: this.$t("common.messagebox.cancel"),
                inputValue: remark,
            })
                .then(({ value }) => {
                    const data = {
                        remark: value,
                    };
                    if (value === row.remark) {
                        return;
                    }
                    updateMessage(id, data).then(() => {
                        this.$notify({
                            title: this.$t("common.messagebox.success"),
                            type: "success",
                            duration: 2000,
                        });
                        const index = this.originList.findIndex((item) => item.id === id);
                        this.originList[index].remark = value;
                    });
                })
                .catch(() => {});
        },
        batchDelete() {
            if (!this.multipleSelection.length) return;
            this.handleDelete(this.multipleSelection);
        },
        handleDelete(data) {
            let id = "";
            const isMul = Array.isArray(data);
            if (isMul) {
                // 多个
                id = data.map((item) => item.id).join();
            } else {
                // 单个
                id = data.id;
            }
            if (!id) return;
            this.$confirm(this.$t("notification.message.table.del_mul_message"), this.$t("common.messagebox.title"), {
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

                            this.page = 1;
                            this.loadData();
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                })
                .catch(() => {});
        },
        loadMessages() {
            this.loadData();
        },
        handleReadAll() {
            const app = this.search.app || "";
            const id = this.multipleSelection.map((item) => item.id).join(",") || "";
            const data = {};
            if (app) {
                data.app = app;
            }
            readAllMessages(id, data).then(() => {
                this.$notify({
                    title: this.$t("common.messagebox.success"),
                    type: "success",
                    duration: 2000,
                });
            });
        },
        toLink(row) {
            const { link } = row;
            return link;
        },
        toDetail({ id }) {
            const index = this.originList.findIndex((item) => item.id === id);
            this.$router.push({
                path: `/dashboard/notification/message-detail/${id}`,
                query: {
                    page: this.page,
                    per: this.per,
                    total: this.total,
                    index: index,
                },
            });
        },
    },
};
</script>
