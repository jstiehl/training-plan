import React from 'react'
import { useSelector } from 'react-redux'
import Plans from '../components/Plans'
import PlansActions from '../actions/plans'
import { useFetching } from '../libs/hooks'


const PlansContainer = props => {
  //use useEffect and useState to fetch users plans
  useFetching(PlansActions.getPlans)
  const plans = useSelector(state => state.plans)
  return (
    <Plans 
      plans={plans.plans}/>
  )
}

export default PlansContainer