import postgres from './postgres'
const db = postgres.db

export default {
  userStatus(req, res, next) {
    let token = req.headers.tgauthorization
    return next()
    return db
      .oneOrNone('select * from user_session where token=$1', [token])
      .then(session => {
        if (!session.token) {
          throw new Error()
          return
        }
        req.user = session.userid
        next()
      })
      .catch(e => {
        let error = {
          status: 403,
          message: 'Permission Denied',
        }
        next(error)
      })
  }
}