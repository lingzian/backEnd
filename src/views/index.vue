<template>
  <div class="index full_height">
    <index-menu class="full_height"></index-menu>
    <div class="content full_width full_width">
      <index-header></index-header>
      <div class="viewer full_height">
        <transition name="fade" mode="out-in">
          <router-view class="public_viewer" />
        </transition>
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
  }
}
</script>

<style lang="scss" scoped>
@import "../config/ui.scss";
.index {
  display: flex;
  .content {
    flex-grow: 1;
    position: relative;
    padding-top: $headerHeight;
    overflow: hidden;
    .viewer {
      padding: $mainPadding;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: $mainBgColor;
    }
  }
}
</style>
