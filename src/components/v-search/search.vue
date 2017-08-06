<template>
    <div class="v-search">
        <div class="search-box-wrapper">
            <v-search-box ref="searchBox" @query="onQueryChange"></v-search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li class="item" v-for="(item, index) in hotKey" :key="index" @click="addQuery(item.k)">
                            <span>{{item.k}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <v-suggest :query="query" ref="suggest" @emitListScroll="emitListScroll"></v-suggest>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import SearchBox from '@/components/b-search-box/search-box'
import Suggest from '@/components/v-suggest/suggest'
import { getHotKey } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { playlistMixin } from '@/common/js/mixin'

export default {
    mixins: [playlistMixin],
    data() {
        return {
            hotKey: [],
            query: ''
        }
    },
    created() {
        this._getHotKey()
    },
    methods: {
        //覆盖mixin中方法
        handPlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.searchResult.style['bottom'] = bottom
            this.$refs.suggest.refresh()
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        onQueryChange(newQuery) {
            this.query = newQuery
        },
        emitListScroll() {
            this.$refs.searchBox.inputBlur()
        },
        _getHotKey() {
            getHotKey().then((res) => {
                if (res.code === ERR_OK) {
                    this.hotKey = res.data.hotkey.slice(0, 10)
                }
            })
        }
    },
    components: {
        'v-search-box': SearchBox,
        'v-suggest': Suggest
    }
}

</script>

<style lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.v-search
    .search-box-wrapper
        margin: 20px
    .shortcut-wrapper
        position: fixed
        top: 140px
        bottom: 0
        width: 100%
        .shortcut
            height: 100%
            overflow: hidden
            .hot-key
                margin: 0 20px 20px 20px
                .title
                    margin-bottom: 20px
                    font-size: $font-size-medium
                    color: $color-text-l
                .item
                    display: inline-block
                    padding: 5px 10px
                    margin: 0 20px 10px 0
                    border-radius: 6px
                    background: $color-highlight-background
                    font-size: $font-size-medium
                    color: $color-text-d
            .search-history
                position: relative
                margin: 0 20px
                .title
                    display: flex
                    align-items: center
                    height: 40px
                    font-size: $font-size-medium
                    color: $color-text-l
                    .text
                        flex: 1
                    .clear
                        extend-click()
                        .icon-clear
                            font-size: $font-size-medium
                            color: $color-text-d
    .search-result
        position: fixed
        width: 100%
        top: 140px
        bottom: 0
</style>

