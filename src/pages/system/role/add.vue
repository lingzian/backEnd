<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form ref="roleform" :model="roleform" label-width="82px" label-position="left">
        <el-form-item :label="`${$t('data.roleName')}:`" required>
          <el-col :span="6">
            <el-form-item prop="name" :rules="rules.name">
              <el-input v-model.trim="roleform.name" :spellcheck="false" size="medium" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <select-auths ref="auths"></select-auths>
        <div class="text_center margin_top_15">
          <el-button @click="submit" :loading="submitLoading">{{$t('operation.submit')}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addRole } from '../../../assets/api/role'
import { name } from '../../../assets/js/rules'
import { messageTips } from '../../../assets/js/utils'
import SelectAuths from '../../../components/auth/selectAuthsTable'
export default {
  components: {
    SelectAuths
  },
  data () {
    return {
      rules: {
        name
      },
      roleform: {
        name: ''
      },
      submitLoading: false
    }
  },
  methods: {
    // 提交
    submit () {
      this.$refs.roleform.validate().then(() => {
        let result = this.$refs.auths.getResult()
        this.submitLoading = true
        addRole({
          language: {
            zh: {
              name: this.roleform.name
            }
          },
          items: result
        }).then(res => {
          messageTips(this.$t('tips.addSuccess'))
          this.$router.replace({
            name: 'RoleManagement'
          })
        }).finally(() => {
          this.submitLoading = false
        })
      })
    }
  }
}
</script>
