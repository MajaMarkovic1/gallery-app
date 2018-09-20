<template>
    <div class="container">
        <div class="wrapper" v-if="user.galleries"> 
            <div class="card" style="width: 19rem;" 
                v-for="gallery in user.galleries.slice().reverse()" :key="gallery.id" 
                v-if="gallery.images">
                <img class="card-img-top" :src="gallery.images[0].image_url" alt="Card image cap">
                <div class="card-body bg-light">
                    <router-link :to="{ name: 'single-gallery', params: {id: gallery.id}}">
                        <h4 class="card-text" ><strong>{{ gallery.title }}</strong></h4>
                    </router-link>
                    <div class="card-text" style="padding: 0.6rem;">by
                        <router-link :to="{ name: 'single-author', params: {id: user.id}}" 
                            style="color: black;">
                            <em>{{ user.first_name }} {{ user.last_name }}</em>
                        </router-link>
                        <div class="card-text" style="font-size: 0.7rem;">{{ gallery.created_at }}</div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import { galleries } from '../services/Galleries'

export default {
    data(){
        return {
            user: {}
        }
    },

    beforeRouteEnter(to, from, next){
        galleries.getAuthor(to.params.id)
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

<style>

.wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 90%;  
}

</style>


