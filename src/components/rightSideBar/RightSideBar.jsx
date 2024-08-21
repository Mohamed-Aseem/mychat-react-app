import React from 'react'
import './RightSideBar.css'
import assest from '../../assets/assets'
import { logout } from '../../config/firebase'

function RightSideBar() {
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assest.profile_img} alt="" />
        <h3>Fathima Sahiya <img src={assest.green_dot} className='dot' alt="" /></h3>
        <p>Hi there! I'm Sahiya using myChat app</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assest.pic1} />
          <img src={assest.pic2} />
          <img src={assest.pic3} />
          <img src={assest.pic4} />
          <img src={assest.pic1} />
          <img src={assest.pic2} />
        </div>
      </div>
      <button onClick={()=> logout()}>Logout</button>
    </div>
  )
}

export default RightSideBar