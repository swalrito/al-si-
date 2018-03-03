import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const index = ()=>import('../components/index.vue')
const chart = ()=>import('../components/chart.vue')
const data = ()=>import('../components/dbTable.vue')

export default new Router({
    routes:[{
        path:'/',
        name:'index',
        redirect: '/chart',
        component:index,
        children:[{
            path:'/chart',
            name:'chart',
            component:chart,
        },{
            path:'/data',
            name:'showData',
            component:data,
        }],
    },]
})