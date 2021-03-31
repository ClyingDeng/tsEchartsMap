<template>
  <div class="content">
    <div class="draw">
      <ul>
        <li @click="addPoint">画点</li>
        <li @click="addLine">画折线</li>
        <li @click="addPolygon">画多边形</li>
        <li @click="stop">停止绘制</li>
        <!-- <li @click="editor">编辑</li> -->
        <li @click="clear">全部清除</li>
        <li @click="lonLat">输出当前图形坐标</li>
      </ul>
    </div>

    <div class="mapContent">
      <GdMap></GdMap>
    </div>
    <div class="tip">
      <p>
        点击画点、线、面则可以在地图上添加覆盖物，双击则完成绘制。每绘制完一个图形，均会输出当前所画路径。
      </p>
      <p>如果绘制错误，可以右击鼠标，出现编辑当前选中图形，修改路径。</p>
      <p>点击输出路径，则会将当前页面所有图形路径输出。</p>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import GdMap from "../components/AMap.vue";

@Component({
  components: {
    GdMap,
  },
})
export default class Map extends Vue {
  private mouseTool: any;
  private overlays: any = [];
  private contextMenu: any;
  private target: any;
  private curpolyEditor: any;
  private addPoint() {
    if (this.map) {
      this.mouseTool.marker({ raiseOnDrag: true });
    } else {
      alert("地图未加载！");
    }
  }
  private addLine() {
    if (this.map) {
      this.mouseTool.polyline({
        strokeColor: "#3e55b4",
      });
    } else {
      alert("地图未加载！");
    }
  }
  private addPolygon() {
    this.mouseTool.polygon({
      fillColor: "#00b0ff",
      strokeColor: "#80d8ff",
      //同Polygon的Option设置
    });
  }
  private stop() {
    this.mouseTool.close(false); //关闭，保留覆盖物
  }
  private clear() {
    this.map.remove(this.overlays);
    this.overlays = [];
  }
  private editor() {
    this.overlays.forEach((lay: any) => {
      lay.on("click", this.getItem);
    });
  }
  // 点击覆盖物，触发编辑事件
  private getItem(e: any) {
    switch (e.target.type) {
      case "AMap.Marker":
        e.target.setDraggable(true);
        // console.log(e.target._position, e.target.getPosition());
        break;
      case "AMap.Overlay":
        this.ployEdit(e);
        break;
    }
  }
 
  private mounted() {
    this.$nextTick(() => {
      this.mouseTool = new this.$AMAP.MouseTool(this.map);
      let _this = this;
      this.contextMenu = new this.$AMAP.ContextMenu();

      this.contextMenu.addItem(
        "编辑",
        function(e: any) {
          console.log(_this.target.className);
          
          switch (_this.target.className) {
            case "AMap.Marker":
              _this.dragstart(_this.target);
              break;
            case "Overlay.Polyline":
              _this.editPolyStart(_this.target);
              break;
            case "Overlay.Polygon":
              _this.editPolyStart(_this.target);
              break;
          }
        },
        1
      );
      this.contextMenu.addItem(
        "停止编辑",
        function(e: any) {
          switch (_this.target.className) {
            case "AMap.Marker":
              _this.dragend(_this.target);
              break;
            case "Overlay.Polyline":
              _this.editPolyEnd(_this.target);
              break;
            case "Overlay.Polygon":
              _this.editPolyEnd(_this.target);
              break;
          }
          _this.target = null;
          _this.curpolyEditor = null;
        },
        1
      );
      this.mouseTool.on("draw", function(e: any) {
        let path;
        switch (e.obj.type) {
          case "AMap.Overlay":
            path = e.obj.getPath().map((item: any) => {
              return { lon: item.lng, lat: item.lat };
            });
            break;
          case "AMap.Marker":
            path = {
              lon: e.obj.getPosition().lng,
              lat: e.obj.getPosition().lat,
            };
            break;
        }
        console.log("路径:", path);
        _this.overlays.push(e.obj);
        // 绑定右键菜单
        _this.overlays.forEach((_: any) => {
          _.on("rightclick", function(e: any) {
            _this.mouseTool.close(false);
            _this.target = e.target;
            _this.contextMenu.open(_this.map, e.lnglat);
          });
        });
      });
    });
  }
  private dragstart(target: any) {
    target.setDraggable(true);
    this.contextMenu.close();
  }
  private dragend(target: any) {
    target.setDraggable(false);
    this.contextMenu.close();
  }
  private editPolyStart(target: any) {
    this.curpolyEditor = new this.$AMAP.PolyEditor(this.map, target);
    this.curpolyEditor.open();
    this.ployEdit(this.curpolyEditor);
    this.contextMenu.close();
  }
  private editPolyEnd(target: any) {
    // let polyEditor = new this.$AMAP.PolyEditor(this.map, target);
    this.curpolyEditor.close();
    this.contextMenu.close();
  }
   private ployEdit(polyEditor: any) {
    polyEditor.on("addnode", function(event: any) {
      // console.log("触发事件：addnode");
    });

    polyEditor.on("adjust", function(event: any) {
      // console.log("触发事件：adjust");
    });

    polyEditor.on("removenode", function(event: any) {
      // console.log("触发事件：removenode");
    });

    // let _this = this;
    polyEditor.on("end", function(event: any) {
      // console.log("触发事件： end", _this.overlays);
    });
    //   polyEditor.close();
  }
  private lonLat() {
    let paths: any = [];
    this.overlays.forEach((_: any) => {
      switch (_.type) {
        case "AMap.Overlay":
          let temp: any = {};
          temp.name = _.className;
          temp.path = _.getPath().map((item: any) => {
            return { lon: item.lng, lat: item.lat };
          });
          paths.push(temp);
          break;
        case "AMap.Marker":
          paths.push({
            lon: _.getPosition().lng,
            lat: _.getPosition().lat,
          });
          break;
      }
    });
    console.log(paths);
  }
}
</script>
<style lang="scss" scoped>
.draw {
  width: 100vw;
  height: 8vh;
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    list-style: none;
    li {
      // font-size: var(--font-size3);
      width: 6vw;
      height: 5vh;
      line-height: 5vh;
      text-align: center;
      margin: 0 20px;
      background-color: #008adf;
      color: #f1f1f1;
      cursor: pointer;
    }
    li:hover {
      background-color: #004570;
    }
  }
}
.tip {
  padding: 20px;
  font-size: 12px;
  color: #666;
}
.mapContent {
  width: 100vw;
  height: 70vh;
}
</style>
