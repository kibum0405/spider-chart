// src/plugins/vuetify.js
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Vuetify 스타일
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

const opts = {

}; // 여기에 Vuetify 옵션 추가 가능

export default new Vuetify(opts);
