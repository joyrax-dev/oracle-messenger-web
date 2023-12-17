export default {
    state: {
        chats: []
    }, 
    getters: {
        GET_CHATS: state => state.chats,
        GET_CHAT: state => id => state.chats.find(chat => chat.id === id)
    },
    mutations: {
        SET_CHATS(state, chats) {
            state.chats = chats
        },
        ADD_CHAT(state, chat) {
            state.chats.push(chat)
        },
        UPDATE_CHAT(state, chat) {
            state.chats = state.chats.map(с => с.id === chat.id ? chat : с)
        },
        DELETE_CHAT(state, chatId) {
            state.chats = state.chats.filter(chat => chat.id !== chatId)
        }
    }
}