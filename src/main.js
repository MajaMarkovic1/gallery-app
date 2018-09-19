import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { authService } from './services/Auth';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && authService.isAuthenticated()){
    next({path: 'all-galleries'})
  } else if (to.name === 'register' && authService.isAuthenticated()){
    next({path: 'all-galleries'})  
  } else if (to.name === 'my-galleries' && !authService.isAuthenticated()) {  
    next({path: 'all-galleries'})
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
