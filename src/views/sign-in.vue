<template>
  <div class="sign_in_bg">
    <el-form ref="userInfo" :model="userInfo" class="userinfo" :rules="rules">
      <h2>{{$t('ifood')}}</h2>
      <el-form-item  class="label" prop="account">
        <el-input
          :spellcheck="false"
          v-model="userInfo.account"
          prefix-icon="icon-account"
          :placeholder="$t('tips.pleaseInputAccount')"
          class="userinput"
          clearable></el-input>
      </el-form-item>
      <el-form-item  class="label" prop="password">
        <el-input
          :spellcheck="false"
          type="password"
          v-model="userInfo.password"
          prefix-icon="icon-password"
          :placeholder="$t('tips.pleaseInputPassword')"
          class="userinput"
          clearable></el-input>
      </el-form-item>
      <div class="text_center">
        <el-button :loading="loading" @click="submit" class="sub">{{$t('sign.signIn')}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  messageTips,
  addEvent,
  removeEvent
} from '../assets/js/utils'
import { createNamespacedHelpers } from 'vuex'
import { account, password } from '../assets/js/rules'
const { mapActions } = createNamespacedHelpers('user')

export default {
  data () {
    return {
      userInfo: {
        account: '',
        password: ''
      },
      loading: false,
      rules: {
        account,
        password
      }
    }
  },
  created () {
    addEvent(document, 'keyup.login', event => {
      event = event || window.event
      if (event.keyCode === 13) this.submit()
    })
  },
  methods: {
    ...mapActions(['signIn']),
    // 提交
    submit () {
      this.$refs.userInfo.validate().then(() => {
        this.loading = true
        this.signIn({
          account: this.userInfo.account,
          password: this.userInfo.password
        }).then(res => {
          this.$router.replace({
            name: 'Index'
          })
          messageTips(this.$t('tips.loginSuccess'))
        }).finally(() => {
          this.loading = false
        })
      })
    }
  },
  destroyed () {
    removeEvent(document, 'keyup.login')
  }
}
</script>

<style lang="scss" scoped>
@import "../config/ui.scss";
.sign_in_bg {
  background: #009c86 url(../assets/images/signin_bg.jpg) no-repeat center;
  height: 100%;
  h2{text-align: center;margin-bottom: 30px;}
  .userinfo {
    width: 380px;
    height: 330px;
    padding: 30px 40px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translate(0,-50%);
    box-shadow: 0 0 1px 0px $publicColor;
    .label {
      padding-bottom: 10px;
    }
    .userinput {
      width: 300px;
    }
    .sub {
      width: 300px;
      background: $publicColor;
      margin-top: 10px;
      color: #fff;
      &:hover {
        background: $publicColor / 1.1;
      }
    }
  }
}
</style>
