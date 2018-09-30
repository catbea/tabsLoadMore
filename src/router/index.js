import Vue from 'vue'
import Router from 'vue-router'
import tab from '@/components/tab'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tab',
      component: tab
    }
  ]
})
