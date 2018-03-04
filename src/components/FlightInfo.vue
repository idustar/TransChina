<template>
  <div v-if="flight" class="flight">
    <el-row>
      <el-col :xs="19" :sm="18" :md="17" :lg="16" :xl="16">
      <plane v-if="flight.binfo" :flight="flight.binfo"></plane>
        <plane v-if="flight.binfo1" :flight="flight.binfo1"></plane>
        <plane v-if="flight.binfo2" style="margin-top: 10px" :flight="flight.binfo2"></plane>
      </el-col>
      <el-col :xs="5" :sm="6" :md="7" :lg="8" :xl="8">
        <div class="price tright">{{flight.minPrice}}</div>
        <div class="airport tright">{{flight.discountStr}}
          <span v-if="flight.binfo && flight.binfo.piaoShao" class="stop">{{flight.binfo.piaoShaoDesc}}</span>
        <span v-if="flight.priceLabel" v-for="label in flight.priceLabel" :key="label.id" class="stop">{{label.name}}</span>
  </div>
        <div class="stop tright" v-if="flight.transTime">{{flight.transCity}}中转</div>
        <div class="stop tright" v-if="flight.transTime">{{flight.transTime}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Plane from './Plane'

export default {
  components: {Plane},
  props: ['flight'],
  data () {
    return {
      data: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .flight {
    border-bottom: 1px solid #d7d7d7;
    padding: 15px;
    cursor: pointer;
  }

  .flight:hover {
    background: #e6f5ff;
    box-shadow: 0 0 2px 2px rgba(0, 121, 255, 0.2);
  }

  .flight-img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }

  .flight-name {
    color: #ff0000;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  }

  .flex {
    display: flex;
  }

  .l2 {
    margin-top: 5px;
    margin-left: 40px;
    color: grey;
    line-height: 15px;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  }

  .l2-item {
    margin-left: 5px;
    color: dodgerblue;
  }

  .time {
    color: #666666;
    font-size: 30px;
    line-height: 30px;
  }
  .airport {
    color: #999999;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  }
  .stop {
    color: dodgerblue;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
  }

  .tleft {
    text-align: left;
  }

  .tright {
    text-align: right;
  }

  .tcenter {
    text-align: center;
  }

  .timeair {
    width: 150px;
  }

  .timeairm {
    margin-top: 5px;
    min-width: 100px;
  }

  .price {
    color: dodgerblue;
    font-size: 30px;
    line-height: 30px;
  }
</style>
