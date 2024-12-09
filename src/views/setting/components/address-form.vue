<template>
    <el-dialog class="w-dialog" :model-value="visible" :title="title" :before-close="close" draggable>
        <el-form class="m-address-form" ref="form" :model="form" :rules="rules" label-position="top">
            <el-form-item prop="name" :label="$t('setting.address.name')" required>
                <el-input v-model="form.name" :placeholder="$t('setting.address.namePlaceholder')"> </el-input>
            </el-form-item>
            <el-form-item prop="phone" :label="$t('setting.address.phone')" required>
                <div class="m-line">
                    <phone-code-select ref="phoneCodeSelect" v-model="phoneCode" />
                    <el-input v-model="form.phone" :placeholder="$t('setting.address.phonePlaceholder')"> </el-input>
                </div>
            </el-form-item>
            <el-form-item :label="$t('setting.address.addr')" prop="addr" required>
                <div class="m-line">
                    <el-input
                        class="u-detail-address"
                        :placeholder="$t('setting.address.addrPlaceholder')"
                        v-model="form.addr"
                    ></el-input>
                </div>
            </el-form-item>
            <el-form-item :label="$t('setting.address.tag')" prop="tag">
                <div class="m-line">
                    <el-tag
                        v-for="(item, i) in tags"
                        :key="i"
                        class="u-tag"
                        :type="getTagType(item)"
                        @click="onTag(item)"
                        >{{ item }}</el-tag
                    >
                </div>
                <el-input
                    v-if="isCustomTag"
                    class="u-custom-tag"
                    :placeholder="$t('setting.address.custom')"
                    v-model="form.tag"
                ></el-input>
            </el-form-item>
            <el-form-item prop="is_default">
                <el-checkbox v-model="form.is_default">{{ this.$t("setting.address.isDefault") }}</el-checkbox>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="w-dialog__footer">
                <el-button @click="close">{{ $t("common.messagebox.cancel") }}</el-button>
                <el-button type="primary" :loading="loading" :disabled="loading" @click="submit">{{
                    $t("common.messagebox.confirm")
                }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { createAddress, updateAddress } from "@/service/address";
import { cloneDeep, pick } from "lodash";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const defaultForm = {
    name: "",
    addr: "",
    phone: "",
    is_default: 0,
    tag: "",
};

export default {
    name: "AddressForm",
    emits: ["update:visible", "update"],
    props: ["visible", "data"],
    data() {
        return {
            loading: false,
            phoneCode: 86,
            form: {},
            rules: {
                name: [{ required: true, message: this.$t("setting.address.namePlaceholder"), trigger: "blur" }],
                addr: [{ required: true, message: this.$t("setting.address.addrPlaceholder"), trigger: "blur" }],
                phone: [
                    { required: true, message: this.$t("setting.address.phonePlaceholder"), trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                            const phone = `+${this.phoneCode}${value}`;

                            const phoneNumber = parsePhoneNumberFromString(phone);
                            if (!phoneNumber || !phoneNumber?.isValid()) {
                                callback(new Error(this.$t("notification.phone.numberError")));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
            },
            tags: [
                this.$t("setting.address.school"),
                this.$t("setting.address.home"),
                this.$t("setting.address.company"),
                this.$t("setting.address.custom"),
            ],
            isCustomTag: false,
        };
    },
    computed: {
        isEdit() {
            return this.data.mode === "edit";
        },
        title() {
            return this.isEdit ? this.$t("setting.address.edit") : this.$t("setting.address.add");
        },
    },
    watch: {
        data: {
            immediate: true,
            handler({ mode, staged }) {
                this.form = {
                    ...cloneDeep(defaultForm),
                    ...staged,
                };
                if (this.form.tag && (!this.tags.includes(this.form.tag) || this.form.tag === this.tags[3])) {
                    this.isCustomTag = true;
                }
                this.form.is_default = !!this.form.is_default;
                if (mode === "edit" && this.form.phone) {
                    const phoneNumber = parsePhoneNumberFromString(this.form.phone);
                    this.phoneCode = ~~phoneNumber?.countryCallingCode || 86;
                    this.form.phone = phoneNumber?.nationalNumber || "";
                }
            },
        },
    },
    methods: {
        close() {
            this.$refs.form.resetFields();
            this.$emit("update:visible", false);
        },
        getTagType(tag) {
            let type = "info";
            if (this.form.tag && tag === this.form.tag) {
                type = "primary";
            } else {
                type = tag === this.tags[3] && this.isCustomTag ? "primary" : "info";
            }
            return type;
        },
        onTag(tag) {
            this.form.tag = tag;
            if (tag !== this.tags[3]) {
                this.isCustomTag = false;
            } else {
                this.form.tag = "";
                this.isCustomTag = true;
            }
        },
        add() {
            const data = cloneDeep(pick(this.form, Object.keys(defaultForm)));
            data.is_default = ~~data.is_default;
            data.phone = `+${this.phoneCode}${data.phone}`;
            this.loading = true;
            createAddress(data)
                .then((res) => {
                    this.$message({
                        type: "success",
                        message: this.$t("common.messagebox.success"),
                    });
                    const data = res.data.data;
                    this.$emit("update", data);
                    this.close();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        edit() {
            const data = cloneDeep(pick(this.form, Object.keys(defaultForm)));
            data.is_default = ~~data.is_default;
            data.phone = `+${this.phoneCode}${data.phone}`;
            this.loading = true;
            updateAddress(this.data.staged.id, data)
                .then(() => {
                    this.$message({
                        type: "success",
                        message: this.$t("common.messagebox.success"),
                    });
                    this.$emit("update", {
                        ...this.data.staged,
                        ...data,
                    });
                    this.close();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        submit() {
            if (this.loading) return;
            this.$refs.form.validate((valid, fields) => {
                if (valid) {
                    this.isEdit ? this.edit() : this.add();
                } else {
                    console.log("error submit!!!", fields);
                }
            });
        },
    },
};
</script>
<style lang="less">
.m-address-form {
    .m-line {
        .flex;
        gap: 10px;
        align-items: center;
        width: 100%;
        .u-address {
            min-width: 180px;
        }
        .u-tag {
            cursor: pointer;
        }
        @media screen and (max-width: @phone) {
            flex-wrap: wrap;
            .u-address {
                width: 100%;
            }
        }
    }
    .u-custom-tag {
        margin-top: 10px;
    }
}
</style>
