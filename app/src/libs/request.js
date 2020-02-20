import config from '../config'
import { getAccessToken, getRefreshToken, deleteTokens, setTokens } from './utils'

const request = async (path, options, data = {}) => {
  let token, refreshToken
  let headers = {
    'Content-Type': 'application/json',
  }
  let requestOptions = {}

  if(options.method) {
    requestOptions.method = options.method
  }

  //if additional headers are passed let's add those
  if(options.headers) {
    headers = {
      ...headers,
      ...options.headers
    }
  }

  if(options.auth) {
    try {
      token = getAccessToken()
    } catch(e) {
      console.log("error getting access token")
      //should I logout user here?
      return deleteTokens()
    }
    //check refresh needed here
    if(token.expires - Date.now() < 0) {
      refreshToken = getRefreshToken()
      await fetch(`${config.auth.host}/refresh`, {
          method: "POST",
          body: JSON.stringify({ token: refreshToken.token })
        })
        .then(res => res.json())
        .then(tokens => {
          setTokens(tokens)
        })
        .catch(e => {
          console.log(e)
          //logout user if refresh token fails
          return deleteTokens()
        })

      try {
        token = getAccessToken()
      } catch(e) {
        console.log("error getting access token")
        //should I logout user here?
        return deleteTokens()
      }
    }
    headers['Authorization'] = `Bearer ${token.token}`
  }

  if(Object.keys(data).length) {
    requestOptions.body = JSON.stringify(data)
  }

  requestOptions.headers = headers
  const response = await fetch(path, requestOptions)
    .then(res => res.json())

  return response
}

export default request