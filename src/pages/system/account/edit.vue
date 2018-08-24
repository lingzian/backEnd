<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-tabs v-model="cardActiveName" type="card">
        <el-tab-pane :label="$t('user.baseInfo')" name="base">
          <el-form ref="accountForm" :model="accountForm" :rules="rules" label-width="60px">
            <div class="accountForm_box">
              <el-form-item :label="$t('user.account') + ':'" prop="account">
                <el-input v-model.trim="accountForm.account" :spellcheck="false" :disabled="isSelfAccount"/>
              </el-form-item>
              <el-form-item :label="$t('user.role') + ':'" prop="role_id">
                <role-select v-model="accountForm.role_id" :disabled="isSelfAccount"></role-select>
              </el-form-item>
              <el-form-item :label="$t('status.status') + ':'" required>
                <el-select v-model="accountForm.active" class="full_width" placeholder="" :disabled="isSelfAccount">
                  <el-option
                    v-for="item in activeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('user.password') + ':'" prop="password">
                <el-input v-model.trim="accountForm.password" :spellcheck="false"/>
              </el-form-item>
              <el-form-item :label="$t('user.name') + ':'">
                <el-input v-model.trim="accountForm.name" :spellcheck="false"/>
              </el-form-item>
              <el-form-item :label="$t('user.mobile') + ':'" prop="mobile">
                <el-input v-model.trim="accountForm.mobile" :spellcheck="false"/>
              </el-form-item>
              <el-form-item :label="$t('user.email') + ':'" prop="email">
                <el-input v-model.trim="accountForm.email" :spellcheck="false"/>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('user.authsInfo')" name="auths" :disabled="isSelfAccount">
          <select-auths v-if="!isSelfAccount" ref="auths" :roleId="accountForm.role_id" :accountAuths="accountAuths"></select-auths>
        </el-tab-pane>
        <div class="text_center margin_top_15">
          <el-button @click="submit" :loading="loading">{{$t('operation.submit')}}</el-button>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { updateAccount, getAccount } from '../../../assets/api/account'
import { account, roleSelect, passwordNoRequire, mobileNoRequire, emailNoRequire } from '../../../assets/js/rules'
import { cloneObject, messageTips } from '../../../assets/js/utils'
import { activeOptions } from '../../../assets/js/options'
import md5 from 'js-md5'
import SelectAuths from '../../../components/auth/selectAuthsTable'
import RoleSelect from '../../../components/role/roleSelect'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('user')
export default {
  components: {
    SelectAuths,
    RoleSelect
  },
  data () {
    return {
      rules: {
        account,
        password: passwordNoRequire,
        role_id: roleSelect,
        mobile: mobileNoRequire,
        email: emailNoRequire
      },
      cardActiveName: 'base',
      accountForm: {
        account: '',
        password: '',
        role_id: '',
        name: '',
        mobile: '',
        email: '',
        active: 1
      },
      loading: false,
      activeOptions,
      id: this.$route.query.id,
      accountAuths: null
    }
  },
  watch: {
    $route () {
      this.id = this.$route.query.id
      this.getAccount()
    }
  },
  computed: {
    ...mapState(['user']),
    isSelfAccount () {
      return this.id === this.user.id
    }
  },
  created () {
    this.getAccount()
  },
  methods: {
    ...mapActions(['getAccount', 'logout']),
    // 提交
    submit () {
      this.$refs.accountForm.validate().then(res => {
        this.loading = true
        let sendData = cloneObject(this.accountForm)
        if (sendData.password) {
          sendData.password = md5(sendData.password)
        } else {
          delete sendData.password
        }
        sendData.items = this.$refs.auths.getResult()
        updateAccount(this.id, sendData).then(res => {
          if (this.isSelfAccount && sendData.password) {
            this.logout().then(res => {
              this.$router.replace({
                name: 'SignIn'
              })
              messageTips(this.$t('tips.editSuccessReLogin'))
            })
          } else {
            if (this.isSelfAccount && !sendData.password) this.getAccount(this.user.id)
            messageTips(this.$t('tips.editSuccess'))
            this.$router.replace({
              name: 'AccountManagement'
            })
          }
        }).finally(() => {
          this.loading = false
        })
      }).catch(() => {
        this.cardActiveName = 'base'
      })
    },
    // 获取账号信息
    getAccount () {
      getAccount(this.id).then(res => {
        let account = res.data.account
        this.accountForm = {
          account: account.account,
          active: parseInt(account.active),
          email: account.email,
          role_id: account.role_id,
          mobile: account.mobile,
          name: account.name
        }
        this.accountAuths = res.data.items.map(ele => ele.id)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.accountForm_box{
  width: 400px;
}
</style>
