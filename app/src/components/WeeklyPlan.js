import React, { useState } from 'react'
const DAYS_OF_THE_WEEK = [1,2,3,4,5,6,0]
const WeeklyPlan = ({ workouts }) => {
  let dayCards = DAYS_OF_THE_WEEK.map(day => {
    return <DayCard day={day} key={day}/>
  })

  return (
    <div>
      <h3>Weekly Workout Plan</h3>
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
  const addWorkout = tod => e => {
    e.preventDefault()
    if(tod === 'AM') {
      setAddAM(true)
    } else {
      setAddPM(true)
    }
  }
  return (
    <div className="day-card">
      <p className="day-title">{dayMap(props.day)}</p>
      <div className="workouts">
        <p>AM</p>
        <button className="add-button" onClick={addWorkout("AM")} disabled={addAM}/><label>Add Workout</label>
        {addAM ? <div>Form Here</div> : null}
        <p>PM</p>
        <button className="add-button" onClick={addWorkout("PM")} disabled={addPM}/><label>Add Workout</label>
        {addPM ? <div>Form Here</div> : null}
      </div>
    </div>
  )
}

// const WorkoutForm = props => {

// }

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