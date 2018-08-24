<template>
  <div class="header cl">
    <div class="right_info">
      <language class="language"></language>
      <span class="user pointer" @click="setting"><i class="icon-user"></i>{{user.name || user.account}}</span>
      <span class="exit pointer" @click="exit"><i class="icon-exit"></i>{{$t('sign.exit')}}</span>
    </div>
  </div>
</template>

<script>
import { messageTips } from '../../assets/js/utils'
import Language from './language'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('user')
export default {
  components: {
    Language
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logout']),
    exit () {
      this.$confirm(this.$t('tips.exitConfirmation'), this.$t('tips.tips'), {
        confirmButtonText: this.$t('operation.sure'),
        cancelButtonText: this.$t('operation.cancel'),
        type: 'warning'
      }).then(() => {
        this.logout().then(() => {
          messageTips(this.$t('tips.logoutSuccess'))
          this.$router.replace({
            name: 'SignIn'
          })
        })
      })
    },
    setting () {
      this.$router.replace({
        name: 'AccountEdit',
        query: {
          id: this.user.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../config/ui.scss";
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: $headerHeight;
  line-height: $headerHeight;
  background-color: $publicColor;
  color: #fff;
  z-index: 1;
  padding: 0 40px;
  overflow: hidden;
  .right_info {
    float: right;
    .language {
      display: inline-block;
      line-height: normal;
      margin-right: 20px;
    }
    .user {
      font-size: 15px;
      margin-right: 20px;
      i {
        padding-right: 4px;
      }
    }
    .exit {
      font-size: 15px;
      transition: all 0.15s;
      i {
        padding-right: 4px;
      }
      &:hover {
        color: $publicColor / 2;
      }
    }
  }
}
</style>
