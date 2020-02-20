import React, { Fragment, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import PropTypes from 'prop-types'
import { PlansList, PeriodsList } from './Lists'
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
          const plan = plans.find(plan => plan.id === parseInt(id))
          return plan ? <PlanView plan={plan}/> : null
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
    <div className="default-plans">
      <h1>Plans</h1>
      <PlansList plans={plans}/>
      {newPlan ?  <CreateNewPlan cancel={() => setNewPlan(false)}/>: <button onClick={()=> setNewPlan(true)}>Add New Plan</button>}
    </div>
  )
}

DefaultPlansView.propTypes = {
  plans: PropTypes.array.isRequired
}

const CreateNewPlan = ({ cancel }) => {
  const dispatch = useDispatch()
  // let history = useHistory()
  const [planName, setPlanName] = useState('')
  const [planDescription, setPlanDescription] = useState('')

  const handleCreate = e => {
    e.preventDefault()
    return dispatch(PlansActions.createPlan({
      name: planName,
      description: planDescription
    }))
  }

  const handleCancel = e => {
    e.preventDefault()
    setPlanName('')
    setPlanDescription('')
    cancel()
  }
  return (
    <div className='create-plan'>
      <div>
        <input 
          onChange={e => setPlanName(e.target.value)} 
          placeholder='Enter Plan Name' 
          value={planName}/>
      </div>
      <div>
        <input 
          onChange={e => setPlanDescription(e.target.value)} 
          placeholder='Enter Plan Description' 
          value={planDescription}/>
      </div>
      <div className='submit-bar'>
        <button className="cancel" onClick={handleCancel}>Cancel</button>
        <button onClick={handleCreate}>Create Plan</button>
      </div>
    </div>
  )
}

const PlanView = ({ plan }) => {
  const [newPeriod, setNewPeriod] = useState(false)
  useFetching(PlansActions.getPlanPeriods.bind(null,plan.id))
  const periods = useSelector(state => state.plans.periods, shallowEqual)

  if(!plan) {
    return null
  }

  return (
    <div className='plan-periods'>
      <div className="section-title">
        <Link to="/plans" className="back-button">&lt;Back</Link>
        <h3>Plan Periods for {plan.name}</h3>
      </div>
      <PeriodsList periods={periods[plan.id] || []} />
      {newPeriod ?  <CreateNewPeriod cancel={() => setNewPeriod(false)} planid={plan.id}/>: <button onClick={()=> setNewPeriod(true)}>Add New Period</button>}
    </div>
  )
}

const CreateNewPeriod = ({ cancel, planid }) => {
  const [planPeriodName, setPlanPeriodName] = useState('')
  const [planPeriodDuration, setPlanPeriodDuration] = useState('')
  const [planPeriodDescription, setPlanPeriodDescription] = useState('')
  const dispatch = useDispatch()
  const handleCreate = e => {
    e.preventDefault()
    return dispatch(PlansActions.createPeriod({
      name: planPeriodName,
      duration: planPeriodDuration,
      description: planPeriodDescription,
      planid: planid
    }))
    .then(() => {
      setPlanPeriodName('')
      setPlanPeriodDuration('')
      setPlanPeriodDescription('')
      cancel() //this just hides form
    })
  }
  const handleCancel = e => {
    e.preventDefault()
    setPlanPeriodName('')
    setPlanPeriodDuration('')
    setPlanPeriodDescription('')
    cancel()
  }
  return (
    <div className='create-period'>
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
      <div>
        <input 
          onChange={e => setPlanPeriodDescription(e.target.value)} 
          placeholder='Enter Plan Period Description' 
          value={planPeriodDescription}/>
      </div>
      <div className='submit-bar'>
        <button className="cancel" onClick={handleCancel}>Cancel</button>
        <button onClick={handleCreate}>Create Period</button>
      </div>
    </div>
  )
}