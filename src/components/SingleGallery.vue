<template>
    <div class="container">

        <div class="gallery-data">
            <h1>{{ gallery.title }}</h1>
            <div v-if="gallery.user" style="margin-top: 1rem;">
                <button 
                    v-if="isAuthenticated && gallery.user.id == user_id"
                    @click="deleteGallery(gallery)" 
                    name="submit" class="btn btn-primary" type="submit">Delete
                </button> 
                <em>Author:</em> 
                <router-link :to="{ name: 'single-author', params: {id: gallery.user.id}}" id="user">
                    {{ gallery.user.first_name }} {{ gallery.user.last_name }}                
                </router-link>
            </div>
            <div><em>Created at:</em> {{ gallery.created_at }}</div>
            <div style="margin-top: 1rem;">{{ gallery.description }}</div>
        </div>

        <b-carousel id="carousel1"
            style="text-shadow: 1px 1px 2px #333; margin: 0 auto; margin-top: 2rem; margin-bottom: 3rem;"
            controls
            indicators
            background="#ababab"
            :interval="3000"
            v-model="slide"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            v-if="gallery.images">
            <b-carousel-slide id="image"
                style="height: 500px;"
                v-for="image in gallery.images" :key="image.id"
                :img-src="image.image_url"
            ><button id="link-view" class="btn btn-outline-light" @click="openInNewTab(image.image_url)">View</button> </b-carousel-slide>
        </b-carousel>
        
        <h3 v-if="gallery.comments">Comments:</h3>

        <ul class="list-group list-group-flush" v-for="comment in gallery.comments" :key="comment.id">
            <li class="list-group-item" v-if="comment.user"><strong>
                {{ comment.user.first_name }} {{ comment.user.last_name }}
            </strong></li>
            <li class="list-group-item" style="font-size: 0.8rem;"><em>{{ comment.created_at }}</em></li>
            <li class="list-group-item">{{ comment.text }}</li> 
            <div v-if="comment.user">
                <button 
                    v-if="isAuthenticated && comment.user.id == user_id"
                    @click="deleteComment(comment)" 
                    name="submit" class="btn btn-primary" type="submit">Delete
                </button> 
            </div>
                                             
        </ul>
        <form v-if="isAuthenticated" @submit.prevent="onSubmit">
            <div>
                <textarea name="text" cols="50" rows="2" v-model="newComment.text"></textarea> 
            </div>
             <div class="input-group">
                <span class="alert alert-warning" v-if="e.text">{{ e.text[0] }}</span>                        
            </div>
            <button name="submit" class="btn btn-primary" type="submit">Add comment</button>
        </form>
    </div>
</template>

<script>
import { galleries } from '../services/Galleries'
import { authService } from '../services/Auth'


export default {
    data(){
        return {
            gallery: {},
            slide: 0,
            sliding: null,
            newComment: {},
            e: [],
            user_id: authService.getUserId(),
            isAuthenticated: authService.isAuthenticated()
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
        },

        onSubmit(){
            this.newComment.gallery_id = this.gallery.id
            galleries.addComment(this.newComment)
            .then(response => {
                this.newComment = response.data
                this.gallery.comments.push(this.newComment)
                console.log(this.newComment.user)
                this.newComment = {}
                
            })
            .catch(err => this.e = err.response.data.errors)
        },

        deleteComment(comment){
            galleries.deleteComment(comment.id)
            .then(response => {
                let index = this.gallery.comments.indexOf(comment)
                this.gallery.comments.splice(index, 1)
            })
            .catch(err => this.e = err.response.data)
        },

        deleteGallery(gallery){
            galleries.deleteGallery(gallery.id)
            .then(response => {
                this.$router.push('/my-galleries')
            })
            .catch(err => this.e = err.response.data)
        }

    }
    
}
</script>

<style>
.gallery-data {
    text-align: center;
}

#user {
    color: grey;
}

#link-view {
    /* margin-bottom: 35rem;
    margin-left: 22rem;  */
}

form{
    margin-top: 2rem;
}

</style>


