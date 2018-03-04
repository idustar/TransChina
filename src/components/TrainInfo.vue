<template>
  <div v-if="train" class="train">
    <el-row>
          <el-col :xs="4" :sm="5" :md="6" :lg="7" :xl="8">
            <div class="flex">
              <div class="train-img hidden-xs-only" :style="'background:'+trainToChar[train.level][1]">
                {{trainToChar[train.level][0]}}
              </div>
              <div class="l2">
              <div class="train-name">{{train.trainNo}}</div>
              <div class="train-plane">经停<i class="el-icon-caret-bottom"></i></div>
              </div>
            </div>

          </el-col>
          <el-col :xs="20" :sm="19" :md="18" :lg="17" :xl="16" class="flex flex-st">
            <div class="flex">
              <div class="timeair">
                <div class="time tright hidden-xs-only">{{train.dptTime}}</div>
                <div class="time1 tright hidden-sm-and-up">{{train.dptTime}}</div>
                <div class="airport tright">
                  <span v-if="train.extraBeanMap.deptStationInfo">
                      <el-tag class="minitag hidden-xs-only" type="success" size="mini">始</el-tag>
                    <span class="hidden-sm-and-up success">始</span>
                    </span>
                  <b>{{train.dptStationName}}</b>
                </div>
              </div>
              <div class="timeairm">
                <div class="tcenter">
                  <el-tag size="mini">{{Math.floor(train.lishiValue/60)||''}}{{train.lishiValue>=60?'时':''}}<br v-if="train.lishiValue>=60">{{train.lishiValue%60+'分'}}</el-tag>
                </div>
              </div>
              <div class="timeair">
                <el-badge :value="train.dayDifference!=='0'?'+'+train.dayDifference:''" class="item">
                  <div class="time tleft hidden-xs-only">{{train.arrTime}}</div>
                  <div class="time1 tleft hidden-sm-and-up">{{train.arrTime}}</div>
                </el-badge>
                <div class="airport tleft"><b>{{train.arrStationName}}</b>
                  <span v-if="train.extraBeanMap.arriStationInfo">
                      <el-tag class="minitag hidden-xs-only" type="danger" size="mini">终</el-tag>
                    <span class="hidden-sm-and-up danger">终</span>
                    </span>
                  </div>
              </div>
            </div>
        <div class="flex flex-right">
        <div class="seat" v-for="(seat, key) in train.seats" :key="key">
          <div class="seat-name">
            {{key}}
          </div>
          <div class="price hidden-xs-only">
            {{Math.floor(seat.price)}}<span class="p5" v-if="seat.price-Math.floor(seat.price)">.5</span>
          </div>
          <div class="price1 hidden-sm-and-up">
            {{Math.floor(seat.price)}}<span class="p5" v-if="seat.price-Math.floor(seat.price)">.5</span>
          </div>
          <div class="remain success" v-if="seat.count>=100">充足</div>
          <div class="remain danger" v-else-if="seat.count===0">已售完</div>
          <div class="remain danger" v-else-if="seat.count===-1">不可售</div>
          <div class="remain" v-else>余{{seat.count}}张</div>
        </div>
        <div class="tip" v-if="train.extraBeanMap.sale==='0'">
          {{train.extraBeanMap.startSaleTime.substr(5, 5)}}<br/>{{train.extraBeanMap.startSaleTime.substr(11)}}<br/>开售
        </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  props: ['train'],
  data () {
    return {
      data: {},
      trainToChar: {
        G: ['高', '#6dc6ff'],
        D: ['动', '#9effe5'],
        C: ['城', '#ddb3ff'],
        Z: ['直', '#ee5d6b'],
        T: ['特', '#ee8b50'],
        K: ['快', '#eedd6f'],
        Y: ['游', '#9d88ee'],
        P: ['普', '#aeee62']
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .train {
    white-space: nowrap;
    border-bottom: 1px solid #d7d7d7;
    padding: 15px 0px 15px 10px;
    cursor: pointer;
  }

  .train:hover {
    background: #e6f5ff;
    box-shadow: 0 0 2px 2px rgba(0, 121, 255, 0.2);
  }

  .train-img {
    font-size: 30px;
    background: dodgerblue;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 25px;
    text-align: center;
    line-height: 40px;
    padding: 5px;
    margin-top: -5px;
    margin-right: 10px;
  }

  .train-name {
    font-size: 18px;
    color: #787a7b;
    line-height: 25px;
    overflow-x: hidden;
  }

  .flex {
    display: flex;
  }

  .l2 {
    color: dodgerblue;
    line-height: 20px;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .time1 {
    color: #666666;
    font-size: 20px;
    line-height: 20px;
    margin-top: 5px;
  }

  .airport {
    color: #999999;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  }
  .minitag {
    margin-left: 3px;
    margin-right: 3px;
  }
  .stop {
    color: dodgerblue;
    font-size: 12px;
    line-height: 15px;
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
    min-width: 50px;
  }

  .timeairm {
    margin-top: 5px;
    min-width: 50px;
  }

  .price {
    color: dodgerblue;
    font-size: 25px;
    line-height: 25px;
    padding-left: 2px;
    padding-right: 2px;
  }
  .price1 {
    color: dodgerblue;
    font-size: 16px;
    line-height: 20px;
  }
  .seat {
    margin-top: 5px;
    padding-left: 8px;
    padding-right: 8px;
    text-align: center;
  }
  .seat-name {
    font-size: 12px;
    line-height: 16px;
    color: #aaaaaa;
    text-align: center;
  }
  .remain {
    font-size: 12px;
  }
  .success {
    color: #1cd275;
  }
  .danger {
    color: #ff472c;
  }
  .p5 {
    font-size: 10px;
    line-height: 5px;
  }
  .tip {
    white-space: normal;
    font-size: 12px;
    color: grey;
    text-align: center;
    padding-top: 10px;
    min-width: 50px;
  }
  .flex-right {
    flex-direction: row-reverse;
    flex-wrap: wrap;
    margin-top: -10px;
  }
  .flex-st {
    justify-content: space-between;
  }
  .el-col .seat:not(:last-child){border-left: dashed 1px #aaaaaa;}
</style>
