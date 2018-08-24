<template>
  <el-table
    class="no_hover"
    :data="auths"
    :span-method="authsTableMerge"
    v-loading.box="loading"
    border>
    <el-table-column :label="$t('menu.level_one')" width="150">
      <template slot-scope="scope">
        <div v-if="scope.row.level === 1">
          <el-checkbox v-if="checkbox" v-model="scope.row.isSelect" @change="checkBoxChange(scope.row)">{{$t(`menu.${scope.row.name}`)}}</el-checkbox>
          <span v-else>{{$t(`menu.${scope.row.name}`)}}</span>
        </div>
        <div v-else-if="scope.row.parant">
          <el-checkbox v-if="checkbox" v-model="scope.row.parant.isSelect" @change="checkBoxChange(scope.row.parant)">{{$t(`menu.${scope.row.parant.name}`)}}</el-checkbox>
          <span v-else>{{$t(`menu.${scope.row.parant.name}`)}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('menu.level_two')">
      <template slot-scope="scope">
        <div v-if="scope.row.level === 2">
          <el-checkbox v-if="checkbox" v-model="scope.row.isSelect" @change="checkBoxChange(scope.row)">{{$t(`menu.${scope.row.name}`)}}</el-checkbox>
          <span v-else>{{$t(`menu.${scope.row.name}`)}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('menu.level_three')">
      <template slot-scope="scope">
        <div
          class="inline_block margin_right_20"
          v-if="scope.row.level === 2 && scope.row.subData"
          v-for="(item,index) in scope.row.subData"
          :key="index">
          <el-checkbox v-if="checkbox" v-model="item.isSelect" @change="checkBoxChange(item)">{{formatLastLevelName(item.name)}}</el-checkbox>
          <span v-else>{{formatLastLevelName(item.name)}}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Axios from 'axios'
import { getRole } from '../../assets/api/role'
import { getAuths } from '../../assets/api/auth'
import { roleAuthsSort, authsTableMerge, roleAuthsCheckBoxSelect, roleAuthsFormatId } from '../../assets/js/logic'
import { cloneObject } from '../../assets/js/utils'
export default {
  props: {
    roleId: null,
    accountAuths: null,
    checkbox: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      id: this.roleId,
      authsTableMerge, // 权限表格合并规则
      auths: [], // 权限列表
      originAuths: [], // 原权限列表数据
      hasOrigin: false, // 是否已经获取了权限列表
      loading: false,
      accountAuthsIsShow: false // 账号编辑传进来是否已经渲染了权限列表
    }
  },
  created () {
    if (this.id) {
      this.getRoleAuths()
    } else {
      this.getAuths()
    }
  },
  watch: {
    roleId () {
      if (!this.accountAuthsIsShow) return false
      this.id = this.roleId
      this.loading = true
      getRole(this.id).then(res => {
        this.auths = roleAuthsSort(cloneObject(this.originAuths), res.data.items)
      }).finally(() => {
        this.loading = false
      })
    },
    accountAuths () {
      if (this.hasOrigin && !this.accountAuthsIsShow) {
        this.accountAuthsIsShow = true
        this.auths = roleAuthsSort(cloneObject(this.originAuths), this.accountAuths)
      }
    }
  },
  methods: {
    // 选框改变值
    checkBoxChange (data) {
      roleAuthsCheckBoxSelect(data, this.auths)
    },
    // 获取权限
    getAuths () {
      this.loading = true
      getAuths().then(res => {
        this.originAuths = cloneObject(res.data)
        this.hasOrigin = true
        if (this.accountAuths && !this.accountAuthsIsShow) {
          this.accountAuthsIsShow = true
          this.auths = roleAuthsSort(cloneObject(this.originAuths), this.accountAuths)
        } else {
          this.auths = roleAuthsSort(res.data)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 获取角色权限
    getRoleAuths () {
      this.loading = true
      Axios.all([
        getRole(this.id),
        getAuths()
      ]).then(Axios.spread((role, auths) => {
        this.$emit('roleCallback', role)
        this.originAuths = cloneObject(auths.data)
        this.hasOrigin = true
        this.auths = roleAuthsSort(auths.data, role.data.items)
      })).finally(() => {
        this.loading = false
      })
    },
    // 获取结果
    getResult () {
      return roleAuthsFormatId(this.auths)
    },
    // 格式化三级菜单名字
    formatLastLevelName (name) {
      if (name.includes('Create')) {
        return this.$t('operation.add')
      } else if (name.includes('Delete')) {
        return this.$t('operation.del')
      } else if (name.includes('Update')) {
        return this.$t('operation.edit')
      } else if (name.includes('List')) {
        return this.$t('menu.List')
      } else if (name.includes('View')) {
        return this.$t('operation.view')
      } else {
        return this.$t(`menu.${name}`)
      }
    }
  }
}
</script>
