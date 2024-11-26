<template>
    <div class="m-log-main w-card m-login-logs">
        <div class="m-table-filter">
            <div class="u-op">
                <el-tooltip class="u-box-item" effect="light" :content="$t('common.table.refresh')" placement="top">
                    <div class="u-op-icon u-refresh" @click="load">
                        <el-icon><Refresh /></el-icon>
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
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    :start-placeholder="$t('common.table.start_time')"
                    :end-placeholder="$t('common.table.end_time')"
                    :shortcuts="shortcuts"
                />
            </div>
            <el-input class="u-search" v-model="search" :placeholder="$t('common.table.search')">
                <template #prefix>
                    <el-icon><Search></Search></el-icon>
                </template>
            </el-input>
        </div>
        <el-table class="m-table" :data="tableData" max-height="600px" v-loading="loading">
            <el-table-column :label="$t('security.log.table.remark')" prop="remark" show-overflow-tooltip>
                <template #default="{ row }">
                    <span :class="!row.status ? 'u-error' : ''">{{ row.remark }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('security.log.table.app')" prop="app" width="100">
                <template #default="{ row }">
                    {{ appMap[row.app]?.label }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('security.log.table.device')" prop="device" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="IP" prop="ip" show-overflow-tooltip></el-table-column>
            <el-table-column label="User Agent" prop="ua" show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('security.log.table.time')" prop="time" width="180">
                <template #default="{ row }">
                    {{ formatDate(row.time, "datetime") }}
                </template>
            </el-table-column>
        </el-table>

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
</template>

<script>
import { formatDate, removeEmpty, arr2map } from "@/utils/index";
import { getLoginLogs } from "@/service/log";
import { debounce } from "lodash";
import { shortcuts } from "@/assets/data/shortcuts";
import { apps } from "@/assets/data/config/app";
import { statusList } from "@/assets/data/log";
export default {
    name: "login-log",
    props: {
        app: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            loading: false,
            tableData: [],
            search: "",
            status: "",
            dateRange: [],
            shortcuts,
            statusList,

            page: 1,
            per: 10,
            total: 0,
        };
    },
    computed: {
        params() {
            return {
                app: this.app === "iruxu" ? "" : this.app,
                status: this.status,
                search: this.search,
                start_time: this.dateRange?.[0],
                end_time: this.dateRange?.[1],
            };
        },
        pageParams() {
            return { page: this.page, limit: this.per };
        },
        appMap() {
            return arr2map({ array: apps, key: "value" });
        },
    },
    watch: {
        params: {
            immediate: true,
            deep: true,
            handler: debounce(function () {
                if (this.page === 1) {
                    this.load();
                } else {
                    this.page = 1;
                }
            }, 500),
        },
        page() {
            this.load();
        },
    },
    methods: {
        onStatusChange(value) {
            this.status = value;
        },
        formatDate,
        builtParams() {
            return removeEmpty(Object.assign(this.params, this.pageParams));
        },
        load() {
            const params = this.builtParams();
            this.loading = true;
            getLoginLogs(params)
                .then((res) => {
                    this.tableData = res.data.data?.list || [];
                    this.total = res.data?.data?.total || 0;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
