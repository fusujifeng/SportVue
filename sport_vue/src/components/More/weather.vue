<template>
  <div class="nav-header-wrapper">
    <div id="he-plugin-standard"></div>
  </div>
</template>

<script>
export default {
  name: "weather",
  created() {
    window.WIDGET = {
      // "CONFIG": {
      //   "modules": "1204",
      //   "background": "5",
      //   "tmpColor": "FFFFFF",
      //   "tmpSize": "16",
      //   "cityColor": "FFFFFF",
      //   "citySize": "16",
      //   "aqiColor": "FFFFFF",
      //   "aqiSize": "16",
      //   "weatherIconSize": "26",
      //   "alertIconSize": "18",
      //   "padding": "10px 10px 10px 10px",
      //   "shadow": "0",
      //   "language": "auto",
      //   "fixed": "false",
      //   "vertical": "top",
      //   "horizontal": "left",
      //   "key": "f0ceb307717743c19c00a3ee1b4fb0f8"
      // }
      "CONFIG": {
        "layout": "1",
        "width": "450",
        "height": "150",
        "background": "1",
        "dataColor": "FFFFFF",
        "key": "34a625c8d9364ea5996d627020431c8e"
      }

    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src="https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
</script>

<style scoped>
.nav-header-wrapper {
  /*height: 90px;*/
  z-index: 99;
}
</style>


