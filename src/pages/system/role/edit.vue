<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <el-form ref="roleform" :model="roleform" label-width="82px" label-position="left">
        <el-form-item :label="`${$t('data.roleName')}:`" required>
          <el-col :span="6">
            <el-form-item prop="name" :rules="rules.name">
              <el-input v-model.trim="roleform.name" :spellcheck="false" size="medium"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <select-auths ref="auths" :roleId="id" @roleCallback="getRoleInfo"></select-auths>
        <div class="text_center margin_top_15">
          <el-button @click="submit" :loading="submitLoading">{{$t('operation.submit')}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { name } from '../../../assets/js/rules'
import { updateRole } from '../../../assets/api/role'
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
      submitLoading: false,
      id: this.$route.query.id
    }
  },
  methods: {
    // 提交
    submit () {
      this.$refs.roleform.validate().then(() => {
        let result = this.$refs.auths.getResult()
        this.submitLoading = true
        updateRole(this.id, {
          language: {
            zh: {
              name: this.roleform.name
            }
          },
          items: result
        }).then(res => {
          messageTips(this.$t('tips.editSuccess'))
          this.$router.replace({
            name: 'RoleManagement'
          })
        }).finally(() => {
          this.submitLoading = false
        })
      })
    },
    // 获取角色信息
    getRoleInfo (res) {
      this.roleform.name = res.data.language.zh.name
    }
  }
}
</script>
