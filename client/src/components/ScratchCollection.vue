<template>
  <div class="flex flex-row justify-start mx-auto max-w-screen-lg">
    <div class="flex flex-row flex-wrap gap-5 mt-20 w-250">
      <template v-for="(item, index) in uiList" :key="index">
        <template v-if="'challenge' in item">
          <CompletedItem v-on:click="challengePressed"  :item="item" />
        </template>
        <template v-else>
          <ScratchItem :item="item" />
        </template>
      </template>
    </div>
  </div>
</template>
<script setup>
import ScratchItem from './ScratchItem.vue'
import CompletedItem from './CompletedItem.vue'
import {ref, computed } from 'vue'
var fakeCompleted = ref([
  {
    name: 'Item 1',
    description: 'This is the description for item 1.',
    length: '5 min',
    price: 100,
    challenge: 'heheh'
  },
  {
    name: 'Item 3',
    description: 'This is the description for item 3.',
    length: '2 hours',
    price: 300,
    challenge: 'heheh'
  },
  {
    name: 'Item 6',
    description: 'This is the description for item 1.',
    length: '5 min',
    price: 100,
    challenge: 'heheh'
  }
])
var fakeCollection = ref([{
    name: 'Item 1',
    description: 'This is the description for item 1.',
    length: '5 min',
    price: 100
  },
  {
    name: 'Item 2',
    description: 'This is the description for item 2.',
    length: '1 hour ',
    price: 200
  },
  {
    name: 'Item 3',
    description: 'This is the description for item 3.',
    length: '2 hours',
    price: 300
  },
  {
    name: 'Item 4',
    description: 'This is the description for item 4.',
    length: '1 hour',
    price: 150
  },
  {
    name: 'Item 5',
    description: 'This is the description for item 5.',
    length: '25min',
    price: 250
  },
  {
    name: 'Item 6',
    description: 'This is the description for item 1.',
    length: '5 min',
    price: 100
  },
  {
    name: 'Item 7',
    description: 'This is the description for item 2.',
    length: '1 hour ',
    price: 200
  },
  {
    name: 'Item 8',
    description: 'This is the description for item 3.',
    length: '2 hours',
    price: 300
  },
  {
    name: 'Item 9',
    description: 'This is the description for item 4.',
    length: '1 hour',
    price: 150
  },
  {
    name: 'Item 10',
    description: 'This is the description for item 5.',
    length: '25min',
    price: 250
  }
]);
const uiList = computed(() => {
  const list = []; // Initialize an empty list
  for (const item of fakeCollection.value) {
    const completedItem = fakeCompleted.value.find(cItem => cItem.name === item.name);
    if (completedItem) {
      console.log("challenge completed: ", completedItem.name)
      list.push(completedItem); 
    } else {
      list.push(item);
    }
  }
  console.log(list);
  return list; // Return the final list
});

async function getChallenges() {
  try {
    let response = await fetch("/api/challenges");
    
    // Check if the response is okay (status 200-299)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON from the response

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch collection:", error);
  }
}

async function getCompletedChallenges() {
  try {
    let response = await fetch("/api/completedchallenges");
    
    // Check if the response is okay (status 200-299)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON from the response

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch collection:", error);
  }
}

// var challenges = getChallenges(); 
// var completedChallenges = getCompletedChallenges()

// fakeCompleted fakeCollection
// function filterChallenges() {
//   console.log("fakecompleted", fakeCompleted)
//   console.log("fakeCollection", fakeCollection)
//   let uiList = []
//   // if a challenge in challenges has the same title as a challenge in completed challenges, delete the challenge in challenges
//   fakecollection.value = fakecollection.value.filter(
//     (item) => !fakeCompleted.value.some((completed) => completed.name === item.name)
//   );
//   for (challenge in fakeCollection) {
//     uiList.push(challenge)
//   }
//   for (challenge in fakeCompleted) {
//     uiList.push(challenge)
//   }
// // Sort the array alphabetically by the 'name' field
//   uiList.sort((a, b) => a.name.localeCompare(b.name));
// }
// filterChallenges()
function challengePressed(){
  console.log("challanged CLicked");
}


</script>