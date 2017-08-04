import { commonParams } from './config';
import axios from 'axios';

export function getLyric(musicid) {
    let urlApi = ''
    let url = window.location.href
    if (url.indexOf('8080') > -1) {
        urlApi = '/lyric'
    } else {
        urlApi = 'http://www.fepawn.com/view/testDemo/vueMusic/qqmusic.php'
    }

    const data = Object.assign({}, commonParams, {
        musicid: musicid,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        categoryId: 10000000,
        pcachetime: +new Date(),
    })

    return axios.get(urlApi, {
        params: data
    }).then((res) => {
        let data = res.data
        if (typeof data === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = data.match(reg)
            if (matches) {
                data = JSON.parse(matches[1])
            }
        }
        return Promise.resolve(data)
    })
}