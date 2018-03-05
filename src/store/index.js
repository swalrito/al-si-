import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

import result from './moudles/result'
import chart from './moudles/chart'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        result,
        chart,
    }
})