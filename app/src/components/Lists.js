import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Img from 'react-image'
import PlansActions from '../actions/plans'

import Edit from '../assets/edit.png'
import Delete from '../assets/delete.png'

export const PlansList = ({ plans }) => {
  const activePlanExists = plans.find(plan => plan.active)
  const buildList = () => {
    if(!plans.length) {
      return <p>You have not created any plans yet!</p>
    }

    const plansList = plans.map((plan, i) => {
      return <li key={i}>{PlanListItem(plan, activePlanExists)}</li>
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

const PlanListItem = (plan, active) => {
  const dispatch = useDispatch()

  function setActive(id, e) {
    e.preventDefault()
    dispatch(PlansActions.updatePlan({ planid:id }))
  }
  function deletePlan(id, e) {
    e.preventDefault()
    dispatch(PlansActions.deletePlan({ planid:id }))
  }
  return (
    <div>
      <div className="plan-list-item__header">{plan.name}</div>
      <div className="plan-list-item">
        <div className="plan-list-item__description">{plan.description}</div>
        <div className="plan-list-item__item">{plan.active ? "Active" : "Inactive"}</div>
        <div className="plan-list-item__item">{<Link to={`/plans/${plan.id}`}><span className="edit-icon"><Img src={Edit} /></span></Link>}</div>
        <div className="plan-list-item__item"><button onClick={deletePlan.bind(null, plan.id)} disabled={active}><span className="delete-icon"><Img src={Delete} /></span></button></div>
        <div className="plan-list-item__item"><button onClick={setActive.bind(null, plan.id)} disabled={active}>Set Active</button></div>
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
        <div className="plan-list-item__item">{<Link to={`/plans/${period.planid}/periods/${period.id}`}><span className="edit-icon"><Img src={Edit} /></span></Link>}</div>
        <div className="plan-list-item__item"><button onClick={deletePeriod.bind(null, period.planid, period.id)}><span className="delete-icon"><Img src={Delete} /></span></button></div>
      </div>
    </div>
  )
}