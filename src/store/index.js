// 1.Dependency
import { createStore } from "vuex";

// 2.Store
const store = {
    state: {
        user: {},
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
    },
    getters: {
        user: (state) => state.user,
    },
    actions: {},
};

export default createStore(store);
