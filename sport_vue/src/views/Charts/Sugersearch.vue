<template>
  <div>
    <Search v-if="dialog" :type="type" :tableData="tableData" @again="getsuger()"></Search>
  </div>
</template>

<script>
import Search from '../../components/Search.vue'
export default {
  components: {
    Search
  },
  data () {
    return {
      tableData: [],
      type: {
        name: 'suger',
        title: '血糖数据(mmol/L)',
        sugershow: false
      },
      id: window.sessionStorage.getItem('id'),
      dialog: false
    }
  },
  methods: {
    async getsuger () {
      const { data: res } = await this.$http.get('/server/mydata/mysuger/' + this.id)
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.tableData = res.data.map(item => {
        return { _id: item._id, id: item.id, newdata: item.suger, date: item.date }
      })
      this.dialog = true
    }
  },
  created () {
    this.getsuger()
  }

}
</script>

<style>

</style>
