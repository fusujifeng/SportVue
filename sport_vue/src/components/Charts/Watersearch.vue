<template>
  <div>
    <Search v-if="dialog" :type="type" :tableData="tableData" @again="getwater()"></Search>
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
        name: 'water',
        title: '饮水数据（ml）',
        watershow: false
      },
      id: window.sessionStorage.getItem('id'),
      dialog: false
    }
  },
  methods: {
    async getwater () {
      const { data: res } = await this.$http.get('/server/mydata/mywater/' + this.id)
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.tableData = res.data.map(item => {
        return { _id: item._id, id: item.id, newdata: item.water, date: item.date }
      })
      this.dialog = true
    }
  },
  created () {
    this.getwater()
  }

}
</script>

<style>

</style>
