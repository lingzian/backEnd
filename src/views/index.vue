<template>
  <div class="index">
    <index-header></index-header>
    <div class="content">
      <index-menu></index-menu>
      <div class="viewer">
        <div>
          <transition :name="transitionName" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IndexHeader from '../components/common/header'
import IndexMenu from '../components/common/menu'
export default {
  components: {
    IndexHeader,
    IndexMenu
  },
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  watch: {
    $route (to, from) {
      let toDepth = to.path.split('/').length
      let fromDepth = from.path.split('/').length
      if (toDepth > fromDepth) {
        this.transitionName = 'slide-right'
      } else if (toDepth < fromDepth) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'fade'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../config/ui.scss";
.index{
  height: 100%;
  overflow: hidden;
  .content{
    height: 100%;
    display: table;
    &>div{
      display: table-cell;
      height: 100%;
    }
    .viewer{
      width: 100%;
      padding-top: $headerHeight;
      &>div{
        width: 100%;
        min-width: $windowMinWidth;
        max-height: 100%;
        padding: $mainPadding;
        overflow-x: hidden;
        overflow-y: auto;
      }
    }
  }
}
</style>
