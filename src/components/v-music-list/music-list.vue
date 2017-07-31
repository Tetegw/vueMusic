<template>
    <div class="v-music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <!--  top -->
        <div class="bg-image" :Style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div class="play" v-show="songs.length" ref="playBtn">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <!-- 滚动scroll -->
        <div class="bg-layer" ref="layer"></div>
        <v-scroll class="list" ref="list" :data="songs" :probeType="probeType" :listenScroll="listenScroll" @emitScroll="emitScroll">
            <div class="song-list-wrapper">
                <v-song-list :songs="songs" v-if="songs.length"></v-song-list>
            </div>
        </v-scroll>
    </div>
</template>

<script>
import Scroll from '@/components/b-scroll/scroll';
import SongList from '@/components/b-song-list/song-list';

const RESERVED_HEIGHT = 40

export default {
    data() {
        return {
            imageHeight: 0,
            minTransalteY: 0,
            scrollY: 0
        }
    },
    props: {
        songs: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            default: ''
        },
        bgImage: {
            type: String,
            default: ''
        }
    },
    computed: {
        bgStyle() {
            return `background-image:url(${this.bgImage})`
        }
    },
    methods: {
        back() {
            this.$router.back()
        },
        emitScroll(pos) {
            this.scrollY = pos.y
        }
    },
    watch: {
        scrollY(newY) {
            let bgImageEl = this.$refs.bgImage
            let layerEl = this.$refs.layer
            let playBtn = this.$refs.playBtn
            let filter = this.$refs.filter
            // newY和minTransalteY 都是负数
            let translateY = Math.max(this.minTransalteY, newY)
            let zIndex = 0
            let scale = 1
            let blur = 0
            layerEl.style['transform'] = `translate3d(0, ${translateY}px, 0)`
            layerEl.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`

            const percent = Math.abs(newY / this.imageHeight)
            if (newY > 0) {
                zIndex = 10
                scale = 1 + percent
            } else {
                blur = Math.min(20 * percent, 20)
            }
            filter.style['backdrop-filter'] = `blur(${blur}px)`
            filter.style['-webkit-backdrop-filter'] = `blur(${blur}px)`


            if (newY < this.minTransalteY) {
                zIndex = 10
                bgImageEl.style.paddingTop = 0
                bgImageEl.style.height = `${RESERVED_HEIGHT}px`
                playBtn.style.display = 'none'
            } else {
                bgImageEl.style.paddingTop = `70%`
                bgImageEl.style.height = `0px`
                playBtn.style.display = ''
            }
            bgImageEl.style.zIndex = zIndex
            bgImageEl.style['transform'] = `scale(${scale})`
            bgImageEl.style['webkitTransform'] = `scale(${scale})`
        }
    },
    created() {
        this.probeType = 3
        this.listenScroll = true
    },
    mounted() {
        this.imageHeight = this.$refs.bgImage.clientHeight
        this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
        this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    components: {
        'v-scroll': Scroll,
        'v-song-list': SongList
    }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

.v-music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
        position absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-back
            display: block
            padding: 10px
            font-size: $font-size-large-x
            color: $color-theme
    .title
        position: absolute
        top: 0
        left: 10%
        z-index: 40
        width: 80%
        no-wrap()
        text-align: center
        line-height: 40px
        font-size: $font-size-large
        color: $color-text
    .bg-image
        position: relative
        width: 100%
        height: 0
        padding-top: 70%
        transform-origin: top
        background-size: cover
        .play-wrapper
            position: absolute
            bottom: 20px
            z-index: 50
            width: 100%
            .play
                box-sizing: border-box
                width: 135px
                padding: 7px 0
                margin: 0 auto
                text-align: center
                border: 1px solid $color-theme
                color: $color-theme
                border-radius: 100px
                font-size: 0
                .icon-play
                    display: inline-block
                    vertical-align: middle
                    margin-right: 6px
                    font-size: $font-size-medium-x
                .text
                    display: inline-block
                    vertical-align: middle
                    font-size: $font-size-small
        .filter
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            background: rgba(7, 17, 27, 0.4)
    .bg-layer
        position: relative
        height: 100%
        background: $color-background
    .list
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        background: $color-background
        .song-list-wrapper
            padding: 20px 30px
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>

