<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <div>Is Connected: {{ ConnectionState }}</div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { socket } from '@/socket'

@Options({
	components: {

	}
})
export default class IndexView extends Vue {
	get ConnectionState(): boolean {
		return socket.connected
	}
}
</script>