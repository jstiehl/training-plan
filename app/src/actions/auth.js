import config from '../config'
import * as types from '../actionTypes'
import request from '../libs/request'

const AuthActions = {
  login(email) {
    return dispatch => {
      return request(`${config.auth.host}/login`, {
          method: "POST"
        }, { email })
        .then(tokens => {
          window.localStorage.setItem("tpaccess", JSON.stringify(tokens.accessToken))
          window.localStorage.setItem("tprefresh", JSON.stringify(tokens.refreshToken))
          return dispatch({
            type: types.LOGIN_SUCCESSFUL,
            payload: tokens
          })
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  verifyAuth() {
    const accessToken = window.localStorage.getItem('tpaccess')
    return dispatch => {
      if(accessToken) {
        return dispatch({
          type: types.USER_AUTHED
        })
      }
    }
  },
  refreshToken() {
    const refreshToken = JSON.parse(window.localStorage.getItem('tprefresh'))
    if(!refreshToken) {
      //logout user
      return AuthActions.logout()
    }
    return dispatch => {
      return request(`${config.auth.host}/refresh`, {
          method: "POST"
        }, { token: refreshToken })
        .then(tokens => {
          window.localStorage.setItem("tpaccess", JSON.stringify(tokens.accessToken))
          window.localStorage.setItem("tprefresh", JSON.stringify(tokens.refreshToken))
          return dispatch({
            type: types.TOKEN_REFRESH_SUCCESSFUL,
            payload: tokens
          })
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  logout() {
    window.localstorage.removeItem("tpaccess")
    window.localstorage.removeItem("tprefresh")
  }
}

export default AuthActions