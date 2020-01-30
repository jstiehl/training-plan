// dependencies ------------------------------------

import express from 'express'
import auth from './libs/auth'
import plans from './handlers/plans'
const routes = [
  {
    method: 'get',
    url: '/plans',
    middleware: [auth.userStatus], //need to add auth for this. should only be an admin endpoint
    handler: plans.getPlans,
  },
  {
    method: 'post',
    url: '/plans',
    middleware: [auth.userStatus], //need to add auth for this. should only be an admin endpoint
    handler: plans.createPlan,
  },
  {
    method: 'get',
    url: '/plans/:id/periods',
    middleware: [auth.userStatus], //need to add auth for this. should only be an admin endpoint
    handler: plans.getPeriodsForPlan,
  },
  {
    method: 'post',
    url: '/plans/:id/periods',
    middleware: [auth.userStatus], //need to add auth for this. should only be an admin endpoint
    handler: plans.createPeriodForPlan,
  }
]

// initialize routes -------------------------------

const router = express.Router()

for (const route of routes) {
  let arr = route.hasOwnProperty('middleware') ? route.middleware : []
  arr.unshift(route.url)
  arr.push(route.handler)
  router[route.method].apply(router, arr)
}

// export ------------------------------------------

export default router