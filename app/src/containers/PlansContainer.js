import React, { useState, useEffect } from 'react'
import Plans from '../components/Plans'

const PlansContainer = props => {
  //use useEffect and useState to fetch users plans
  const [plans, setPlans] = useState([{id: 1, name:"Training 2020", periods: [{id:1, name: "Base Period", duration: 4}]}])

  useEffect(() => {
    if(false) {
      setPlans([])
    }
  }, [plans])

  return (
    <Plans 
      plans={plans}/>
  )
}

export default PlansContainer