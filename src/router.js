import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login";
import AllGalleries from "./components/AllGalleries";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
      { path: '/', redirect: 'all-galleries' },
      { path: '/all-galleries', name: 'all-galleries', component: AllGalleries },      
      { path: '/login', name: 'login', component: Login },
  ]
});
