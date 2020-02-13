import React from 'react'
import { dayMap } from '../libs/utils'
import Img from 'react-image'
import Zone1Logo from '../assets/zone1.png'
import Zone2Logo from '../assets/zone2.png'
import Zone3Logo from '../assets/zone3.png'
import StrengthLogo from '../assets/strength.png'

const Home = ({ plan }) => {
  if(!plan) return null
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
    <div className="workout-card">
      <p className="workout-title">{today}</p>
      <div className="workouts">
        <h3>Morning Workout</h3>
        <div className="tod-workout">
          {workouts['AM'] ? <span className="workout-image"><Img src={WorkoutImage(workouts['AM'].type.value)} /></span> : null}
          <p>{workouts['AM'] ? `${workouts['AM'].type.label} : ${workouts['AM'].description}`: 'No Morning Workout Today!'}</p>
        </div>
        <h3>Evening Workout</h3>
        <div className="tod-workout">
          {workouts['PM'] ? <span className="workout-image"><Img src={WorkoutImage(workouts['PM'].type.value)} /></span> : null}
          <p>{workouts['PM'] ? `${workouts['PM'].type.label} : ${workouts['PM'].description}`: 'No Evening Workout Today!'}</p>
        </div>
      </div>
    </div>
  )
}

function WorkoutImage(type) {
  switch(type) {
    case 'zone1':
      return Zone1Logo
    case 'zone2':
      return Zone2Logo
    case 'zone3':
      return Zone3Logo
    case 'strength':
      return StrengthLogo
    default:
      return Zone1Logo
  }
}