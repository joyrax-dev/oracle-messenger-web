<template>
    <div class="flex">
        <div class="w-1/4 bg-gray-200 p-4">
            <h1 class="flex justify-between text-lg font-bold mb-4">
                <span>Список чатов</span>
                <span class="inline-block text-xl px-2">+</span>
            </h1>
            <ul>
                <li v-for="item in GET_CHATS" @click="$router.push({ name: 'CHATID', params: { chatId: item.id }})" class="mb-2 p-1 rounded-md border-2 border-blue-500 hover:border-indigo-500 text-gray-900">
                    <span>[{{ item.id }}]</span>
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <div class="w-3/4 bg-gray-100 p-4">
        <h1 class="text-lg font-bold mb-4">Чат</h1>
        <div class="border rounded p-2 h-64 overflow-y-scroll">
            <div class="mb-2" v-for="item in GET_CHAT_MESSAGES">
                <strong>{{ item.senderId }}:</strong> {{ item.text }}
            </div>
        </div>
            <div class="mt-4">
                <input type="text" v-model="messageInput" class="border rounded p-2 w-full" placeholder="Введите сообщение">
                <button v-bind:disabled="isDisabledSendButton" @click="sendMessage" class="bg-blue-500 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-2">Отправить</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import socket from '@/socket'

export default {
    name: 'ChatView',
    data() {
        return {
            currentChat: 0,
            messageInput: '',
            isDisabledSendButton: false
        }
    },
    watch: {
        $route(to, from) {
            this.currentChat = parseInt(to.params.chatId)
            this.joinChat(parseInt(to.params.chatId))
        }
    },
    computed: {
        GET_CHATS() {
            return this.$store.getters.GET_CHATS
        },
        GET_CHAT_MESSAGES() {
            return this.$store.getters.GET_CHAT_MESSAGES(this.currentChat)
        }
    },
    methods: {
        loadAllChats() {
            if (!this.$store.getters.IS_AUTHENTICATE) return

            this.$store.commit('SET_CHATS', [])
            /**
             * переделать что бы на сервере формировался список чатов что бы снизить нагрузку на сеть и на клиента
             * тогда просто нужно будет присвоить чаты и все
             */
            socket.emit('getChatsByUserId', this.$store.getters.GET_AUTHENTICATION_USER, (data, code, status) => {
                if (status === true) {
                    const { chats } = data
                    for (const chat of chats) {
                        socket.emit('getChatInfo', {
                            userId: this.$store.getters.GET_AUTHENTICATION_USER,
                            chatId: chat
                        }, (data, code, status) => {
                            if (status === true) {
                                this.$store.commit('ADD_CHAT', {
                                    id: data.chatId,
                                    name: data.chatName
                                })
                            }
                        })
                    }
                }
            })
        },
        joinChat(chatId) {
            if (!this.$store.getters.IS_AUTHENTICATE) return

            socket.emit('joinChat', {
                userId: this.$store.getters.GET_AUTHENTICATION_USER,
                chatId
            }, (code, status) => console.log('joined: ', chatId))
        },
        sendMessage() {
            if (this.isDisabledSendButton) return
            this.isDisabledSendButton = true

            if (!socket.connected) return
            if (!this.$store.getters.IS_AUTHENTICATE) return
            if (this.messageInput.trim() === '') return
            if (this.currentChat === 0) return

            socket.emit('sendMessage', {
                chatId: this.currentChat,
                userId: this.$store.getters.GET_AUTHENTICATION_USER,
                text: this.messageInput
            }, (data, code, status) => {
                if (status === true) {
                    const { message, chatId } = data
                    this.messageInput = ''
                    this.$store.commit('ADD_MESSAGE', message)
                    this.isDisabledSendButton = false
                }
            })
        },
        newMessageHandler(data) {
            this.$store.commit('ADD_MESSAGE', data.message)
        }
    },
    mounted() {
        if (!this.$store.getters.IS_AUTHENTICATE) {
            this.$router.push({name: 'LOGIN'})
        }

        this.loadAllChats()

        socket.on('chatSetMessages', (chatId, messages) => {
            this.$store.commit('REPLACE_CHAT_MESSAGES', { chatId, messages })
        })

        socket.on('newMessage', this.newMessageHandler)
    },
    unmounted() {
        socket.off('newMessage', this.newMessageHandler)
    }
}
</script>
