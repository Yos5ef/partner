import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import PrivateHome from '@/components/user/PrivateHome'
import FindMate from '@/components/mates/FindMate'
import MyPubMate from '@/components/mates/MyPubMate'
import WantJoin from '@/components/mates/WantJoin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/privateHome',
      name: 'privateHome',
      component: PrivateHome
    },
    {
      path: '/findMate',
      name: 'FindMate',
      component: FindMate
    },
    {
      path: '/mypubmate',
      name: 'MyPubMate',
      component: MyPubMate
    },
    {
      path: '/wantJoin',
      name: 'WantJoin',
      component: WantJoin
    }
  ]
})
