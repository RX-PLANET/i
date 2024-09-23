// 1.Dependency
import { createStore } from "vuex";

// 2.Store
const store = {
    state: {
        user: {},

        navExpanded: false,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_NAV(state, val) {
            state.navExpanded = val;

            localStorage.setItem("nav_expanded", state.navExpanded);
        },
    },
    getters: {
        user: (state) => state.user,
    },
    actions: {},
};

export default createStore(store);
