import React from 'react'
import { dayMap } from '../libs/utils'

const Home = ({ plan }) => {
  if(!plan) return null
  console.log(plan)
  const today = dayMap(new Date().getDay())
  const period = plan.periods.find(p => p.id === 5)
  const todaysWorkouts = period.weekly_plan[today]
  return (
    <div>
      <h1>{plan.plan.name}</h1>
      <h4>Today's Workout</h4>
      <TodaysWorkouts workouts={todaysWorkouts} today={today}/>
    </div>
  )
}

export default Home

const TodaysWorkouts = ({ workouts, today }) => {
  if(!workouts) {
    return <div>No Workouts Scheduled Today</div>
  }
  return (
    <div className="day-card">
      <p className="day-title">{today}</p>
      <div className="workouts">
        <p>AM</p>
        <p>{workouts['AM'] ? `${workouts['AM'].type.label} : ${workouts['AM'].description}`: 'No Morning Workout Today!'}</p>
        <p>PM</p>
        <p>{workouts['PM'] ? `${workouts['PM'].type.label} : ${workouts['PM'].description}`: 'No Evening Workout Today!'}</p>
      </div>
    </div>
  )
}