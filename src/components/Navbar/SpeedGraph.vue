<template>
  <div class="mt-4">
    <apexcharts
      ref="chart"
      type="line"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex'
import { getDataUnit, getDataValue } from '@/filters'

export default {
  name: 'SpeedGraph',
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      chartOptions: {
        chart: {
          sparkline: {
            enabled: true
          },
          animations: {
            enabled: false,
            dynamicAnimation: {
              speed: 1000
            }
          }
        },
        colors: [
          this.$vuetify.theme.currentTheme.upload,
          this.$vuetify.theme.currentTheme.download
        ],
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'round',
          width: 4
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.5,
            opacityFrom: 0.6,
            opacityTo: 0.5,
            stops: [0, 50, 100]
          }
        },
        tooltip: {
          theme: 'light',
          x: {
            formatter: value => {
              const val = 32 - value * 2
              
              return val + this.$t('navbar.secago')
            }
          },
          y: {
            formatter: value => {
              return `${getDataValue(value, 0)} ${getDataUnit(value)}`
            }
          }
        }
      }
    }
  },
  computed: {
    series() {
      return [
        {
          name: this.$t('torrent.upload'),
          type: 'area',
          data: this.$store.state.upload_data
        },
        {
          name: this.$t('torrent.download'),
          type: 'area',
          data: this.$store.state.download_data
        }
      ]
    },
    ...mapGetters(['getTheme']),
    theme() {
      return this.getTheme() ? 'Dark' : 'Light'
    }
  },
  watch: {
    theme(newValue) {
      this.setChartTooltipTheme(newValue)
    }
  },
  mounted() {
    this.setChartTooltipTheme(this.theme)
  },
  methods: {
    setChartTooltipTheme(theme) {
      this.chartOptions.tooltip.theme = theme.toLowerCase()
      this.$refs.chart.updateOptions(this.chartOptions)
    }
  }
}
</script>
