<template>
  <div class="hello">
    <search-bar-train></search-bar-train>
    <div class="week" v-if="date">
    <el-row>
    <el-col v-for="key in [-3, -2, -1, 0, 1, 2, 3, 4]" :key="key" :xs="6" :sm="3" :md="3" :lg="3" :xl="3">
    <div class="day" :class="key===0?'day-active':''"
    @click="$router.push(`/train/${$route.params.dep}/${$route.params.arr}/20${getDateStr(key)[0]}`)">
      <div class="date">{{getDateStr(key).join(' ')}}</div>
    </div>
    </el-col>
    </el-row>
    </div>
    <div class="filter">
      <div class="part">{{this.trains.length}}/{{this.data ? this.data.length : 0}}</div>
      <div class="part" :class="sort===1?'part-active':''" @click="sortByDep()">出发</div>
      <div class="part" :class="sort===2?'part-active':''" @click="sortByArr()">到达</div>
      <div class="part" :class="sort===3?'part-active':''" @click="sortByTime()">耗时</div>
      <div class="part" :class="sort===4?'part-active':''" @click="sortByCode()">等级</div>
      <div class="part" :class="sort===5?'part-active':''" @click="sortByTicket()">余票</div>
    <el-popover
    ref="popover1"
    placement="top-start"
    title="筛选"
    width="400"
    trigger="hover">
    <div class="title">列车类别</div>
      <el-checkbox-group
        @change="filter()"
        v-model="filters.checi">
        <el-checkbox v-for="(type, key) in checi" :label="key" :key="key">{{type.t}}</el-checkbox>
      </el-checkbox-group>
      <div class="title">是否有票</div>
      <el-checkbox-group
        @change="filter()"
        v-model="filters.youpiao">
        <el-checkbox v-for="type in ['有票', '无票']" :label="type" :key="type">{{type}}</el-checkbox>
      </el-checkbox-group>
      <div class="title">出发车站</div>
      <el-checkbox-group
        @change="filter()"
        v-model="filters.stations.dep">
        <el-checkbox v-for="(type, key) in stations.dep" :label="type" :key="key">{{type}}</el-checkbox>
      </el-checkbox-group>
      <div class="title">到达车站</div>
      <el-checkbox-group
        @change="filter()"
        v-model="filters.stations.arr">
        <el-checkbox v-for="(type, key) in stations.arr" :label="type" :key="key">{{type}}</el-checkbox>
      </el-checkbox-group>
      <el-button type="text" style="float:right" @click="clearFilter()">清除筛选</el-button>
    </el-popover>
    <div class="part" v-popover:popover1>筛选</div>
      <a :href="ctrip" class="part">携程</a>
      <a :href="`https://train.qunar.com/stationToStation.htm?fromStation=${dep}&toStation=${arr}&date=${date}`" class="part">去哪儿</a>
      <a :href="`https://train.fliggy.com/stsSearch.htm?_input_charset=utf-8&depLocation=${dep}&depCity=&depDate=${date}&arrLocation=${arr}&arrCity=`" class="part">飞猪</a>
    </div>
    <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中"  element-loading-background="rgba(0, 0, 0, 0.8)">
      <div v-if="trains && trains.length" v-for="train in trains" :key="train.code">
        <train-info :train="train" @click.native="loadDetail(train)"></train-info>
        <vendor v-if="train.trainNo === open" :detail="detail"></vendor>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const TrainInfo = resolve => { require(['./TrainInfo'], resolve) }
