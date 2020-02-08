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
  getPlanPeriods: planid => {
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
  updatePlan({ planid }) {
    return dispatch => {
      return fetch(`${config.api.host}/plans/${planid}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => res.json())
        .then(plan => {
          return dispatch({
            type: types.PLAN_UPDATED,
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
  },
  updatePeriod({ planid, periodid, data }) {
    return dispatch => {
      return fetch(`${config.api.host}/plans/${planid}/periods/${periodid}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
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
  },
  deletePeriod({ planid, periodid }) {
    return dispatch => {
      return fetch(`${config.api.host}/plans/${planid}/periods/${periodid}`, {
          method: "DELETE",
        })
        .then(res => res.json())
        .then(({ success }) => {
          if(success) {
            return dispatch({
              type: types.PLAN_PERIOD_DELETED,
              periodid,
              planid
            })
          }
        })  
    }
  }
}

export default PlansActions