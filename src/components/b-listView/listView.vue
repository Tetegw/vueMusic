<template>
    <v-scroll class="v-listview" :data="data" :listenScroll="listenScroll" :probeType="probeType" ref="scroll" @emitScroll="emitScroll">
        <ul>
            <li v-for="(group, index) in data" class="list-group" :key="index" ref="singerList">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="(item, index) in group.items" :key="index" class="list-group-item">
                        <img v-lazy="item.avatar" class="avatar" alt="">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item, index) in shortcutList" :key="index" class="item" :class="{'current' :currentTouch === index}" :data-index="index">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
    </v-scroll>
</template>

<script>
import Scroll from '@/components/b-scroll/scroll'
import { getData } from '@/common/js/dom'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
    data() {
        return {
            currentTouch: 0,
            scrollY: 0,
            diff: 0,
        }
    },
    props: {
        data: {
            type: Array,
            default: [],
        }
    },
    computed: {
        shortcutList() {
            // map会返回一个新数组
            return this.data.map((item) => {
                return item.title.substring(0, 1)
            })
        },
        fixedTitle() {
            if (this.scrollY >= 0) {
                return ''
            }
            return this.data[this.currentTouch] ? this.data[this.currentTouch].title : ''
        }
    },
    created() {
        // 在data中注册的数据会响应，这里并不需要
        this.touchData = {}
        this.listenScroll = true
        this.listHeight = []
        this.probeType = 3
    },
    methods: {
        onShortcutTouchStart(e) {
            // 获取索引，并scroll到相应索引
            let anchorIndex = getData(e.target, 'index')
            this._scrollTo(anchorIndex)
            // 记录当前点击的位置
            let firstTouch = e.touches[0]
            this.touchData.y1 = firstTouch.pageY
            this.touchData.lastIndex = Number(anchorIndex)
        },
        onShortcutTouchMove(e) {
            // 记录当前滑动的位置
            let firstTouch = e.touches[0]
            this.touchData.y2 = firstTouch.pageY
            let deltaY = (this.touchData.y2 - this.touchData.y1) / ANCHOR_HEIGHT | 0
            // 获取滑动过程中的新索引，并scroll到相应索引
            let anchorIndex = this.touchData.lastIndex + deltaY
            this._scrollTo(anchorIndex)
        },
        emitScroll(pos) {
            this.scrollY = pos.y
        },
        _scrollTo(index) {
            if (!index && index !== 0) {
                return
            }
            if (index < 0) {
                index = 0
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2
            }
            // 保存当前的元素，用于添加样式
            this.currentTouch = Number(index)
            // 响应的滚动到响应的字母
            this.$refs.scroll.scrollToElement(this.$refs.singerList[Number(index)], 0)
        },
        _calculateHeight() {
            const list = this.$refs.singerList
            let height = 0
            this.listHeight.push(height)
            list.forEach((item) => {
                height += item.clientHeight
                this.listHeight.push(height)
            });
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        },
        scrollY(newY) {
            // newY下一次scrollY，一直都是负数（往下滑），可打印出来看
            const listHeight = this.listHeight
            // 正数说明在最顶部
            if (newY >= 0) {
                this.currentTouch = 0
                return
            }
            // 在中间滑动
            for (let i = 0; i < listHeight.length; i++) {
                let topEle = listHeight[i];
                let botEle = listHeight[i + 1];
                if ((-newY) >= topEle && (-newY) < botEle) {
                    this.currentTouch = i
                    this.diff = botEle + newY
                    return
                }
            }
        },
        diff(newVal) {
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
            if (this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    },
    components: {
        'v-scroll': Scroll
    }

}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .v-listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>

