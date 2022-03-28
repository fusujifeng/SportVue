<template>
  <div>
    <Search v-if="dialog" :type="type" :tableData="tableData" @again="getpresure()"></Search>
  </div>
</template>

<script>
import Search from '../../views/Search.vue'
export default {
  components: {
    Search
  },
  data () {
    return {
      tableData: [],
      type: {
        name: 'presure',
        title: '血压数据（mmHg）',
        presureshow: false
      },
      id: window.sessionStorage.getItem('id'),
      dialog: false
    }
  },
  methods: {
    async getpresure () {
      const { data: res } = await this.$http.get('/server/mydata/mypresure/' + this.id)
      console.log(res)
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.tableData = res.data.map(item => {
        return { _id: item._id, id: item.id, newdata: item.presure, date: item.date }
      })
      console.log(this.tableData)
      this.dialog = true
    }
  },
  created () {
    this.getpresure()
  }

}
</script>

<style>

</style>
