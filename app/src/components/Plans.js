import React, { Fragment, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { PlansList, PeriodsList } from './PlansList'
import WeeklyPlan from './WeeklyPlan'
import { useFetching } from '../libs/hooks'
import PlansActions from '../actions/plans'

const Plans = ({plans}) => {
  return (
    <Fragment>
      <Route 
        path="/plans"
        exact
        render={() => (<DefaultPlansView plans={plans}/>)} />
      <Route 
        path="/plans/:id"
        exact
        render={props => {
          const { match: { params: { id }}} = props
          return <PlanView plan={plans.find(plan => plan.id === parseInt(id))}/>
        }}/>
      <Route 
        path="/plans/:id/periods/:pid"
        exact
        render={props => (<WeeklyPlan {...props}/>)} />
    </Fragment>
  )
}

export default Plans

Plans.propTypes = {
  plans: PropTypes.array.isRequired
}

const DefaultPlansView = ({ plans }) => {
  const [newPlan, setNewPlan] = useState(false)
  return (
    <div>
      <h3>Plans</h3>
      {newPlan ?  <CreateNewPlan />: <button onClick={()=> setNewPlan(true)}>Create New Plan</button>}
      <PlansList plans={plans}/>
    </div>
  )
}

DefaultPlansView.propTypes = {
  plans: PropTypes.array.isRequired
}

const CreateNewPlan = () => {
  let history = useHistory()
  const [planName, setPlanName] = useState('')

  return (
    <div>
      <input 
        onChange={e => setPlanName(e.target.value)} 
        placeholder='Enter Plan Name' 
        value={planName}/>
      <button onClick={() => history.push('/plans/1')}>Create Plan</button>
    </div>
  )
}

const PlanView = ({ plan }) => {
  let history = useHistory()
  const [planPeriodName, setPlanPeriodName] = useState('')
  const [planPeriodDuration, setPlanPeriodDuration] = useState('')
  useFetching(PlansActions.getPlanPeriods)
  const periods = useSelector(state => state.plans.periods)

  if(!plan) {
    return null
  }
  return (
    <div className='plan-periods'>
      <h3>Plan Periods for {plan.name}</h3>
      <div>
        <input 
          onChange={e => setPlanPeriodName(e.target.value)} 
          placeholder='Enter Plan Period Name' 
          value={planPeriodName}/>
      </div>
      <div>
        <input 
          onChange={e => setPlanPeriodDuration(e.target.value)} 
          placeholder='Enter Plan Period Duration in Weeks' 
          value={planPeriodDuration}/>
      </div>
      <button onClick={() => history.push('/plans/1')}>Create Period</button>
      <PeriodsList periods={periods[plan.id] || []} />
    </div>
  )
}