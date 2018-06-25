import Vue from 'vue'
import VueRouter from 'vue-router'
import Acl from 'vue-acl'

Vue.use(VueRouter)
let router = new VueRouter({
  mode: 'history',
  routes: [
    // unauthenticated
    {
      name: 'index',
      path: '/',
      component: require('@components/views/index/index.vue').default,
      meta: { permission: 'any' }
    },

    // secured
    {
      path: '',
      component: require('@components/layouts/root.vue').default,
      children: [
        // outside a project
        {
          path: '',
          component: require('@components/layouts/outside.vue').default,
          children: []
        },

        // inside a project
        {
          path: '',
          component: require('@components/layouts/inside.vue').default,
          children: []
        }
      ]
    }
  ]
})

Vue.use(Acl, {
  router,
  init: 'any'
})

export default router
