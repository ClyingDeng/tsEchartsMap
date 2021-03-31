<template>
  <div id="map"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class GdMap extends Vue {
  init() {
    let map = new this.$AMAP.Map("map", {
      viewMode: "2D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
      zoom: 12, //初始化地图层级 值越大显示越清晰
      center: [121.21875, 31.7603], //初始化地图中心点
    });
    map.plugin(
      ["AMap.MouseTool", "AMap.PolyEditor"],
      function() {
        // var mouseTool = new _this.$AMAP.MouseTool(map);
        //使用鼠标工具，在地图上画标记点
        // mouseTool.marker();
      }
    );
    Vue.prototype.map = map;

    //  this.$AMAP.plugin("AMap.MouseTool", function() {
    //     //异步加载插件
    //     var toolbar = new _this.$AMAP.MouseTool();
    //    map.addControl(toolbar);
    //   });
  }
  created() {
    this.$nextTick(() => {
      this.init();
    });
  }
}
</script>
<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
