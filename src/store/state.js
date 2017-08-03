const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    topList: {}
}

export default state