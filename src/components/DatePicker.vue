<template>
  <div class="picker" v-if="month && month.length">
    <div class="header">
      <div><el-button size="mini" type="primary" plain @click="changeMonth(false)">之前</el-button></div>
      <div>{{new Date(month[0].depDate).getFullYear() + ' 年 ' + (new Date(month[0].depDate).getMonth()+1) + ' 月'}}</div>
      <div><el-button size="mini" type="primary" plain @click="changeMonth(true)">之后</el-button></div>
    </div>
    <div v-for="day in weeks" :key="day" class="part week">{{day}}</div>
    <div class="part" v-for="n in new Date(month[0].depDate).getDay()" :key="n"></div>
    <div v-for="(day, key) in month" :key="day.depDate" class="part day">
    <div class="day" :class="$route.params.date === day.depDate?'day-active':''"
         @click="dayTo(day)">
      <div class="date">{{key+1}}</div>
      <div class="price" v-if="day.price && day.price < 50000">{{day.price}}</div>
      <div class="price dark" v-else>无</div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      date: '',
      month: [],
      weeks: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  mounted () {
    console.log('changed')
    this.loadCalenders()
  },
  watch: {
    '$route' (to, from) {
      console.log('changed')
      this.loadCalenders()
    }
  },
  methods: {
    dayTo (day) {
      this.$emit('closeCalender')
      if (day.price && day.price < 50000) {
        this.$router.push(`/flight/${this.$route.params.dep}/${this.$route.params.arr}/${day.depDate}`)
      }
    },
    changeMonth (add) {
      let year = new Date(this.month[0].depDate).getFullYear()
      let month = new Date(this.month[0].depDate).getMonth() + 1
      if (add) {
        month += 1
      } else {
        month -= 1
      }
      if (month === 13) {
        month = 1
        year += 1
      }
      if (month === 0) {
        month = 12
        year -= 1
      }
      const date = `${year}-${month < 10 ? 0 : ''}${month}-01`
      this.loadCalenders(date)
    },
    loadCalenders (date = null) {
      let that = this
      this.month = []
      const depc = this.$route.params.dep ? this.$route.params.dep.split(',') : []
      const arrc = this.$route.params.arr ? this.$route.params.arr.split(',') : []
      depc.forEach(async dep => {
        await arrc.forEach(async arr => {
          await this.loadCalender(dep, arr, date || that.$route.params.date)
        })
      })
    },
    async loadCalender (departureCity = '无锡', arrivalCity = '贵阳', departureDate = '2018-03-17', month = 1) {
      let that = this
      await axios.get(`http://dustark.cn:7001/ca?dep=${departureCity}&arr=${arrivalCity}&dep_date=${departureDate}&adultCount=1&month_lp=${month}`)
        .then(function (response) {
          console.log(response)
          if (response.data.ret) {
            if (that.month.length) {
              for (let i = 0; i < that.month.length; i++) {
                if (that.month[i].price > response.data.data.banner[i].price) {
                  that.month[i].price = response.data.data.banner[i].price
                  that.month[i].direct = response.data.data.banner[i].direct
                }
              }
            } else {
              that.month = response.data.data.banner || []
            }
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .picker {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
  .part {
    width: 14.2857%;
  }
  .date {
    font-size: 13px;
  }
  .price {
    font-size: 20px;
    color: #409EFF;
  }
  .day {
    cursor: pointer;
    margin: 1px 0 1px 0;
    border-radius: 10px;
    padding: 2px 0 2px 0;
  }
  .day:hover {
    background: #f3f5fa;
  }

  .week {
    color: white;
    background: #409EFF;
    margin-bottom: 2px;
    padding: 5px 0 5px 0;
  }
  .dark {
    color: lightgray;
  }
  .header {
    background: #409EFF;
    padding: 0 10px 0 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
