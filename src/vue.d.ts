import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    $echarts: any;
    $AMAP: any;
    map: any;
  }
}
