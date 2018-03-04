<template>
  <div>
    <el-alert
      v-if="routes.msg"
      :title="routes.msg"
      type="error"
      center
      show-icon>
    </el-alert>
  <el-tabs type="border-card" v-if="routes.lab" v-model="labTab">
    <el-tab-pane v-for="(lab, key) in routes.lab" :label="lab" :key="lab" :name="key+''">
      <div v-for="vendor in routes.vendors[key]" :key="vendor.name" class="vendor">
        <div class="left">
        <div class="left1">
          <img v-if="vendor.logo" :src="vendor.logo" class="logo">
          <div v-else>
          <div class="name">{{vendor.name}}</div>
          <div class="company">{{vendor.cname}}</div>
          </div>
        </div>
          <div class="left2">
          <div class="label red">{{vendor.cabin}} {{vendor.cabinTypeName}}</div>
          <div v-for="label in vendor.labels" :key="label.id">
            <el-tooltip class="item" effect="dark" v-if="label.note && label.note.length"
                        :content="label.note[0]"
                        placement="top-start">
              <div class="label" >{{label.name}}</div>
            </el-tooltip>
            <div v-else class="label" >{{label.name}}</div>
          </div>
          </div>
        </div>
        <div class="price-block">
          <div class="price">
            <span class="insure" v-if="vendor.insurePrice">保险 <b class="blue">{{vendor.insurePrice}}</b> + </span>
            <span class="insure" v-if="vendor.fxPrice">税费 <b class="blue">{{vendor.fxPrice}}</b> + </span>
            <a class="price" :href="vendor.bookingUrl">{{vendor.price}}</a></div>
          <div class="discount" v-if="vendor.discount!=='0'">{{vendor.discount+'折'}}</div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  props: ['routes'],
  data () {
    return {
      labTab: '0'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vendor {
  padding: 10px;
  border-bottom: 1px #eeeeee solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.left2 {
  display: flex;
  flex-wrap: wrap;
}
  .name {
    font-size: 16px;
    line-height: 24px;
    color: #555555;
  }
  .company {
    font-size: 12px;
    padding-bottom: 2px;
    color: #888888;
  }
  .msg {
    border: #aaaaaa dashed 0.5px;
    margin: 10px;
    text-align: center;
    padding: 20px;
    color: #aaaaaa;
  }
  .logo {
    margin-top: -10px;
  }
  .label {
    margin-right: 5px;
    font-size: 12px;
    color: dodgerblue;
    cursor: pointer;
  }
  .red {
    color: red;
    cursor: default;
  }
  .price {
    font-size: 30px;
    line-height: 20px;
    color: dodgerblue;
    text-align: right;
  }
  .discount {
    color: #aaaaaa;
    font-size: 12px;
    text-align: right;
  }
  .blue {
    color: dodgerblue;
  }
  .insure {
    color: #9e9c98;
    font-size: 12px;
    font-size: 12px;
  }
  .left1 {
    width: 200px;
    min-width: 200px;
  }
</style>
