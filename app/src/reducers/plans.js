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
      return{
        ...state,
        plans: [...state.plans, action.payload]
      }
    default:
      return state
  }
}

export default plans