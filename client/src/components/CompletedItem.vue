<template>
    <div class="flex flex-col">
      <div class="flex flex-row justify-between">
        <p>Price: ${{ item.price }}</p>
        <p>Time: {{ item.length }}</p>
      </div>
  
      <div v-on:click="challengeClicked(item)" class="relative w-60 h-56 p-4 border rounded-lg shadow-lg bg-black">
        <p class="text-white">Hello</p>
         <img src="">
      </div>
      <h3 class="text-xl font-semibold text-center mt-2">{{ item.name }}</h3>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits([ "ChallengeEmitted" ]);


const props = defineProps({
  item: Object
});

function challengeClicked (item) {
  console.log("Button pressed black box");
  console.log("Item clicked:", item);
  emit("ChallengeEmitted", item);
}
</script>