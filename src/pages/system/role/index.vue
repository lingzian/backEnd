<template>
  <div>角色管理</div>
</template>

<script>
import { getRoles } from '../../../assets/api'
export default {
  data () {
    return {

    }
  },
  created () {
    this.requestList()
  },
  methods: {
    requestList () {
      getRoles().then(res => {
        let list = res.data.items
        console.log(list)
      })
    }
  }
}
</script>
