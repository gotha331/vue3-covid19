<template>
  <div class="box">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>

        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>

        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>

        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaAdd.noInfect }}</div>
          <div>无症状感染者</div>
        </section>

        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>

        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div id="pie-chart" class="box-left-pie"></div>
      <div id="line-chart" class="box-left-line"></div>
    </div>
    <div id="china-map" class="box-center">
    </div>
    <div class="box-right">
      <table class="table" border="1" cellspacing="0">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__heartBeat" tag="tbody">
          <tr v-for="item in store.item" :key="item.name">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from './stores';
import { onMounted } from 'vue';
import * as echarts from 'echarts'
import './assets/china'
import { geoCoordMap } from './assets/geoMap'
import 'animate.css'

const store = useStore()

onMounted(async () => {
  await store.getList()
  initCharts()
  initPie()
  initLine()
})

const initCharts = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children
  store.item = city[2].children

  const data = city.map(item => {
    return {
      name: item.name,
      value: geoCoordMap[item.name].concat(item.total.nowConfirm),
      children: item.children
    }
  })

  const charts = echarts.init(document.querySelector("#china-map") as HTMLElement)

  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      emphasis: {
        areaColor: "#0f5d9d",
      },
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2]
          }
        },
        itemStyle: {
          color: "#1E90FF", //标志颜色
        },
        data: data
      },
    ],
  })

  charts.on('click', (e: any) => {
    store.item = e.data.children
  })
}

const initPie = () => {
  const charts = echarts.init(document.querySelector("#pie-chart") as HTMLElement)

  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '今日确诊',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        data: store.cityDetail.map(item => {
          return {
            name: item.city,
            value: item.nowConfirm
          }
        })
      }
    ]
  })
}

const initLine = () => {
  const charts = echarts.init(document.querySelector("#line-chart") as HTMLElement)

  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: store.cityDetail.map(item => item.city),
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    label: {
      show: true
    },
    series: [
      {
        data: store.cityDetail.map(item => item.nowConfirm),
        type: 'line',
        smooth: true
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
$itemColor:#41b0db;
$itemBg:#223651;
$itemBorder:#212028;

.box {
  height: 100%;
  display: flex;
  background: url('./assets/bg.jpg') 100% 100% no-repeat;
  background-size: cover;

  &-left {
    width: 400px;
    color: #fff;

    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;

      section {
        background: $itemBg;
        border: 1px solid $itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          color: $itemColor;
          padding: 10px;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }

    &-pie {
      height: 350px;
      margin-top: 20px;
    }

    &-line {
      height: 300px;
      margin-top: 20px;
    }
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 450px;
    color: #fff;

    .table {
      width: 100%;
      background: #212028;

      tr {
        th {
          padding: 5px;
          white-space: nowrap;
        }

        td {
          padding: 5px 10px;
          width: 100px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
