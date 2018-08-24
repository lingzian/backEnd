<template>
  <el-pagination
    class="pagination text_right"
    @current-change="handleCurrentChange"
    :current-page.sync="pagination.page"
    :page-size="pagination.perPage"
    layout="prev, pager, next, jumper"
    :total="pagination.totalCount">
  </el-pagination>
</template>

<script>
import { listPerPage } from '../../config'
export default {
  data () {
    return {
      pagination: {
        page: 1, // 当前页
        perPage: listPerPage, // 一页获取多少数据
        totalCount: 0 // 数据总数
      }
    }
  },
  mounted () {
    this.$emit('changePage')
  },
  methods: {
    handleCurrentChange () {
      if (this.pagination.totalCount <= this.pagination.perPage) return false
      this.$emit('changePage')
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
</style>
