import React from 'react'
import './LeftSideBar.css'
import assest from '../../assets/assets'

const LeftSideBar = () => {
  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assest.logo} className='logo' alt="Logo" />
          <div className="menu">
            <img src={assest.menu_icon} alt="" />
            <div className="sub-menu">
              <p>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assest.search_icon} alt="" />
          <input type="text" placeholder='Search here...' />
        </div>
      </div>
      <div className="ls-list">
        {/* <div className="friends">
          <img src={assest.profile_img} alt="" />
          <div>
            <p>Aseem Ismail</p>
            <span>Hello, How are you?</span>
          </div>
        </div> */}
        {Array(12).fill('').map((item, index)=>(
          <div className="friends" key={index}>
            <img src={assest.profile_img} alt="" />
            <div>
              <p>Aseem Ismail</p>
              <span>Hello, How are you?</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftSideBar