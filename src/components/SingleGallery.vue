<template>
    <div class="container">
        <h1>{{ gallery.title }}</h1>
        <div v-if="gallery.user" style="margin-top: 1rem;">
            <em>Author:</em> 
            <router-link :to="{ name: 'single-author', params: {id: gallery.user.id}}" id="user">
                {{ gallery.user.first_name }} {{ gallery.user.last_name }}                
            </router-link>
        </div>
        <div><em>Created at:</em> {{ gallery.created_at }}</div>
        <div style="margin-top: 1rem;">{{ gallery.description }}</div>
        <!-- <div v-for="image in gallery.images" :key="image.id">
            <img :src="image.image_url" alt="">
        </div> -->
        <b-carousel id="carousel1"
            style="text-shadow: 1px 1px 2px #333; height: 700px; margin: 0 auto; margin-top: 2rem;"
            controls
            indicators
            background="#ababab"
            :interval="3000"
            v-model="slide"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            v-if="gallery.images">
        
            <b-carousel-slide id="image"
                style="height: 700px;"
                v-for="image in gallery.images" :key="image.id"
                :img-src="image.image_url"
            ><button id="link-view" class="btn btn-outline-light" @click="openInNewTab(image.image_url)">View</button> </b-carousel-slide>

    </b-carousel>
    </div>
</template>

<script>
import { galleries } from '../services/Galleries'

export default {
    data(){
        return {
            gallery: {},
            slide: 0,
            sliding: null
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
    },

    methods: {

        onSlideStart (slide) {
            this.sliding = true
        },
        onSlideEnd (slide) {
            this.sliding = false
        },
        openInNewTab(link){
            window.open(link, '_blank')
        }
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

#link-view {
    margin-bottom: 35rem;
    margin-left: 23rem;
}

</style>


