import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";
import CurrencyView from "../views/CurrencyView.vue";
import CountryView from "../views/CountryView.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/currency",
        name: "currency",
        component: CurrencyView,
      },
      {
        path: "/country",
        name: "country",
        component: CountryView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
