import config from '../config'
import * as types from '../actionTypes'

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
  getPlanPeriods() {
    return dispatch => {
      return fetch(`${config.api.host}/plans/1/periods`)
        .then(res => res.json())
        .then(periods => {
          return dispatch({
            type: types.PLAN_PERIODS_RECEIVED,
            payload: periods,
            planid: 1
          })
        })
    }
  }
}

export default PlansActions