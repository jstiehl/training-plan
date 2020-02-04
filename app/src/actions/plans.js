import config from '../config'
import * as types from '../actionTypes'

//NEED TO ADD ERROR HANDLING
const PlansActions = {
  getPlans() {
    return dispatch => {
      return fetch(`${config.api.host}/plans`)
        .then(res => res.json())
        .then(plans => {
          return dispatch({
            type: types.PLANS_RECEIVED,
            payload: plans
          })
        })
    }
  },
  getPlanPeriods(planid) {
    return dispatch => {
      return fetch(`${config.api.host}/plans/${planid}/periods`)
        .then(res => res.json())
        .then(periods => {
          return dispatch({
            type: types.PLAN_PERIODS_RECEIVED,
            payload: periods,
            planid: planid
          })
        })  
    }
  },
  createPlan({ name, description }) {
    return dispatch => {
      return fetch(`${config.api.host}/plans`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, description })
        })
        .then(res => res.json())
        .then(plan => {
          return dispatch({
            type: types.PLAN_CREATED,
            payload: plan
          })
        })  
    }
  },
  createPeriod({ name, duration, planid }) {
    return dispatch => {
      return fetch(`${config.api.host}/plans/${planid}/periods`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, duration })
        })
        .then(res => res.json())
        .then(period => {
          return dispatch({
            type: types.PLAN_PERIOD_CREATED,
            payload: period,
            planid
          })
        })  
    }
  }
}

export default PlansActions