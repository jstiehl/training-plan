import * as types from '../actionTypes'
const initialState = {
  plans: [],
  periods: {}
}

const plans = (state = initialState, action) => {
  switch(action.type) {
    case types.ACTIVE_PLAN_RECEIVED:
      return {
        ...state,
        activePlan: action.payload
      }
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
    case types.PLAN_DELETED:
      let plansAfterDelete = [...state.plans].filter(plan => plan.id !== action.planid)
      return {
        ...state,
        plans: plansAfterDelete
      }
    case types.PLAN_UPDATED:
      let updatedPlans = []
      const updatedPlan = action.payload
      state.plans.forEach(plan => {
        if(plan.id === updatedPlan.id) {
          updatedPlans.push({ ...plan, ...updatedPlan })
        } else {
          updatedPlans.push(plan)
        }
      })
      return {
        ...state,
        plans: updatedPlans
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
    case types.PLAN_PERIOD_DELETED:
      let periodsBeforeDelete = (state.periods && state.periods[action.planid]) || []
      const periodsAfterDelete = periodsBeforeDelete.filter(period => period.id !== action.periodid && period.planid === action.planid)

      return {
        ...state,
        periods: {
          ...state.periods,
          [action.planid]: periodsAfterDelete
        }
      }
    default:
      return state
  }
}

export default plans