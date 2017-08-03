<template>
    <transition name="slide">
        <v-music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs">
        </v-music-list>
    </transition>
</template>

<script>
import Musiclist from '@/components/v-music-list/music-list';
import { mapGetters } from 'vuex';
import { getMusicList } from '@/api/rank';
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song_class';

export default {
    created() {
        this._getMusicList()
    },
    data() {
        return {
            songs: [],
            rank: true
        }
    },
    computed: {
        title() {
            return this.topList.topTitle
        },
        bgImage() {
            return this.topList.picUrl
        },
        ...mapGetters([
            'topList'
        ])
    },
    methods: {
        _getMusicList() {
            if (!this.topList.id) {
                this.$router.push('/rank')
                return
            }
            getMusicList(this.topList.id).then((res) => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.songlist)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
                const musicData = item.data
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    },
    components: {
        'v-music-list': Musiclist
    }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
