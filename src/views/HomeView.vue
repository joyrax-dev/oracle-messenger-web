<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1>is login: {{ isAuth }}</h1>

        <hr>

        <input type="text" v-model="inputFirstUserId" placeholder="First User Id">
        <input type="text" v-model="inputSecondUserId" placeholder="Second User Id">
        <button @click="newPrivateChat"  v-bind:disabled="isDisabledNewPrivateChatButton">New Private Chat</button>
        <p>{{ newPrivateChatMsg }}</p>
    </div>
</template>

<script>
import socket from '@/socket'

export default {
    name: 'HomeView',
    data() {
        return {
            isAuth: false,
            inputFirstUserId: '',
            inputSecondUserId: '',
            newPrivateChatMsg: '',
            isDisabledNewPrivateChatButton: false
        }
    },
    methods: {
        newPrivateChat() {
            if (this.isDisabledNewPrivateChatButton) return
            if (!this.$store.getters.IS_AUTHENTICATE) return

            this.isDisabledNewPrivateChatButton = true
            this.newPrivateChatMsg = ''

            if (this.inputFirstUserId.trim() !== '' && this.inputSecondUserId.trim() !== '') {
                if (!isNaN(this.inputFirstUserId) && !isNaN(parseFloat(this.inputFirstUserId)) && !isNaN(this.inputSecondUserId) && !isNaN(parseFloat(this.inputSecondUserId))) {
                    const firstUserId = parseInt(this.inputFirstUserId)
                    const secondUserId = parseInt(this.inputSecondUserId)

                    socket.emit('newPrivateChat', { firstUserId, secondUserId }, (data, code, status) => {
                        if (status === true) {
                            this.newPrivateChatMsg = 'New Chat: ' + data.chatName
                        }
                        else {
                            this.newPrivateChatMsg = 'Error: ' + code
                        }
                    })
                }
            }
        }
    },
    created() {
        this.isAuth = this.$store.getters.IS_AUTHENTICATE
    }
}
</script>
