import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'


export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp(url, data, options)
}

export function getDiscList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'
    const rnd = Math.floor(Math.random() * 10000000000000000)
    const data = Object.assign({}, commonParams, {
        format: 'jsonp',
        tpl: 'v12',
        page: 'other',
        rnd: rnd,
        hostUin: 0,
        outCharset: 'GB2312',
        platform: 'yqq',
        needNewCode: 0
    })

    return jsonp(url, data, options)
}

export function getSongList(dissid) {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

    const data = Object.assign({}, commonParams, {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: dissid,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
    })

    return jsonp(url, data, {
        param: 'jsonpCallback',
        prefix: 'jp'
    })
}