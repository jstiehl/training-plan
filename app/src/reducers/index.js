import { combineReducers } from 'redux'
import plans from './plans'
import auth from './auth'
export default combineReducers({plans, auth})