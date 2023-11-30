<template>
    <div class="flex justify-center items-center h-screen">
        <form class="flex flex-col gap-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p style="font-size: 20px;">Login</p>
            <input class="" type="text" v-model="loginInput" placeholder="Login">
            <input class="" type="password" v-model="passwordInput" placeholder="Password">
            <button class="" @click="login" v-bind:disabled="isDisabledButton">Login</button>
            <p>{{ msgRequest }}</p>
        </form>
    </div>

</template>
  
<script>
import socket from '../socket'

export default {
    name: 'LoginView',
    data() {
        return {
            loginInput: '',
            passwordInput: '',
            isDisabledButton: false,
            msgRequest: ''
        }
    },
    methods: {
        login() {
            if (this.isDisabledButton) return
            this.msgRequest = ''

            this.isDisabledButton = true

            if (this.loginInput.trim() !== '' && this.passwordInput.trim() !== '') {
                socket.emit('login', {
                    login: this.loginInput,
                    password: this.passwordInput
                }, (msg, status) => {
                    console.log(msg)
                    this.msgRequest = msg
                    if (status === true) {
                        this.$store.commit('SET_AUTHENTICATE', true)
                        this.$router.push({name: 'HOME'})
                    }
                    else {
                        this.isDisabledButton = false
                    }
                })
            }
        }
    },
    mounted() {
        if (this.$store.getters.IS_AUTHENTICATE) {
            this.$router.push({name: 'HOME'})
        }
    }
}
</script>