import postgres from '../libs/postgres'
const db = postgres.db

export default {
  getPlans: (req, res) => {
    //i need to get user id from somewhere?
    const userid = (req.user && req.user.id) || 1
    return db
      .query('select * from training_plan where userid = $1', [userid])
      .then(plans => {
        res.status(200).send(plans)
      })
      .catch(e => {
        //need to handle errors in server.js
        res.status(500).send(e)
      })
  },
  createPlan: (req, res) => {
    const { name, description } = req.body
    const userid = (req.user && req.user.id) || 1
    return db
      .query('insert into training_plan(name, description, userid) values ($1,$2,$3) returning *', [name, description, userid])
      .then(([plan]) => {
        res.status(200).send(plan)
      })
      .catch(e => {
        //need to handle errors in server.js
        res.status(500).send(e)
      })
  },
  updatePlan: (req,res) => {
    //update is just for setting plan to ative for now
    const { id: planid } = req.params
    if(!planid) {
      return res.status(500).send({message: "No Plan ID Specified"})
    }
    return db
      .query('update training_plan set active=True where id=$1 returning *', [planid])
      .then(([plan]) => {
        res.status(200).send(plan)
      })
      .catch(e => {
        //need to handle errors in server.js
        res.status(500).send(e)
      })
  },
  getPeriodsForPlan: (req, res) => {
    const planid = req.params.id
    if(!planid) {
      return res.status(500).send({message: "No Plan ID Specified"})
    }

    return db
      .query('select * from training_plan_period where planid = $1', [planid])
      .then(periods => {
        res.status(200).send(periods)
      })
      .catch(e => {
        //need to handle errors in server.js
        res.status(500).send(e)
      })
  },
  createPeriodForPlan: (req, res) => {
    const { name, duration } = req.body
    const planid = req.params.id
    if(!planid || !name) {
      return res.status(500).send({message: "Required Values Missing for Creating Plan Period"})
    }
    return db
      .query('insert into training_plan_period(name, duration, planid) values ($1,$2,$3) returning *', [name, duration, planid])
      .then(([period]) => {
        res.status(200).send(period)
      })
      .catch(e => {
        //need to handle errors in server.js
        res.status(500).send(e)
      })
  },
  updatePeriodForPlan: (req, res) => {
    const data = req.body
    const { id: planid, pid: periodid } = req.params
    if(!planid || !periodid) {
      return res.status(500).send({message: "Required Values Missing for Updating Plan Period"})
    }

    const queryString = Object.keys(data)
      .map((key, i) => {
        return `${key}=$${i + 1}`
      })
      .join(',')
    const queryValues = Object.keys(data).map(key => {
      if (key === 'weekly_plan') {
        return JSON.stringify(data[key])
      }
      return data[key]
    })
    queryValues.push(periodid)
    return db
      .query(`update training_plan_period set ${queryString} where id=$${queryValues.length} 
        returning *`, queryValues
      )
      .then(([period]) => {
        res.status(200).send(period)
      })
      .catch(e => {
        //need to handle errors in server.js
        res.status(500).send(e)
      })
  },
  deletePeriodForPlan: (req, res) => {
    const { id: planid, pid: periodid } = req.params
    if(!planid || !periodid) {
      return res.status(500).send({message: "Required Values Missing for Deleting Plan Period"})
    }

    return db
      .query(`delete from training_plan_period where id=$1 and planid=$2`, [periodid, planid])
      .then(() => {
        res.status(200).send({success: true}) //success
      })
      .catch(e => {
        //need to handle errors in server.js
        res.status(500).send(e)
      })
  }
}