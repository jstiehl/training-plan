import React from 'react'
import { Link } from 'react-router-dom'

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
  return (
    <div>
      <div className="plan-list-item__header">{plan.name}</div>
      <div className="plan-list-item">
        <div className="plan-list-item__description">{plan.description}</div>
        <div>{plan.active ? "Active" : "Inactive"}</div>
        <div>{<Link to={`/plans/${plan.id}`}>Edit</Link>}</div>
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
  return (
    <div>
      <div className="period-list-item__header">{period.name}</div>
      <div className="period-list-item">
        <div className="period-list-item__description">{period.description || "No description provided for this period"}</div>
        <div>{`${period.duration} Weeks`}</div>
        <div>{<Link to={`/plans/${period.planid}/periods/${period.id}`}>Edit</Link>}</div>
      </div>
    </div>
  )
}