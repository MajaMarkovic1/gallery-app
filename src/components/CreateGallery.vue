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
                    <div class="input-group">
                        <span class="alert alert-warning" v-if="errors.title">{{ errors.title[0] }}</span>                        
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
            <div class="form-group row" v-for="(num, index) in number" :key="index">
                <label for="images" class="col-4 col-form-label">Image</label>
                <div class="col-8">
                    <div class="input-group">
                        <input
                            id="image_url"
                            name="image_url"
                            type="text"
                            class="form-control here"
                            v-model="gallery.images[index]">
                            <button class="btn btn-light" @click="deleteUrl(gallery.images[index])">
                                <i class="far fa-trash-alt"></i>
                            </button> 
                    </div>
                     
                    <button class="btn btn-light" @click="moveUp">
                        <i class="fas fa-arrow-up"></i>                  
                    </button>
                    <button class="btn btn-light">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                    <div class="input-group">
                        <span class="alert alert-warning" v-if="errors.images">{{ errors.images[0] }}</span>                        
                    </div> 
                </div>
            </div>
            <div class="form-group row">
                <div class="col-4 col-form"></div>
                <div class="col-8">
                    <button class="btn btn-light" @click="addUrl">
                        <i class="far fa-plus-square"></i>
                    </button>
                </div>
            </div>
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
            },
            number: 1,
            errors: []
        }
    },

    methods: {
        onSubmit(){
            galleries.add(this.gallery)
            .then(response => {
                //console.log(this.gallery.images)
                this.$router.push('/my-galleries')
            })
            .catch(err => console.log(this.errors = err.response.data.errors))
        },

        addUrl(){
            return this.number++
           
        },

        deleteUrl(image){
            if (this.number > 1){
                console.log(this.gallery.images)
                let index = this.gallery.images.indexOf(image)
                this.gallery.images.splice(image, 1)
                this.number--
                
                console.log(this.gallery.images)
                
            }
        },

        moveUp(){
            

        }

      
    }
    

}
</script>

<style>
.fa-plus-square, .fa-trash-alt, .fa-arrow-up, .fa-arrow-down {
    font-size: 1.7rem;
    color: gray;
   
}
</style>


