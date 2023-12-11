<template>
    <div class="flex flex-row justify-center content-center gap-4">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <span @click="logout">Logout</span> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/role">Role</router-link> |
        <router-link to="/about">About</router-link>
    </div>
    <router-view/>
</template>

<style>

</style>
 
<script>
import socket from '@/socket'

export default {
    name: 'App',
    data() {
        return {
            
        }
    },
    methods: {
        logout() {
            this.$store.commit('SET_AUTHENTICATION_USER', null)
            this.$store.commit('SET_REAUTHENTICATION_TOKEN', null)
            this.$store.commit('SET_AUTHENTICATE', false)
            socket.disconnect()
            socket.connect()
            this.$router.push({name: 'HOME'})
        }
    },
    mounted() {
        if (!this.$store.getters.IS_CONNECTION) {
            socket.connect()
        }

        if (this.$store.getters.IS_REAUTHENTICATE) {
            socket.emit('reLogin', {
                userId: this.$store.getters.GET_AUTHENTICATION_USER,
                token: this.$store.getters.GET_REAUTHENTICATION_TOKEN,
                userAgent: navigator.userAgent,
                isNextReLogin: true
            }, (data, code, status) => {
                const { userId, token, isNextReLogin } = data

                if (status === true) {
                    this.$store.commit('SET_AUTHENTICATE', true)
                    this.$store.commit('SET_AUTHENTICATION_USER', userId)
                    this.$store.commit('SET_REAUTHENTICATION_TOKEN', token)
                }
            })
        }
    }
}
</script>