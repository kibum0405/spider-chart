import Vue from 'vue';
import App from './App.vue';

require('./style.css');

new Vue({
  render: h => h(App),
}).$mount('#app');
