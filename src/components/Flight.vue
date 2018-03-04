<template>
  <div class="hello">
    <el-popover
      ref="popover3"
      v-model="showCalender"
      placement="top-start"
      title="价格日历"
      width="400"
      trigger="click"><date-picker v-if="showCalender" @closeCalender="showCalender=false"></date-picker></el-popover>
    <search-bar></search-bar>
    <div v-if="Array.isArray(week)" class="week">
      <el-row>
        <el-col v-for="day in week" :key="day.depDate" :xs="6" :sm="3">
          <div class="day" :class="departureDate === day.depDate?'day-active':''" v-if="day.depDate"
               @click="$router.push(`/flight/${$route.params.dep}/${$route.params.arr}/${day.depDate}`)">
            <div class="date">{{day.depDate.substr(2)}} {{wk[new Date(day.depDate).getDay()]}}</div>
            <div class="price" v-if="day.price && day.price < 50000">{{day.price || '无航班'}}<span class="tax">{{day.direct?'':'/停'}}</span></div>
            <div class="price" v-else>无航班</div>
          </div>
        </el-col>
        <el-col :xs="6" :sm="3">
          <div class="day flex flex-sb">
            <i class="el-icon-arrow-left" @click="loadCalenders(week[0].depDate);"></i>
            <div v-popover:popover3>日历</div>
            <i class="el-icon-arrow-right" @click="loadCalenders(week[6].depDate);"></i>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="filter">
      <div class="part">{{this.flights ? this.flights.length : 0}}/{{this.data.total || 0}}</div>
      <div class="part" :class="sort===1?'part-active':''" @click="sortByPrice()">价格</div>
      <div class="part" :class="sort===2?'part-active':''" @click="sortByAirport()">机场</div>
      <div class="part" :class="sort===3?'part-active':''" @click="sortByTime()">时间</div>
      <div class="part" :class="sort===4?'part-active':''" @click="sortByCompany()">代码</div>
      <el-popover
        ref="popover1"
        placement="top-start"
        title="筛选"
        width="400"
        trigger="hover">
        <div class="title">航线</div>
        <el-checkbox-group
          @change="filter()"
          v-model="filters.airline"
        >
          <span v-for="(geo, key) in data.geographyInfo" :key="key">
            <span v-for="dep in geo.depCity.airportInfoList" :key="dep.airport">
              <span class="depend" v-for="arr in geo.arrCity.airportInfoList" :key="arr.airport">
              <el-checkbox :label="dep.airport+arr.airport" :key="dep.airport+'-'+arr.airport">{{dep.airport + '-' + arr.airport}}</el-checkbox>
              </span>
              </span>
          </span>
        </el-checkbox-group>
        <div class="title">航班类型</div>
        <el-checkbox-group
          @change="filter()"
          v-model="filters.type">
          <el-checkbox v-for="type in ['直达', '中转', '经停']" :label="type" :key="type">{{type}}</el-checkbox>
        </el-checkbox-group>
        <div class="title">餐食</div>
        <el-checkbox-group
          @change="filter()"
          v-model="filters.meal">
          <el-checkbox v-for="type in ['有餐食', '无餐食']" :label="type" :key="type">{{type}}</el-checkbox>
        </el-checkbox-group>
        <div class="title">航空公司</div>
        <el-checkbox-group
          @change="filter()"
          v-model="filters.company">
          <el-checkbox v-for="type in companies" :label="type" :key="type">{{type}}</el-checkbox>
        </el-checkbox-group>
        <el-button type="text" style="float:right" @click="flights = data ? data.flights : []">清除筛选</el-button>
      </el-popover>
      <div class="part" v-popover:popover1>筛选</div>

      <a v-if="data.flights && data.flights.length > 0 && data.flights[0].binfo" :href="`http://flights.ctrip.com/booking/${data.flights[0].binfo.depAirportCode}-${data.flights[0].binfo.arrAirportCode}-day-1.html?ddate1=${departureDate}`" class="part">携程</a>
      <a :href="`https://flight.qunar.com/site/oneway_list.htm?searchDepartureAirport=${departureCity[0] || '北京'}&searchArrivalAirport=${arrivalCity[0] || '上海'}&searchDepartureTime=${departureDate}`" class="part">qunar</a>
      <a v-if="data.flights && data.flights.length > 0 && data.flights[0].binfo" :href="`https://sjipiao.fliggy.com/flight_search_result.htm?depCity=${data.flights[0].binfo.depAirportCode}&arrCity=${data.flights[0].binfo.arrAirportCode}&depDate=${departureDate}`" class="part">飞猪</a>
      <a v-if="data.flights && data.flights.length > 0 && data.flights[0].binfo" :href="`https://flight.tuniu.com/domestic/list/${data.flights[0].binfo.depAirportCode}_${data.flights[0].binfo.arrAirportCode}_ST_1_0_0?deptDate=${departureDate}`" class="part">途牛</a>
      <a v-if="data.flights && data.flights.length > 0 && data.flights[0].binfo" :href="`http://flight.elong.com/search/${data.flights[0].binfo.depAirportCode}-${data.flights[0].binfo.arrAirportCode}/day${Math.floor((new Date(departureDate).valueOf() - new Date().valueOf()) / 86400000)}.html`" class="part">艺龙</a>
      <a v-if="data.flights && data.flights.length > 0 && data.flights[0].binfo" :href="`http://b2c.csair.com/B2C40/modules/bookingnew/main/flightSelectDirect.html?t=S&c1=${data.flights[0].binfo.depAirportCode}&c2=${data.flights[0].binfo.arrAirportCode}&d1=${departureDate}&at=1&ct=0&it=0`" class="part">南航</a>
      <a v-if="data.flights && data.flights.length > 0 && data.flights[0].binfo" :href="`http://www.ceair.com/booking/${data.flights[0].binfo.depAirportCode}-${data.flights[0].binfo.arrAirportCode}-${departureDate.substr(2).replace('-','').replace('-','')}_CNY.html`" class="part">东航</a>
      <a v-if="data.flights && data.flights.length > 0 && data.flights[0].binfo" :href="`https://flights.ch.com/${data.flights[0].binfo.depAirportCode}-${data.flights[0].binfo.arrAirportCode}.html?FDate=${departureDate}&SType=0&MType=0`" class="part">春秋</a>
    </div>
    <el-alert
      v-for="(recommend, key) in recommends"
      :key="key"
      @click.native="$router.push(`/flight/${recommend.dc}/${recommend.ac}/${recommend.dt}`)"
      :title="`从 ${recommend.dc} 到 ${recommend.ac} 只要 ￥${recommend.pr}（从 ${recommend.traindc} 到 ${recommend.trainac} 的火车票低达 ￥${recommend.trainpr}）`"
      type="info"
      show-icon>
    </el-alert>
    <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中"  element-loading-background="rgba(0, 0, 0, 0.8)">
      <div v-if="flights && flights.length" v-for="flight in flights" :key="flight.code">
        <flight-info :flight="flight" @click.native="loadDetail(flight)"></flight-info>
        <vendor v-if="flight.code === open" :routes="routes"></vendor>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const FlightInfo = resolve => { require(['./FlightInfo'], resolve) }
