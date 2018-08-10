<template>
  <div class="header cl">
    <div class="right_info">
      <language class="language"></language>
      <span class="user"><i class="icon-user"></i>小锋</span>
      <span class="exit pointer"><i class="icon-exit"></i>{{$t('sign.exit')}}</span>
    </div>
  </div>
</template>

<script>
import language from './language'
export default {
  components: {
    language
  }
}
</script>

<style lang="scss" scoped>
@import "../../config/ui.scss";
.header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-width: $windowMinWidth + $uncollapseWidth;
  height: $headerHeight;
  line-height: $headerHeight;
  background-color: $publicColor;
  color: #fff;
  z-index: 1;
  padding: 0 40px;
  .right_info{
    float: right;
    .language{
      display: inline-block;
      line-height: normal;
      margin-right: 20px;
    }
    .user{
      font-size: 15px;
      margin-right: 20px;
      i{
        padding-right: 4px;
      }
    }
    .exit{
      font-size: 15px;
      transition: all .15s;
      i{
        padding-right: 4px;
      }
      &:hover{
        color: $publicColor / 2
      }
    }
  }
}
</style>
