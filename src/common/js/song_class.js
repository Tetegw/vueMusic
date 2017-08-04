import { getLyric } from '@/api/song'
import { ERR_OK } from '@/api/config';

export default class song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
            getLyric(this.id).then((res) => {
                if (res.code === ERR_OK) {
                    // 解析为标准换行字符串
                    let Res = res.lyric.replace(/&#58;/g, ':')
                    Res = Res.replace(/&#46;/g, '.')
                    Res = Res.replace(/&#32;/g, ' ')
                    Res = Res.replace(/&#45;/g, '-')
                    Res = Res.replace(/&#10;/g, '\n')
                    this.lyric = Res
                    resolve(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })

    }
}

export function createSong(musicData) {
    return new song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    })
}

function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}