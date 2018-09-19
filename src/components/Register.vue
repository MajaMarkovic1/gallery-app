<template>
  <div>
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
                    v-model="user.first_name">
                </div> 
                <div class="input-group">
                    <span class="alert alert-warning" v-if="errors.first_name">{{ errors.first_name[0] }}</span>                        
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
                    v-model="user.last_name">
                </div>  
                <div class="input-group">
                    <span class="alert alert-warning" v-if="errors.last_name">{{ errors.last_name[0] }}</span>                        
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
                    v-model="user.email">
                </div>
                <div class="input-group">
                    <span class="alert alert-warning" v-if="errors.email">{{ errors.email[0] }}</span>                        
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
                    v-model="user.password">
                </div> 
                <div class="input-group">
                    <span class="alert alert-warning" v-if="errors.password">{{ errors.password[0] }}</span>                        
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
                    v-model="user.password_confirmation">
                </div>                     
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
                  v-model="user.accept_terms_and_conditions">
                  Accept terms and conditions
                </label>
              </div>
              <div class="input-group">
                    <span class="alert alert-warning" v-if="errors.accept_terms_and_conditions">{{ errors.accept_terms_and_conditions[0] }}</span>                        
                </div>
            </div> 
        </div>
        <button name="submit" class="btn btn-primary" type="submit">Register</button>
      </form>
  </div>
</template>

<script>
import { authService } from '../services/Auth'
export default {
  data(){
    return {
      user: {},
      errors: []
    }
  },

  methods: {
    onSubmit(){
      authService.register(this.user)
        .then((response) => {
          authService.login(this.user.email, this.user.password)
                .then((response) => {
                    this.$emit('userAuthenticated', true)
                    this.$router.push('/all-galleries')
                })
          })
        .catch(err => console.log( this.errors = err.response.data.errors ) )
    }
  }
  
}
</script>

