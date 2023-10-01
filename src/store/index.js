import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import currency from "./currency";

Vue.use(Vuex);

const persistedstate = createPersistedState({
  paths: ["currency"],
});

export default new Vuex.Store({
  plugins: [persistedstate],
  modules: {
    currency: {
      namespaced: true,
      ...currency,
    },
  },
});
