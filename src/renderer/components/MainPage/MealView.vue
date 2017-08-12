<template>
  <div id="mealsWrapper">
    <div id="insideWrapper">
      <div id="header">
        <div class="button" @click="newMeal(true)"><span class="lnr lnr-chevron-left"></span></div>
        <div id="date"><h1>{{ dateString }}</h1></div>
        <div class="button right" @click="newMeal(false)"><span class="lnr lnr-chevron-right"></span></div>
      </div>

      <div id="meals">
        <div class="mealHeader">Breakfast
          <div class="add-button right" @click="showModal('breakfast')">+</div>
        </div>
        <div class="meal" v-for="(meal, index) in mealTypes('breakfast')">
          <span>{{ meal.name }}</span><span class="right">{{ meal.calories }}</span>
        </div>
        <div class="mealHeader">Lunch
          <div class="add-button right" @click="showModal('lunch')">+</div>
        </div>
        <div class="meal" v-for="(meal, index) in mealTypes('lunch')">
          <span>{{ meal.name }}</span><span class="right">{{ meal.calories }}</span>
        </div>
        <div class="mealHeader">Dinner
          <div class="add-button right" @click="showModal('dinner')">+</div>
        </div>
        <div class="meal" v-for="(meal, index) in mealTypes('dinner')">
          <span>{{ meal.name }}</span><span class="right">{{ meal.calories }}</span>
        </div>
      </div>

      <div id="footer">
        <div class="total">
          <span>Total</span><span class="right" :style="overCalorieGoal">{{ totalCalories }}</span>
        </div>
        <div class="goal">
          <span>Goal</span><span class="right">{{ goalCalories }}</span>
        </div>
      </div>
    </div>

    <div id="addMealModal" v-show="addMealShow">
      <form @submit.prevent="">
        <input type="text" v-model="mealName" placeholder="Meal Name" ref="mealName"></input>
        <input type="number" min="0" v-model="calories" placeholder="Calories"></input>
        <button @click="addMeal()">Add Meal</button>
        <button class="right" @click="hideModal()">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        calories: null,
        mealName: null,
        addMealShow: false,
        mealType: '',
        goalCalories: 2000
      }
    },
    methods: {
      addMeal () {
        if (this.calories && this.mealName) {
          this.$store.commit('addMeal', { 
            name: this.mealName, 
            calories: this.calories,
            type: this.mealType 
          })

          this.calories = null, this.mealName = null
          this.addMealShow = false
        } else {
          // Handle invalid input
        }
      },
      removeMeal (index) {
        this.$store.commit('removeMeal', index)
      },
      newMeal (type) {
        this.$store.commit('newMeal', { prev: type })
      },
      showModal (type) {
        this.mealType = type
        this.addMealShow = true
        setTimeout(() => {
          this.$refs.mealName.focus()
        }, 50)
      },
      hideModal () {
        this.addMealShow = false
      },
      mealTypes (mealType) {
        if (this.$store.state.meals !== undefined) {
          return this.$store.state.meals.filter((meal) => {
            return meal.type === mealType
          })
        }
      }
    },
    computed: {
      meals () {
        return this.$store.state.meals
      },
      dateString () {
        return this.$store.state.dateString
      },
      totalCalories () {
        let total = 0
        if (this.meals !== undefined) {
          this.meals.forEach((val, index) => {
            total += parseInt(val.calories)
          })
        }
        
        return total
      },
      overCalorieGoal () {
        if (this.totalCalories > this.goalCalories) {
          return {
            color: '#a00'
          }
        } else {
          return {
            color: '#0a0'
          }
        }
      }
    },
    activated () {
      this.$store.commit('loadMeals')
    }
  }
</script>

<style scoped lang="stylus">
  col1 = #d6982c

  .mealHeader
    color #ccc
    font-size 26px
    border-bottom 1px solid darken(col1, 10)
    box-sizing border-box
    padding-left 12px
    padding-right 12px
    text-shadow -1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222

    &:not(:first-child)
      border-top 1px solid darken(col1, 10)

  #addMealModal
    width 300px
    height 200px
    border 1px solid #333
    outline 1px solid col1
    outline-offset -2px
    position absolute
    left calc(50% - 150px)
    top calc(50% - 100px)
    background-color #303030
    z-index 10

    &::after 
      content ""
      background-image url('lines2.png')
      opacity 0.5
      top 0
      left 0
      bottom 0
      right 0
      position absolute
      z-index -1

    input
      font-size 24px
      width 90%
      left 5%
      position relative
      margin 12px 0px 12px 0px
      background-color #22222233
      border none
      border-bottom 1px solid col1
      outline none
      text-align center
      color #ccc

    input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button 
      -webkit-appearance none
      margin 0

    button
      font-size 20px
      border 1px solid #333
      outline 1px solid col1
      outline-offset -2px
      padding 2px 8px 2px 8px
      width 120px
      position relative
      margin 13px
      background none
      cursor pointer
      color #ccc

      &.right
        float right

      &:hover
        background-color #22222299

  #meals
    overflow-x hidden
    overflow-y auto
    height calc(100vh - 133px)

  #footer
    width 100%
    height 78px

  .add-button
    float right
    font-size 28px
    height 30px
    border 1px solid #333
    outline 1px solid col1
    outline-offset -2px
    position relative
    top 5px
    padding-left 15px
    padding-right 15px
    text-align center
    line-height 23px
    cursor pointer
    color #ccc
    text-shadow -1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222

    &:hover
      background-color #22222299

  #mealsWrapper
    position relative
    height 100%
    width 100%
    background-color #444
    background-image url('lines2.png')

  .meal
    position relative
    width 100%
    padding-left 24px
    padding-right 16px
    color #ccc
    text-shadow -1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222

    &:hover
      background-color #22222233

    &:not(:last-child)
      border-bottom 1px solid #333

    span
      font-size 20px

      &.right
        float right

  .total, .goal
    position relative
    width 100%
    padding-left 12px
    padding-right 12px
    color #ccc
    border-top 1px solid darken(col1, 10)
    font-size 24px
    text-shadow -1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222

    span.right
      font-size 24px
      float right

  #header
    height 55px
    border-bottom 1px solid darken(col1, 10)

  h1
    text-align center
    font-weight 400
    line-height 54px
    color col1
    background-color #33333388
    text-shadow -1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222

  .button
    font-size 18px
    padding-left 2px
    padding-right 2px
    padding-top 6px
    line-height 48px
    width 22px
    cursor pointer
    float left
    background-color #33333388
    color #bbb

    &:hover
      background #666

  #insideWrapper
    width 100%

  #date
    float left
    width calc(100% - 44px)
</style>