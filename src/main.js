import { createApp } from 'vue';
import './style.css';
import { vClickOutSide } from './directives';
import App from './App.vue';

createApp(App).directive('click-outside', vClickOutSide).mount('#app');
