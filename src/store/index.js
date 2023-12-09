import createPersistedState from 'vuex-persistedstate'
import { createStore } from 'vuex'
import socket from '@/socket'

export default createStore({
	state: {
        is_authenticate: false,
        reauthentication_token: null
	},
	getters: {
        IS_CONNECTION: state => socket.connected,
        IS_AUTHENTICATE: state => state.is_authenticate,
        IS_REAUTHENTICATE: state => state.reauthentication_token == null ? false : true,
        GET_REAUTHENTICATION_TOKEN: state => state.reauthentication_token
	},
	mutations: {
        SET_AUTHENTICATE: (state, payload) => state.is_authenticate = payload,
        SET_REAUTHENTICATION_TOKEN: (state, payload) => state.reauthentication_token = payload
	},
	actions: {
	},
	modules: {
	},
    plugins: [createPersistedState({
        paths: ['reauthentication_token'],
        key: 'vuextest'
    })]
})
