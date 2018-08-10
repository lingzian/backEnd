<template>
  <div class="menu">
    <div class="title text_center" :style="`background-color:${menuBgColor};`">
      <span class="name absolute_center" :class="{'hide':isCollapse,'show':!isCollapse}">iFood后台先富系统</span>
      <div class="collapse_state_btn">
        <el-button v-if="isCollapse" @click="uncollapse" circle>
          <i class="icon-uncollapse"></i>
        </el-button>
        <el-button v-else @click="collapse" circle>
          <i class="icon-collapse"></i>
        </el-button>
      </div>
    </div>
    <div class="menu_content">
      <el-scrollbar class="menu_scrollbar" :style="`background-color:${menuBgColor};`" view-style="max-height:100%;" wrap-style="overflow-x:hidden;">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" unique-opened :collapse="isCollapse" :background-color="menuBgColor" :text-color="menuTextColor" @select="selectMenu">
          <template v-for="(item,index) in mainMenu">

            <el-submenu v-if="item.sub_menu" :key="index" :index="item.name" :show-timeout="0" :hide-timeout="0">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{$t(`menu.${item.name}`)}}</span>
              </template>
              <el-menu-item v-for="(i,idx) in item.sub_menu" :key="idx" :index="`${item.name}/${i.name}`">{{$t(`menu.${i.name}`)}}</el-menu-item>
            </el-submenu>

            <el-menu-item v-else :key="index" :index="item.name">
              <i class="el-icon-setting"></i>
              <span slot="title">{{$t(`menu.${item.name}`)}}</span>
            </el-menu-item>

          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('menu')

export default {
  computed: {
    ...mapState(['isCollapse', 'pageMenu', 'mainMenu', 'menuBgColor', 'menuTextColor']),
    defaultActive () {
      return this.$route.path.replace('/', '') || 'Index'
    }
  },
  created () {
    this.getMenu()
  },
  methods: {
    ...mapMutations(['collapse', 'uncollapse']),
    ...mapActions(['getMenu']),
    selectMenu (res) {
      let page = res.split('/')
      let name = page[page.length - 1]
      this.$router.push({
        name: name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../config/ui.scss";
.menu {
  position: relative;
  padding-top: $headerHeight;
  // 菜单内容
  .menu_content{
    height: 100%;
    .menu_scrollbar{
      height: 100%;
    }
    .el-menu {
      border-right: 0;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: $uncollapseWidth;
    }
    .is-active .el-submenu__title *{
      color: $publicColor;
    }
  }
  //标题
  .title {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: $headerHeight;
    line-height: $headerHeight;
    z-index: 1;
    border-bottom: 1px solid #666;
    .name {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      overflow: hidden;
      display: inline-block;
      transition: all 0.3s;
      white-space: nowrap;
      &.show {
        width: 174px;
        opacity: 1;
      }
      &.hide {
        width: 0;
        opacity: 0;
      }
    }
    .collapse_state_btn {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      button {
        overflow: hidden;
        width: 40px;
        height: 40px;
        i {
          vertical-align: top;
        }
      }
      button:hover i {
        color: $publicColor;
      }
    }
  }
}
</style>
