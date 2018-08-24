<template>
  <div>
    <bread-crumb>
      <template class="float_right">
        <el-button class="float_right" @click="add" size="medium">{{$t('operation.add')}}</el-button>
      </template>
    </bread-crumb>
    <div>
      <el-table :data="list" border stripe v-loading.box="loading">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form class="table_form" inline>
              <el-form-item :label="$t('user.mobile') + ':'">{{scope.row.mobile | formatDataNull}}</el-form-item>
              <el-form-item :label="$t('user.email') + ':'">{{scope.row.email | formatDataNull}}</el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.name')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.name}">{{scope.row.name | formatDataNull}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="account" :label="$t('user.account')"></el-table-column>
        <el-table-column prop="active" :label="$t('status.status')" :formatter="tableFilter.formatActive"></el-table-column>
        <el-table-column prop="role_name" :label="$t('data.roleName')"></el-table-column>
        <el-table-column prop="create_time" :label="$t('data.createTime')" :formatter="tableFilter.formatTime"></el-table-column>
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
import { getAccounts, deleteAccount } from '../../../assets/api/account'
import { messageTips } from '../../../assets/js/utils'
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
        name: 'AccountEdit',
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
        deleteAccount(id).then(res => {
          messageTips(this.$t('tips.deleteSuccess'))
          this.requestList()
        })
      })
    },
    add () {
      this.$router.push({
        name: 'AccountAdd'
      })
    },
    requestList () {
      let pagination = this.$refs.pagination.pagination
      this.loading = true
      getAccounts({
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
