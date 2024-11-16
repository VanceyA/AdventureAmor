<template>
    <div class="flex flex-row items-center justify-center min-h-full min-w-full mt-28">
        <!-- container div for the modal  -->
        <div class="bg-white shadow-lg rounded-lg p-10 ">
            <!-- flex box for the buttons to navigate -->
            <div v-if="registered == 'login'">
                <Login @loginInfoSent='handleLoginInfo' @switchToSignUp="handleSwitchToSignUp"/>
            </div>
            <div v-else>
                <SignUp @SignUpInfoSent="handleSignupInfo" @switchToLogin="handleSwitchToLogin"/>
            </div>
            <!-- depending on the button clicked what page will it load -->
        </div>
    </div>
</template>

<script setup>
import Login from './Login.vue'
import SignUp from './SignUp.vue'
import {ref} from 'vue'
var registered = ref("signUp");
var username;
var password;

async function handleLoginInfo(data){
    console.log("this is data: ", data.gmail ,data.password);
}
async function handleSignupInfo(data){
    console.log("this is sign up data ", data.gmail, data.password);
}

const handleSwitchToSignUp = () => {
  registered.value = 'signUp';
}

const handleSwitchToLogin = () => {
  registered.value = 'login';
}



</script>