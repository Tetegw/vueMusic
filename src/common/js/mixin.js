import { mapGetters } from 'vuex';

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    mounted() {
        this.handPlaylist(this.playList)
    },
    activated() {
        this.handPlaylist(this.playList)
    },
    watch: {
        playList(newVal) {
            this.handPlaylist(this.playList)
        }
    },
    methods: {
        handPlaylist() {
            throw new Error('组件必须实现handPlaylist函数')
        }
    }
}