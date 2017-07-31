<template>
    <transition name="slider">
        <v-music-list :songs="songs" :title="title" :bgImage="bgImage" v-if="songs.length"></v-music-list>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSingerDetail } from '@/api/singer';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/common/js/song_class';
import musicList from '@/components/v-music-list/music-list';

export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.GetterSinger.name
        },
        bgImage() {
            return this.GetterSinger.avatar
        },
        ...mapGetters({
            GetterSinger: 'GetterSinger'
        })
    },
    created() {
        this._getDetail()
    },
    methods: {
        _getDetail() {
            if (!this.GetterSinger.id) {
                this.$router.push({
                    path: '/singer'
                })
                return
            }
            getSingerDetail(this.GetterSinger.id).then((res) => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((el) => {
                let { musicData } = el
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            });
            return ret
        }
    },
    components: {
        'v-music-list': musicList
    }
}
</script>

<style lang="stylus" scoped>
    .slider-enter-active, .slider-leave-active
        transition: all 0.3s
    .slider-enter, .slider-leave-to
        transform: translate3d(100%, 0, 0)
</style>
