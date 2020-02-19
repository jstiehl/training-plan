import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthActions from '../actions/auth'
import Header from './Header'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')

  function login(e) {
    e.preventDefault()
    return dispatch(AuthActions.login(email))
  }

  return (
    <div className="App">
      <Header />
      <div className="login-form">
        <h1>Training Plan Login</h1>
        <div>
          <input 
            onChange={e => setEmail(e.target.value)} 
            placeholder='Enter User Email' 
            value={email}/>
        </div>
        <div className='submit-bar'>
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login