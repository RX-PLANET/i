<template>
    <div class="p-setting-profile">
        <div class="m-profile-form w-card">
            <el-form :model="form" ref="profileForm" label-position="left" label-width="80px" size="large">
                <el-form-item :label="$t('setting.profile.country')">
                    <el-select v-model="form.country" clearable filterable>
                        <el-option
                            v-for="(name, code) in countryList"
                            :key="code"
                            :label="name"
                            :value="code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('setting.profile.birth')">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        :placeholder="$t('setting.profile.birthPlaceholder')"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('setting.profile.bio')">
                    <el-input type="textarea" v-model="form.bio" :rows="4" :maxlength="80" show-word-limit></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="u-confirm" :disabled="loading" @click="submit">{{
                        $t("common.messagebox.confirm")
                    }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getProfile, updateProfile } from "@/service/account";
import User from "@iruxu/rx-common/utils/user";
import countries from "i18n-iso-countries";
export default {
    name: "dashboard-setting-profile",
    data() {
        return {
            form: {
                country: "",
                birth: "",
                bio: "",
            },

            countryList: {},
            loading: false,
        };
    },
    computed: {
        lang() {
            return User.getLocale();
        },
    },
    watch: {
        lang: {
            immediate: true,
            handler(val) {
                const lang = val?.split("-")[0];
                countries.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`));
                this.countryList = countries.getNames(lang);
            },
        },
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            getProfile().then((res) => {
                const data = res.data.data;
                const birthArr = [data.birth_year, data.birth_month, data.birth_date].filter(Boolean);

                this.form = {
                    country: data.country || "",
                    birth: birthArr.join("-") || "",
                    bio: data.bio || "",
                };
            });
        },
        submit() {
            this.$refs.profileForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    const [birth_year, birth_month, birth_date] = this.form.birth.split("-");
                    updateProfile({
                        country: this.form.country,
                        birth_year,
                        birth_month,
                        birth_date,
                        bio: this.form.bio,
                    })
                        .then(() => {
                            this.$message.success(this.$t("common.messagebox.success"));
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
        },
    },
};
</script>
