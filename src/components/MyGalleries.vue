<template>
  <div class="container">
     <div class="wrapper" v-if="user"> 
            <div class="card" style="width: 19rem;" 
                v-for="gallery in user.galleries" :key="gallery.id" 
                v-if="gallery.images">
                <img class="card-img-top" :src="gallery.images[0].image_url" alt="Card image cap">
                <div class="card-body bg-light">
                    <router-link :to="{ name: 'single-gallery', params: {id: gallery.id}}">
                        <h4 class="card-text" ><strong>{{ gallery.title }}</strong></h4>
                    </router-link>
                    <div class="card-text" style="padding: 0.6rem;">by
                        <router-link :to="{ name: 'my-galleries', params: {id: user.id}}" 
                            style="color: black;">
                            <em>{{ user.first_name }} {{ user.last_name }}</em>
                        </router-link>
                        <div class="card-text" style="font-size: 0.7rem;">{{ gallery.created_at }}</div>
                    </div>
                </div>
            </div>
        </div> 
        <div id="no-galleries" v-else><strong>You have no galleries yet! Add one.</strong></div>
  </div>
</template>

<script>
import { galleries } from '../services/Galleries';
export default {
  data(){
    return {
      user: {}
    }
  },

  beforeRouteEnter(to, from, next){
    galleries.getLoggedUser()
    .then(response => {
      next(vm => {
        vm.user = response.data
        console.log(vm.user)
      })
    })
    .catch(err => console.log(err))
  }
  
}
</script>



