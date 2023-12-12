<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1>is login: {{ isAuth }}</h1>

        <hr>

        <input type="text" v-model="inputFirstUserId" placeholder="First User Id">
        <input type="text" v-model="inputSecondUserId" placeholder="Second User Id">
        <button @click="newPrivateChat"  v-bind:disabled="isDisabledNewPrivateChatButton">New Private Chat</button>
        <p>{{ newPrivateChatMsg }}</p>

        <hr>

        <button @click="getAllChats">Get All Chat</button>
        <table class="border-collapse border border-slate-500" style="width: 40%;">
            <caption class="caption-top">
                Chats List | Error: {{ chatErrorCode }}
            </caption>
            <thead>
                <tr>
                    <th class="border border-slate-600 ...">id</th>
                    <th class="border border-slate-600 ...">name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in chatList">
                    <td class="border border-slate-700">{{ item.id }}</td>
                    <td class="border border-slate-700">{{ item.name }}</td>
                </tr>
            </tbody>
        </table>

        <div style="width: 60%; background-color: brown;">
            <h3>Chat: </h3>
            <div style="width: 100%; background-color: darkkhaki;">

            </div>
            <input type="text" placeholder="Enter your message">
            <button @click="">Send</button>
        </div>
    </div>
</template>

<script>
import socket from '../socket'

export default {
    name: 'HomeView',
    data() {
        return {
            isAuth: false,
            inputFirstUserId: '',
            inputSecondUserId: '',
            newPrivateChatMsg: '',
            isDisabledNewPrivateChatButton: false,
            chatList: [],
            chatErrorCode: 0,
            currentChatId: null
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
        },
        getAllChats() {
            if (!this.$store.getters.IS_AUTHENTICATE) return
            this.chatList = []

            socket.emit('getChatsByUserId', this.$store.getters.GET_AUTHENTICATION_USER, (data, code, status) => {
                console.log('getChatsByUserId: ', code)
                this.chatErrorCode = code
                if (status === true) {
                    const { chats } = data
                    for (const chat of chats) {
                        socket.emit('getChatInfo', {
                            userId: this.$store.getters.GET_AUTHENTICATION_USER,
                            chatId: chat
                        }, (data, code, status) => {
                            console.log('getChatInfo: ', code)
                            if (status === true) {
                                console.log(data)
                                this.chatList.push({
                                    id: data.chatId,
                                    name: data.chatName
                                })
                            }
                        })
                    }
                }
            })
        },
        sendChatMessage() {

        },
        loadChatMessage() {

        }
    },
    created() {
        this.isAuth = this.$store.getters.IS_AUTHENTICATE
    }
}
</script>
