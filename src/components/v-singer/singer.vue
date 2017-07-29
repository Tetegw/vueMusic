<template>
    <div class="v-singer">
        <v-listView :data="singers"></v-listView>
    </div>
</template>

<script>
import { getSinger } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/js/singer_class'
import ListView from '@/components/b-listView/listView';

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
    data() {
        return {
            singers: []
        }
    },
    created() {
        this._getSinger();
    },
    methods: {
        _getSinger() {
            getSinger().then((res) => {
                if (res.code === ERR_OK) {
                    this.singers = this.normalizeSinger(res.data.list)
                }
            })
        },
        normalizeSinger(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            // 提取前十条当热门数据
            list.forEach((item, index) => {
                if (index <= HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                    }))
                }

                // 将其他数据分类
                const key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name,
                }))
            })

            // 处理map 转换成有序列表
            let hot = []
            let ret = []
            for (let key in map) {
                if (map.hasOwnProperty(key)) {
                    let element = map[key];
                    if (element.title.match(/[a-zA-Z0-9]/)) {
                        ret.push(element)
                    } else if (element.title === HOT_NAME) {
                        hot.push(element)
                    }
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })

            return hot.concat(ret)
        }
    },
    components: {
        'v-listView': ListView
    }
}
</script>

<style lang="stylus">
.v-singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>