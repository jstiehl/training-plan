import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PlansActions from '../actions/plans'

export const PlansList = ({ plans }) => {
  const buildList = () => {
    if(!plans.length) {
      return <p>You have not created any plans yet!</p>
    }

    const plansList = plans.map((plan, i) => {
      return <li key={i}>{PlanListItem(plan)}</li>
    })
    return (
      <ul>
        {plansList}
      </ul>
    )
  }
  return (
    <div>
      {buildList()}
    </div>
  )
}

const PlanListItem = plan => {
  const dispatch = useDispatch()

  function setActive(id, e) {
    e.preventDefault()
    dispatch(PlansActions.updatePlan({ planid:id }))
  }
  return (
    <div>
      <div className="plan-list-item__header">{plan.name}</div>
      <div className="plan-list-item">
        <div className="plan-list-item__description">{plan.description}</div>
        <div className="plan-list-item__item">{plan.active ? "Active" : "Inactive"}</div>
        <div className="plan-list-item__item">{<Link to={`/plans/${plan.id}`}>Edit</Link>}</div>
        <div className="plan-list-item__item"><button>Delete</button></div>
        <div className="plan-list-item__item"><button onClick={setActive.bind(null, plan.id)} disabled={plan.active}>Set Active</button></div>
      </div>
    </div>
  )
}

export const PeriodsList = ({ periods }) => {
  const buildList = () => {
    if(!periods.length) {
      return <p>You have not created any periods yet!</p>
    }

    const periodsList = periods.map((period, i) => {
      return <li key={i}>{PeriodListItem(period)}</li>
    })
    return (
      <ul>
        {periodsList}
      </ul>
    )
  }
  return (
    <div>
      {buildList()}
    </div>
  )
}

const PeriodListItem = period => {
  const dispatch = useDispatch()
  function deletePeriod(planid, periodid, e) {
    e.preventDefault()
    dispatch(PlansActions.deletePeriod({ planid, periodid }))
  }
  return (
    <div>
      <div className="period-list-item__header">{period.name + ` - ${period.duration} Weeks`}</div>
      <div className="period-list-item">
        <div className="period-list-item__description">{period.description || "No description provided for this period"}</div>
        <div className="plan-list-item__item">{<Link to={`/plans/${period.planid}/periods/${period.id}`}>Edit</Link>}</div>
        <div className="plan-list-item__item" onClick={deletePeriod.bind(null, period.planid, period.id)}><button>Delete</button></div>
      </div>
    </div>
  )
}