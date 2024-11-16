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
import { ref } from 'vue';
import Login from './Login.vue';
import SignUp from './SignUp.vue';
import { globalUser } from '@/data/globalUser';

var registered = ref("signUp");
var username;
var password;

async function handleLoginInfo(data){
    console.log("this is data: ", data.gmail ,data.password);
    username = data.gmail;
    password = data.password;
    let req = new URLSearchParams();
    req.append("username", username);
    req.append("password", password);
    const response = await fetch("http://127.0.0.1:8080/api/session", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: req
    });
    const result = await response.json();
    console.log(result);
    globalUser.user = result.user;
}
async function handleSignupInfo(data){
    console.log("this is sign up data ", data.gmail, data.password);
    username = data.gmail;
    password = data.password;
    let req = new URLSearchParams();
    req.append("username", username);
    req.append("password", password);
    const response = await fetch("https://adventureamor.onrender.com/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: req
    });
    const result = await response.json();
    globalUser.user = result.user;
}

const handleSwitchToSignUp = () => {
  registered.value = 'signUp';
}

const handleSwitchToLogin = () => {
  registered.value = 'login';
}



</script>