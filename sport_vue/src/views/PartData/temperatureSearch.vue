<template>
  <div>
    <Search v-if="dialog" :type="type" :tableData="tableData" @again="getempure()"></Search>
  </div>
</template>

<script>
import Search from '../../components/littleChart/Search.vue'
export default {
  components: {
    Search
  },
  data () {
    return {
      tableData: [],
      type: {
        name: 'tempure',
        title: '体温数据(℃)',
        temshow: false
      },
      id: window.sessionStorage.getItem('id'),
      dialog: false
    }
  },
  methods: {
    async getempure () {
      const { data: res } = await this.$http.get('/server/mydata/mytempure/' + this.id)
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.tableData = res.data.map(item => {
        return { _id: item._id, id: item.id, newdata: item.tempure, date: item.date }
      })
      console.log(this.tableData)
      this.dialog = true
    }
  },
  created () {
    this.getempure()
  }

}
</script>

<style>

</style>
