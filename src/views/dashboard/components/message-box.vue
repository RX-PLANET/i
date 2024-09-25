<template>
    <div class="m-message-box">
        <messageFilter :initApp="initApp" @update="updateSearch"></messageFilter>
        <div class="m-messages el-card is-always-shadow">
            <div class="m-table">
                <div class="m-table-header">
                    <div class="u-op">
                        <el-checkbox
                            class="u-checkbox-all"
                            v-model="checkAll"
                            :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange"
                        ></el-checkbox>
                        <el-button
                            icon="Delete"
                            type="info"
                            plain
                            :disabled="!multipleSelection.length"
                            @click="batchDelete"
                        ></el-button>
                        <el-tooltip class="box-item" effect="dark" content="全部设为已读" placement="top">
                            <el-button icon="Check" type="info" plain @click="handleReadAll"></el-button>
                        </el-tooltip>
                    </div>
                    <div class="u-search">
                        <el-input v-model="searchKey" placeholder="Search" clearable>
                            <template #prefix>
                                <el-icon><Search></Search></el-icon>
                            </template>
                        </el-input>
                    </div>
                </div>
                <!-- table body -->
                <div class="m-table-body">
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
                            >
                                <div class="m-table-body__column u-checkbox">
                                    <el-checkbox v-model="row.checked" @change="checkChange(row)"></el-checkbox>
                                </div>

                                <!-- 等级 -->
                                <div class="m-table-body__column u-level">
                                    <el-icon :color="getLevel(row.level)?.color" size="16">
                                        <component :is="getLevel(row.level)?.icon"></component>
                                    </el-icon>
                                    <span>{{ getLevel(row.level)?.label }}</span>
                                </div>
                                <!-- 内容 -->
                                <div class="m-table-body__column u-content is-flex">
                                    <span>{{ row.content }}</span>
                                    <a
                                        v-if="row.link"
                                        class="u-detail"
                                        :href="toDetail(row)"
                                        target="_blank"
                                        @click.stop="handleRead(row)"
                                    >
                                        <el-icon>
                                            <Link />
                                        </el-icon>
                                    </a>
                                </div>
                                <!-- 备注 -->
                                <div class="m-table-body__column u-remark">
                                    {{ row.remark }}
                                    <el-icon class="u-edit" @click="handleRemark(row)">
                                        <Edit></Edit>
                                    </el-icon>
                                </div>
                                <!-- 时间 -->
                                <div class="m-table-body__column u-time">
                                    {{ formatDate(row.created_at, "datetime") }}
                                </div>
                                <!-- 操作 -->
                                <div class="m-table-body__column u-op">
                                    <el-button-group size="small">
                                        <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            content="设为已读"
                                            placement="top"
                                            v-if="row.status === 0"
                                        >
                                            <el-button label="设为已读" @click="handleRead(row)">
                                                <el-icon class="u-icon"><Check /></el-icon>
                                            </el-button>
                                        </el-tooltip>
                                        <el-tooltip effect="dark" content="删除" placement="top">
                                            <el-button label="删除" @click="handleDelete(row)">
                                                <el-icon class="u-icon"><Delete /></el-icon>
                                            </el-button>
                                        </el-tooltip>
                                    </el-button-group>
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
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "@/utils/index";
const { level, status } = require("@/assets/data/message.json");
import { getMessages, delMessages, updateMessage, readAllMessages } from "@/service/message";

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
            searchKey: "",

            page: 1,
            per: 10,
            total: 0,

            checkAll: false,
            isIndeterminate: false,
            multipleSelection: [],

            levelList: level,
            statusList: status,
            timeTypes: [
                {
                    id: uuidv4(),
                    label: "今天",
                    value: 7,
                },
                {
                    id: uuidv4(),
                    label: "周六",
                    value: 6,
                },
                {
                    id: uuidv4(),
                    label: "周五",
                    value: 5,
                },
                {
                    id: uuidv4(),
                    label: "周四",
                    value: 4,
                },
                {
                    id: uuidv4(),
                    label: "周三",
                    value: 3,
                },
                {
                    id: uuidv4(),
                    label: "周二",
                    value: 2,
                },
                {
                    id: uuidv4(),
                    label: "周一",
                    value: 1,
                },
                {
                    id: uuidv4(),
                    label: "上周",
                    value: -1,
                },
                {
                    id: uuidv4(),
                    label: "更早",
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
        formatDate,
        loadData() {
            getMessages(this.params).then((res) => {
                const { list, total } = res.data.data;
                this.originList = list;
                this.total = total;
            });
        },
        checkChange(row) {
            const index = this.originList.findIndex((item) => item.id === row.id);
            this.originList[index].checked = row.checked;
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
                    title: "操作成功",
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
            this.$prompt("请输入备注", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
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
                            title: "操作成功",
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
            this.$confirm("警告", "是否要删除对应消息", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.loading = true;
                    delMessages(id)
                        .then(() => {
                            this.$notify({
                                title: "操作成功",
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
            const data = {};
            if (this.search?.app) {
                data.app = this.search.app;
            }
            readAllMessages(data).then(() => {
                this.$notify({
                    title: "操作成功",
                    type: "success",
                    duration: 2000,
                });
            });
        },
        toDetail(row) {
            const { link } = row;
            return link;
        },
    },
};
</script>

<style lang="less">
.m-message-box {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 14px;
    .m-messages {
        flex: 1;
        .r(10px);
        @media screen and(max-width:@phone) {
            width: 100%;
        }
    }
    .m-table-header {
        .flex;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 20px;
        border-bottom: 1px solid #eee;

        .el-button + .el-button {
            margin-left: 0;
        }
        .el-input__wrapper {
            background-color: #f9f9f9;
            box-shadow: none;
        }
    }
    .u-op {
        .flex;
        gap: 10px;
        align-items: center;
    }
    .m-table-body__title {
        padding: 10px 20px;
        border-bottom: 1px solid #eee;
    }
    .m-table-body__row {
        .flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px dashed #eee;
        overflow: hidden;
        overflow-x: auto;
        .scrollbar();
        &:hover {
            background-color: #ececec;
        }
        &.is-read {
            color: #999;
        }
    }
    .m-table-body__column {
        .flex;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        font-size: 12px;
        width: 100px;
        flex: none;
        &.u-checkbox {
            width: 50px;
        }
        &.u-content {
            width: 200px;
            overflow: hidden;
        }
        &.u-time {
            width: 160px;
        }
        &.u-op {
            .flex;
            justify-content: flex-end;
        }
        .u-edit {
            cursor: pointer;
        }
    }
    .m-pagination {
        margin-top: 20px;
        .flex;
        justify-content: center;
    }
    .m-table-body__item:last-child {
        .m-table-body__row:last-child {
            border-bottom: none;
        }
    }
    .el-checkbox {
        margin-right: 20px;
    }
    .el-checkbox .el-checkbox__inner {
        background: #f1f1f4;
        .r(5px);
        .size(18px);
        border: none;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #409eff;
    }
    .el-checkbox__inner:after {
        height: 10px;
        width: 5px;
        left: 6px;
        top: 2px;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner:before {
        top: 8px;
    }
}
</style>
