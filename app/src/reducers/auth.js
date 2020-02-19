import * as types from '../actionTypes'
const initialState = {
  authed: false
}

const auth = (state=initialState, action) => {
  switch(action.type) {
    case types.LOGIN_SUCCESSFUL:
    case types.USER_AUTHED:
      return {
        authed: true
      }
    case types.LOGOUT:
      return {
        authed: false
      }
    default:
      return state
  }
}

export default auth