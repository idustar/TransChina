<template>
  <el-row>
    <el-col :xs="6" :sm="11" :md="11" :lg="12" :xl="12">
      <div class="flex">
        <img class="flight-img hidden-xs-only"
             :src="`https://simg1.qunarzz.com/site/images/airlines/${flight.shortCarrier}.gif`">
        <div>
          <div class="flex">
            <div class="flight-name hidden-sm-and-up">{{flight.shortName.substr(0, 2)}}</div>
            <div class="flight-name hidden-xs-only">{{flight.name}}</div>
            <el-tag size="mini" type="danger">{{flight.airCode}}</el-tag>
          </div>
          <div class="l2 flex">
            <div class="flight-plane">{{flight.planeFullType}}</div>
            <el-tooltip class="item" effect="dark"
                        :content="`实际乘坐 ${flight.mainCarrierFullName} ${flight.mainCarrier}`"
                        placement="top-start">
              <div class="l2-item" v-if="flight.codeShare"><i class="el-icon-share"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="flight.mealDesc" placement="top-start">
              <div class="l2-item" v-if="flight.meal">餐食</div>
            </el-tooltip>
            <div class="l2-item" v-if="flight.isInter">国际</div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="18" :sm="13" :md="13" :lg="12" :xl="12">
      <div class="flex">
        <div class="timeair">
          <div class="time tright hidden-xs-only">{{flight.depTime}}</div>
          <div class="time1 tright hidden-sm-and-up">{{flight.depTime}}</div>
          <div class="airport tright"><b>{{flight.depAirport}}</b><br class="hidden-sm-and-up"/> {{flight.depTerminal}}
          </div>
        </div>
        <div class="timeairm hidden-xs-only">
          <div class="tcenter">
            <el-tag size="mini">{{flight.flightTime}}</el-tag>
          </div>
          <el-tooltip v-if="flight.stops" class="item" effect="dark"
                      :content="'经停 ' + flight.stopAirports.join(',')" placement="top-start">
            <div class="stop">经停 {{flight.stopCitys.join(',')}}</div>
          </el-tooltip>
        </div>
        <div class="timeairm1 hidden-sm-and-up">
          <div class="tcenter">
            <el-tag size="mini">{{parseInt(flight.flightTime, 10)}}h</el-tag>
          </div>
          <el-tooltip v-if="flight.stops" class="item" effect="dark"
                      :content="'经停 ' + flight.stopAirports.join(',')" placement="top-start">
            <div class="stop">经停<br/>{{flight.stopCitys.join(',')}}</div>
          </el-tooltip>
        </div>
        <div class="timeair">
          <el-badge :value="flight.crossDay?'+'+flight.crossDay:''" class="item">
            <div class="time tleft hidden-xs-only">{{flight.arrTime}}</div>
            <div class="time1 tleft hidden-sm-and-up">{{flight.arrTime}}</div>
          </el-badge>
          <div class="airport tleft"><b>{{flight.arrAirport}}</b> <br class="hidden-sm-and-up"/>{{flight.depTerminal}}
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ['flight'],
  data() {
    return {
      data: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .flight-img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .flight-name {
    color: #ff0000;
    line-height: 20px;
    margin-right: 5px;
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
    margin-bottom: 3px;
    font-size: 30px;
    line-height: 30px;
  }

  .time1 {
    color: #666666;
    font-size: 20px;
    line-height: 20px;
  }

  .airport {
    color: #999999;
    font-size: 12px;
    line-height: 12px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
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
    min-width: 100px;
  }

  .timeairm {
    margin-top: 5px;
    min-width: 100px;
  }

  .timeairm1 {
    margin-top: -3px;
    min-width: 40px;
  }

  .stop {
    color: dodgerblue;
    margin-top: 3px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
  }

  .price {
    color: dodgerblue;
    font-size: 30px;
    line-height: 30px;
  }
</style>
