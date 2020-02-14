import jwt from 'jsonwebtoken'
import postgres from './postgres'
const db = postgres.db

export default {
  userStatus(req, res, next) {
    let token = req.headers.authorization
    try {
      const decoded = jwt.verify(token.split('Bearer ')[1], "Dozo6da2aiphoh0QuahKujee1Osei0is5abeefeeguy0RoJai9Leet2ai9ahkotu")
      req.user = decoded.id
      return next()
    } catch(e) {
      let error = {
        http_code: 403,
        message: 'Permission Denied',
      }
      return next(error)
    }
  }
}