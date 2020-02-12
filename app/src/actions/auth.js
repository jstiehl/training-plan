import config from '../config'
import * as types from '../actionTypes'

const AuthActions = {
  login(email) {
    return dispatch => {
      return fetch(`${config.auth.host}/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        })
        .then(res => res.json())
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
  refreshToken() {
    const refreshToken = JSON.parse(window.localStorage.getItem('tprefresh'))
    if(!refreshToken) {
      //logout user
      return AuthActions.logout()
    }
    return dispatch => {
      return fetch(`${config.auth.host}/refresh`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: refreshToken })
        })
        .then(res => res.json())
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