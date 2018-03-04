<template>
  <div v-if="detail.status !== 'SUCCESS'" class="msg">{{detail.status}}</div>
  <div v-else>
    <el-alert
      :title="'本次列车发售: ' + detail.lang.join(', ')"
      type="success">
    </el-alert>
    <div class="company">时刻表</div>
    <div class="vendor">
      <div v-for="row in Math.ceil(detail.stationItemList.length / (col-2) / 2)" :key="row">
        <div class="row">
          <div :style="colstyle">
          <train-cell-right
            :grey="detail.stationItemList[(row-1)*(col-2)*2].type ===2 || detail.stationItemList[(row-1)*(col-2)*2].type ===3"
            :direction="row === 1 ? 'no-direction' : 'bottom-left'">
          </train-cell-right>
          </div>
          <div :style="colstyle" v-for="ce in (col - 2)" :key="ce">
            <train-cell v-if="(row-1)*(col-2)*2+ce-1<detail.stationItemList.length"
                        :reverse="false"
              :detail="detail.stationItemList[(row-1)*(col-2)*2+ce-1]"></train-cell>
          </div>
            <div :style="colstyle" v-if="(row-1)*(col-2)*2+col-2<detail.stationItemList.length">
          <train-cell-right
            :grey="detail.stationItemList[(row-1)*(col-2)*2+col-2].type ===2 || detail.stationItemList[(row-1)*(col-2)*2+col-2].type ===3"
            direction="top-right" class="ceil"></train-cell-right>
          </div>
        </div>
        <div class="row-reverse" v-if="(row-1)*(col-2)*2+col-2<detail.stationItemList.length">
          <div :style="colstyle">
            <train-cell-right
              :grey="detail.stationItemList[(row-1)*(col-2)*2+col-2].type ===2 || detail.stationItemList[(row-1)*(col-2)*2+col-2].type ===3"
              direction="bottom-right" class="ceil"></train-cell-right>
          </div>
          <div :style="colstyle" v-for="ce in (col - 2)" :key="ce">
          <train-cell v-if="(row-1)*(col-2)*2+col+ce-3<detail.stationItemList.length"
                      :reverse="true"
                      :detail="detail.stationItemList[(row-1)*(col-2)*2+col+ce-3]">

          </train-cell>
          </div>
          <div :style="colstyle" v-if="row*(col-2)*2<detail.stationItemList.length">
            <train-cell-right
              :grey="detail.stationItemList[row*(col-2)*2].type ===2 || detail.stationItemList[row*(col-2)*2].type ===3"
              direction="top-left" class="ceil"></train-cell-right>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrainCell from './TrainCell'
import TrainCellRight from './TrainCellRight'

export default {
  components: {
    TrainCellRight,
    TrainCell},
  props: ['detail'],
  data () {
    return {
      labTab: '0',
      col: 8,
      clientWidth: 600,
      colstyle: 'width: 12.5%'
    }
  },
  mounted () {
    this.clientWidth = document.documentElement.clientWidth
    const that = this
    if (that.clientWidth > 1000) {
      that.col = 8
      that.colstyle = 'width: 12.5%'
    } else if (that.clientWidth > 800) {
      that.col = 6
      that.colstyle = 'width: 16.6667%'
    } else if (that.clientWidth > 640) {
      that.col = 5
      that.colstyle = 'width: 20%'
    } else if (that.clientWidth < 640) {
      that.col = 4
      that.colstyle = 'width: 25%'
    }
    window.onresize = function temp () {
      that.clientWidth = document.documentElement.clientWidth
      if (that.clientWidth > 1000) {
        that.col = 8
        that.colstyle = 'width: 12.5%'
      } else if (that.clientWidth > 800) {
        that.col = 6
        that.colstyle = 'width: 16.6667%'
      } else if (that.clientWidth > 640) {
        that.col = 5
        that.colstyle = 'width: 20%'
      } else if (that.clientWidth < 640) {
        that.col = 4
        that.colstyle = 'width: 25%'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vendor {
  padding: 10px;
  border-bottom: 1px #eeeeee solid;
}
.row {
  display: flex;
  flex-direction: row;
}
.row-reverse {
  display: flex;
  flex-direction: row-reverse;
}
.ceil {
  width: 12.5%;
}
  .company {
    padding: 10px 0 0 10px;
    font-size: 12px;
    color: #888888;
  }
</style>
