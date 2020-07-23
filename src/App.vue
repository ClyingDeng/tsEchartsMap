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
export default class App extends Vue {}
</script>

<style lang="scss">
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
    overflow: hidden;
    // background-color: red;
  }
}
</style>
