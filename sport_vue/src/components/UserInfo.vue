<template>
  <div>
    <infoTable :infolist="infolist" @getNew="getallinfo()"></infoTable>
  </div>
</template>

<script>
import infoTable from './InfoTable.vue'
export default {
  components: {
    infoTable
  },
  data () {
    return {
      infolist: []
    }
  },
  created () {
    this.getallinfo()
  },
  methods: {
    async getallinfo () {
      const { data: res } = await this.$http.get('/server/chart/allInfo')
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.infolist = res.myINfo
    }
  }
}
</script>

<style>

</style>
