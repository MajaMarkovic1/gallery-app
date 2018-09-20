<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">
                            All Galleries
                        <span class="sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item">
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
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            <!-- </div> -->
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

