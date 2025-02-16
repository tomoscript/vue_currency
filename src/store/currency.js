import axios from "axios";

const state = () => ({
  sourceCurrency: "usd",
  targetCurrency: "idr",
  rateCurrency: 0,
  loading: false,

  listCurrency: [],
});

const mutations = {
  setSourceCurrency(state, data) {
    state.sourceCurrency = data;
  },
  setTargetCurrency(state, data) {
    state.targetCurrency = data;
  },
  setRateCurrency(state, data) {
    state.rateCurrency = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
  setListCurrency(state, data) {
    state.listCurrency = data;
  },
};

const actions = {
  async fetchRate(store) {
    try {
      store.commit("setLoading", true);
      const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
      const response = await axios.get(
        `${baseUrl}/${store.state.sourceCurrency}/${store.state.targetCurrency}.json`
      );

      const resData = response.data;

      store.commit("setRateCurrency", resData[store.state.targetCurrency]);
      store.commit("setLoading", false);
    } catch (error) {
      console.log(error);
      store.commit("setLoading", false);
    }
  },
  async fetchCurrencies(store) {
    try {
      store.commit("setLoading", true);
      const baseUrl = "https://app.26r.my.id";
      const response = await axios.get(`${baseUrl}/public/api/currency?limit=250`);

      const resData = response.data;

      store.commit("setListCurrency", resData.data);
      store.commit("setLoading", false);
    } catch (error) {
      console.log(error);
      store.commit("setLoading", false);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
