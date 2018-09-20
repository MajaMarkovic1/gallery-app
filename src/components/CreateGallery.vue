<template>
    <div class="container">
        <form @submit.prevent>
            <div class="form-group row">
                <label for="title" class="col-4 col-form-label">Name</label>
                <div class="col-8">
                    <div class="input-group">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            class="form-control here"
                            v-model="gallery.title">
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="description" class="col-4 col-form-label">Description</label>
                <div class="col-8">
                    <div class="input-group">
                        <textarea
                            id="description"
                            name="description"
                            type="text"
                            class="form-control here"
                            v-model="gallery.description"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="images" class="col-4 col-form-label">Images</label>
                <div class="col-8">
                    <div class="input-group">
                        <input
                            id="image_url"
                            name="image_url"
                            type="text"
                            class="form-control here"
                            v-model="gallery.images.image_url">
                        <button class="btn btn-light" @click="addUrl(gallery.images.image_url)" style="margin-left: 1rem;">
                            <i class="far fa-plus-square"></i>
                        </button>
                    </div>
                </div>
            </div>
              <!-- <div class="form-group row">
                <div class="col-8">
                    <div class="input-group">
                        <input
                            id="image"
                            name="image"
                            type="text"
                            class="form-control here"
                            v-model="gallery.images.image_url"
                            >
                        <button class="btn btn-light" @click="addUrl(gallery.images.image_url)" style="margin-left: 1rem;">
                            <i class="far fa-plus-square"></i>
                        </button>
                    </div>
                </div>
            </div> -->
            <button @click="onSubmit" class="btn btn-primary" type="submit">Add</button>
        </form>
    </div>
</template>

<script>
import { galleries } from '../services/Galleries'

export default {
    data(){
        return {
            gallery: {
                title: '',
                description: '',
                images: []
            }
        }
    },

    methods: {
        onSubmit(){
            galleries.add(this.gallery)
            .then(response => {
                //console.log(this.gallery.images)
                this.$router.push('/my-galleries')
            })
            .catch(err => console.log(err))
        },

        addUrl(url){
            return this.gallery.images.push(url)
        }
    }
    

}
</script>

<style>
.fa-plus-square {
    font-size: 1.7rem;
    color: gray;
   
}
</style>


