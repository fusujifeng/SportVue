<template>
  <div>
    <infoTable :infolist="infolist" @getNew="getAllInfo()"></infoTable>
  </div>
</template>

<script>
import infoTable from '../../components/InfoTable.vue'
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
    this.getAllInfo()
  },
  methods: {
    async getAllInfo () {
      const { data: res } = await this.$http.get('/server/chart/allInfo')
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.infolist = res.myINfo
    }
  }
}
</script>

<style>

</style>
