import { getAccessToken } from './utils'

const request = (path, options, data = {}) => {
  let token
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
    }
    //check refresh needed here
    headers['Authorization'] = `Bearer ${token.token}`
  }

  if(Object.keys(data).length) {
    requestOptions.body = JSON.stringify(data)
  }

  requestOptions.headers = headers
  return fetch(path, requestOptions)
    .then(res => res.json())
}

export default request