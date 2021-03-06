import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { useFetching } from '../libs/hooks'
import { dayMap } from '../libs/utils'
import PlansActions from '../actions/plans'

const DAYS_OF_THE_WEEK = [1,2,3,4,5,6,0]

const options = [
  { value: 'zone1', label: 'Zone 1' },
  { value: 'zone2', label: 'Zone 2' },
  { value: 'zone3', label: 'Zone 3' },
  { value: 'strength', label: 'Strength' },
  { value: 'climbing', label: 'Climbing' },
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
  const dailyWorkouts = props.workouts[dayMap(props.day)]
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
  const saveWorkout = (dow,tod) => (type, description) => {
    return dispatch(PlansActions.updatePeriod({planid: props.plan, periodid: props.period, data: {
      weekly_plan: {
        ...props.workouts,
        [dow]: {
          ...props.workouts[dow],
          ...{
            [tod]: {
              type: type,
              description
            }
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
        <button className="add-button" onClick={addWorkout("AM")} disabled={addAM}/><label>{dailyWorkouts && dailyWorkouts['AM'] ? "Edit Workout" : "Add Workout"}</label>
        {addAM ? 
          <WorkoutForm 
            workout={dailyWorkouts && dailyWorkouts['AM']} 
            cancel={() => setAddAM(false)} 
            save={saveWorkout(dayMap(props.day),'AM')}/> : 
            (dailyWorkouts && dailyWorkouts['AM']) ? 
            <WorkoutForm 
              workout={dailyWorkouts && dailyWorkouts['AM']} 
              cancel={() => setAddAM(false)} 
              save={saveWorkout(dayMap(props.day),'AM')}
              readOnly/> : null}
        <p>PM</p>
        <button className="add-button" onClick={addWorkout("PM")} disabled={addPM}/><label>{dailyWorkouts && dailyWorkouts['PM'] ? "Edit Workout" : "Add Workout"}</label>
        {addPM ? <WorkoutForm 
            workout={dailyWorkouts && dailyWorkouts['PM']} 
            cancel={() => setAddPM(false)} 
            save={saveWorkout(dayMap(props.day),'PM')}/> : 
            (dailyWorkouts && dailyWorkouts['PM']) ? 
            <WorkoutForm 
              workout={dailyWorkouts && dailyWorkouts['PM']} 
              cancel={() => setAddPM(false)} 
              save={saveWorkout(dayMap(props.day),'PM')}
              readOnly/> : null}
      </div>
    </div>
  )
}

const WorkoutForm = props => {
  const [type, setType] = useState()
  const [description, setDescription] = useState('')
  useEffect(() => {
    if(props.workout) {
      setType(props.workout.type)
      setDescription(props.workout.description)
    }
  }, [props.workout])

  function cancel(e) {
    e.preventDefault()
    props.cancel()
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }

  function handleType(e) {
    setType(e)
  }

  function saveWorkout(e) {
    e.preventDefault()
    return props.save(type, description)
  }

  return (
    <div className="workout-form">
      <label>Workout Type</label><br />
      <Select
        value={type}
        onChange={handleType}
        options={options} 
        isDisabled={!!props.readOnly}/>
      <label>Description</label><br />
      <textarea rows="5" cols="40" value={description} onChange={handleDescription} placeholder="Enter workout description" disabled={!!props.readOnly}/><br />
      {!props.readOnly ? <Fragment><button onClick={cancel}>Cancel</button><button onClick={saveWorkout}>Save</button></Fragment>: null}
    </div>
  )
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