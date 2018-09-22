<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <div class="form-group row">
                <label for="email" class="col-4 col-form-label">Email</label>
                <div class="col-8">
                    <div class="input-group">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            class="form-control here"
                            v-model="email"
                            v-validate="'required|email'">
                    </div>
                    <div v-show="errors.has('email')" class="alert alert-warning">{{ errors.first("email")}}</div>    
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-4 col-form-label">Password</label>
                <div class="col-8">
                    <div class="input-group">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            class="form-control here"
                            v-model="password"
                            v-validate="'required'">
                    </div>
                    <div v-show="errors.has('password')" class="alert alert-warning">{{ errors.first("password")}}</div>                                
                   <div class="input-group">
                        <span class="alert alert-warning" v-if="error">{{ error }}</span>                        
                    </div> 
                </div>
            </div>
            <button name="submit" class="btn btn-primary" type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { authService } from '../services/Auth'

export default {
    data(){
        return {
            email: '',
            password: '',
            error: '',
        }
    },

    methods: {
        onSubmit(){
            
            {this.$validator.validateAll()
                .then((value) => {
                    if (value){
                    authService.login(this.email, this.password)
                        .then((response) => {
                            this.$emit('userAuthenticated', true)
                            this.$router.push('/all-galleries')
                        })
                          .catch((err) => {
                                this.error = err.response.data.error
                            })
                    }})
            }  
        }
        
    }
    
}
</script>

<style>

label{
    text-align: left;
}

button{
    float: left;
}
</style>



