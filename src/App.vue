<template>
  <router-view/>
</template>

<script>
import { removeNode } from './assets/js/utils'
export default {
  beforeMount () {
    removeNode(document.querySelector('#loading_style'))
    removeNode(document.querySelector('#loading_box'))
  }
}
</script>

<style lang="scss">
@import './assets/css/reset.css';
@import './assets/ifont/iconfont.css';
@import './assets/css/reset-plugins.scss';
@import './assets/css/common.scss';
@import './assets/css/animate.css';
</style>
