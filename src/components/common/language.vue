<template>
  <el-select class="transparent_select language_select" v-model="locale" @change="changeLanguage">
    <el-option
      v-for="item in languageOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { formatLanguage } from '../../assets/js/format'
import { languageOptions } from '../../assets/js/options'
export default {
  data () {
    return {
      languageOptions,
      locale: this.$i18n.locale
    }
  },
  methods: {
    changeLanguage (locale) {
      this.$i18n.locale = locale
      localStorage.setItem('language', locale)
      this.axios.defaults.params['language'] = formatLanguage(locale)
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.language_select {
  width: 100px;
}
</style>
