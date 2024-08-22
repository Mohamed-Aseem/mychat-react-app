import React, { useContext, useState } from 'react'
import './LeftSideBar.css'
import assest from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'

const LeftSideBar = () => {

  const navigate = useNavigate();

  const {userData} = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [ showSearch, setShowSearch] = useState(false)

  const inputHandler = async (e)=>{
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true)
        const userRef = collection(db, 'users')
        const q = query(userRef, where("username", "==", input.toLowerCase()))
        const querySnap = await getDocs(q);
        if(!querySnap.empty && querySnap.docs[0].data().id !== userData.id){
          setUser(querySnap.docs[0].data())
        }else{
          setUser(null)
        }
      }else{
         setShowSearch(false)
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assest.logo} className='logo' alt="Logo" />
          <div className="menu">
            <img src={assest.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={()=>navigate('/profile-update')}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assest.search_icon} alt="" />
          <input onChange={inputHandler} type="text" placeholder='Search here...' />
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
        {showSearch && user ? 
          <div className="friends add-user">
            <img src={user.avatar} alt="" />
            <div>
              <p>{user.name}</p>
            </div>
        </div>
        :
          Array(12).fill('').map((item, index)=>(
            <div className="friends" key={index}>
              <img src={assest.profile_img} alt="" />
              <div>
                <p>Aseem Ismail</p>
                <span>Hello, How are you?</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LeftSideBar