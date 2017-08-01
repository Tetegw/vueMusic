import * as types from './mutation-types';

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, data) {
        state.playList = data
    },
    [types.SET_SEQUENCE_LIST](state, data) {
        state.sequenceList = data
    },
    [types.SET_PLAY_MODE](state, flag) {
        state.mode = flag
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    }
}

export default mutations