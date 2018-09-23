<template>
  <div class="container">
     <div class="wrapper" v-if="galleries"> 
          <div class="card" 
              v-for="gallery in galleries" :key="gallery.id" 
              v-if="gallery.images">
              <img class="card-img-top" :src="gallery.images[gallery.images.length-1].image_url" alt="Card image cap">
              <div class="card-body bg-light">
                  <router-link :to="{ name: 'single-gallery', params: {id: gallery.id}}">
                      <h4 class="card-text" ><strong>{{ gallery.title }}</strong></h4>
                  </router-link>
                  <div class="card-text" style="padding: 0.6rem;">by
                      <router-link :to="{ name: 'my-galleries', params: {id: gallery.user.id}}" 
                          style="color: black;">
                          <em>{{ gallery.user.first_name }} {{ gallery.user.last_name }}</em>
                      </router-link>
                      <div class="card-text" style="font-size: 0.7rem;">{{ gallery.created_at }}</div>
                  </div>
              </div>
          </div>  
      </div> 
      <div id="load-more">
        <button class="btn btn-primary"
            @click="loadMore" 
            v-if="galleries"
            v-show="pagination.total > galleries.length"
            >Load more
        </button>
      </div>
  </div>
</template>

<script>
import { galleries } from '../services/Galleries';
export default {
  data(){
    return {
      //user: {},
      pagination: {},
      galleriesPaginate: [],
      galleries: []
    }
  },

  beforeRouteEnter(to, from, next){
    galleries.getLoggedUser()
    .then(response => {
      next(vm => {
        vm.galleries = response.data.data
        vm.pagination = response.data
        console.log(vm.galleries)
        console.log(vm.pagination)
      })
    })
    .catch(err => console.log(err))
  },

  methods: {
    loadMore(){
        this.pagination.current_page++
        
        galleries.getMyGalleries(this.pagination.current_page)
        .then(response => {
            this.galleriesPaginate = response.data.data
            this.galleries = this.galleries.concat(this.galleriesPaginate)
            console.log(this.galleries)
            
        })
    }
  }
  
}
</script>

<style scoped>
.container {
    margin-top: 2rem;
    padding-bottom: 3rem;
}

.wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 90%;  
}

.card {
    margin: 0.1rem;
    text-align: center;
    width: 20rem; 
    height: 22rem;
}

img {
    height: 60%;
}

.card:hover {
    transform: scale(1.1);
}

h4{
    color: black;
}

#load-more {
    margin: 0 auto;
    width: 10%;
    margin-top: 2rem;
}
</style>




