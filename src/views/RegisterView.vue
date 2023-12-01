<template>
    <div class="flex justify-center items-center h-screen">
        <form class="flex flex-col gap-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p style="font-size: 20px;">Register</p>
            <input class="" type="text" v-model="loginInput" placeholder="Login">
            <input class="" type="text" v-model="emailInput" placeholder="Email">
            <input class="" type="password" v-model="passwordInput" placeholder="Password">
            <InputButton size="30px" @click="register">Register</InputButton>
            <p>{{ msgRequest }}</p>
            <hr>
            <input class="" type="text" v-model="roleInput" placeholder="Role">
            <button class="flex justify-center" @click="createRole">
                <span class="px-2">Create Role</span>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 483.84 483.84" style="enable-background:new 0 0 483.84 483.84;" xml:space="preserve"><g><g><path d="M409.921,0C409.92,0,409.92,0,409.921,0H74.133C33.25,0,0.106,33.143,0.106,74.026c0,0.071,0,0.142,0,0.214v335.573 c0,40.801,33.013,73.909,73.813,74.027h336c40.8-0.118,73.814-33.226,73.813-74.027V74.24C483.851,33.356,450.804,0.118,409.921,0 z M379.627,241.92c-0.113,5.608-4.632,10.127-10.24,10.24h-229.76l45.227,45.227c4.065,3.932,4.172,10.415,0.24,14.48 c-0.079,0.081-0.159,0.162-0.24,0.24c-1.86,2.039-4.493,3.201-7.253,3.2c-2.704,0.023-5.28-1.148-7.04-3.2l-64-64 c-0.906-0.892-1.695-1.895-2.347-2.987c-1.067-2.597-1.067-5.51,0-8.107c0.56-1.152,1.36-2.17,2.347-2.987l64-64 c3.714-3.947,9.925-4.136,13.872-0.422c0.145,0.136,0.285,0.277,0.422,0.422c4.006,3.823,4.154,10.17,0.331,14.176 c-0.108,0.113-0.218,0.223-0.331,0.331l-45.227,47.147h219.52v-53.76c0.454-5.575,5.298-9.755,10.88-9.387 c5.608,0.113,10.127,4.632,10.24,10.24L379.627,241.92z"/></g></g></svg>
            </button>
            <p>{{ msgRole }}</p>
        </form>
    </div>

</template>
  
<script>
import socket from '@/socket'
import InputButton from '@/components/Auth/InputButton.vue'

export default {
    name: 'RegisterView',
    components: {
        InputButton
    },
    data() {
        return {
            loginInput: '',
            emailInput: '',
            passwordInput: '',
            roleInput: '',
            msgRole: '',
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
        },
        createRole() {
            socket.emit('createRole', this.roleInput.trim(), (msg, status) => {
                console.log(status)
                this.msgRole = status
            })
            this.roleInput = ''
        }
    },
    mounted() {
        if (this.$store.getters.IS_AUTHENTICATE) {
            this.$router.push({name: 'HOME'})
        }
    }
}
</script>