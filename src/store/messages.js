export default {
    state: {
        messages: []
    },
    getters: {
        GET_CHAT_MESSAGES: state => id => state.messages.filter(m => m.chatId === id),
        GET_MESSAGE: state => id => state.messages.find(m => m.id === id)
    },
    mutations: {
        SET_MESSAGES(state, messages) {
            state.messages = messages
        },
        REPLACE_CHAT_MESSAGES: (state, { chatId, messages }) => {
            state.messages = state.messages.filter(m => m.chatId !== chatId).concat(messages)
        },
        ADD_MESSAGE(state, message) {
            state.messages.push(message)
        }, 
        UPDATE_MESSAGE(state, message) {
            state.messages = state.messages.map(m => m.id === message.id ? message : m)
        },
        DELETE_MESSAGE(state, messageId) {
            state.messages = state.messages.filter(m => m.id !== messageId)
        }
    }
}

