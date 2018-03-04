<template>
      <div class="ceil">
        <div class="ceil-header">
          <div class="clock" v-if="!reverse">{{detail.arriveTime=== '始发站' ? '始发' : detail.arriveTime}}</div>
          <div class="clock" v-else>{{detail.startTime[0] === '终' ? '终到' : detail.startTime}}</div>
          <div :class="(detail.type === 0 || detail.type === 4)?'gc':''">
            <div class="station" v-if="detail.stationName.length===2">{{detail.stationName}}</div>
            <div class="station station3" v-else-if="detail.stationName.length===3">{{detail.stationName}}</div>
            <div class="station station4" v-else>
              {{detail.stationName.substr(0, 2)}}<br>{{detail.stationName.substr(2)}}
            </div>
          </div>
          <div class="clock" v-if="reverse">{{detail.arriveTime=== '始发站' ? '始发' : detail.arriveTime}}</div>
          <div class="clock" v-else>{{detail.startTime[0] === '终' ? '终到' : detail.startTime}}</div>
        </div>
        <div class="line">
          <div class="train-line train-line-left"
               :class="(((!reverse && (detail.type <= 1 || detail.type > 3)) || (reverse && (detail.type < 1 || detail.type >= 3)))?'grey ':'') + (((detail.arriveTime=== '始发站' && !reverse) || (detail.startTime[0] === '终' && reverse))?'transparent':'')"></div>

          <div class="train-point-o">
            <div class="train-up"
                 :class="((detail.type === 0 || detail.type === 4)?'grey ':'') + (detail.stationName.length>=4?'transparent':'')"></div>
            <div class="train-point" :class="(detail.type === 0 || detail.type === 4)?'grey':''"></div>
          </div>
          <div class="train-line train-line-right"
               :class="(((reverse && (detail.type <= 1 || detail.type > 3)) || (!reverse && (detail.type < 1 || detail.type >= 3)))?'grey ':'') + ((detail.startTime[0] === '终' && !reverse)?'transparent':'')"></div>
        </div>

        <div class="ceil-footer">
          <div class="spend" :class="(detail.type === 0 || detail.type === 4)?'gc':''">
            {{detail.overTime?(detail.overTime+'分钟'):''}}
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: ['detail', 'akey', 'reverse']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ceil {
    width: 100%;
    height: 80px;
    overflow: hidden;
    color: dodgerblue;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ceil-header {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: end;
    padding-top: 5px;
  }
  .line {
    height: 10px;
    display: flex;
  }
  .train-line {
    width: 50%;
    height: 10px;
    background: dodgerblue;
  }
  .train-line:hover {
    background: #2a77ff;
  }
  .train-point-o {
    margin-top: -10px;
    height: 20px;
    margin-left: -10px;
    margin-right: 0px;
    width: 10px;
    z-index: 5;
    cursor: pointer;
  }
  .train-point {
    background: white;
    height: 10px;
    width: 10px;
    border: 5px solid dodgerblue;
    border-radius: 15px;
  }
  .train-point:hover {
    border: 7px solid dodgerblue;
    margin-top: -2px;
    margin-left: -2px;
  }
  .train-up {
    height: 5px;
    width: 2px;
    margin-left: 9px;
    background: dodgerblue;
  }
  .ceil-footer {
    height: 35px;
  }
  .clock {
    width: 30px;
    font-size: 14px;
    color: #aaaaaa;
    padding: 0 3px 0 3px;
    letter-spacing:-1px;
  }
  .station {
    text-align: center;
    line-height: 20px;
    font-size: 20px;
    border-bottom: 1px solid dodgerblue;
    background: white;
    z-index: 100;
  }
  .station3 {
    font-size: 16px;
  }
  .station4 {
    margin-top: -3px;
    line-height: 14px;
    font-size: 14px;
  }
  .spend {
    text-align: center;
    font-size: 12px;
    color: dodgerblue;
    line-height: 30px;
  }
  .grey{
    background: #aaaaaa;
    border-color: #aaaaaa;
  }
  .grey:hover {
    background: #777777;
    border-color: #777777;
  }
  .gc {
    color: #666666;
  }
  .gc > div {
    border-bottom: 1px solid #aaaaaa;
  }
  .transparent {
    background: transparent;
  }
  .transparent:hover {
    background: transparent;
  }

</style>
