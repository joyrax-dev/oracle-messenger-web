/**
 * Users store
 * {
 *  id: number,
 *  user: {}
 * }
 */
export default {
    state: {
        users: []
    }, 
    getters: {
        GET_USER: state => id => state.users.find(u => u.id === id),
        GET_USERS: state => state.users
    },
    mutations: {
        ADD_USER: (state, user) => {
            if (state.users.find(u => u.id === user.id)) return

            state.users.push({ id: user.id, user: user })
        },
        UPDATE_USER: (state, user) => {
            state.users = state.users.map(u => {
                if (u.id === user.id) {
                    return {
                        id: user.id,
                        user: user
                    }
                }
                else {
                    return u
                }
            })
        },
        DELETE_USER: (state, userId) => state.users = state.users.filter(u => u.id !== userId),
        SET_USERS: (state, users) => {
            state.users = []

            for (const user of users) {
                state.users.push({ id: user.id, user: user })
            }
        }
    }
}
