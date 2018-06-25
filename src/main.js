import Vue from 'vue'
import app from '@src/app.vue'
import router from '@config/router'
import i18n from '@locale'
import store from '@store'
import bootstrap from '@config/bootstrap'

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  mixins: [bootstrap],
  render: h => h(app)
})
