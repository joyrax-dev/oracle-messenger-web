<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1>is login: {{ isAuth }}</h1>
        <button @click="checkLogin">check login</button>
    </div>
</template>

<script>
import socket from '../socket'

export default {
    name: 'HomeView',
    data() {
        return {
            isAuth: false
        }
    },
    methods: {
        checkLogin() {
            this.isAuth = this.$store.getters.IS_AUTHENTICATE
        }
    }
}
</script>
