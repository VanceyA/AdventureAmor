<template>
    <div class="space-y-6">
    <h1>Sign Up</h1>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
        <div class="mt-2">
          <input v-model="gmail"id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B0A091] sm:text-sm/6">
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input v-model="password"id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B0A091] sm:text-sm/6">
        </div>
      </div>

      <div>
        <button v-on:click='signUpPressed'type="submit" class="flex w-full justify-center rounded-md bg-[#CBB8A5] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#B0A091] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[##B0A091]">Register</button>
      </div>

      <p>Already have an account?<span class="text-[#B0A091]  cursor-pointer" @click="switchToLogin"> Login Here!</span></p>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { defineEmits } from "vue"
const emit = defineEmits(["SignUpInfoSent", "switchToLogin"]);
var gmail = ref("");
var password = ref("");
var sendObj = ref({
  gmail: ref(""),
  password: ref("")
});
const signUpPressed = () => {
  sendObj.value = {
    gmail: gmail.value,
    password: password.value

  };
  console.log(sendObj.value ," before emit");
  emit('SignUpInfoSent', sendObj.value);
}

const changeRegisterLogin = () => {
  registered.value = "login";
};

// Function to switch to the Sign Up form
const changeRegisterSignUp = () => {
  registered.value = "signUp";
};

const switchToLogin = () => {
  emit('switchToLogin');
};
</script>

<style scoped>

h1 {
    font-size: 2rem;
    font-weight: bold;
}

</style>