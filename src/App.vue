<template>
  <div id="app">
    <div class="header">
      <div>Trans China</div>
      <el-button
        @click="$router.push({name: 'Train', params: $route.params})"
        class="header-right" type="primary" round size="mini" v-if="$route.name === 'Flight'">切换至火车票</el-button>
      <el-button
        @click="$router.push({name: 'Flight', params: $route.params})"
        class="header-right" type="primary" round size="mini" v-else>切换至机票</el-button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style>
  #app {
    width: 100vw;
    overflow-x: hidden;
  }
  .header {
    width: 100%;
    background: #409EFF;
    color: white;
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    display: flex;
    padding-right: 50px;
  }
  .header-right {
    margin-left: 30px;
  }
  .flex {
    display: flex;
  }
  .flex-sb {
    justify-content: space-between;
    align-items: center;
  }
</style>
