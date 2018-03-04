<template>
  <div class="hello">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="热门">
        <div class="alpha">
          <div class="alphal">热</div>
          <div class="alphar">
          <span class="city" v-for="city in hotcity.cityList" :key="city.name" @click="$emit('setCity', city.name)">{{city.name}}</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-for="card in cities" :label="card.name" :key="card.name" :name="card.name">
        <div class="alpha" v-for="alpha in card.cityList" :key="alpha.char">
          <div class="alphal">{{alpha.char}}</div>
          <div class="alphar">
            <span class="city" v-for="city in alpha.list" :key="city.name" @click="$emit('setCity', city.name)">{{city.name}}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button @click="$emit('setCity', null)" style="float: right" size="mini">清空所选</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '',
      hotcity: {
        cityList: [{name: '上海', country: '中国', code: 'SHA'}, {
          name: '北京',
          country: '中国',
          code: 'BJS'
        }, {name: '广州', country: '中国', code: 'CAN'}, {name: '昆明', country: '中国', code: 'KMG'}, {
          name: '西安',
          country: '中国',
          code: 'SIA'
        }, {name: '成都', country: '中国', code: 'CTU'}, {name: '深圳', country: '中国', code: 'SZX'}, {
          name: '厦门',
          country: '中国',
          code: 'XMN'
        }, {name: '乌鲁木齐', country: '中国', code: 'URC'}, {name: '南京', country: '中国', code: 'NKG'}, {
          name: '重庆',
          country: '中国',
          code: 'CKG'
        }, {name: '杭州', country: '中国', code: 'HGH'}, {name: '大连', country: '中国', code: 'DLC'}, {
          name: '长沙',
          country: '中国',
          code: 'CSX'
        }, {name: '海口', country: '中国', code: 'HAK'}, {name: '哈尔滨', country: '中国', code: 'HRB'}, {
          name: '青岛',
          country: '中国',
          code: 'TAO'
        }, {name: '沈阳', country: '中国', code: 'SHE'}, {name: '三亚', country: '中国', code: 'SYX'}, {
          name: '济南',
          country: '中国',
          code: 'TNA'
        }, {name: '武汉', country: '中国', code: 'WUH'}, {name: '郑州', country: '中国', code: 'CGO'}, {
          name: '贵阳',
          country: '中国',
          code: 'KWE'
        }, {name: '南宁', country: '中国', code: 'NNG'}, {name: '福州', country: '中国', code: 'FOC'}, {
          name: '天津',
          country: '中国',
          code: 'TSN'
        }, {name: '长春', country: '中国', code: 'CGQ'}, {name: '太原', country: '中国', code: 'TYN'}, {
          name: '南昌',
          country: '中国',
          code: 'KHN'
        }, {name: '丽江', country: '中国', code: 'LJG'}],
        title: '热门城市',
        desc: '可直接输入中文名/拼音/英文名/三字码'
      },
      cities: [{
        name: 'A-E',
        charSort: !0,
        cityList: [{
          char: 'A',
          list: [{name: '阿里', country: '中国', code: 'NGQ'}, {name: '阿尔山', country: '中国', code: 'YIE'}, {
            name: '安庆',
            country: '中国',
            code: 'AQG'
          }, {name: '阿勒泰', country: '中国', code: 'AAT'}, {name: '安康', country: '中国', code: 'AKA'}, {
            name: '鞍山',
            country: '中国',
            code: 'AOG'
          }, {name: '安顺', country: '中国', code: 'AVA'}, {name: '阿克苏', country: '中国', code: 'AKU'}, {
            name: '阿拉善左旗',
            country: '中国',
            code: 'AXF'
          }, {name: '阿拉善右旗', country: '中国', code: 'RHT'}]
        }, {
          char: 'B',
          list: [{name: '包头', country: '中国', code: 'BAV'}, {name: '北海', country: '中国', code: 'BHY'}, {
            name: '北京',
            country: '中国',
            code: 'BJS'
          }, {name: '百色', country: '中国', code: 'AEB'}, {name: '保山', country: '中国', code: 'BSD'}, {
            name: '博乐',
            country: '中国',
            code: 'BPL'
          }, {name: '毕节', country: '中国', code: 'BFJ'}, {name: '巴彦淖尔', country: '中国', code: 'RLK'}]
        }, {
          char: 'C',
          list: [{name: '长治', country: '中国', code: 'CSX'}, {name: '池州', country: '中国', code: 'JUH'}, {
            name: '长春',
            country: '中国',
            code: 'CGQ'
          }, {name: '常州', country: '中国', code: 'CZX'}, {name: '昌都', country: '中国', code: 'BPX'}, {
            name: '朝阳',
            country: '中国',
            code: 'CHG'
          }, {name: '常德', country: '中国', code: 'CGD'}, {name: '长白山', country: '中国', code: 'NBS'}, {
            name: '成都',
            country: '中国',
            code: 'CTU'
          }, {name: '重庆', country: '中国', code: 'CKG'}, {name: '长沙', country: '中国', code: 'CSX'}, {
            name: '赤峰',
            country: '中国',
            code: 'CIF'
          }]
        }, {
          char: 'D',
          list: [{name: '大同', country: '中国', code: 'DAT'}, {name: '大连', country: '中国', code: 'DLC'}, {
            name: '东营',
            country: '中国',
            code: 'DOY'
          }, {name: '大庆', country: '中国', code: 'DQA'}, {name: '丹东', country: '中国', code: 'DDG'}, {
            name: '大理',
            country: '中国',
            code: 'DLU'
          }, {name: '敦煌', country: '中国', code: 'DNH'}, {name: '达州', country: '中国', code: 'DAX'}, {
            name: '稻城',
            country: '中国',
            code: 'DCY'
          }]
        }, {
          char: 'E',
          list: [{name: '恩施', country: '中国', code: 'ENH'}, {name: '鄂尔多斯', country: '中国', code: 'DSN'}, {
            name: '二连浩特',
            country: '中国',
            code: 'ERL'
          }, {name: '额济纳旗', country: '中国', code: 'EJN'}]
        }],
        title: '拼音A-E城市',
        desc: '可直接输入中文名/拼音/英文名/三字码'
      }, {
        name: 'F-J',
        charSort: !0,
        cityList: [{
          char: 'F',
          list: [{name: '佛山', country: '中国', code: 'FUO'}, {name: '福州', country: '中国', code: 'FOC'}, {
            name: '阜阳',
            country: '中国',
            code: 'FUG'
          }, {name: '抚远', country: '中国', code: 'FYJ'}]
        }, {
          char: 'G',
          list: [{name: '贵阳', country: '中国', code: 'KWE'}, {name: '桂林', country: '中国', code: 'KWL'}, {
            name: '广州',
            country: '中国',
            code: 'CAN'
          }, {name: '广元', country: '中国', code: 'GYS'}, {name: '格尔木', country: '中国', code: 'GOQ'}, {
            name: '赣州',
            country: '中国',
            code: 'KOW'
          }, {name: '固原', country: '中国', code: 'GYU'}]
        }, {
          char: 'H',
          list: [{name: '哈密', country: '中国', code: 'HMI'}, {name: '呼和浩特', country: '中国', code: 'HET'}, {
            name: '黑河',
            country: '中国',
            code: 'HEK'
          }, {name: '海拉尔', country: '中国', code: 'HLD'}, {name: '哈尔滨', country: '中国', code: 'HRB'}, {
            name: '海口',
            country: '中国',
            code: 'HAK'
          }, {name: '黄山', country: '中国', code: 'TXN'}, {name: '杭州', country: '中国', code: 'HGH'}, {
            name: '邯郸',
            country: '中国',
            code: 'HDG'
          }, {name: '合肥', country: '中国', code: 'HFE'}, {name: '黄龙', country: '中国', code: 'JZH'}, {
            name: '汉中',
            country: '中国',
            code: 'HZG'
          }, {name: '和田', country: '中国', code: 'HTN'}, {name: '淮安', country: '中国', code: 'HIA'}]
        }, {
          char: 'J',
          list: [{name: '鸡西', country: '中国', code: 'JXA'}, {name: '晋江', country: '中国', code: 'JJN'}, {
            name: '锦州',
            country: '中国',
            code: 'JNZ'
          }, {name: '景德镇', country: '中国', code: 'JDZ'}, {name: '嘉峪关', country: '中国', code: 'JGN'}, {
            name: '井冈山',
            country: '中国',
            code: 'JGS'
          }, {name: '济宁', country: '中国', code: 'JNG'}, {name: '九江', country: '中国', code: 'JIU'}, {
            name: '佳木斯',
            country: '中国',
            code: 'JMU'
          }, {name: '济南', country: '中国', code: 'TNA'}, {name: '加格达奇', country: '中国', code: 'JGD'}, {
            name: '金昌',
            country: '中国',
            code: 'JIC'
          }, {name: '揭阳', country: '中国', code: 'SWA'}]
        }],
        title: '拼音F-J城市',
        desc: '可直接输入中文名/拼音/英文名/三字码'
      }, {
        name: 'K-P',
        charSort: !0,
        cityList: [{
          char: 'K',
          list: [{name: '喀什', country: '中国', code: 'KHG'}, {name: '昆明', country: '中国', code: 'KMG'}, {
            name: '康定',
            country: '中国',
            code: 'KGT'
          }, {name: '克拉玛依', country: '中国', code: 'KRY'}, {name: '库尔勒', country: '中国', code: 'KRL'}, {
            name: '库车',
            country: '中国',
            code: 'KCA'
          }, {name: '喀纳斯', country: '中国', code: 'KJI'}, {name: '凯里', country: '中国', code: 'KJH'}]
        }, {
          char: 'L',
          list: [{name: '兰州', country: '中国', code: 'LHW'}, {name: '洛阳', country: '中国', code: 'LYA'}, {
            name: '丽江',
            country: '中国',
            code: 'LJG'
          }, {name: '荔波', country: '中国', code: 'LLB'}, {name: '林芝', country: '中国', code: 'LZY'}, {
            name: '柳州',
            country: '中国',
            code: 'LZH'
          }, {name: '泸州', country: '中国', code: 'LZO'}, {name: '连云港', country: '中国', code: 'LYG'}, {
            name: '黎平',
            country: '中国',
            code: 'HZH'
          }, {name: '连城', country: '中国', code: 'LCX'}, {name: '拉萨', country: '中国', code: 'LXA'}, {
            name: '临沧',
            country: '中国',
            code: 'LNJ'
          }, {name: '临沂', country: '中国', code: 'LYI'}, {name: '吕梁', country: '中国', code: 'LLV'}]
        }, {
          char: 'M',
          list: [{name: '芒市', country: '中国', code: 'LUM'}, {name: '牡丹江', country: '中国', code: 'MDG'}, {
            name: '满洲里',
            country: '中国',
            code: 'NZH'
          }, {name: '绵阳', country: '中国', code: 'MIG'}, {name: '梅县', country: '中国', code: 'MXZ'}, {
            name: '漠河',
            country: '中国',
            code: 'OHE'
          }, {name: '遵义(茅台)', country: '中国', code: 'WMT'}]
        }, {
          char: 'N',
          list: [{name: '南京', country: '中国', code: 'NKG'}, {name: '南充', country: '中国', code: 'NAO'}, {
            name: '南宁',
            country: '中国',
            code: 'NNG'
          }, {name: '南阳', country: '中国', code: 'NNY'}, {name: '南通', country: '中国', code: 'NTG'}, {
            name: '南昌',
            country: '中国',
            code: 'KHN'
          }, {name: '那拉提', country: '中国', code: 'NLT'}, {name: '宁波', country: '中国', code: 'NGB'}]
        }, {
          char: 'P',
          list: [{name: '攀枝花', country: '中国', code: 'PZI'}, {name: '普洱', country: '中国', code: 'SYM'}]
        }],
        title: '拼音K-P城市',
        desc: '可直接输入中文名/拼音/英文名/三字码'
      }, {
        name: 'Q-W',
        charSort: !0,
        cityList: [{
          char: 'Q',
          list: [{name: '衢州', country: '中国', code: 'JUZ'}, {name: '黔江', country: '中国', code: 'JIQ'}, {
            name: '秦皇岛',
            country: '中国',
            code: 'SHP'
          }, {name: '庆阳', country: '中国', code: 'IQN'}, {name: '且末', country: '中国', code: 'IQM'}, {
            name: '齐齐哈尔',
            country: '中国',
            code: 'NDG'
          }, {name: '青岛', country: '中国', code: 'TAO'}]
        }, {char: 'R', list: [{name: '日喀则', country: '中国', code: 'RKZ'}]}, {
          char: 'S',
          list: [{name: '深圳', country: '中国', code: 'SZX'}, {name: '石家庄', country: '中国', code: 'SJW'}, {
            name: '三亚',
            country: '中国',
            code: 'SYX'
          }, {name: '沈阳', country: '中国', code: 'SHE'}, {name: '上海', country: '中国', code: 'SHA'}, {
            name: '神农架',
            country: '中国',
            code: 'HPG'
          }]
        }, {
          char: 'T',
          list: [{name: '唐山', country: '中国', code: 'TVS'}, {name: '铜仁', country: '中国', code: 'TEN'}, {
            name: '塔城',
            country: '中国',
            code: 'TCG'
          }, {name: '腾冲', country: '中国', code: 'TCZ'}, {name: '台州', country: '中国', code: 'HYN'}, {
            name: '天水',
            country: '中国',
            code: 'THQ'
          }, {name: '天津', country: '中国', code: 'TSN'}, {name: '通辽', country: '中国', code: 'TGO'}, {
            name: '吐鲁番',
            country: '中国',
            code: 'TLQ'
          }, {name: '太原', country: '中国', code: 'TYN'}, {name: '泰州', country: '中国', code: 'YTY'}]
        }, {
          char: 'W',
          list: [{name: '威海', country: '中国', code: 'WEH'}, {name: '武汉', country: '中国', code: 'WUH'}, {
            name: '梧州',
            country: '中国',
            code: 'WUZ'
          }, {name: '文山', country: '中国', code: 'WNH'}, {name: '无锡', country: '中国', code: 'WUX'}, {
            name: '潍坊',
            country: '中国',
            code: 'WEF'
          }, {name: '武夷山', country: '中国', code: 'WUS'}, {name: '乌兰浩特', country: '中国', code: 'HLH'}, {
            name: '温州',
            country: '中国',
            code: 'WNZ'
          }, {name: '乌鲁木齐', country: '中国', code: 'URC'}, {name: '万州', country: '中国', code: 'WXN'}, {
            name: '乌海',
            country: '中国',
            code: 'WUA'
          }]
        }],
        title: '拼音Q-W城市',
        desc: '可直接输入中文名/拼音/英文名/三字码'
      }, {
        name: 'XYZ',
        charSort: !0,
        cityList: [{
          char: 'X',
          list: [{name: '兴义', country: '中国', code: 'ACX'}, {name: '西昌', country: '中国', code: 'XIC'}, {
            name: '厦门',
            country: '中国',
            code: 'XMN'
          }, {name: '香格里拉', country: '中国', code: 'DIG'}, {name: '西安', country: '中国', code: 'SIA'}, {
            name: '西宁',
            country: '中国',
            code: 'XNN'
          }, {name: '襄阳(中国)', country: '中国', code: 'XFN'}, {name: '锡林浩特', country: '中国', code: 'XIL'}, {
            name: '西双版纳',
            country: '中国',
            code: 'JHG'
          }, {name: '徐州', country: '中国', code: 'XUZ'}]
        }, {
          char: 'Y',
          list: [{name: '义乌', country: '中国', code: 'YIW'}, {name: '永州', country: '中国', code: 'LLF'}, {
            name: '榆林',
            country: '中国',
            code: 'UYN'
          }, {name: '扬州', country: '中国', code: 'YTY'}, {name: '延安', country: '中国', code: 'ENY'}, {
            name: '运城',
            country: '中国',
            code: 'YCU'
          }, {name: '烟台', country: '中国', code: 'YNT'}, {name: '银川', country: '中国', code: 'INC'}, {
            name: '宜昌',
            country: '中国',
            code: 'YIH'
          }, {name: '宜宾', country: '中国', code: 'YBP'}, {name: '宜春', country: '中国', code: 'YIC'}, {
            name: '盐城',
            country: '中国',
            code: 'YNZ'
          }, {name: '延吉', country: '中国', code: 'YNJ'}, {name: '玉树', country: '中国', code: 'YUS'}, {
            name: '伊宁',
            country: '中国',
            code: 'YIN'
          }, {name: '伊春', country: '中国', code: 'LDS'}]
        }, {
          char: 'Z',
          list: [{name: '珠海', country: '中国', code: 'ZUH'}, {name: '昭通', country: '中国', code: 'ZAT'}, {
            name: '张家界',
            country: '中国',
            code: 'DYG'
          }, {name: '舟山', country: '中国', code: 'HSN'}, {name: '郑州', country: '中国', code: 'CGO'}, {
            name: '中卫',
            country: '中国',
            code: 'ZHY'
          }, {name: '芷江', country: '中国', code: 'HJJ'}, {name: '湛江', country: '中国', code: 'ZHA'}, {
            name: '遵义(新舟)',
            country: '中国',
            code: 'ZYI'
          }, {name: '遵义(茅台)', country: '中国', code: 'WMT'}, {name: '张掖', country: '中国', code: 'YZY'}, {
            name: '张家口',
            country: '中国',
            code: 'ZQZ'
          }]
        }],
        title: '拼音X-Z城市',
        desc: '可直接输入中文名/拼音/英文名/三字码'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alpha {
    display: flex;
    padding: 10px;
  }
  .alphal {
    width: 30px;
    min-width: 30px;
    font-size: 20px;
    color: dodgerblue;
  }
  .city {
    cursor: pointer;
    margin-right: 10px;
    color: #333333;
    line-height: 25px;
  }
  .city:hover {
    color: dodgerblue;
  }
</style>
