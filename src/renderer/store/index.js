import Vue from 'vue'
import Vuex from 'vuex'

import { io, date } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: '',
    dateString: '',
    offset: 0,
    data: {},
    meals: []
  },
  mutations: {
    fetchData (state) {
      loadData(state)
    },

    addMeal (state, payload) {
      const meal = {}
      meal.name = payload.name
      meal.calories = payload.calories
      meal.type = payload.type

      if (state.meals === undefined) {
        state.meals = []
      }
      state.meals.push(meal)

      state.data[state.date] = state.meals
      io.saveData(state.data)

      loadData(state)
    },

    removeMeal (state, mealID) {
      state.meals.splice(mealID, 1)

      state.data[state.date] = state.meals
      io.saveData(state.data)

      loadData(state)
    },

    loadMeals (state) {
      state.date = date.getDateID(state.offset)
      state.dateString = date.getDateString(state.offset)
      if (state.data[state.date] !== undefined) {
        state.meals = state.data[state.date]
      } else {
        state.meals = undefined
      }
    },

    saveData (state) {
      console.log('saved data')
      state.data[state.date] = state.meals
      console.log(state.data)
      io.saveData(state.data)
    },

    newMeal (state, payload) {
      state.data[state.date] = state.meals

      if (payload.prev === true) {
        state.date = date.getDateID(--state.offset)
        state.dateString = date.getDateString(state.offset)
      } else {
        state.date = date.getDateID(++state.offset)
        state.dateString = date.getDateString(state.offset)
      }

      if (state.data[state.date] !== undefined) {
        state.meals = state.data[state.date]
      } else {
        state.meals = undefined
      }
    }
  }
})

// Private Vuex Functions

function loadData(state) {
  let loadedData = {}

  console.log('Loading data')
  loadedData = io.loadData()

  if (loadedData.code === 'SUCCESS') {
    state.data = loadedData.data
  } else {
    console.error(loadedData.stack)
  }
}