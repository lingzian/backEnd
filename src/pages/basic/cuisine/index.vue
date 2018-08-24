<template>
  <div>
    <bread-crumb>
      <template class="float_right">
        <el-button class="float_right" @click="add" size="medium">{{$t('operation.add')}}</el-button>
      </template>
    </bread-crumb>

    <div>
      <el-table :data="list" border stripe v-loading.box="loading">
        <el-table-column prop="cuisine_name" :label="$t('data.name')"></el-table-column>
        <el-table-column prop="sorting" :label="$t('operation.sort')"></el-table-column>
        <el-table-column prop="active" :label="$t('status.status')" :formatter="tableFilter.formatActive"></el-table-column>
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

      <el-dialog
        width="400px"
        :title="isAdd ? $t('operation.add') : $t('operation.edit')"
        :visible.sync="cuisineForm.dialog"
        @closed="dialogClose">
        <el-form ref="cuisineForm" :model="cuisineForm" :rules="rules" label-width="60px">
          <el-form-item :label="$t('data.name')" prop="name">
            <el-input v-model.trim="cuisineForm.name" :spellcheck="false"/>
          </el-form-item>
          <el-form-item :label="$t('status.status')" required>
            <el-select v-model="cuisineForm.active" class="full_width" placeholder="">
              <el-option
                v-for="item in activeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('operation.sort')" prop="sorting">
            <el-input-number class="full_width hide_button" v-model="cuisineForm.sorting" controls-position="right" :min="0" />
          </el-form-item>
          <div class="text_center">
            <el-button @click="submit" :loading="cuisineForm.loading">{{$t('operation.submit')}}</el-button>
          </div>
        </el-form>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import { getCuisines, getCuisine, addCuisine, updateCuisine, deleteCuisine } from '../../../assets/api/cuisine'
import { activeOptions } from '../../../assets/js/options'
import { name, sorting } from '../../../assets/js/rules'
import { messageTips } from '../../../assets/js/utils'
export default {
  data () {
    return {
      rules: {
        name,
        sorting
      },
      list: [],
      loading: false,
      cuisineForm: {
        loading: false,
        dialog: false,
        id: '',
        name: '',
        active: 1,
        sorting: 99
      },
      activeOptions
    }
  },
  computed: {
    isAdd () {
      return this.cuisineForm.id === ''
    }
  },
  methods: {
    requestList () {
      let pagination = this.$refs.pagination.pagination
      this.loading = true
      getCuisines({
        page: pagination.page,
        perPage: pagination.perPage
      }).then(res => {
        this.list = res.data.items
        let meta = res.data._meta
        pagination.totalCount = parseInt(meta.totalCount)
      }).finally(() => {
        this.loading = false
      })
    },
    add () {
      this.cuisineForm.dialog = true
    },
    del (idx) {
      this.$confirm(this.$t('tips.deleteConfirmation'), this.$t('tips.tips'), {
        confirmButtonText: this.$t('operation.sure'),
        cancelButtonText: this.$t('operation.cancel'),
        type: 'warning'
      }).then(() => {
        let id = this.list[idx].cuisine_id
        deleteCuisine(id).then(res => {
          messageTips(this.$t('tips.deleteSuccess'))
          this.requestList()
        })
      })
    },
    edit (idx) {
      let id = this.list[idx].cuisine_id
      getCuisine(id).then(res => {
        let data = res.data
        this.cuisineForm.id = data.cuisine_id
        this.cuisineForm.name = data.language.zh.cuisine_name
        this.cuisineForm.sorting = parseInt(data.sorting)
        this.cuisineForm.active = parseInt(data.active)
        this.cuisineForm.dialog = true
      })
    },
    submit () {
      this.$refs.cuisineForm.validate().then(() => {
        this.cuisineForm.loading = true
        let sendData = {
          language: {
            zh: {
              name: this.cuisineForm.name
            }
          },
          sorting: this.cuisineForm.sorting,
          active: this.cuisineForm.active
        }
        let fn
        if (this.isAdd) {
          fn = addCuisine(sendData)
        } else {
          fn = updateCuisine(this.cuisineForm.id, sendData)
        }
        fn.then(res => {
          this.isAdd ? messageTips(this.$t('tips.addSuccess')) : messageTips(this.$t('tips.editSuccess'))
          this.requestList()
          this.cuisineForm.dialog = false
        }).finally(() => {
          this.cuisineForm.loading = false
        })
      })
    },
    dialogClose () {
      this.$refs.cuisineForm.clearValidate()
      this.cuisineForm.name = ''
      this.cuisineForm.sorting = 99
      this.cuisineForm.active = 1
      this.cuisineForm.id = ''
    }
  }
}
</script>
