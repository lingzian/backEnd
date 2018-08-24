<template>
  <div class="menu">
    <div class="title text_center" :style="`background-color:${menuBgColor};`">
      <span class="name absolute_center" :class="{'hide':isCollapse,'show':!isCollapse}">{{$t('ifood')}}</span>
      <div class="collapse_state_btn">
        <el-button v-if="isCollapse" @click="uncollapse" circle>
          <i class="icon-uncollapse"></i>
        </el-button>
        <el-button v-else @click="collapse" circle>
          <i class="icon-collapse"></i>
        </el-button>
      </div>
    </div>
    <div class="menu_content full_height">
      <el-scrollbar
        class="menu_scrollbar full_height"
        :style="`background-color:${menuBgColor};`"
        view-style="max-height:100%;"
        wrap-style="overflow-x:hidden;">

        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          unique-opened
          :collapse="isCollapse"
          :background-color="menuBgColor"
          :text-color="menuTextColor"
          @select="selectMenu">

          <template v-for="(item,index) in mainMenu">

            <el-submenu v-if="item.sub_menu" :key="index" :index="item.name" :show-timeout="0" :hide-timeout="0">
              <template slot="title">
                <i v-if="item.icon" :class="item.icon" class="icon"></i>
                <span slot="title">{{$t(`menu.${item.name}`)}}</span>
              </template>
              <el-menu-item class="menu_item" v-for="(i,idx) in item.sub_menu" :key="idx" :index="`${item.name}/${i.name}`">{{$t(`menu.${i.name}`)}}</el-menu-item>
            </el-submenu>

            <el-menu-item v-else :key="index" :index="item.name">
              <i v-if="item.icon" :class="item.icon" class="icon"></i>
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
    ...mapState([
      'isCollapse',
      'pageMenu',
      'mainMenu',
      'menuBgColor',
      'menuTextColor'
    ]),
    defaultActive () {
      let path = this.$route.path.split('/')
      path.shift()
      if (path[0] === '') {
        return 'Index'
      }
      if (path.length === 3) path.pop()
      return path.join('/')
    }
  },
  created () {
    this.getMenus()
    this.queryPath()
  },
  watch: {
    $route () {
      this.queryPath()
    }
  },
  methods: {
    ...mapMutations(['collapse', 'uncollapse', 'setPath']),
    ...mapActions(['getMenus']),
    selectMenu (res) {
      let page = res.split('/')
      let name = page[page.length - 1]
      this.$router.push({
        name: name
      })
      this.setPath(res.split('/'))
    },
    queryPath () {
      let path = this.$route.path.replace('/', '').split('/')
      let lastIdx = path.length - 1
      let last = path[lastIdx]
      if (/add/i.test(last)) {
        path[lastIdx] = 'Add'
      } else if (/edit/i.test(last)) {
        path[lastIdx] = 'Edit'
      } else if (/detail/i.test(last)) {
        path[lastIdx] = 'Detail'
      }
      this.setPath(path)
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
  .menu_content {
    .el-menu {
      border-right: 0;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: $uncollapseWidth;
    }
    .is-active .el-submenu__title * {
      color: $publicColor;
    }
    .icon{
      margin-right: 8px;
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
    z-index: 2;
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
