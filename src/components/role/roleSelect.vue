<template>
  <el-select
    :disabled="disabled"
    v-model="role"
    filterable
    class="full_width"
    placeholder=""
    @change="$emit('change',role)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { getRoles } from '../../assets/api/role'
export default {
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: null,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      options: [],
      role: ''
    }
  },
  watch: {
    value () {
      this.role = this.value
    }
  },
  created () {
    getRoles().then(res => {
      this.options = res.data.items.map(ele => {
        return {
          value: ele.id,
          label: ele.name
        }
      })
    })
  }
}
</script>
