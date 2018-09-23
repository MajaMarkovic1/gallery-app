<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">
                        All Galleries
                    </router-link>
                </li>
                <li class="nav-item" id="login">
                    <router-link class="nav-link" to="/login" v-if="!isAuthenticated">
                        Login
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-link" to="/my-galleries" v-if="isAuthenticated">
                        My Galleries
                    </router-link>                        
                </li>
                <li>
                    <router-link class="nav-link" to="/create" v-if="isAuthenticated">
                        Create New Gallery
                    </router-link>                         
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/register" v-if="!isAuthenticated">
                        Register
                    </router-link>
                </li>
                <li>
                    <a class="nav-link" href="#" v-if="isAuthenticated" @click="logout">Logout</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { authService } from '../services/Auth'

export default {
    props: {
        isAuthenticated: Boolean,
    },

    methods: {
        logout(){
            authService.logout()
            this.$emit('userAuthenticated', false)
            this.$router.push('/login')
        }
    }
}
</script>




