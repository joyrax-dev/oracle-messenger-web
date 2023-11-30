import { io } from "socket.io-client"

const socket = io('http://localhost:9909', {
    autoConnect: true,
    reconnection: true
})

export default socket