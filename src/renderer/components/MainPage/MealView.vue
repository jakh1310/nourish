<template>
  <div id="mealsWrapper">
    <form @submit.prevent="">
      <input type="text" v-model="mealName" placeholder="Meal Name" ref="mealName"></input>
      <input type="number" min="0" v-model="calories" placeholder="Calories"></input>
      <button @click="addMeal()">Add Meal</button>
    </form>
    <br>
    <div>
      <span class="button" @click="newMeal(true)"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
      <span class="button right" @click="newMeal(false)"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
    </div>
    <h2>{{ dateString }}</h2>
    <div id="meals">
      <div class="meal" v-for="(meal, index) in meals">
        <span>{{ meal.name }}</span><span class="right">{{ meal.calories }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { date } from '../../shared'

  export default {
    data () {
      return {
        calories: null,
        mealName: null,
      }
    },
    methods: {
      addMeal () {
        if (this.calories && this.mealName) {
          this.$store.commit('addMeal', { 
            name: this.mealName, 
            calories: this.calories 
          })

          this.calories = null, this.mealName = null
          this.$refs.mealName.focus()
        } else {
          alert('Missing input')
        }
      },
      removeMeal (index) {
        this.$store.commit('removeMeal', index)
      },
      newMeal (type) {
        this.$store.commit('newMeal', { prev: type })
      }
    },
    computed: {
      meals () {
        return this.$store.state.meals
      },
      dateString () {
        return this.$store.state.dateString
      }
    },
    activated () {
      this.selectedDate = date.getDateString().dateString

      this.$store.commit('loadMeals')
    }
  }
</script>

<style scoped lang="stylus">
  #mealsWrapper
    position relative
    left 10px
    top 10px
    height calc(100% - 20px)
    width calc(100% - 20px)
    background-color #888

  .meal
    width 100%
    border-top 1px solid #333

    span
      font-size 24px

      &.right
        float right

  h2
    text-align center
    font-weight 400

  .button
    font-size 24px
    padding 6px
    border 1px solid #666
    cursor pointer
    display inline-block

    &:hover
      background red

    &.right
      float right
</style>