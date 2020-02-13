import config from '../config'
import * as types from '../actionTypes'
import request from '../libs/request'

//NEED TO ADD ERROR HANDLING
const PlansActions = {
  getActivePlan() {
    return dispatch => {
      return request(`${config.api.host}/plans/active`, {auth:true})
        .then(plan => {
          return dispatch({
            type: types.ACTIVE_PLAN_RECEIVED,
            payload: plan
          })
        })
    }
  },
  getPlans() {
    return dispatch => {
      return request(`${config.api.host}/plans`, { auth: true })
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
      return request(`${config.api.host}/plans/${planid}/periods`, { auth: true })
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
      return request(`${config.api.host}/plans`, { method: "POST", auth: true }, { name, description })
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
      return request(`${config.api.host}/plans/${planid}`, {
          method: "PUT",
          auth: true
        })
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
          auth: true
        }, { name, duration })
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
      return request(`${config.api.host}/plans/${planid}/periods/${periodid}`, {
          method: "PUT",
          auth: true
        }, data)
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
      return request(`${config.api.host}/plans/${planid}/periods/${periodid}`, {
          method: "DELETE",
          auth: true
        })
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