<template>
    <div class="p-device">
        <page-header></page-header>
        <div class="l-dashboard-primary">
            <div class="m-common-table w-card">
                <div class="m-table-filter">
                    <div class="u-op">
                        <el-tooltip
                            class="u-box-item"
                            effect="light"
                            :content="$t('common.table.refresh')"
                            placement="top"
                        >
                            <div class="u-op-icon u-refresh" @click="load">
                                <el-icon><Refresh /></el-icon>
                            </div>
                        </el-tooltip>
                    </div>
                </div>
                <el-table class="m-table" :data="tableData" max-height="600px" v-loading="loading" size="large"
                    ><el-table-column :label="$t('security.device.name')" show-overflow-tooltip>
                        <template #default="{ row }">
                            <div class="u-row">
                                {{ row.remark || row.name }}
                                <el-icon class="u-edit" @click="onRemark(row)">
                                    <Edit></Edit>
                                </el-icon>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('security.device.title')"
                        prop="device"
                        show-overflow-tooltip
                        min-width="200"
                    >
                        <template #default="{ row }">
                            <div class="u-row">
                                <span>{{ row.device }}</span>
                                <el-icon class="u-copy" @click="copyText(row.device)"><DocumentCopy /></el-icon>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('security.device.lastTime')" prop="last_used" width="180">
                        <template #default="{ row }">
                            {{ formatDate(row.last_used, "datetime") }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('security.device.lastLocation')"
                        prop="location"
                        show-overflow-tooltip
                        min-width="180"
                    >
                    </el-table-column>
                    <el-table-column :label="$t('common.table.op')" width="120" align="right">
                        <template #default="{ row }">
                            <div class="u-op">
                                <el-tooltip
                                    class="u-box-item"
                                    effect="light"
                                    :content="$t('common.table.remove')"
                                    placement="top"
                                >
                                    <el-button class="u-view" circle plain icon="Delete" @click.stop="onDelete(row)">
                                    </el-button>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate, copyText } from "@/utils";
import { getMyDevices, remarkDevice, removeDevice } from "@/service/device";
import pageHeader from "@/components/common/page-header.vue";
export default {
    name: "dashboard-security-device",
    components: {
        pageHeader,
    },
    data() {
        return {
            loading: false,
            tableData: [],
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        formatDate,
        copyText,
        load() {
            this.loading = true;
            getMyDevices()
                .then((res) => {
                    this.tableData = res.data.data || [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        onRemark(row) {
            const { id, remark } = row;
            this.$prompt(this.$t("common.table.remark_placeholder"), this.$t("common.messagebox.title"), {
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
                    remarkDevice(id, data).then(() => {
                        this.$notify({
                            title: this.$t("common.messagebox.success"),
                            type: "success",
                            duration: 2000,
                        });
                        const index = this.tableData.findIndex((item) => item.id === id);
                        this.tableData[index].remark = value;
                    });
                })
                .catch(() => {});
        },
        onDelete({ id }) {
            if (!id) return;
            this.$confirm(this.$t("common.table.removeAlert"), this.$t("common.messagebox.title"), {
                confirmButtonText: this.$t("common.messagebox.confirm"),
                cancelButtonText: this.$t("common.messagebox.cancel"),
                type: "warning",
            })
                .then(() => {
                    this.loading = true;
                    removeDevice(id)
                        .then(() => {
                            this.$notify({
                                title: this.$t("common.messagebox.success"),
                                type: "success",
                                duration: 2000,
                            });
                            const index = this.tableData.findIndex((item) => item.id === id);
                            this.tableData.splice(index, 1);
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                })
                .catch(() => {});
        },
    },
};
</script>

<style lang="less">
.p-device {
    min-height: 100vh;
}
</style>
<style lang="less">
@import "@/assets/css/common/table.less";
</style>
