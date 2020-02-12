import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import PlansActions from '../actions/plans'
import { useFetching } from '../libs/hooks'
import Home from '../components/Home'

const HomeContainer = props => {
  //use useEffect and useState to fetch users plans
  useFetching(PlansActions.getActivePlan)
  const activePlan = useSelector(state => state.plans.activePlan, shallowEqual)
  return (
    <Home 
      plan={activePlan} />
  )
}

export default HomeContainer