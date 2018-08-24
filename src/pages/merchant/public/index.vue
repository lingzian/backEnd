<template>
  <div>
    <bread-crumb>
      <template class="float_right">
        <el-button class="float_right" @click="add" size="medium">{{$t('operation.add')}}</el-button>
      </template>
    </bread-crumb>
    <div>
      <el-form inline label-width="87px">
        <el-form-item :label="$t('data.merchantName') + '/ID'">
          <el-input />
        </el-form-item>
        <el-form-item :label="$t('user.mobile')">
          <el-input />
        </el-form-item>
        <el-form-item :label="$t('data.prinicipal')">
          <el-input />
        </el-form-item>
        <el-form-item :label="$t('data.activeType')">
          <el-input />
        </el-form-item>
        <el-form-item :label="$t('data.merchantState')">
          <el-input />
        </el-form-item>
        <el-form-item :label="$t('data.operatingState')">
          <el-input />
        </el-form-item>
        <el-form-item label="M1">
          <el-input />
        </el-form-item>
        <el-form-item class="margin_left_20">
          <el-button size="medium" class="button_type_public" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="list" border stripe v-loading.box="loading"></el-table>
      <pagination ref="pagination" @changePage="requestList"></pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: []
    }
  },
  methods: {
    add () {

    },
    search () {

    },
    requestList () {

    }
  }
}
</script>
