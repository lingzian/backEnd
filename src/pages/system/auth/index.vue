<template>
  <div>
    <bread-crumb></bread-crumb>
    <div>
      <select-auths :checkbox="false"></select-auths>
    </div>
  </div>
</template>

<script>
import SelectAuths from '../../../components/auth/selectAuthsTable'
export default {
  components: {
    SelectAuths
  }
}
</script>
