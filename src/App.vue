<template>
    <div id="app">
      <v-header></v-header>
      <v-tab></v-tab>
      <router-view></router-view>
    </div>
</template>

<script>
import Vheader from '@/components/v-header/header'
import Vtab from '@/components/v-tab/tab'

export default {
	components:{
		'v-header': Vheader,
    'v-tab': Vtab,
	}
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  #app
    color: $color-theme
</style>


