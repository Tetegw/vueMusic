import Vue from 'vue'
import Router from 'vue-router'

// 路由模块
import Rank from '@/components/v-rank/rank'
import Recommend from '@/components/v-recommend/recommend'
import Search from '@/components/v-search/search'
import Singer from '@/components/v-singer/singer'

// 子路由
import SingerDetail from '@/components/v-singer-detail/singer-detail';
import TopList from '@/components/v-top-list/top-list';
import Disc from '@/components/v-disc/disc';


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/recommend',
    }, {
        path: '/rank',
        component: Rank,
        children: [{
            path: ':id',
            component: TopList
        }]
    }, {
        path: '/recommend',
        component: Recommend,
        children: [{
            path: ':id',
            component: Disc
        }]
    }, {
        path: '/search',
        component: Search,
    }, {
        path: '/singer',
        component: Singer,
        children: [{
            path: ':id',
            component: SingerDetail
        }]
    }]
})