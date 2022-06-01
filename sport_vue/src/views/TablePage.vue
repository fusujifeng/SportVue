<template>
  <div>
    <el-button type="primary" style="margin:20px;" @click="exportExcelSelect">导出Excel</el-button>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column label="详细地址">
        <el-table-column
          prop="province"
          label="省份"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template>
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="表格保存预览" width="70%" :visible.sync="selectWindow" append-to-body>
      <el-table :data="selectData" id="selectTable" height="380px">
        <el-table-column
          prop="date"
          label="日期"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column label="详细地址">
          <el-table-column
            prop="province"
            label="省份"
          >
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
          >
          </el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exportExcel">确定保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import htmlToExcel from "@/utils/htmlToExcel";
export default {
  name: "ExcelPage",
  data(){
    return{
      tableData: [
        {
          date: '2016-05-03',
          name: '王小天',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小明',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小智',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小红',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小华',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小丽',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小花',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      selectData:[],
      selectWindow:false,
    }
  },
  methods:{
    exportExcel() {
      htmlToExcel.getExcel('#selectTable','导出的自定义标题')
    },
    exportExcelSelect(){
      if (this.selectData.length < 1){
        this.$message.error('请选择要导出的内容！');
        return false;
      }
      this.selectWindow = true;
    },
    handleSelectionChange(val) {
      this.selectData = val;
    }
  }
}
</script>

<style scoped>
</style>
