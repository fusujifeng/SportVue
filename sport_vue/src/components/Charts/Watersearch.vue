<template>
  <div>
    <Search v-if="dialog" :type="type" :tableData="tableData" @again="getwater()"></Search>
      <div class="Waterknowledge">
        <h1>Tips:</h1>   
        <h3>
          根据《中国居民膳食指南》中的建议，我国居民每天饮水量建议为<span class="big">1200</span>mL。
          <br>
          <br>
          在温和气候条件下生活的从事轻度身体活动的成年人每天需要喝水<span class="big">1500-1700</span>毫升。
          未成年根据年龄的不同适量减少。
        </h3>
      </div>
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
.Waterknowledge{
  width: 500px;
  height: 300px;
  background-color: #D6D6D6;;
  position: fixed;
}
.big{
color: red;
}
</style>
