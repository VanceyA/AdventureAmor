<template>
    <div class="flex flex-col">
      <div class="flex flex-row justify-between">
        <p>Price: ${{ item.price }}</p>
        <p>Time: {{ item.length }}</p>
      </div>
  
      <div class="relative w-60 h-56 p-4 border rounded-lg shadow-lg bg-black">
        <p class="text-white">Hello</p>
         <img>
      </div>
      <h3 class="text-xl font-semibold text-center mt-2">{{ item.name }}</h3>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: Object
});
</script>