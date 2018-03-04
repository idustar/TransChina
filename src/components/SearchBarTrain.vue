<template>
  <div class="bar">
    <el-popover
      ref="popover1"
      v-model="showDep"
      title="选择出发城市"
      width="450"
      trigger="click"><city-list @setCity="setDep" v-if="showDep"></city-list></el-popover>
    <el-autocomplete
      v-model="depCity"
      popper-class="my-autocomplete"
      :fetch-suggestions="querySearch"
      placeholder="出发地"
      @select="handleSelect1"
    >
      <i slot="suffix" class="el-input__icon el-icon-menu" v-popover:popover1></i>
      <template slot-scope="props">
        <div class="name">{{ props.item.key }}</div>
        <span class="addr">{{ props.item.display }}</span>
      </template>
    </el-autocomplete>
    <!--<el-button type="text" icon="el-icon-menu" v-popover:popover1></el-button>-->
    <el-button round icon="el-icon-refresh" @click="changeArrAndDep()"></el-button>
    <el-popover
      ref="popover2"
      v-model="showArr"
      title="选择目的城市"
      width="450"
      trigger="click"><city-list @setCity="setArr" v-if="showArr"></city-list></el-popover>
    <el-autocomplete
      v-model="arrCity"
      popper-class="my-autocomplete"
      :fetch-suggestions="querySearch"
      placeholder="目的地"
      @select="handleSelect2"
    >
      <i slot="suffix" class="el-input__icon el-icon-menu" v-popover:popover2></i>
      <template slot-scope="props">
        <div class="name">{{ props.item.key }}</div>
        <span class="addr">{{ props.item.display }}</span>
      </template>
    </el-autocomplete>
    <!--<el-button type="text" icon="el-icon-menu" v-popover:popover2></el-button>-->
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
const CityList = resolve => { require(['./CityListTrain'], resolve) }
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
      depCity: '',
      arrCity: '',
      loading: false,
      hot: [
        {country: '中国', key: '北京', display: '北京(beijing)'},
        {country: '中国', key: '上海', display: '上海(shanghai)'},
        {country: '中国', key: '重庆', display: '重庆(chongqing)'},
        {country: '中国', key: '昆明', display: '昆明(kunming)'},
        {country: '中国', key: '杭州', display: '杭州(hangzhou)'},
        {country: '中国', key: '广州', display: '广州(guangzhou)'},
        {country: '中国', key: '无锡', display: '无锡(wuxi)'},
        {country: '中国', key: '常州', display: '常州(changzhou)'},
        {country: '中国', key: '南京', display: '南京(nanjing)'},
        {country: '中国', key: '天津', display: '天津(tianjin)'},
        {country: '中国', key: '长春', display: '长春(changchun)'},
        {country: '中国', key: '大连', display: '大连(dalian)'},
        {country: '中国', key: '贵阳', display: '贵阳(guiyang)'},
        {country: '中国', key: '深圳', display: '深圳(shenzhen)'}
      ],
      pickerOption: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 86400000 || time.getTime() >= Date.now() + 86400000 * 29
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
      this.depCity = this.$route.params.dep ? (this.$route.params.dep.split(','))[0] : ''
      this.arrCity = this.$route.params.arr ? (this.$route.params.arr.split(','))[0] : ''
      this.date = this.$route.params.date || ''
    },
    search () {
      const depCity = this.depCity
      const arrCity = this.arrCity
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
      this.$router.push(`/train/${depCity}/${arrCity}/${this.date}`)
    },
    changeArrAndDep () {
      let temp = this.arrCity
      this.arrCity = this.depCity
      this.depCity = temp
    },
    querySearch (queryString, cb) {
      if (queryString === '') {
        cb(this.hot)
        return
      }
      this.loading = true
      axios.get('http://dustark.cn:7001/ss?lang=zh&keyword=' + queryString)
        .then(response => {
          cb(response.data.result)
        }).catch(response => {
        })
    },
    setDep (city) {
      this.depCity = city
      this.showDep = false
    },
    setArr (city) {
      this.arrCity = city
      this.showArr = false
    },
    handleSelect1 (item) {
      this.setDep(item.key)
    },
    handleSelect2 (item) {
      this.setArr(item.key)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .bar {
    padding: 10px;
    .el-autocomplete{
      width:20%;
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
