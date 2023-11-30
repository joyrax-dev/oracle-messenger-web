<template>
    <div class="flex justify-center items-center h-screen">
        <form class="flex flex-col gap-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p style="font-size: 20px;">Register</p>
            <input class="" type="text" v-model="loginInput" placeholder="Login">
            <input class="" type="text" v-model="emailInput" placeholder="Email">
            <input class="" type="password" v-model="passwordInput" placeholder="Password">
            <button class="" @click="register" v-bind:disabled="isDisabledButton">Register</button>
            <p>{{ msgRequest }}</p>
        </form>
    </div>

</template>
  
<script>
import socket from '@/socket'

export default {
    name: 'RegisterView',
    data() {
        return {
            loginInput: '',
            emailInput: '',
            passwordInput: '',
            isDisabledButton: false,
            msgRequest: ''
        }
    },
    methods: {
        register() {
            if (this.isDisabledButton) return
            this.msgRequest = ''

            this.isDisabledButton = true

            if (this.loginInput.trim() !== '' && this.passwordInput.trim() !== '' && this.emailInput.trim() !== '')  {
                socket.emit('register', {
                    login: this.loginInput,
                    email: this.emailInput,
                    password: this.passwordInput
                }, (msg, status) => {
                    console.log(msg)
                    this.msgRequest = msg

                    if (status === true) {
                        this.$router.push({name: 'LOGIN'})
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