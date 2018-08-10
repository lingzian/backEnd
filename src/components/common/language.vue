<template>
  <el-select class="transparent_select language_select" v-model="locale" @change="changeLanguage">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { cookie } from '../../assets/js/utils'
import { formatLanguage } from '../../assets/js/format'
export default {
  data () {
    return {
      options: [{
        value: 'cn',
        label: '简体中文'
      }, {
        value: 'tw',
        label: '繁體中文'
      }],
      locale: this.$i18n.locale
    }
  },
  methods: {
    changeLanguage (locale) {
      this.$i18n.locale = locale
      cookie.set('language', locale, 24 * 365)
      this.axios.defaults.params['language'] = formatLanguage(locale)
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.language_select{
  width: 100px;
}
</style>
