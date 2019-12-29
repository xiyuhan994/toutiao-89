<template>
  <!-- 二级路由组件 -->
  <div class="home">
    <div ref="myChart" class="echarts"></div>
    <div ref="myChart2" class="echarts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {

  // 需要在渲染完成事件才可以获取到dom元素
  mounted () {
    // 获取实例对象
    let myChart = echarts.init(this.$refs.myChart)
    let myChart2 = echarts.init(this.$refs.myChart2)
    // 设置实例属性
    myChart.setOption(
      {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    )
    myChart2.setOption(
      {
        backgroundColor: '#2c343c',

        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }
    )
  }

}
</script>

<style lang='less' scoped>
.home {
  // background-image: url('../../assets/img/default.gif');
  height: 100vh;
  background-size: cover;
  .echarts {
    width: 600px;
    height: 400px;
  }
  .echart2 {
    width: 800px;
    height: 500px;
  }
}
</style>
