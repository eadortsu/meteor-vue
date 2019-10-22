//// client/main.js
import Vue from 'vue'
import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueMeteorTracker)

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify) // this is all you need for Vuetify 1.x

import App from './App.vue'
import './main.html'
import router from './router.js'

// for Vuetify 2.x you also need:
const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})

Meteor.startup(() => {
  process.env.MONGO_URL = "mongodb://heroku_9vfmdldz:2t682ac7nffbo8q1au9r782lma@ds335648.mlab.com:35648/heroku_9vfmdldz"
  process.env.MONGODB_URI = "mongodb://heroku_9vfmdldz:2t682ac7nffbo8q1au9r782lma@ds335648.mlab.com:35648/heroku_9vfmdldz"
  new Vue({
    el: '#app',
    router,
    vuetify, // this bit is also needed for Vuetify 2.x
    ...App,
  })
})
