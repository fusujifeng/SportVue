

<template>
  <div>
  <div id="mapDiv">
    高德地图
    <h3>{{address}}</h3>

    //地图容器
    <div id="container">

    </div>
  </div>
  </div>


</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import store from "@/store/store";
export default {
  name: "baiduMap",
  data(){
    return{
      map:null,
    }
  },
  store,
  computed:{
    address(){
      return this.$store.getters.address
    }
  },
  created() {
    this.getLocation()
  },
  mounted(){
    //DOM初始化完成进行地图初始化
    this.initMap();
  },
  methods:{
    //精准定位
    getLocation(){
      const self=this;
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,

        })

        geolocation.getCurrentPosition(function(status,result){
          if(status=='complete'){
            onComplete(result)
          }else{
            onError(result)
          }
        });

        function onComplete (data) {
          // data是具体的定位信息
          console.log("地图信息",data)
            self.$store.dispatch("setLocation",data);
          self.$store.dispatch("setAddress",data.formattedAddress);


        }

        function onError (data) {
          // 定位出错
          self.getLngLatLocation()
        }
      })
    },

    //定位失败执行非精准地位弥补
    getLngLatLocation(){
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log(result);
            console.log("定位GG")


            //逆向地址编码
            AMap.plugin('AMap.Geocoder', function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })

              var lnglat = result.rectangle.split(";"[0].split(","));

              geocoder.getAddress(lnglat, function(status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data)
                }
              })
            })
          }
        })
      })
    },
    initMap(){
      AMapLoader.load({
        key:"f9e9e104f567862581144ead3982ca99",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        this.map = new AMap.Map("container",{  //设置地图容器id
          viewMode:"3D",    //是否为3D地图模式
          zoom:18,           //初始化地图级别
          center:[117.107613, 39.067192], //初始化地图中心点位置

        });
      }).catch(e=>{
        console.log(e);
      })
    },
  }
}

</script>


<style  scoped>
#container{
  padding:0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>
