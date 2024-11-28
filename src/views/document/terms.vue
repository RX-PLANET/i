<template>
    <div class="p-document-terms">
        <div class="m-header">
            <logo :app="app"></logo>
            <lang-select :lang="lang" @change="langChange" />
        </div>
        <div class="u-document" v-html="document"></div>
    </div>
</template>

<script>
import Logo from "@iruxu/pkg-widget/src/components/common/logo.vue";
import LangSelect from "@iruxu/pkg-widget/src/components/common/lang-select.vue";
import User from "@iruxu/rx-common/utils/user";
import { getCdnLink } from "@iruxu/rx-common/utils/common";
import { getDocument } from "@/service/document";
export default {
    name: "DocumentTerms",
    components: {
        Logo,
        LangSelect,
    },
    data() {
        return {
            loading: false,
            app: "",
            slug: "terms",
            document: "",
            lang: User.getLocale(),
        };
    },
    computed: {
        isCn() {
            // 中文
            return this.lang === "zh-CN";
        },
    },
    mounted() {
        const search = new URLSearchParams(document.location.search);

        if (search.has("app")) {
            this.app = search.get("app");
        } else {
            this.app = "miipet";
        }

        this.load();
    },
    methods: {
        langChange(lang) {
            this.lang = lang;
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
    },
};
</script>

<style lang="less">
.p-document-terms {
    padding: 20px;
    max-width: 1000px;
    box-sizing: border-box;
    margin: 0 auto;

    @media screen and (max-width: @phone) {
        width: 100%;
    }
    .w-logo {
        margin: 0;
    }
    .u-logo {
        .size(50px);
    }
    .m-header {
        .flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px dashed #ccc;
    }
    .u-document {
        padding: 20px 0;
        font-size: 12px;
        color: #999;
    }
}
</style>
