import * as types from './mutation-types'

const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}

export const selectPlay = function ({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}