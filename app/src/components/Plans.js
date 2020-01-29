import React, { Fragment, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import PlansList from './PlansList'
import WeeklyPlan from './WeeklyPlan'

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
        render={() => (<PlanView plan={plans[0]}/>)} />
      <Route 
        path="/plans/:id/periods/:id"
        exact
        render={() => (<WeeklyPlan plan={plans[0]}/>)} />
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
      <button onClick={() => history.push('/plans/1')}>Create Plan</button>
      <PlansList plans={plan.periods || []} />
    </div>
  )
}