<template>
  <div class="flex flex-row justify-start mx-auto max-w-screen-lg">
    <div class="flex flex-row flex-wrap gap-5 mt-20 w-250">
      <template v-for="(item, index) in uiList" :key="index">
        <template v-if="'challenge' in item">
          <CompletedItem @ChallengeEmitted="handleChallengeData" :item="item" />
        </template>
        <template v-else>
          <ScratchItem :item="item"
          @click="openScratchModal(item)" />
        </template>
      </template>
    </div>
  </div>

  <div v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
      @click.self="closeModal">
    <div class="relative p-4 bg-white rounded-lg flex flex-col ml-100px mr-10">
      <div class="flex flex-row gap-10">
        <img src="/test_image.jpg" alt="" class="w-96 h-60 mt-4 object-fill"/>
        <ScratchItem :item="modalItem" @close="closeModal" :isModalOpen="isModalOpen"/>
      </div>
      <div v-if="'note' in modalItem">
          <p>{{ modalItem.note }}</p>
      </div>
      <div v-else>
        <p>no desc</p>
      </div>
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
    challenge: 'heheh',
    note:"Amid the chaos of a bustling bookstore, two strangers reached for the same copy of a rare poetry book, their hands brushing. A shared smile turned into hours of conversation, sparking a connection neither had expected"
  },
  {
    name: 'Item 3',
    description: 'This is the description for item 3.',
    length: '2 hours',
    price: 300,
    challenge: 'heheh',
    note: "Beneath a blanket of shimmering stars, he knelt on a quiet beach, the waves echoing his heartbeat. Her joyful  made the universe feel infinite, as if time stood still for their love."
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

const isModalOpen = ref(false);
const modalItem = ref(null);

// Open the modal and pass the clicked item
function openScratchModal(item) {
  modalItem.value = item;
  isModalOpen.value = true;
}

// Close the modal
function closeModal() {
  isModalOpen.value = false;
}

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

function challengePressed(){
  console.log("challanged CLicked");
}

function handleChallengeData(data) {
  console.log("Data received from Emit. Data:", data);
  openScratchModal(data);
}
</script> 