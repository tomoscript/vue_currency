<template>
  <div class="table__page">
    <h3>List Currency</h3>
    <table>
      <thead>
        <tr>
          <th class="text-left">Code</th>
          <th class="text-left">Currency Name</th>
          <th class="text-left">Currency Symbol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listCurrency" :key="item.name">
          <td class="text__center">{{ item.currency_code }}</td>
          <td>{{ item.currency_name }}</td>
          <td class="text__center">{{ item.currency_symbol }}</td>
        </tr>
      </tbody>
    </table>
    <v-pagination v-model="currentPage" class="my-4" :length="totalPage"></v-pagination>
    <v-dialog v-model="loading" :scrim="false" persistent width="200px">
      <v-card color="#c5e1c5">
        <v-card-text>
          &nbsp;
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CurrencyView",
  data() {
    return {
      listCurrency: [],
      loading: false,
      offset: 0,
      totalPage: 10,
      currentPage: 1,
    };
  },
  methods: {
    async fetchCountry() {
      this.loading = true;
      const response = await axios.get(`https://app.26r.my.id/public/api/currency?offset=${this.offset}`);
      this.listCurrency = response.data.data;
      this.totalPage = Math.ceil(response.data.count / 10);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  watch: {
    currentPage(newVal) {
      this.offset = (newVal - 1) * 10;
      this.fetchCountry();
    },
  },
  mounted() {
    this.fetchCountry();
  },
};
</script>

<style>
.table__page {
  margin-top: 32px;
}
table {
  border-spacing: 0;
  width: 100%;
  margin-top: 24px;
}
th,
td {
  padding: 10px 16px;
  border: 1px solid #eee;
}
th {
  background-color: #c5e1c5;
  border-color: #70a370;
}
.text__center {
  text-align: center;
}
</style>
