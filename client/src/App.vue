<template>
  <div class="flex flex-col">
    <Header />
    <RouterView />
  </div>
  
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';

</script>



