import React from 'react'

const PlansList = ({ plans }) => {
  const buildList = () => {
    if(!plans.length) {
      return <p>You have not created any plans yet!</p>
    }

    const plansList = plans.map((plan, i) => {
      return <li key={i}>{plan.name}: {plan.description}</li>
    })
    return (
      <ul>
        {plansList}
      </ul>
    )
  }
  return (
    <div>
      {buildList()}
    </div>
  )
}

export default PlansList