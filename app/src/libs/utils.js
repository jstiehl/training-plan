export const dayMap = day => {
  switch(day) {
    case 1: 
      return "Monday"
    case 2: 
      return "Tuesday"
    case 3: 
      return "Wednesday"
    case 4: 
      return "Thursday"
    case 5: 
      return "Friday"
    case 6: 
      return "Saturday"
    case 0:
    default:
      return "Sunday"
  }
}

export const getAccessToken = () => {
  let token
  try {
    token = JSON.parse(window.localStorage.getItem('tpaccess'))
  } catch (e) {
    console.log("no token available")
    throw(e)
  }

  return token
}

export const getRefreshToken = () => {
  let token
  try {
    token = JSON.parse(window.localStorage.getItem('tprefresh'))
  } catch (e) {
    console.log("no refresh token available")
    throw(e)
  }

  return token
}

export const deleteTokens = () => {
  window.localStorage.removeItem("tpaccess")
  window.localStorage.removeItem("tprefresh")
}

export const setTokens = tokens => {
  window.localStorage.setItem("tpaccess", JSON.stringify(tokens.accessToken))
  window.localStorage.setItem("tprefresh", JSON.stringify(tokens.refreshToken))
}