import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup, login } from '../../config/firebase'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmitHandler = (event) =>{
    event.preventDefault();
    if(currentState === "Sign up"){
      signup(username, email, password)
    }else{
      login(email, password)
    }
  }

  return (
    <div className='login'>
      <img className='logo' src={assets.logo_big} alt="" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currentState}</h2>
        {currentState == 'Sign up' ? <input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" className="form-input" placeholder='username' required />: null}
        <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" className="form-input" placeholder='email' required/>
        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className="form-input" placeholder='password' required/>
        <button type='submit'>{currentState == 'Sign up' ? 'Create account': 'Login now'}</button>
        {currentState == 'Sign up' ? 
          <div className="login-term">
            <input type="checkbox" required/>
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        : null}
        
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