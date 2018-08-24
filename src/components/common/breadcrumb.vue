<template>
  <div class="bread_box cl full_width">
    <el-breadcrumb class="bread" separator="/">
      <template v-for="(item,index) in path">
        <el-breadcrumb-item
          v-if="index === 0 || index === path.length - 1"
          :key="index" :class="{'current':index === path.length - 1}">{{$t(`menu.${item}`)}}</el-breadcrumb-item>
        <el-breadcrumb-item
          v-else
          :to="{name:item}" replace :key="index">{{$t(`menu.${item}`)}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <slot />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('menu')
export default {
  computed: {
    ...mapState(['path'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../config/ui.scss";
.bread_box {
  height: 40px;
  line-height: 40px;
  display: table;
  & > div {
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
