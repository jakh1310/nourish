<template>
  <div id="graph">
    
  </div>
</template>

<script>
  import { date, d3Wrapper } from '../../utils'

  let graph, el, timeout, graphData = []

  function getTotalCalories (arr) {
    let total = 0
    if (arr !== undefined) {
      arr.forEach((val, index) => {
        total += parseInt(val.calories)
      })
    }
    return total
  }

  // Resize + debounce
  window.addEventListener('resize', (e) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      graph.setSize(el.clientWidth, el.clientHeight)
    }, 250)
  })

  export default {
    data () {
      return {
        date: {},
        path: null,
        id: ''
      }
    },
    activated () {
      this.id = date.getDateID()
      this.date = date.getDateString()

      Object.keys(this.$store.state.data).forEach((key, index) => {
        graphData[index] = {}
        graphData[index].date = key
        graphData[index].calories = getTotalCalories(this.$store.state.data[key])
      })

      graph.updateData(graphData)
    },
    created () {
      this.$store.commit('fetchData')

      Object.keys(this.$store.state.data).forEach((key, index) => {
        graphData[index] = {}
        graphData[index].date = key
        graphData[index].calories = getTotalCalories(this.$store.state.data[key])
      })
    },
    mounted () {
      el = this.$el
      graph = new d3Wrapper("#graph", el.clientWidth, el.clientHeight)

      graph.updateData(graphData)
    },
    computed: {
      data () {
        return this.$store.state.data
      }
    }
  }
</script>

<style lang="stylus">
  white = #e9e9e9

  #graph
    position relative
    left 10px
    top 10px
    height calc(100% - 20px)
    width calc(100% - 20px)
    background-color white

  .line
    fill none
    stroke green
    stroke-width 2px
</style>