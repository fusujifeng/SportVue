

<template>
  <div>
      <infoTabel :infolist="infolist" @getNew="getallinfo()"></infoTabel>
  </div>
</template>

<script>
import infoTabel from '../../components/Info.vue'
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
    this.getallinfo()
  },
  methods: {
    async getallinfo () {
      const { data: res } = await this.$http.get('/server/chart/myinfo/' + this.id)
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.infolist = res.myINfo
    }
  }
}
</script>

<style>

</style>
