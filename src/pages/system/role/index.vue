<template>
  <div>
    <bread-crumb>
      <template class="float_right">
        <el-button class="float_right" @click="add" size="medium">{{$t('operation.add')}}</el-button>
      </template>
    </bread-crumb>
    <div>
      <el-table :data="list" border stripe v-loading.box="loading">
        <el-table-column prop="name" :label="$t('data.name')"></el-table-column>
        <el-table-column prop="create_time" :label="$t('data.createTime')" :formatter="tableFilter.formatDate"></el-table-column>
        <el-table-column :label="$t('operation.operation')" width="143">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="edit(scope.$index)">{{$t('operation.edit')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.$index)">{{$t('operation.del')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="pagination" @changePage="requestList"></pagination>
    </div>
  </div>
</template>

<script>
import { messageTips } from '../../../assets/js/utils'
import { getRoles, deleteRole } from '../../../assets/api/role'
export default {
  data () {
    return {
      list: [],
      loading: false
    }
  },
  methods: {
    edit (idx) {
      let id = this.list[idx].id
      this.$router.push({
        name: 'RoleEdit',
        query: {
          id: id
        }
      })
    },
    del (idx) {
      this.$confirm(this.$t('tips.deleteConfirmation'), this.$t('tips.tips'), {
        confirmButtonText: this.$t('operation.sure'),
        cancelButtonText: this.$t('operation.cancel'),
        type: 'warning'
      }).then(() => {
        let id = this.list[idx].id
        deleteRole(id).then(res => {
          messageTips(this.$t('tips.deleteSuccess'))
          this.requestList()
        })
      })
    },
    add () {
      this.$router.push({
        name: 'RoleAdd'
      })
    },
    requestList () {
      let pagination = this.$refs.pagination.pagination
      this.loading = true
      getRoles({
        page: pagination.page,
        perPage: pagination.perPage
      }).then(res => {
        this.list = res.data.items
        let meta = res.data._meta
        pagination.totalCount = parseInt(meta.totalCount)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
