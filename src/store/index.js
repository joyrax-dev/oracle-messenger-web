import createPersistedState from 'vuex-persistedstate'
import { createStore } from 'vuex'
import socket from '@/socket'

export default createStore({
    state: {
        is_authenticate: false,
        reauthentication_token: null,
        authentication_user: null
    },
    getters: {
        IS_CONNECTION: state => socket.connected,
        IS_AUTHENTICATE: state => state.is_authenticate,
        IS_REAUTHENTICATE: state => state.reauthentication_token != null ? true : false,
        GET_REAUTHENTICATION_TOKEN: state => state.reauthentication_token,
        GET_AUTHENTICATION_USER: state => state.authentication_user
    },
    mutations: {
        SET_AUTHENTICATE: (state, payload) => state.is_authenticate = payload,
        SET_REAUTHENTICATION_TOKEN: (state, payload) => state.reauthentication_token = payload,
        SET_AUTHENTICATION_USER: (state, payload) => state.authentication_user = payload
    },
    actions: {
    },
    modules: {
    },
    plugins: [createPersistedState({
        paths: ['reauthentication_token', 'authentication_user'],
        key: 'vuextest'
    })]
})
