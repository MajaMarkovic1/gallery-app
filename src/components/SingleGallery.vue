<template>
    <div class="container">

        <div class="gallery-data">
            <h1>{{ gallery.title }}</h1>
            <div v-if="gallery.user">
                <div id="buttons">
                    <button 
                        v-if="isAuthenticated && gallery.user.id == user_id"
                        @click="deleteGallery(gallery)" 
                        name="submit" class="btn btn-danger" type="submit">
                        Delete
                    </button>
                    <router-link 
                        v-if="isAuthenticated && gallery.user.id == user_id"
                        :to="{ name: 'edit-gallery', params: {id: gallery.id}}" 
                        name="submit" class="btn btn-dark" type="submit" id="edit-btn">
                        Edit
                    </router-link> 
                </div>
                
                <em>Author:</em> 
                <router-link :to="{ name: 'single-author', params: {id: gallery.user.id}}" id="user">
                    {{ gallery.user.first_name }} {{ gallery.user.last_name }}                
                </router-link>
            </div>
            <div><em>Created at:</em> {{ gallery.created_at }}</div>
            <div id="description">{{ gallery.description }}</div>
        </div>

        <b-carousel id="carousel1"
            controls
            indicators
            background="#ababab"
            :interval="3000"
            v-model="slide"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            v-if="gallery.images">
            <b-carousel-slide
                style="height: 500px;"
                v-for="image in gallery.images.slice().reverse()" :key="image.id"
                :img-src="image.image_url">
            <div id="link-view">
                <button class="btn btn-dark" @click="openInNewTab(image.image_url)">View</button>
            </div>
            </b-carousel-slide>
        </b-carousel>
        
        <ul class="list-group list-group-flush" v-for="comment in gallery.comments" :key="comment.id">
            <li class="list-group-item">
                <div id="first-li" v-if="comment.user"><strong>
                    {{ comment.user.first_name }} {{ comment.user.last_name }}</strong>
                    <div v-if="comment.user">
                        <button 
                            v-if="isAuthenticated && comment.user.id == user_id"
                            @click="deleteComment(comment)" 
                            name="submit" class="btn btn-danger">
                            <i class="far fa-trash-alt"></i>
                        </button> 
                    </div>
                </div>
                <div style="font-size: 0.8rem;">at <em>{{ comment.created_at }}</em></div>
                <div>{{ comment.text }}</div> 
            </li>                                 
        </ul>
        <form v-if="isAuthenticated" @submit.prevent="onSubmit">
            <div>
                <textarea name="text" cols="50" rows="2" v-model="newComment.text"></textarea> 
            </div>
             <div class="input-group">
                <span class="alert alert-warning" v-if="e.text">{{ e.text[0] }}</span>                        
            </div>
            <button name="submit" class="btn btn-info" type="submit">Add</button>
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
            er: '',
            user_id: authService.getUserId(),
            isAuthenticated: authService.isAuthenticated()
        }
    },

    created(){
        galleries.get(this.$route.params.id)
        .then(response => {
            this.gallery = response.data
            console.log(this.gallery)
        })
        
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
            if (!confirm('Are you sure you want to delete this comment?')){
                return;
            }
            galleries.deleteComment(comment.id)
            .then(response => {
                let index = this.gallery.comments.indexOf(comment)
                this.gallery.comments.splice(index, 1)
            })
            .catch(err => this.e = err.response.data)
        },

        deleteGallery(gallery){
            if (!confirm('Are you sure you want to delete this gallery?')){
                return;
            }
            galleries.deleteGallery(gallery.id)
            .then(response => {
                this.$router.push('/my-galleries')
            })
            .catch(err => this.e = err.response.data)
        }

    }
    
}
</script>

<style scoped>

.container {
    margin-top: 2rem;
}
h1 {
    margin-bottom: 2rem;
}
.gallery-data {
    text-align: center;
}

#description {
    margin: 2rem;
}

#buttons {
    margin: 0 auto;
    width: 15%;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
}

#edit-btn {
    width: 4rem;
}

#user {
    color: black;
}

#carousel1 {
    text-shadow: 1px 1px 2px #333; 
    height: 500px; 
    margin: 0 auto; 
    margin-top: 2rem; 
    margin-bottom: 3rem;
}

#link-view {
    margin: 0 auto;
    width: 10%;
    margin-bottom: 25rem;
}

.list-group {
    width: 50%;
}

#first-li {
    display: flex;
    justify-content: space-between;
}

form{
    margin-top: 2rem;
    padding-bottom: 3rem;
}


</style>


