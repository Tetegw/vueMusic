<template>
  <div id="app">
    <!-- <v-header></v-header> -->
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-player></v-player>
  </div>
</template>

<script>
import Vheader from '@/components/v-header/header'
import Vtab from '@/components/v-tab/tab'
import Player from '@/components/v-player/player';

export default {
  components: {
    'v-header': Vheader,
    'v-tab': Vtab,
    'v-player': Player
  },
  created() {
    document.addEventListener('touchmove', function (e) { e.preventDefault() }, false);
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  #app
    color: $color-theme
</style>


