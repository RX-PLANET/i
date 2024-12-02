<template>
    <div class="p-setting-info">
        <div class="m-info-form w-card">
            <el-form
                :model="form"
                ref="infoForm"
                label-position="left"
                label-width="120px"
                :rules="rules"
                require-asterisk-position="right"
                size="large"
            >
                <el-form-item :label="$t('setting.info.avatar')">
                    <upload-image
                        :url="form.avatar"
                        @update="onAvatarUpdate"
                        :domain="domain"
                        :upload-fn="upload"
                        :default-avatar="logo"
                        :size="[80, 80]"
                        shape="circle"
                    ></upload-image>
                </el-form-item>

                <el-form-item :label="$t('setting.info.nickname')" prop="nickname">
                    <span v-if="!isEditingNickname">{{ form.nickname }}</span>
                    <el-input
                        v-else
                        v-model="tmpNickname"
                        style="width: 300px"
                        :maxlength="30"
                        :minlength="3"
                    ></el-input>
                    <el-button
                        v-if="!isEditingNickname"
                        icon="Edit"
                        link
                        class="u-edit-btn"
                        @click="onEditNickname"
                    ></el-button>
                    <template v-else>
                        <el-button class="u-edit-btn" @click="onEditNicknameConfirm" type="primary">{{
                            $t("common.messagebox.confirm")
                        }}</el-button>
                        <el-button class="u-edit-btn" @click="onEditNicknameCancel">{{
                            $t("common.messagebox.cancel")
                        }}</el-button>
                    </template>
                </el-form-item>

                <el-form-item :label="$t('setting.info.locale')" class="m-language-setting">
                    <lang-select @change="onLangChange" :lang="form.lang"></lang-select>
                </el-form-item>

                <el-form-item :label="$t('setting.info.email')">
                    <span>{{ user.email || "-" }}</span>
                    <el-button icon="Setting" link class="u-edit-btn" @click="onEmailEdit"></el-button>
                </el-form-item>
                <el-form-item :label="$t('setting.info.phone')">
                    <span>{{ secretPhone(user.phone) }}</span>
                    <el-button icon="Setting" link class="u-edit-btn" @click="onPhoneEdit"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="loading" class="u-confirm" @click="onConfirm">{{
                        $t("common.messagebox.confirm")
                    }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { markRaw } from "vue";
import UploadImage from "@iruxu/pkg-widget/src/components/common/upload-image.vue";
import GlobalConf from "@iruxu/rx-common/data/global.json";
import { uploadAvatar, updateNickname, checkNickname, updateUserInfo } from "@/service/account";
import logo from "@/assets/img/logo/iruxu.svg";

export default {
    name: "dashboard-profile-info",
    components: {
        UploadImage,
    },
    data() {
        return {
            form: {
                avatar: "",
                nickname: "",
                lang: "",
            },
            isEditingNickname: false,
            tmpNickname: "",

            rules: {
                nickname: [
                    { required: true, message: this.$t("setting.info.nicknameRequired"), trigger: "blur" },
                    { validator: this.checkNickname, trigger: "blur" },
                ],
            },
            loading: false,

            domain: markRaw(GlobalConf.__defaultCDN + "/"),
            logo: markRaw(logo),
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    watch: {
        user: {
            handler(val) {
                this.form = {
                    avatar: val.avatar || "",
                    nickname: val.nickname || "",
                    lang: val.lang || "",
                };
            },
            immediate: true,
        },
    },
    methods: {
        onAvatarUpdate(url) {
            this.form.avatar = url;
        },
        upload(file) {
            return uploadAvatar(file);
        },
        onLangChange(lang) {
            this.form.lang = lang;
        },
        onEditNickname() {
            this.tmpNickname = this.form.nickname;
            this.isEditingNickname = true;
        },
        onEditNicknameCancel() {
            this.form.nickname = this.tmpNickname;
            this.$refs.infoForm.clearValidate("nickname");
            this.isEditingNickname = false;
        },
        onEditNicknameConfirm() {
            updateNickname({ nickname: this.tmpNickname }).then(() => {
                this.form.nickname = this.tmpNickname;
                this.$message.success(this.$t("common.messagebox.success"));
                this.isEditingNickname = false;
            });
        },
        checkNickname(rule, value, callback) {
            if (!value) {
                return callback(new Error(this.$t("setting.info.nicknameRequired")));
            }
            checkNickname(this.tmpNickname).then((res) => {
                if (res) {
                    callback();
                } else {
                    if (this.tmpNickname === this.form.nickname) {
                        return callback();
                    }
                    callback(new Error(this.$t("setting.info.nicknameExist")));
                }
            });
        },
        onEmailEdit() {
            const path = this.$router.resolve({ name: "dashboard-notification-email" });

            window.open(path.href, "_blank");
        },
        onPhoneEdit() {
            const path = this.$router.resolve({ name: "dashboard-notification-phone" });

            window.open(path.href, "_blank");
        },
        /**
         * 秘密加*号
         */
        secretPhone(phone) {
            return phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : "-";
        },
        onConfirm() {
            this.loading = true;
            const data = {
                avatar: this.form.avatar,
                lang: this.form.lang,
            };

            updateUserInfo(data)
                .then(() => {
                    this.$message.success(this.$t("common.messagebox.success"));
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
