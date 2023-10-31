import { Socket, connect } from "socket.io-client"

export const socket: Socket = connect(`http://localhost:6666`, {
    autoConnect: false,
    reconnection: true,
})