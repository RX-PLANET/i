// 1.Dependency
import { createStore } from "vuex";
import { getUserInfo } from "@/service/account";
import { apps } from "@/assets/data/config/app";
import User from "@iruxu/pkg-common/utils/user";

// 2.Store
const store = {
    state: {
        user: {},

        navExpanded: false,

        app: "miipet",
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_NAV(state, val) {
            state.navExpanded = val;

            localStorage.setItem("nav_expanded", state.navExpanded);
        },
        SET_APP(state, val) {
            state.app = val;
        },
    },
    getters: {
        user: (state) => state.user,
        appLabel: (state) => {
            const app = apps.find((item) => item.value === state.app);
            return app ? app.label : "";
        },
    },
    actions: {
        getProfile({ commit }) {
            return getUserInfo().then((res) => {
                commit("SET_USER", res.data.data);

                // 保存用户信息
                User._save(res.data.data);

                return res.data.data;
            });
        },
    },
};

export default createStore(store);
