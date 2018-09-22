<template>
    <div class="container">
        <div class="wrapper" v-if="galleries"> 
            <div class="card" style="width: 19rem; height: 20rem;" 
                v-for="gallery in galleries" :key="gallery.id" 
                v-if="gallery.images">
                <img class="card-img-top" :src="gallery.images[0].image_url" alt="Card image cap">
                <div class="card-body bg-light">
                    <router-link :to="{ name: 'single-gallery', params: {id: gallery.id}}">
                        <h4 class="card-text" ><strong>{{ gallery.title }}</strong></h4>
                    </router-link>
                    <div class="card-text" style="padding: 0.6rem;">by
                        <router-link :to="{ name: 'single-author', params: {id: gallery.user.id}}" 
                            style="color: black;">
                            <em>{{ gallery.user.first_name }} {{ gallery.user.last_name }}</em>
                        </router-link>
                        <div class="card-text" style="font-size: 0.7rem;">{{ gallery.created_at }}</div>
                    </div>
                </div>
            </div>
        </div> 
        <button class="btn btn-primary"
            @click="loadMore" 
            v-show="pagination.total > galleries.length">Load more
        </button>
    </div>
</template>

<script>
import { galleries } from '../services/Galleries'
export default {
    data(){
        return {
            galleries: [],
            pagination: {},
            galleriesPaginate: []
            
        }
    },

    beforeRouteEnter(to, from, next){
        galleries.getAll()
        .then(response => {
            next(vm => {
                vm.galleries = response.data.data
                vm.pagination = response.data
                console.log(response.data.data)
            })
        })
        .catch(err => console.log(err))
    },

    methods: {
         loadMore(){
            
            this.pagination.current_page++
            
            galleries.getGallery(this.pagination.current_page)
            .then(response => {
                this.galleriesPaginate = response.data.data
                this.galleries = this.galleries.concat(this.galleriesPaginate)
                console.log(this.galleries.length)
                console.log(this.pagination.total)
            })
        }, 
    }
    
}
</script>

<style scoped>
.container {
    margin-top: 1rem;
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
}

#no-galleries {
    font-size: 2rem;
}

h4{
    color: black;
}
img {
    height: 60%;
}


</style>


