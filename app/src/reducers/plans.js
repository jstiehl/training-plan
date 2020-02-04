import * as types from '../actionTypes'
const initialState = {
  plans: [],
  periods: {}
}

const plans = (state = initialState, action) => {
  switch(action.type) {
    case types.PLANS_RECEIVED:
      return {
        ...state,
        plans: action.payload
      }
    case types.PLAN_PERIODS_RECEIVED:
      return {
        ...state,
        periods: {
          ...state.periods,
          [action.planid]: action.payload
        }
      }
    case types.PLAN_CREATED:
      return {
        ...state,
        plans: [...state.plans, action.payload]
      }
    case types.PLAN_PERIOD_CREATED:
      let currentPeriods = (state.periods && state.periods[action.planid]) || []
      const newPeriods = [...currentPeriods, action.payload]
      return {
        ...state,
        periods: {
          ...state.periods,
          [action.planid]: newPeriods
        }
      }
    default:
      return state
  }
}

export default plans