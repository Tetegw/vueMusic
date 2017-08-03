<template>
    <transition name="slide">
        <v-music-list :title="title" :bgImage="bgImage" :songs="songs"></v-music-list>
    </transition>
</template>

<script>
import MusicList from '@/components/v-music-list/music-list'
import { mapGetters } from 'vuex';
import { getSongList } from '@/api/recommend'
import { createSong } from '@/common/js/song_class';

export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.disc.dissname
        },
        bgImage() {
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    created() {
        this._getSongList()
    },
    methods: {
        _getSongList() {
            if (!this.disc.dissid) {
                this.$router.push({
                    path: '/recommend'
                })
                return
            }
            getSongList(this.disc.dissid).then((res) => {
                this.songs = this._normalizeSongs(res.cdlist[0].songlist)
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
                if (item.songid && item.albummid) {
                    ret.push(createSong(item))
                }
            })
            return ret
        }

    },
    components: {
        'v-music-list': MusicList
    }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

