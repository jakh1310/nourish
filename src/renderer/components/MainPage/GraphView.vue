<template>
  <div id="graph">
    Add graph here
    {{ data }}
  </div>
</template>

<script>
  import { date } from '../../shared'

  export default {
    data () {
      return {
        date: {},
        path: null,
        id: '',

      }
    },
    activated () {
      this.id = date.getDateID()
      this.date = date.getDateString()
    },
    created () {
      this.$store.commit('fetchData')
    },
    computed: {
      data () {
        return this.$store.state.data
      }
    }
  }
</script>

<style scoped lang="stylus">
  #graph
    position relative
    left 10px
    top 10px
    height calc(100% - 20px)
    width calc(100% - 20px)
    background-color #666
</style>