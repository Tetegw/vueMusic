<template>
    <v-scroll class="v-suggest" :data="result" :pullup="pullup" @emitScrollToEnd="emitScrollToEnd" ref="vScroll">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <v-loading v-show="hasMore" title=""></v-loading>
        </ul>
    </v-scroll>
</template>

<script>
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song_class'
import Scroll from '@/components/b-scroll/scroll'
import Loading from '@/components/b-loading/loading'
import Singer from '@/common/js/singer_class'
import { mapMutations } from 'vuex'

const TYPE_SINGER = 'singer'
const PERPAGE = 20
export default {
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            page: 1,
            pullup: true,
            result: [],
            hasMore: true
        }
    },
    watch: {
        query() {
            this._search()
        }
    },
    created() {
        this._search()
    },
    methods: {
        getIconCls(item) {
            return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
        },
        getDisplayName(item) {
            return item.type === TYPE_SINGER ? item.singername : `${item.name}-${item.singer}`
        },
        emitScrollToEnd() {
            if (!this.hasMore) {
                return
            }
            this.page++
            search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
                if (res.code === ERR_OK) {
                    this.result = this.result.concat(this._genResult(res.data))
                    this._checkMore(res.data)
                }
            })
        },
        selectItem(item) {
            if (item.type === TYPE_SINGER) {
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                })
                this.$router.push({
                    path: `/search/${singer.id}`
                })
                this.SET_SINGER(singer)
            }
        },
        _search() {
            this.hasMore = true
            this.page = 1
            if (this.query) {
                this.$refs.vScroll.scrollTo(0, 0)
            }
            search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
                if (res.code === ERR_OK) {
                    this.result = this._genResult(res.data)
                    this._checkMore(res.data)
                }
            })
        },
        _checkMore(data) {
            const song = data.song
            if (!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum) {
                this.hasMore = false
            }
        },
        _genResult(data) {
            let ret = []
            if (data.zhida && data.zhida.singerid) {
                ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
            }
            if (data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach(function (data) {
                if (data.songid && data.albumid) {
                    ret.push(createSong(data))
                }
            }, this);
            return ret
        },
        ...mapMutations({
            SET_SINGER: 'SET_SINGER'
        }),
    },
    components: {
        'v-scroll': Scroll,
        'v-loading': Loading
    }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin" 

.v-suggest
    height: 100%
    overflow: hidden
    .suggest-list
        padding: 0 30px
        .suggest-item
            display: flex
            align-items: center
            padding-bottom: 20px
        .icon
            flex: 0 0 30px
            width: 30px
            [class^="icon-"]
                font-size: 14px
                color: $color-text-d
        .name
            flex: 1
            font-size: $font-size-medium
            color: $color-text-d
            overflow: hidden
            .text
                no-wrap()
    .no-result-wrapper
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

