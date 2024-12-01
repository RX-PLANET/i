<template>
    <div class="p-profile-address">
        <page-header></page-header>
        <div class="l-dashboard-primary">
            <div class="m-common-table w-card">
                <div class="m-table-filter">
                    <div class="u-op">
                        <el-tooltip class="u-box-item" effect="light" :content="$t('common.table.add')" placement="top">
                            <div class="u-op-icon u-refresh" @click="onAdd">
                                <el-icon><Plus /></el-icon>
                            </div>
                        </el-tooltip>
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
                <el-table class="m-table" :data="tableData" max-height="600px" v-loading="loading" size="large">
                    <el-table-column :label="$t('profile.address.tag')" width="180">
                        <template #default="{ row }">
                            <div class="u-row">
                                <el-tooltip
                                    class="u-box-item"
                                    effect="light"
                                    :content="
                                        row.is_default
                                            ? $t('profile.address.cancelDefault')
                                            : $t('profile.address.setDefault')
                                    "
                                    placement="left"
                                >
                                    <el-tag
                                        class="u-default"
                                        :type="row.is_default ? 'danger' : 'info'"
                                        @click="onToggleDefault(row)"
                                    >
                                        <el-icon v-if="row.is_default"><StarFilled /></el-icon>
                                        <el-icon v-else><Star /></el-icon>
                                        {{ $t("profile.address.defaultTag") }}
                                    </el-tag>
                                </el-tooltip>
                                <el-tag v-if="row.tag">{{ row.tag }}</el-tag>
                                <span v-else>-</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('profile.address.name')" prop="name" show-overflow-tooltip width="220">
                    </el-table-column>
                    <el-table-column
                        :label="$t('profile.address.phone')"
                        prop="phone"
                        show-overflow-tooltip
                        width="220"
                    >
                    </el-table-column>
                    <el-table-column :label="$t('profile.address.addr')" prop="addr" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column :label="$t('common.table.op')" width="120" align="right">
                        <template #default="{ row }">
                            <div class="u-op">
                                <el-tooltip
                                    class="u-box-item"
                                    effect="light"
                                    :content="$t('common.table.edit')"
                                    placement="top"
                                >
                                    <el-button class="u-edit" circle plain icon="Edit" @click.stop="onEdit(row)">
                                    </el-button>
                                </el-tooltip>
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
        <addressForm v-if="visible" v-model:visible="visible" :data="{ mode, staged }" @update="load"> </addressForm>
    </div>
</template>

<script>
import { getAddressList, setDefaultAddress, deleteAddress } from "@/service/address";
import pageHeader from "@/components/common/page-header.vue";
import addressForm from "./components/address-form.vue";
export default {
    name: "dashboard-profile-address",
    components: {
        pageHeader,
        addressForm,
    },
    data() {
        return {
            loading: false,
            tableData: [],
            visible: false,
            mode: "add",
            staged: {},
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        onToggleDefault({ id, is_default }) {
            this.loading = true;
            setDefaultAddress(id, { is_default: ~~!is_default })
                .then(() => {
                    this.$notify({
                        title: this.$t("common.messagebox.success"),
                        type: "success",
                        duration: 2000,
                    });
                    this.load();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        load() {
            this.loading = true;
            getAddressList()
                .then((res) => {
                    this.tableData = res.data.data || [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        onAdd() {
            this.staged = {};
            this.mode = "add";
            this.visible = true;
        },
        onEdit(row) {
            this.staged = row;
            this.mode = "edit";
            this.visible = true;
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
                    deleteAddress(id)
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
.p-profile-address {
    min-height: 100vh;
    .u-default {
        cursor: pointer;
        .el-tag__content {
            .flex;
            align-items: center;
            gap: 2px;
        }
    }
}
</style>
<style lang="less">
@import "@/assets/css/common/table.less";
</style>
