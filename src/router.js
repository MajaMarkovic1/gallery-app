import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login";
import AllGalleries from "./components/AllGalleries";
import Register from './components/Register'
import SingleGallery from './components/SingleGallery'
import SingleAuthor from './components/SingleAuthor'
import MyGalleries from './components/MyGalleries'
import CreateGallery from './components/CreateGallery'


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
      { path: '/my-galleries', name: 'my-galleries', component: MyGalleries },
      { path: '/create', name: 'create', component: CreateGallery },      
      { path: '/edit-gallery/:id', name: 'edit-gallery', component: CreateGallery },      
      
  ]
});
