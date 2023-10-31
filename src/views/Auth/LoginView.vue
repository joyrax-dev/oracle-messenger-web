<template>
    <div class="login_page">
        <div class="login_form">
            <input v-model="loginInput" type="text" placeholder="login">
            <input v-model="passwordInput" type="password" placeholder="password">
            <input @click="onClick_login" type="button" value="Login">
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {
        
    }
})
export default class LoginView extends Vue {
    loginInput?: string
    passwordInput?: string

    onClick_login() {
        
    }
}
</script>

<style>
    .login_page {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login_form {
        width: 400px;
        height: 400px;
        border: 1px solid #000;
    }
</style>