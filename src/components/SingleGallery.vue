<template>
    <div>
        <h1>{{ gallery.title }}</h1>
        <div v-if="gallery.user" style="margin-top: 1rem;">
            <em>Author:</em> 
            <router-link :to="{ name: 'single-author', params: {id: gallery.user.id}}" id="user">
                {{ gallery.user.first_name }} {{ gallery.user.last_name }}                
            </router-link>
        </div>
        <div><em>Created at:</em> {{ gallery.created_at }}</div>
        <div style="margin-top: 1rem;">{{ gallery.description }}</div>
        <div v-for="image in gallery.images" :key="image.id">
            <img :src="image.image_url" alt="">
        </div>
    </div>
</template>

<script>
import { galleries } from '../services/Galleries'

export default {
    data(){
        return {
            gallery: {}
        }
    },

    beforeRouteEnter(to, from, next){
        galleries.get(to.params.id)
        .then(response => {
            next(vm => {
                vm.gallery = response.data
                console.log(response.data)
            })
        })
        .catch(err => console.log(err))
    }
    
}
</script>

<style>
div {
    text-align: center;
}

#user {
    color: grey;
}
</style>


