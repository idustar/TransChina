import Vue from 'vue'
import Router from 'vue-router'

const Flight = r => require.ensure([], () => r(require('@/components/Flight')))
const Train = r => require.ensure([], () => r(require('@/components/Train')))
// import SearchBar from '@/components/SearchBar'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/flight'},
    {
      path: '/flight/:dep?/:arr?/:date?',
      name: 'Flight',
      component: Flight
    }, {
      path: '/train/:dep?/:arr?/:date?',
      name: 'Train',
      component: Train
    }
  ]
})
