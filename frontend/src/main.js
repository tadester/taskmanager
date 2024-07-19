// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // if you have a Vuex store
import './assets/tailwind.css';

createApp(App)
  .use(store) // if you have a Vuex store
  .mount('#app');
