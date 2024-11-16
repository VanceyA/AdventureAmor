
<template>
    <nav class="flex flex-row justify-between">
        <div class="flex flex-row flex-start items-center">
            <img src="/adventureamor_logo.png" alt="Logo">
            <h1>AdventureAmor</h1>
        </div>
        <div class="flex flex-row flex-end mr-24">
            <button v-if="!user" class="btn btn-primary">Log In/Sign Up</button>
            <button v-else class="btn btn-primary" @click="logout">Get user call</button>
        </div>
    </nav>
</template>

<script setup>
import { inject } from 'vue';

const user = inject('globalUser');

async function logout() {
    try{
        const user = await fetch("http://127.0.0.1:8080/api/users");
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>

img {
    height: auto;
    width: 100px;
}

nav {
    background-color: #CBB8A5;
    align-items: center;

}

h1 {
    font-family:'Times New Roman', Times, serif;
    font-size: 2rem;
    font-weight: bold;
    color: white;
}

</style>

