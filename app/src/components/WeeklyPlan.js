import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { useFetching } from '../libs/hooks'
import PlansActions from '../actions/plans'

const DAYS_OF_THE_WEEK = [1,2,3,4,5,6,0]

const options = [
  { value: 'zone1', label: 'Zone 1' },
  { value: 'zone2', label: 'Zone 2' },
  { value: 'zone3', label: 'Zone 3' },
  { value: 'strength', label: 'Strength' },
];

const WeeklyPlan = ({ match: { params: { id: planid, pid: periodid}}}) => {
  useFetching(PlansActions.getPlanPeriods.bind(null, planid))
  const periods = useSelector(state => state.plans.periods)
  const period = (periods[planid] && periods[planid].find(p => p.id === parseInt(periodid))) || {}
  let dayCards = DAYS_OF_THE_WEEK.map(day => {
    return <DayCard plan={planid} period={periodid} day={day} key={day} workouts={period.weekly_plan || {}}/>
  })

  return (
    <div>
      <div className="section-title">
        <Link to={`/plans/${planid}`} className="back-button">&lt;Back</Link>
        <h3>Weekly Workout Plan</h3>
      </div>
      {period.id ? <h5>{period.name}</h5> : null}
      <div className="day-card-container">
        {dayCards}
      </div>
    </div>
  )
}

export default WeeklyPlan

const DayCard = props => {
  const [addAM, setAddAM] = useState(false)
  const [addPM, setAddPM] = useState(false)
  const dispatch = useDispatch()
  const addWorkout = tod => e => {
    e.preventDefault()
    if(tod === 'AM') {
      setAddAM(true)
    } else {
      setAddPM(true)
    }
  }
  const saveWorkout = (dow,tod) => e => {
    e.preventDefault()
    return dispatch(PlansActions.updatePeriod({planid: props.plan, periodid: props.period, data: {
      weekly_plan: {
        [dow]: {
          [tod]: {
            type: "Zone 1",
            description: "30 minutes on treadmill with 40lb weight vest"
          }
        }
      }
    }}))
    .then(() => {
      if(tod === 'AM') {
        setAddAM(false)
      } else {
        setAddPM(false)
      }
    })
  }
  return (
    <div className="day-card">
      <p className="day-title">{dayMap(props.day)}</p>
      <div className="workouts">
        <p>AM</p>
        <button className="add-button" onClick={addWorkout("AM")} disabled={addAM}/><label>Add Workout</label>
        {addAM ? <WorkoutForm cancel={() => setAddAM(false)} save={saveWorkout(dayMap(props.day),'AM')}/> : null}
        <p>PM</p>
        <button className="add-button" onClick={addWorkout("PM")} disabled={addPM}/><label>Add Workout</label>
        {addPM ? <WorkoutForm cancel={() => setAddPM(false)} save={saveWorkout(dayMap(props.day),'PM')}/> : null}
      </div>
    </div>
  )
}

const WorkoutForm = props => {
  function cancel(e) {
    e.preventDefault()
    props.cancel()
  }

  return (
    <div className="workout-form">
      <label>Workout Type</label><br />
      <Select
        value={undefined}
        onChange={()=>{}}
        options={options} />
      <label>Description</label><br />
      <input type="textarea" onChange={()=>{}} placeholder="Enter workout description" />
      <button onClick={cancel}>Cancel</button><button onClick={props.save}>Save</button>
    </div>
  )
}

const dayMap = day => {
  switch(day) {
    case 1: 
      return "Monday"
    case 2: 
      return "Tuesday"
    case 3: 
      return "Wednesday"
    case 4: 
      return "Thursday"
    case 5: 
      return "Friday"
    case 6: 
      return "Saturday"
    case 0:
    default:
      return "Sunday"
  }
}

/*
for day, using day designations for JS getDay()
{
  id: 1,
  period_id: 1,
  day: 0,
  morning: [{type: "Zone 1", description: "30 minutes on treadmill with 40lb weight vest"}, {type: "Strength", description: "Core strength exercises"}],
  evening: [{type: "Other", description: "2 hours Gym Climbing"}]
}
*/