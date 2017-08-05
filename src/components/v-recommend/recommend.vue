<template>
    <div class="v-recommend" ref="recommend">
        <v-scroll class="recommend-content" :data="discList" ref="scroll">
            <div>
                <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
                    <v-slider>
                        <div v-for="item in recommends" :key="item.id">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" @load="imgIsLoad" class="needsclick">
                            </a>
                        </div>
                    </v-slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in discList" class="item" :key="item.dissid" @click="selectItem(item)">
                            <div class="icon">
                                <img v-lazy="item.imgurl" alt="">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.author"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </v-scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import Scroll from '@/components/b-scroll/scroll'
import Slider from '@/components/b-slider/slider'
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import { mapMutations } from 'vuex'
import { playlistMixin } from '@/common/js/mixin'

export default {
    mixins: [playlistMixin],
    data() {
        return {
            recommends: [],
            discList: [],
        }
    },
    components: {
        'v-scroll': Scroll,
        'v-slider': Slider,
    },
    created() {
        this._getRecommend()
        this._getDiscList()
    },
    methods: {
        //覆盖mixin中方法
        handPlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.recommend.style['bottom'] = bottom
            this.$refs.scroll.refresh()
        },
        imgIsLoad() {
            if (!this.checkLoaded) {
                this.$refs.scroll.refresh()
                this.checkLoaded = true
            }
        },
        selectItem(item) {
            this.setDisc(item)
            this.$router.push({
                path: `recommend/${item.dissid}`
            })
        },
        _getRecommend() {
            getRecommend().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider
                }
            })
        },
        _getDiscList() {
            getDiscList().then((res) => {
                if (res.code === ERR_OK) {
                    // this.discList = res.data.list
                    this.discList = res.data.hotdiss.list
                }
            })
        },
        ...mapMutations({
            setDisc: 'SET_DISC'
        })
    },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

    .v-recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                        img 
                            width: 60px
                            height: 60px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>

