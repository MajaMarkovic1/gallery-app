import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login";
import AllGalleries from "./components/AllGalleries";
import Register from './components/Register'
import SingleGallery from './components/SingleGallery'
import SingleAuthor from './components/SingleAuthor'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
      { path: '/', redirect: 'all-galleries' },
      { path: '/all-galleries', name: 'all-galleries', component: AllGalleries },      
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register },
      { path: '/galleries/:id', name: 'single-gallery', component: SingleGallery },
      { path: '/authors/:id', name: 'single-author', component: SingleAuthor },
      
  ]
});
