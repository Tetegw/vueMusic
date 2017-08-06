<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input ref="queryInput" class="box" v-model="query" :placeholder="placeholder" />
        <i class="icon-dismiss" v-show="query" @click="clear"></i>
    </div>
</template>

 <script type="text/ecmascript-6">
import { debounce } from '@/common/js/utils';
export default {
    props: {
        placeholder: {
            type: String,
            default: '搜索歌曲，歌手'
        }
    },
    data() {
        return {
            query: ''
        }
    },
    created() {
        this.$watch('query', debounce((newQuery) => {
            this.$emit('query', newQuery)
        }, 200))
    },
    methods: {
        clear() {
            this.query = ''
        },
        setQuery(query) {
            this.query = query
        },
        inputBlur() {
            this.$refs.queryInput.blur()
        }
    }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

.search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
        font-size: 24px
        color: $color-theme
    .box
        flex: 1
        margin: 0 5px
        line-height: 18px
        background: $color-highlight-background
        color: $color-text
        font-size: $font-size-medium
        &::placeholder
            color: $color-text-d
    .icon-dismiss
        font-size: 16px
        color: $color-theme
</style>