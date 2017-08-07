<template>
  <div id="wrapper">
    <div id="navbar">
      <div class="nav-button inactive"><span class="lnr lnr-leaf"></span></div>
      <div class="nav-button" @click="currentView = 'meal-view'"><span class="lnr lnr-book"></span></div>
      <div class="nav-button" @click="currentView = 'graph-view'"><span class="lnr lnr-pie-chart"></span></div>
      <div class="nav-button" ><span class="lnr lnr-calendar-full"></span></div>
      <div class="nav-button" @click="closeWindow"><span class="lnr lnr-power-switch"></span></div>
    </div>
    <div id="view">
      <keep-alive>
        <component :is="currentView"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import GraphView from './MainPage/GraphView'
  import MealView from './MainPage/MealView'
  import { ipcRenderer } from 'electron'

  export default {
    name: 'main-page',
    data () {
      return {
        currentView: "graph-view"
      }
    },
    components: { 
      GraphView,
      MealView 
    },
    methods: {
      closeWindow () {
        this.$store.commit('saveData')
        ipcRenderer.send('quit', true)
      }
    }
  }
</script>

<style lang="stylus">
  col1 = #d6982c

  *
    box-sizing border-box
    margin 0
    padding 0

  #wrapper
    background-color green
    height 100vh
    width 100vw

  #navbar
    background-color #333
    width 72px
    height 100vh

    .nav-button
      color #DDD
      font-family Arial, Helvetica, sans-serif
      text-align center
      font-size 20px
      line-height 54px
      cursor pointer

      &:hover
        background-color #555

      &.inactive
        background-color #333
        color #d1a54d
        border-bottom 1px solid black

  #view
    height 100vh
    width calc(100vw - 72px)
    position absolute
    left 72px
    top 0px
    border-left 1px solid black
</style>