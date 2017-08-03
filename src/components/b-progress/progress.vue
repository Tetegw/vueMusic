<template>
    <div class="v-progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.stop.prevent="prgTouchStart" @touchmove.stop.prevent="prgTouchMove" @touchend="prgTouchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
const progressBtnWidth = 16
export default {
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },
    watch: {
        percent(newPercent) {
            if (newPercent >= 0 && !this.touch.init) {
                let barWidth = this.$refs.progressBar.offsetWidth - progressBtnWidth
                let offsetWidth = barWidth * newPercent
                this._offset(offsetWidth)
            }
        }
    },
    created() {
        this.touch = {}
    },
    methods: {
        prgTouchStart(e) {
            this.touch.init = true
            this.touch.startX = e.touches[0].clientX
            this.touch.left = this.$refs.progress.clientWidth
        },
        prgTouchMove(e) {
            if (!this.touch.init) {
                return
            }
            let deltaX = e.touches[0].clientX - this.touch.startX
            let offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX))
            this._offset(offsetWidth)
        },
        prgTouchEnd(e) {
            if (!this.touch.init) {
                return
            }
            this.touch.init = false
            this._triggerPercent()
        },
        progressClick(e) {
            this._offset(e.offsetX)
            this._triggerPercent()
        },
        _triggerPercent() {
            let barWidth = this.$refs.progressBar.offsetWidth - progressBtnWidth
            let prgWidth = this.$refs.progress.clientWidth
            let percent = prgWidth / barWidth
            this.$emit('emitTriggerPercent', percent)
        },
        _offset(offsetWidth) {
            this.$refs.progress.style.width = `${offsetWidth}px`
            this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px, 0, 0)`
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.v-progress-bar
    height: 30px
    .bar-inner
        position: relative
        top: 13px
        height: 4px
        background: rgba(0, 0, 0, 0.3)
        .progress
            position: absolute
            height: 100%
            background: $color-theme
        .progress-btn-wrapper
            position: absolute
            left: -8px
            top: -13px
            width: 30px
            height: 30px
            .progress-btn
                position: relative
                top: 7px
                left: 7px
                box-sizing: border-box
                width: 16px
                height: 16px
                border: 3px solid $color-text
                border-radius: 50%
                background: $color-theme
</style>

