<!--<template>-->
<!--  <div>-->

<!--    <div id="control">-->
<!--      <el-button type="warning" round @click="cleanImg">清除图片</el-button>-->
<!--    </div>-->

<!--    <div id="wrapper">-->
<!--      <h1>请上传文件</h1>-->
<!--      <div class="upload-btn common mb_10" v-if="!isShow">-->
<!--        <label>-->
<!--          <input type="file" @change="uploadImg">-->
<!--        </label>-->
<!--      </div>-->
<!--      <div class="img-list-item common mb_10" v-if="isShow" width="200px" height="200px">-->
<!--        <img :src="src" class="common" >-->
<!--        <i class="del-img" @click="forkImage"></i>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      src: '',-->
<!--      isShow: false,-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    uploadImg(e) {-->
<!--      let _this = this;-->
<!--      let files = e.target.files[0];-->
<!--      if (!e || !window.FileReader) return; // 看支持不支持FileReader-->
<!--      let reader = new FileReader();-->
<!--      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里-->
<!--      reader.onloadend = function () {-->
<!--        _this.src = this.result;-->
<!--        _this.isShow = true;-->
<!--      }-->
<!--    },-->

<!--    forkImage() {-->
<!--      this.src = '';-->
<!--      this.isShow = false;-->
<!--    },-->

<!--    cleanImg(){-->
<!--      this.isShow=false;-->
<!--    }-->
<!--  }-->


<!--}-->

<!--</script>-->

<!--<style scoped>-->
<!--.common {-->
<!--  /*height:500px;*/-->
<!--  /*width: 100%;*/-->
<!--  border: 1px solid #d8d8d9;-->
<!--}-->

<!--.img-list-item {-->
<!--  position: relative;-->
<!--  margin: auto;-->
<!--}-->

<!--.img-list-item img {-->
<!--  box-sizing: border-box;-->
<!--  vertical-align: middle;-->
<!--  border: 0;-->
<!--}-->

<!--.img-list-item i.del-img {-->
<!--  width: 50px;-->
<!--  height: 50px;-->
<!--  display: inline-block;-->
<!--  background: rgba(0, 0, 0, .6);-->
<!--  /*background-image: url(../assets/white-close.png);*/-->
<!--  background-size: 10px;-->
<!--  background-repeat: no-repeat;-->
<!--  background-position: 50%;-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  right: 0;-->
<!--}-->

<!--.upload-btn {-->
<!--  background: url('../../../public/assets/img/upload-btn-add.png') no-repeat  ;-->
<!--  width: 500px;-->
<!--  height:500px;-->
<!--  margin: auto;-->
<!--}-->

<!--input[type="file"] {-->
<!--  color: transparent;-->
<!--  opacity: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->

<!--#wrapper:after {-->
<!--  content: ".";-->
<!--  display: block;-->
<!--  height: 0;-->
<!--  clear: both;-->
<!--  visibility: hidden;-->
<!--}-->

<!--.mb_10 {-->
<!--  margin-bottom: 10px;-->
<!--}-->
<!--</style>-->


<template>
  <div>
  <div id="control">-->
    <el-button type="warning" round @click="cleanImg">清除图片</el-button>
  </div>

  <div class="menu-img">
    <input type="file" accept="image/*" @change="showImg()" ref="img">
    <div class="img-wrap" v-if="imgUpload.imgShow">
      <img :src="imgUpload.imgSrc" alt="">
      <i class="el-icon-refresh menu-refresh" @click="changeImg()"></i>
    </div>
    <div class="mi-tips">
      点击添加图片
      <p>（建议尺寸1280*1024，支持上传图片格式有jpg、jpeg、png、gif、webp）</p>
    </div>
  </div>
  </div>
</template>


<script>

export default {
  data () {
    return {
      imgUpload: {
        imgShow: false,
        imgSrc: null
      }
    }
  },
  methods: {
    showImg () {
      var that = this
      if ((this.$refs.img.files[0].size / 1024 / 1024) > 5) {
        //组件库弹窗提示
        this.$message({
          message: '文件大小不得超过5M,请重新上传',
          type: 'warning'
        })
        //清空input选择的文件，方便重新选择
        this.$refs.img.value = ''
      } else {
        var f = new FileReader()
        f.readAsDataURL(this.$refs.img.files[0])
        f.onload = function () {
          that.imgUpload.imgSrc = f.result
        }
        //显示img
        that.imgUpload.imgShow = true
      }
    },
    changeImg () {
      //触犯input框的点击
      this.$refs.img.dispatchEvent(new MouseEvent('click'))
    },
    cleanImg(){
      this.$set(this.imgUpload,'imgShow',true)
    }
  }
}
</script>


<style lang="less">
.menu-img{
position:relative;width:690px;height:390px;
margin:100px;
//background: #eee url("../../../assets/add.png") no-repeat center 140px;
input{
width: 100%;
height: 100%;
opacity: 0;
}
textarea{color: #000;}
}
.mi-tips{
position: absolute;
top: 225px;
width: 100%;
text-align: center;
text-align: center;color: #999;font-size: 15px;line-height: 20px;
}
p{
font-size: 13px;
}

.img-wrap{
width: 100%;height:100%;
position: absolute;
top: 0;left: 0;
z-index: 4;
&:hover{
.menu-refresh{
display: block;
}
}
}
img{
width: 600px;
height: auto;
z-index: 4;
}
.menu-refresh{
position: absolute;top:10px;right:10px;
font-size: 25px;
font-weight: bold;
display: none;
z-index: 4;
}

</style>