const Vendor = resolve => { require(['./TrainVendor'], resolve) }
const SearchBarTrain = resolve => { require(['./SearchBarTrain'], resolve) }
export default {
  components: {
    Vendor,
    TrainInfo,
    SearchBarTrain
  },
  data () {
    return {
      filters: {
        checi: [0, 1, 2, 3],
        youpiao: ['有票', '无票'],
        stations: {
          dep: [],
          arr: []
        }
      },
      sort: 0,
      labTab: 0,
      showCalender: false,
      open: '',
      ctrip: '',
      detail: {},
      week: [],
      data: [],
      trains: {},
      checi: [{a: ['G', 'C'], t: '高铁/城际'}, {a: ['D'], t: '动车组'}, {a: ['Z', 'T'], t: '直/特'}, {a: ['K', 'P', 'Y'], t: '普通'}],
      dep: '',
      arr: '',
      date: '',
      stations: {
        dep: [],
        arr: []
      },
      loading: false,
      loadingd: false,
      trainToNum: {
        G: 1,
        D: 3,
        C: 2,
        Z: 4,
        T: 5,
        K: 6,
        Y: 7,
        P: 8
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.search()
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    filter () {
      console.log('filter', this.filters.stations.arr, this.stations.arr)
      const youpiao = this.filters.youpiao.some(e => e === '有票')
      const wupiao = this.filters.youpiao.some(e => e === '无票')
      this.trains = this.data.filter(e => {
        if (!this.filters.checi.some(f => this.checi[f].a.some(g => g === e.level))) {
          return false
        }
        if (!((youpiao && e.ticketCount > 0) || (wupiao && e.ticketCount <= 0))) {
          return false
        }
        if (!this.filters.stations.arr.some(f => f === e.arrStationName)) {
          return false
        }
        if (!this.filters.stations.dep.some(f => f === e.dptStationName)) {
          return false
        }
        return true
      })
    },
    clearFilter () {
      this.trains = this.data
      this.filters.checi = [0, 1, 2, 3]
      this.filters.youpiao = ['有票', '无票']
      this.filters.stations = this.stations
      this.filters.sz = ['始发', '终到', '均过站']
    },
    sortByTicket () {
      if (this.sort === 1) {
        this.trains.reverse()
        return
      }
      this.sort = 1
      this.trains.sort((e, f) => e.ticketCount < f.ticketCount)
    },
    sortByDep () {
      if (this.sort === 1) {
        this.trains.reverse()
        return
      }
      this.sort = 1
      this.trains.sort((e, f) => e.dptTime > f.dptTime)
    },
    sortByArr () {
      if (this.sort === 2) {
        this.trains.reverse()
        return
      }
      this.sort = 2
      this.trains.sort((e, f) => e.arrTime > f.arrTime)
    },
    sortByTime () {
      if (this.sort === 3) {
        this.trains.reverse()
        return
      }
      this.sort = 3
      this.trains.sort((e, f) => Number(e.lishiValue) > Number(f.lishiValue))
    },
    sortByCode () {
      if (this.sort === 4) {
        this.trains.reverse()
        return
      }
      this.sort = 4
      this.trains.sort((e, f) => this.trainToNum[e.level] > this.trainToNum[f.level])
    },
    search () {
      this.filters.sz = ['始发', '终到', '均过站']
      this.stations = {dep: [], arr: []}
      this.filters.youpiao = ['有票', '无票']
      this.filters.checi = [0, 1, 2, 3]
      this.dep = this.$route.params.dep ? this.$route.params.dep.split(',') : []
      this.arr = this.$route.params.arr ? this.$route.params.arr.split(',') : []
      this.date = this.$route.params.date
      this.data = []
      this.open = ''
      this.trains = []
      this.loadTrain(this.dep, this.arr, this.date)
      // this.loadCalenders()
    },
    getDateStr (AddDayCount) {
      let dd = new Date(this.date)
      dd.setDate(dd.getDate() + AddDayCount)
      let y = dd.getFullYear() % 100
      let m = dd.getMonth() + 1
      if (m < 10) m = '0' + m
      let d = dd.getDate()
      if (d < 10) d = '0' + d
      let day = '日一二三四五六'.charAt(dd.getDay())
      return [y + '-' + m + '-' + d, day]
    },
    loadDetail (train) {
      this.labTab = 0
      this.detail = {}
      this.loadingd = true
      let that = this
      if (that.open === train.trainNo) {
        that.open = ''
      } else {
        that.open = train.trainNo
        axios.get(`http://dustark.cn:7001/sd?dptStation=${train.dptStationName}&arrStation=${train.arrStationName}&date=${that.date}&trainNo=${train.trainNo}&user=neibu&needTimeDetail=true`)
          .then(function (response) {
            console.log(response)
            if (response.data.errcode === 0) {
              that.detail = response.data.data
              that.detail.lang = []
              for (let x in that.detail.s2sBean.seats) {
                that.detail.lang.push(x + ' (￥' + that.detail.s2sBean.seats[x].price + ')')
              }
              let level = 0
              that.detail.stationItemList.forEach(e => {
                if (level === 0 && e.stationName === train.dptStationName) {
                  level = 2
                  e.type = 1
                } else if (level === 2 && e.stationName === train.arrStationName) {
                  level = 4
                  e.type = 3
                } else {
                  e.type = level
                }
              })
            }
            that.loadingd = false
            console.log(that.detail.stationItemList)
          })
          .catch(function (response) {
            console.log(response)
          })
      }
    },
    loadTrain (dep = '无锡', arr = '贵阳', date = '2018-03-17') {
      this.loading = true
      let that = this
      axios.get(`http://dustark.cn:7001/chcp?dptStation=${dep}&arrStation=${arr}&date=${date}&user=neibu&start=1&num=500`)
        .then(function (response) {
          console.log(response)
          let data = response.data.data
          if (response.data.errcode === 0) {
            data.s2sBeanList.forEach(e => {
              e.level = e.trainNo[0]
              e.ticketCount = 0
              for (let x in e.seats) e.ticketCount += (e.seats[x].count || 0)
              if (e.level >= '0' && e.level <= '9') e.level = 'P'
              if (!that.stations.dep.some(f => f === e.dptStationName)) that.stations.dep.push(e.dptStationName)
              if (!that.stations.arr.some(f => f === e.arrStationName)) that.stations.arr.push(e.arrStationName)
            })
            that.ctrip = `http://trains.ctrip.com/TrainBooking/${data.dptCityFullPy}-${data.arrCityFullPy}/#day=${Math.floor((new Date(data.dptDate).valueOf() - new Date().valueOf()) / 86400000)}`
            that.data = data.s2sBeanList
            that.trains = that.data
          }
          that.loading = false
          that.filters.stations = {...that.stations}
        })
        .catch(function (response) {
          console.log(response)
          that.loading = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .week {
    background: dodgerblue;
    margin: 0;
  }
  .filter {
    background: dodgerblue;
    padding: 10px;
    color: white;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
  }
  .part {
    margin: 2px 20px 2px 0;
    cursor: pointer;
  }
  .part:hover {
    color: #eeeeee;
  }
  .part-active {
    color: #43ff7d;
  }
  .part-active:hover {
    color: #c2ffc1;
  }
  .day {
    background: white;
    overflow: hidden;
    height: 15px;
    border-radius: 30px;
    margin: 5px;
    padding: 5px;
    text-align: center;
    cursor: pointer;
    color: black;
  }
  .day > i {
    width: 30px;
  }
  .day:hover {
    background: #eaffff;
  }
  .day-active {
    background: #333333;
    color: white;
  }
  .day-active:hover {
    background: #666666;
  }
  .date {
    font-size: 13px;
  }
  .price {
    font-size: 20px;
    color: dodgerblue;
  }
  .tax {
    font-size: 12px;
  }
  .notfound {
    margin-top: 100px;
    text-align: center;
    color: dodgerblue;
  }
  .depend {
    padding-right: 20px;
  }
  .title {
    font-size: 12px;
    margin-top: 10px;
    width: 100%;
    border-bottom: dashed 1px grey;
    margin-bottom: 10px;
    padding-bottom: 5px;
  }
</style>
