<template>
  <div class="bar">
    <el-popover
      ref="popover1"
      v-model="showDep"
      title="选择出发城市"
      width="400"
      trigger="click"><city-list @setCity="setDep" v-if="showDep"></city-list></el-popover>
    <el-select
      class="select"
      popper-class="my-autocomplete"
      v-model="depCity"
      multiple
      filterable
      remote
      :multiple-limit="4"
      default-first-option
      placeholder="出发地"
      :remote-method="querySearch"
      :loading="loading">
      <el-option
        v-for="item in query"
        :key="item.display"
        :label="item.key"
        :value="item.key">
        <div class="name">{{ item.display }}</div>
        <span class="addr">{{ item.key }}, {{ item.country }}</span>
      </el-option>
    </el-select>
    <el-button type="text" icon="el-icon-menu" v-popover:popover1></el-button>
    <el-button round icon="el-icon-refresh" @click="changeArrAndDep()" style="margin-right: 10px"></el-button>
    <el-popover
      ref="popover2"
      v-model="showArr"
      title="选择目的城市"
      width="400"
      trigger="click"><city-list @setCity="setArr" v-if="showArr"></city-list></el-popover>
    <el-select
      class="select"
      popper-class="my-autocomplete"
      v-model="arrCity"
      multiple
      filterable
      remote
      :multiple-limit="4"
      default-first-option
      placeholder="目的地"
      :remote-method="querySearch"
      :loading="loading">
      <el-option
        v-for="item in query"
        :key="item.display"
        :label="item.key"
        :value="item.key">
        <div class="name">{{ item.display }}</div>
        <span class="addr">{{ item.key }}, {{ item.country }}</span>
      </el-option>
    </el-select>
    <el-button type="text" icon="el-icon-menu" v-popover:popover2></el-button>
    <span class="right">&nbsp;&nbsp;
    <el-date-picker
      class="picker"
      v-model="date"
      type="date"
      value-format="yyyy-MM-dd"
      popper-class="calender"
      :picker-options="pickerOption"
      placeholder="选择旅行时间">
    </el-date-picker>
      </span>
    <el-button type="primary" round icon="el-icon-search" @click="search()"></el-button>

  </div>
</template>

<script>
import axios from 'axios'
const CityList = resolve => { require(['./CityList'], resolve) }
export default {
  components: {
    CityList
  },
  data () {
    return {
      showDep: false,
      showArr: false,
      activeName: '',
      query: [],
      date: '',
      depCity: [],
      arrCity: [],
      loading: false,
      hot: [
        {country: '中国', key: '北京', display: '北京首都国际机场'},
        {country: '中国', key: '上海', display: '上海虹桥/浦东国际机场'},
        {country: '中国', key: '重庆', display: '重庆江北国际机场'},
        {country: '中国', key: '昆明', display: '昆明长水国际机场'},
        {country: '中国', key: '杭州', display: '杭州萧山国际机场'},
        {country: '中国', key: '广州', display: '广州白云国际机场'},
        {country: '中国', key: '无锡', display: '无锡苏南硕放机场'},
        {country: '中国', key: '常州', display: '常州奔牛国际机场'},
        {country: '中国', key: '南京', display: '南京禄口国际机场'},
        {country: '中国', key: '天津', display: '天津滨海国际机场'},
        {country: '中国', key: '长春', display: '长春龙嘉国际机场'},
        {country: '中国', key: '大连', display: '大连周水子国际机场'},
        {country: '中国', key: '贵阳', display: '贵阳龙洞堡机场'},
        {country: '中国', key: '深圳', display: '深圳宝安国际机场'}
      ],
      pickerOption: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 86400000
        }
      }
    }
  },
  mounted () {
    this.getInfo()
  },
  watch: {
    '$route' (to, from) {
      this.getInfo()
    }
  },
  methods: {
    getInfo () {
      this.depCity = this.$route.params.dep ? this.$route.params.dep.split(',') : []
      this.arrCity = this.$route.params.arr ? this.$route.params.arr.split(',') : []
      this.date = this.$route.params.date || ''
    },
    search () {
      const depCity = this.depCity.join(',')
      const arrCity = this.arrCity.join(',')
      if (!depCity) {
        this.$notify.error({
          title: '参数错误',
          message: '请输入出发城市'
        })
        return
      }
      if (!arrCity) {
        this.$notify.error({
          title: '参数错误',
          message: '请输入目的城市'
        })
        return
      }
      if (!this.date) {
        this.$notify.error({
          title: '参数错误',
          message: '请输入旅行时间'
        })
        return
      }
      this.$router.push(`/flight/${depCity}/${arrCity}/${this.date}`)
    },
    changeArrAndDep () {
      let temp = this.arrCity
      this.arrCity = this.depCity
      this.depCity = temp
    },
    querySearch (queryString) {
      this.loading = true
      let that = this
      axios.get('http://dustark.cn:7001/s?lang=zh&q=' + queryString)
        .then(response => {
          if (response.data && Array.isArray(response.data.result)) {
            that.query = response.data.result
            if (!that.query.length) that.query = that.hot
          } else {
            that.query = that.hot
          }
          that.loading = false
        }).catch(response => {
        })
    },
    setDep (city) {
      this.showDep = false
      if (!city) {
        this.depCity = []
        return
      }
      if (this.depCity.length > 3) return
      this.depCity.push(city)
    },
    setArr (city) {
      this.showArr = false
      if (!city) {
        this.arrCity = []
        return
      }
      if (this.arrCity.length > 3) return
      this.arrCity.push(city)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .bar {
    padding: 10px;
    .el-select {
      width:25%;
      margin-bottom: 3px;
    }
  }
.my-autocomplete {
  li {
    height: 60px;
    line-height: normal;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 15px;
    }
    .addr {
      font-size: 12px;
      line-height: 12px;
      color: #b4b4b4;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
  .name {
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 15px;
    padding-top: 10px;
  }
  .addr {
    font-size: 12px;
    line-height: 12px;
    color: #b4b4b4;
  }
  .calender {
  }
  .right {
    margin-bottom: 3px;
  }
}
</style>
