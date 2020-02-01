import React from 'react'
import { Link } from 'react-router-dom'

export const PlansList = ({ plans }) => {
  const buildList = () => {
    if(!plans.length) {
      return <p>You have not created any plans yet!</p>
    }

    const plansList = plans.map((plan, i) => {
      return <li key={i}><Link to={`/plans/${plan.id}`}>{plan.name}: {plan.description}</Link></li>
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

export const PeriodsList = ({ periods }) => {
  const buildList = () => {
    if(!periods.length) {
      return <p>You have not created any periods yet!</p>
    }

    const periodsList = periods.map((period, i) => {
      return <li key={i}><Link to={`/plans/${period.planid}/periods/${period.id}`}>{period.name}: {period.duration} Weeks</Link></li>
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