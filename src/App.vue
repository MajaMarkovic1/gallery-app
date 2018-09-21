<template>
  <div id="app">
    <NavBar :isAuthenticated="isAuthenticated" @userAuthenticated="toggleAuthenticated" />
    <router-view :isAuthenticated="isAuthenticated" @userAuthenticated="toggleAuthenticated" />
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import { authService } from './services/Auth';

export default {
  components: {
    NavBar
  },

  data(){
    return {
      isAuthenticated: authService.isAuthenticated()
    }
  },

   methods: {
    toggleAuthenticated(value){
      this.isAuthenticated = value
    }
  }
}
</script>




