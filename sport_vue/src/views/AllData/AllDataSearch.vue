

<template>
  <div>
      <infoTabel :infolist="infolist" @getNew="getAllInfo()"></infoTabel>
  </div>
</template>

<script>
import infoTabel from '../../components/InfoTable.vue'
export default {
  components: {
    infoTabel
  },
  data () {
    return {
      infolist: [],
      id: window.sessionStorage.getItem('id')
    }
  },
  created () {
    this.getAllInfo()
  },
  methods: {
    async getAllInfo () {
      const { data: res } = await this.$http.get('/server/chart/only-myinfo/' + this.id)
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.infolist = res.myINfo
      console.log("w s myinf",this.infolist)
    }
  }
}
</script>

<style>

</style>
