<template>
  <div>
    <bread-crumb>
      <template class="float_right">
        <el-button class="float_right" @click="add" size="medium">{{$t('operation.add')}}</el-button>
      </template>
    </bread-crumb>
    <div>
      <span>標題</span>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <span>狀態</span>

    </div>
  </div>
</template>
<script>
export default {
  methods: {
    requestList () {

    },
    add () {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
