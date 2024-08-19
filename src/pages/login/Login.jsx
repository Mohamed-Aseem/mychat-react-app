import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign up')

  return (
    <div className='login'>
      <img className='logo' src={assets.logo_big} alt="" />
      <form className="login-form">
        <h2>{currentState}</h2>
        {currentState == 'Sign up' ? <input type="text" className="form-input" placeholder='username' required />: null}
        <input type="email" className="form-input" placeholder='email' required/>
        <input type="password" className="form-input" placeholder='password' required/>
        <button type='submit'>{currentState == 'Sign up' ? 'Create account': 'Login now'}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {
            currentState == 'Sign up' 
            ? <p className='login-toggle'>Already have an account <span onClick={()=>setCurrentState('Login')}>Login here</span></p>
            : <p className='login-toggle'>Create an account <span onClick={()=>setCurrentState('Sign up')}>click here</span></p> 
          }
        </div>
      </form>
    </div>
  )
}

export default Login