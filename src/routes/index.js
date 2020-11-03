import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeRoute from './../views/home.vue'


Vue.use(VueRouter);
export default new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: HomeRoute,
    },
    {
      path: "*",
      component: HomeRoute,
    }
  ]
})
