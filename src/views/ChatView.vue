<template>
    <div class="flex">
        <div class="w-1/4 bg-gray-200 p-4">
            <h1 class="flex justify-between text-lg font-bold mb-4">
                <span>Список чатов</span>
                <span class="inline-block text-xl px-2">+</span>
            </h1>
            <ul>
                <li v-for="item in chatList" @click="$router.push({ name: 'CHATID', params: { chatId: item.id }})" class="mb-2 p-1 rounded-md border-2 border-blue-500 hover:border-indigo-500 text-gray-900">
                    <span>[{{ item.id }}]</span>
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <div class="w-3/4 bg-gray-100 p-4">
        <h1 class="text-lg font-bold mb-4">Чат</h1>
        <div class="border rounded p-2 h-64 overflow-y-scroll">
            <div class="mb-2" v-for="item in chatsMessages[currentChat]">
                <strong>{{ item.senderId }}:</strong> {{ item.text }}
            </div>
        </div>
            <div class="mt-4">
                <input type="text" class="border rounded p-2 w-full" placeholder="Введите сообщение">
                <button class="bg-blue-500 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-2">Отправить</button>
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
            chatList: [],
            chatsMessages: [],
            currentChat: 0
        }
    },
    watch: {
        $route(to, from) {
            this.currentChat = parseInt(to.params.chatId)
            this.joinChat(parseInt(to.params.chatId))
            console.log(this.chatsMessages)
        }
    },
    methods: {
        loadAllChats() {
            if (!this.$store.getters.IS_AUTHENTICATE) return
            this.chatList = []

            socket.emit('getChatsByUserId', this.$store.getters.GET_AUTHENTICATION_USER, (data, code, status) => {
                if (status === true) {
                    const { chats } = data
                    for (const chat of chats) {
                        socket.emit('getChatInfo', {
                            userId: this.$store.getters.GET_AUTHENTICATION_USER,
                            chatId: chat
                        }, (data, code, status) => {
                            if (status === true) {
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
        joinChat(chatId) {
            if (!this.$store.getters.IS_AUTHENTICATE) return

            socket.emit('joinChat', {
                userId: this.$store.getters.GET_AUTHENTICATION_USER,
                chatId
            }, (code, status) => {
                console.log(code)
            })
        }
    },
    mounted() {
        if (!this.$store.getters.IS_AUTHENTICATE) {
            this.$router.push({name: 'LOGIN'})
        }

        socket.on('chatSetMessages', (chatId, messages) => {
            this.chatsMessages[chatId] = messages
        })
    },
    created() {
        this.loadAllChats()
    }
}
</script>