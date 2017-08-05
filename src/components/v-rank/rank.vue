<template>
    <div class="v-rank" ref="rank">
        <v-scroll class="toplist" :data="topList" ref="scroll">
            <ul>
                <li class="item" v-for="item in topList" @click="selectItem(item)" :key="item.id">
                    <div class="icon">
                        <img width="100" height="100" v-lazy="item.picUrl" alt="">
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song, i) in item.songList" :key="i">
                            <span>{{i + 1}}</span>
                            <span>{{song.singername}}-{{song.songname}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </v-scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import { getTopList } from '@/api/rank';
import { ERR_OK } from '@/api/config'
import Scroll from '@/components/b-scroll/scroll';
import { mapMutations } from 'vuex';
import { playlistMixin } from '@/common/js/mixin';

export default {
    mixins: [playlistMixin],
    data() {
        return {
            topList: []
        }
    },
    created() {
        this._getTopList()
    },
    methods: {
        //覆盖mixin中方法
        handPlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.rank.style['bottom'] = bottom
            this.$refs.scroll.refresh()
        },
        selectItem(item) {
            this.setTopList(item)
            this.$router.push({
                path: `/rank/${item.id}`
            })
        },
        _getTopList() {
            getTopList().then((res) => {
                if (res.code === ERR_OK) {
                    this.topList = res.data.topList
                }
            })
        },
        ...mapMutations({
            setTopList: 'SET_TOP_LIST'
        })
    },
    components: {
        'v-scroll': Scroll
    }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.v-rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
        height: 100%
        overflow: hidden
        .item
            display: flex
            margin: 0 20px
            padding-top: 20px
            height: 100px
            &:last-child
                padding-bottom: 20px
            .icon
                flex: 0 0 100px
                width: 100px
                height: 100px
            .songlist
                flex: 1
                display: flex
                flex-direction: column
                justify-content: center
                padding: 0 20px
                height: 100px
                overflow: hidden
                background: $color-highlight-background
                color: $color-text-d
                font-size: $font-size-small
            .song
                no-wrap()
                line-height: 26px
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>