import { createStore } from 'vuex'
import socket from '@/socket'

export default createStore({
	state: {
        is_authenticate: false,
	},
	getters: {
        IS_CONNECTION: state => socket.connected,
        IS_AUTHENTICATE: state => state.is_authenticate,
	},
	mutations: {
        SET_AUTHENTICATE: (state, payload) => state.is_authenticate = payload
	},
	actions: {
	},
	modules: {
	}
})
