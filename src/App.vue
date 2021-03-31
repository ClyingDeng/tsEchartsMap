<template>
  <div id="app">
    <div class="nav">
      <HeadNav></HeadNav>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeadNav from "@/components/HeadNav.vue";

@Component({
  components: {
    HeadNav,
  },
})
export default class App extends Vue {
  private mounted() {
     let res = [{
        id: "201907",
        personLiable: "邹周(res)",
        time: "16:39"
      },{
        id: "201908",
        personLiable: "邹周(res)",
        time: "16:39"
      },{
        id: "201908",
        personLiable: "邹周(res)",
        time: "16:39"
      }
    ]
      res.reduce((t: any, c: { personLiable: string; }, i: number, arr: object[]) => {
        c.personLiable = c.personLiable.substring(0, c.personLiable.lastIndexOf('('));
        return arr;
        // tslint:disable-next-line: whitespace
      }, []);
  }
}
</script>

<style lang="scss">
//滚动条轨道
::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 0;
  height: 20px;
}
//滚动条内的小方块
::-webkit-scrollbar-thumb {
  background: linear-gradient(#b6e6ff, #409eff);
  border-radius: 5px;
  height: 10px;
}
::-webkit-scrollbar {
  width: 0px;
  height: 10px;
}
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .nav {
    height: 70px;
    width: 100%;
  }
  .main {
    width: 100vw;
    height: calc(100vh - 70px);
    overflow: scroll;
    // overflow: hidden;
    // background-color: red;
  }
}
</style>
