import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

import result from './moudles/result'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        result
    }
})