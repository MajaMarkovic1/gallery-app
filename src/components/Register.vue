<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
        <div class="form-group row">
            <label for="first_name" class="col-4 col-form-label">First name</label>
            <div class="col-8">
                <div class="input-group">
                    <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    class="form-control here"
                    v-model="user.first_name"
                    v-validate="'required'">
                </div> 
                <div v-show="errors.has('first_name')" class="alert alert-warning">{{ errors.first("first_name")}}</div>    
                <div class="input-group">
                    <span class="alert alert-warning" v-if="e.first_name">{{ e.first_name[0] }}</span>                        
                </div>                    
            </div>
        </div>
         <div class="form-group row">
            <label for="last_name" class="col-4 col-form-label">Last name</label>
            <div class="col-8">
                <div class="input-group">
                    <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    class="form-control here"
                    v-model="user.last_name"
                    v-validate="'required'">
                </div>  
                <div v-show="errors.has('last_name')" class="alert alert-warning">{{ errors.first("last_name")}}</div>                    
                <div class="input-group">
                    <span class="alert alert-warning" v-if="e.last_name">{{ e.last_name[0] }}</span>                        
                </div>                   
            </div>
        </div>
        <div class="form-group row">
            <label for="email" class="col-4 col-form-label">Email</label>
            <div class="col-8">
                <div class="input-group">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    class="form-control here"
                    v-model="user.email"
                    v-validate="'required|email'">
                </div>
                <div v-show="errors.has('email')" class="alert alert-warning">{{ errors.first("email")}}</div>                    
                <div class="input-group">
                    <span class="alert alert-warning" v-if="e.email">{{ e.email[0] }}</span>                        
                </div>
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
                    v-model="user.password"
                    v-validate="'required'">
                </div> 
                <div v-show="errors.has('password')" class="alert alert-warning">{{ errors.first("password")}}</div>                    
                <div class="input-group">
                    <span class="alert alert-warning" v-if="e.password">{{ e.password[0] }}</span>                        
                </div>                
            </div>
        </div>
          <div class="form-group row">
            <label for="password_confirmation" class="col-4 col-form-label">Confirm password</label>
            <div class="col-8">
                <div class="input-group">
                    <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    class="form-control here"
                    v-model="user.password_confirmation"
                    v-validate="'required'">
                </div>  
                <div v-show="errors.has('password_confirmation')" class="alert alert-warning">{{ errors.first("password_confirmation")}}</div>                                       
            </div>
        </div>
         <div class="form-group row">
            <div class="col-4 col-form-label"></div>
            <div class="col-8">
              <div class="form-check">
                <label class="form-check-label">
                  <input 
                  class="form-check-input" 
                  type="checkbox" 
                  value="true"
                  name="accept_terms_and_conditions"
                  id="accept_terms_and_conditions"
                  v-model="user.accept_terms_and_conditions"
                  v-validate="'required'">
                  Accept terms and conditions
                </label>
                <div v-show="errors.has('accept_terms_and_conditions')" class="alert alert-warning">{{ errors.first("accept_terms_and_conditions")}}</div>                                                     
                
              </div>
              <div class="input-group">
                    <span class="alert alert-warning" v-if="e.accept_terms_and_conditions">{{ e.accept_terms_and_conditions[0] }}</span>                        
                </div>
            </div> 
        </div>
        <button name="submit" class="btn btn-secondary" type="submit">Register</button>
      </form>
  </div>
</template>

<script>
import { authService } from '../services/Auth'

export default {

  data(){
    return {
      user: {},
      e: []
    }
  },

  methods: {

    onSubmit(){
        {this.$validator.validateAll()
        .then((value) => {
            if (value){
                authService.register(this.user)
                .then((response) => {
                    authService.login(this.user.email, this.user.password)
                            .then((response) => {
                                this.$emit('userAuthenticated', true)
                                this.$router.push('/all-galleries')
                            })
                    })
                .catch(err => { this.e = err.response.data.errors } )
            }
        })}
    }
  }
  
}
</script>

<style scoped>

.container {
    margin: 0 auto;
    width: 50%;
    margin-top: 2rem;
}

</style>




