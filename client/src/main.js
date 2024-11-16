import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { globalUser } from './data/globalUser'

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDCSSOeQFqvaixxr3EpmHSpnSTZEJ53NoE",
//   authDomain: "adventureamor-371d9.firebaseapp.com",
//   projectId: "adventureamor-371d9",
//   storageBucket: "adventureamor-371d9.firebasestorage.app",
//   messagingSenderId: "675035751724",
//   appId: "1:675035751724:web:30d9046cdab69ef5e2f889"
// };

const app = createApp(App)
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

app.provide('globalUser', globalUser)

app.use(router)

app.mount('#app')

