import Vue from "vue";
import VueRouter from "vue-router";

import HomeRoute from "./../views/home.vue";

import ToplistRoute from "./../views/toplist.vue";
Vue.use(VueRouter);
export default new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: HomeRoute
    },
    {
      path: "/toplist",
      component: ToplistRoute
    },
    {
      path: "*",
      component: HomeRoute
    }
  ]
});