const DatePicker = resolve => { require(['./DatePicker'], resolve) }
const Vendor = resolve => { require(['./Vendor'], resolve) }
const SearchBar = resolve => { require(['./SearchBar'], resolve) }

export default {
  components: {
    Vendor,
    FlightInfo,
    SearchBar,
    DatePicker
  },
  data () {
    return {
      filters: {
        airline: [],
        type: ['直达', '中转', '经停'],
        meal: ['有餐食', '无餐食'],
        company: []
      },
      wk: ['日', '一', '二', '三', '四', '五', '六'],
      sort: 0,
      labTab: 0,
      showCalender: false,
      open: '',
      week: [],
      recommends: [],
      data: {},
      flights: [],
      companies: {},
      code: {},
      routes: {},
      departureCity: [],
      arrivalCity: [],
      departureDate: '',
      loading: false,
      loadingd: false
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
      if (!this.data || !this.data.flights) return
      const airlines = this.filters.airline.map(e => {
        return {
          dep: e.substr(0, 3),
          arr: e.substr(3, 3)
        }
      })
      const zhida = this.filters.type.some(e => e === '直达')
      const zhongzhuan = this.filters.type.some(e => e === '中转')
      const jingting = this.filters.type.some(e => e === '经停')
      const hasMeal = this.filters.meal.some(e => e === '有餐食')
      const noMeal = this.filters.meal.some(e => e === '无餐食')
      this.flights = this.data.flights.filter(e => {
        if (!airlines.some(f => (e.binfo ? e.binfo.depAirportCode : e.binfo1.depAirportCode) === f.dep &&
            (e.binfo ? e.binfo.arrAirportCode : e.binfo2.arrAirportCode) === f.arr)) {
          return false
        }
        if (!((zhongzhuan && e.binfo1) || (jingting && e.binfo && e.binfo.stops) || (zhida && e.binfo && !e.binfo.stops))) {
          return false
        }
        if (!((hasMeal && ((e.binfo && e.binfo.meal) || (e.binfo1 && e.binfo1.meal))) || (noMeal && ((e.binfo && !e.binfo.meal) || (e.binfo1 && !e.binfo1.meal))))) {
          return false
        }
        if (!((e.binfo && this.filters.company.some(f => f === e.binfo.name)) || (e.binfo1 && this.filters.company.some(f => f === e.binfo1.name || f === e.binfo2.name)))) {
          return false
        }
        return true
      })
    },
    sortByPrice () {
      if (this.sort === 1) {
        this.flights.reverse()
        return
      }
      this.sort = 1
      this.flights.sort((e, f) => e.minPrice > f.minPrice)
    },
    sortByAirport () {
      if (this.sort === 2) {
        this.flights.reverse()
        return
      }
      this.sort = 2
      this.flights.sort((e, f) => {
        const ei = e.binfo ? e.binfo : e.binfo1
        const fi = f.binfo ? f.binfo : f.binfo1
        return ei.depAirport === fi.depAirport ? ei.arrAirport > fi.arrAirport : ei.depAirport > fi.depAirport
      })
    },
    sortByTime () {
      if (this.sort === 3) {
        this.flights.reverse()
        return
      }
      this.sort = 3
      this.flights.sort((e, f) => (e.binfo ? e.binfo.depTime : e.binfo1.depTime) > (f.binfo ? f.binfo.depTime : f.binfo1.depTime))
    },
    sortByCompany () {
      if (this.sort === 4) {
        this.flights.reverse()
        return
      }
      this.sort = 4
      this.flights.sort((e, f) => e.code > f.code)
    },
    async search () {
      console.log('search')
      this.departureCity = this.$route.params.dep ? this.$route.params.dep.split(',') : []
      this.arrivalCity = this.$route.params.arr ? this.$route.params.arr.split(',') : []
      this.departureDate = this.$route.params.date
      this.data = {}
      this.flights = []
      this.companies = []
      this.recommends = []
      this.departureCity.forEach(async dep => {
        await this.arrivalCity.forEach(async arr => {
          await this.loadFlight(dep, arr, this.departureDate)
          await this.loadNearby(dep, arr, this.departureDate)
        })
      })
      await this.loadCalenders()
    },
    loadCalenders (date = null) {
      this.week = []
      this.departureCity.forEach(async dep => {
        await this.arrivalCity.forEach(async arr => {
          await this.loadCalender(dep, arr, date || this.departureDate)
        })
      })
    },
    loadDetail (flight, list = true) {
      this.labTab = 0
      this.routes = {}
      const code = flight.code
      this.loadingd = true
      let that = this
      if (that.open === code) {
        that.open = ''
      } else {
        that.open = code
        axios.get(`http://dustark.cn:7001/fd?departureCity=${flight.departureCity}&arrivalCity=${flight.arrivalCity}&departureDate=${that.departureDate}&code=${encodeURIComponent(code)}&type=list`)
          .then(function (response) {
            console.log(response)
            if (response.data.code === 0) {
              that.routes = response.data.data.routes[0]
            } else {
              that.routes = {msg: response.data.msg}
            }
            that.loadingd = false
          })
          .catch(function (response) {
            console.log(response)
          })
      }
    },
    loadNearby (departureCity = '无锡', arrivalCity = '贵阳', departureDate = '2018-03-17') {
      let that = this
      axios.get(`http://dustark.cn:7001/nearby?from=${departureCity}&to=${arrivalCity}&start_date=${departureDate}`)
        .then(function (response) {
          console.log(response)
          if (response.data.records && Array.isArray(response.data.records)) {
            that.recommends = that.recommends.concat(response.data.records)
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    async loadCalender (departureCity = '无锡', arrivalCity = '贵阳', departureDate = '2018-03-17', month = 0) {
      let that = this
      await axios.get(`http://dustark.cn:7001/ca?dep=${departureCity}&arr=${arrivalCity}&dep_date=${departureDate}&adultCount=1&month_lp=${month}`)
        .then(function (response) {
          console.log(response)
          if (response.data.ret) {
            if (that.week.length) {
              for (let i = 0; i < that.week.length; i++) {
                if (that.week[i].price > response.data.data.banner[i].price) {
                  that.week[i].price = response.data.data.banner[i].price
                  that.week[i].direct = response.data.data.banner[i].direct
                }
              }
            } else {
              that.week = response.data.data.banner || []
            }
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    async loadFlight (departureCity = '无锡', arrivalCity = '贵阳', departureDate = '2018-03-17') {
      this.loading = true
      let that = this
      await axios.get(`http://dustark.cn:7001/fl?departureCity=${departureCity}&arrivalCity=${arrivalCity}&departureDate=${departureDate}`)
        .then(function (response) {
          console.log(response)
          let data = response.data.data
          if (response.data.code === 0) {
            data.flights.forEach(e => {
              e.departureCity = departureCity
              e.arrivalCity = arrivalCity
              if (e.binfo && !that.companies.some(f => f === e.binfo.name)) {
                that.companies.push(e.binfo.name)
              }
              if (e.binfo1 && !that.companies.some(f => f === e.binfo1.name)) {
                that.companies.push(e.binfo1.name)
              }
              if (e.binfo2 && !that.companies.some(f => f === e.binfo2.name)) {
                that.companies.push(e.binfo2.name)
              }
            })
            if (that.data.total) {
              that.data.total += data.total
              that.data.flights = that.data.flights.concat(data.flights)
              that.flights = that.flights.concat(data.flights)
              that.data.geographyInfo.push(data.geographyInfo)
              if (that.data.min_flight.all.price > data.min_flight.all.price) {
                that.data.min_flight = data.min_flight
              }
            } else {
              data.geographyInfo = [data.geographyInfo]
              that.data = data
              that.flights = data.flights
            }
          }
          that.loading = false
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
    font-size: 14px;
    flex-wrap: wrap;
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
    height: 40px;
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
