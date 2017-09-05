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
        <div class="meal" v-for="(meal, index) in meals"  :key="index" v-if="meal.type === 'breakfast'">
          <span @click="removeMeal(index)">X</span> <span>{{ meal.name }}</span><span class="right">{{ meal.calories }}</span>
        </div>
        <div class="mealHeader">Lunch
          <div class="add-button right" @click="showModal('lunch')">+</div>
        </div>
        <div class="meal" v-for="(meal, index) in meals"  :key="index" v-if="meal.type === 'lunch'">
          <span @click="removeMeal(index)">X</span> <span>{{ meal.name }}</span><span class="right">{{ meal.calories }}</span>
        </div>
        <div class="mealHeader">Dinner
          <div class="add-button right" @click="showModal('dinner')">+</div>
        </div>
        <div class="meal" v-for="(meal, index) in meals" :key="index" v-if="meal.type === 'dinner'">
          <span @click="removeMeal(index)">X</span> <span>{{ meal.name }} </span><span class="right">{{ meal.calories }}</span>
        </div>
      </div>

      <div id="footer">
        <div class="total">
          <span>Total</span><span class="right">{{ totalCalories }}</span>
        </div>
        <div class="goal">
          <span>Goal</span><span class="right">{{ goalCalories }}</span>
        </div>
      </div>
    </div>

    <div id="addMealModal" v-show="addMealShow">
      <h3>Add Meal</h3>
      <form @submit.prevent="">
        <label for="mealName" id="meal-label">NAME</label>
        <input type="text" v-model="mealName" ref="mealName" id="mealName"></input>
        <label for="calories" id="calorie-label">CALORIES</label>
        <input type="number" min="0" v-model="calories" id="calories"></input>
        <button @click="addMeal()">Okay</button>
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
      }
    },
    activated () {
      this.$store.commit('loadMeals')
    }
  }
</script>

<style scoped lang="stylus">
  col1 = #d6982c
  white = #e9e9e9
  black = #272727

  .mealHeader
    color black
    font-size 26px
    box-sizing border-box
    padding-left 12px
    padding-right 12px
    background-color darken(white, 10)
    border-bottom 1px solid black

  #addMealModal
    width 300px
    height 200px
    border 1px solid black
    position absolute
    left calc(50% - 150px)
    top calc(50% - 100px)
    background-color white
    z-index 10
    box-shadow 0 6px 12px black

    label
      position absolute
      font-size 11px

      &#meal-label
        top 42px
        left 14px

      &#calorie-label
        left 14px
        top 95px

    h3
      font-size 24px
      font-weight 400
      text-align center
      padding 4px
      border-bottom 1px solid lighten(black, 10)

    input
      font-size 24px
      width 90%
      left 5%
      position relative
      margin 18px 0px 6px 0px
      background none
      border none
      border-bottom 1px solid black
      outline none
      color black

    input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button 
      -webkit-appearance none
      margin 0

    button
      font-size 20px
      border 1px solid black
      padding 2px 8px 2px 8px
      width 120px
      position relative
      margin 13px
      background none
      cursor pointer
      color black

      &.right
        float right

      &:hover
        background-color darken(white, 20)

  #meals
    overflow-x hidden
    overflow-y auto
    height calc(100vh - 133px)

  #footer
    width 100%
    height 78px

  .add-button
    float right
    font-size 22px
    height 23px
    border 1px solid black
    position relative
    top 4px
    padding-left 10px
    padding-right 10px
    text-align center
    line-height 21px
    cursor pointer
    color black

    &:hover
      background-color darken(white, 20)

  #mealsWrapper
    position relative
    height 100%
    width 100%
    background-color white

  .meal
    position relative
    width 100%
    padding-left 20px
    padding-right 14px
    line-height 24px
    font-size 20px
    color black

    &:hover
      background-color darken(white, 20)

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
    color black
    border-top 1px solid black
    font-size 24px

    span.right
      font-size 24px
      float right

  #header
    height 55px
    border-bottom 1px solid black

  h1
    text-align center
    font-weight 400
    line-height 54px
    color black
    background-color darken(white, 20)

  .button
    font-size 18px
    padding-left 2px
    padding-right 2px
    padding-top 6px
    line-height 48px
    width 22px
    cursor pointer
    float left
    background-color darken(white, 20)
    color black

    &:hover
      background darken(white, 40)

  #insideWrapper
    width 100%

  #date
    float left
    width calc(100% - 44px)
</style>