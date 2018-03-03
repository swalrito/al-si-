import * as types from '../mutation-types'

let state = {
    dialogShow:false,
}

let mutations = {
    [types.TRIGGLE_DIALOG](state,boolean){
        state.dialogShow = boolean
    }
}

export default{
    state,
    mutations,
}