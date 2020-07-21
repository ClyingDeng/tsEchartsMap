<template>
  <div class="nav">
    <div class="menu">
      <div class="rightMenu">
        <ul>
          <li>
            <router-link to="/" exact>单图</router-link>
          </li>
          <li>
            <router-link to="/double" exact>双环</router-link>
          </li>
          <li>
            <router-link to="/map" exact>地图引用</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headnav"
};
</script>

<style lang="scss" scoped>
.nav {
  height: 100%;
  width: 100vw;
  background-color: #383b55;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .menu {
    .rightMenu {
      flex: 1;
      // height: 70px;
      display: flex;
      justify-content: flex-end;
      // background-color: #f0f;
      ul {
        margin: 0;
        list-style: none;
        // line-height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: #0ff;
        li {
          flex: 1;
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: #272a3f;
          margin: 0 20px;
          a {
            display: block;
            width: 100px;
            height: 40px;
            color: #b8baca;
            text-decoration: none;
            border-radius: 4px;
          }
        }
      }
      .router-link-active {
        background-color: #62aaef;
        color: #f1f1f1;
      }
    }
  }
}
</style>
