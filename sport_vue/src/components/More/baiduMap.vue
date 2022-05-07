<template>
  <div>
    <div class="baidumap" id="allmap"></div>
    <weather/>
  </div>
</template>


<script>
import weather from "@/components/More/weather";
export default {
  components: {
weather
  },
  mounted() {
    this.baiduMap()

    var myCity = new BMapGL.LocalCity();
    myCity.get(myFun);
  },
  methods: {
    baiduMap() {
      // let map = new BMap.Map('allmap');
      // let point = new BMap.Point(115.043096, 38.592132) //创建点坐标


      var map = new BMapGL.Map("allmap");    // 创建Map实例
      var point= new BMapGL.Point(116.280190, 40.049191);




      map.centerAndZoom("天津市", 18) //初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
      map.addControl(new BMap.NavigationControl()) //地图控柄
      map.addControl(new BMap.ScaleControl()) //实际距离显示
      map.addControl(new BMap.OverviewMapControl())
      // map.setMapStyle({ style: 'midnight' }) //地图主题
      let marker = new window.BMap.Marker(point); //创建柱标
      map.addOverlay(marker) //将标注添加到地图中
      //提示信息
      var infoWindow = new BMap.InfoWindow('提示信息')
      // 鼠标移上标注点要发生的事
      marker.addEventListener('mouseover', function() {
        this.openInfoWindow(infoWindow)
      })
      // 鼠标移开标注点要发生的事
      marker.addEventListener('mouseout', function() {
        this.closeInfoWindow(infoWindow)
      })
      console.log(marker)
    },



  }
}
</script>

<style >
.baidumap {
  width: 1000px;
  height: 500px;
  border: 1px solid red;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

/* 删除百度地图版权字 与 百度logo */
.baidumap>.BMap_cpyCtrl {
  display: none !important;
}

.baidumap>.anchorBL {
  display: none !important;
}
</style>
