import Vue from 'vue'
import Router from 'vue-router'

// 路由模块
import Rank from '@/components/v-rank/rank'
import Recommend from '@/components/v-recommend/recommend'
import Search from '@/components/v-search/search'
import Singer from '@/components/v-singer/singer'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/rank',
    }, {
        path: '/rank',
        component: Rank,
    }, {
        path: '/recommend',
        component: Recommend,
    }, {
        path: '/search',
        component: Search,
    }, {
        path: '/singer',
        component: Singer,
    }]
})