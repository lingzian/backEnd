<template>
  <el-form label-position="right" label-width="80px" :model="userInfo">
    <el-form-item :label="$t('user.account')">
      <el-input v-model="userInfo.account"></el-input>
    </el-form-item>
    <el-form-item :label="$t('user.password')">
      <el-input type="password" v-model="userInfo.password"></el-input>
    </el-form-item>
    <div class="text_center">
      <el-button :loading="loading" @click="submit">{{$t('sign.signIn')}}</el-button>
    </div>
  </el-form>
</template>

<script>
import { getOperatingSystem, cookie, messageTips } from '../assets/js/utils'
import { formatSystem } from '../assets/js/format'
import md5 from 'js-md5'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

export default {
  data () {
    return {
      userInfo: {
        account: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['signIn']),
    submit () {
      this.loading = true
      let system = getOperatingSystem()
      this.signIn({
        account: this.userInfo.account,
        password: md5(this.userInfo.password),
        device: 'pc',
        operating_system: formatSystem(system),
        type: '0',
        unique: this.$store.state.user.browserUUID
      }).then(res => {
        cookie.set('token', res.data.token, 24)
        this.axios.defaults.params['access-token'] = res.data.token
        this.$router.replace({
          name: 'Index'
        })
        messageTips(this.$t('tips.loginSuccess'))
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
