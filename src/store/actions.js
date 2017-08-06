import * as types from './mutation-types'
import { shuffle } from '@/common/js/utils';

const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}

export const selectPlay = function ({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit(types.SET_PLAY_LIST, randomList)
        index = findIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAY_LIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({ commit }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}


export const insertSong = function ({ commit, state }, song) {
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playList[currentIndex]
    // =======================================
    // 查找插入的歌曲是否在列表中
    let fpIndex = findIndex(playList, song)
    // 插入歌曲在当前索引的下一个
    currentIndex++
    // 插入歌曲
    playList.splice(currentIndex, 0, song)
    // 当前列表中是否有这首歌
    if (fpIndex > -1) {
        if (currentIndex > fpIndex) {
            playList.splice(fpIndex, 1)
            currentIndex--
        } else {
            playList.splice(fpIndex + 1, 1)
        }
    }
    // =======================================
    let currentSIndex = findIndex(sequenceList, currentSong) + 1
    let fsIndex = findIndex(sequenceList, song)
    sequenceList.splice(currentSIndex, 0, song)
    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
            currentSIndex--
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }
    // =======================================
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_PLAY_LIST, playList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}