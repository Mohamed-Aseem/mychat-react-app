import React, { useContext, useState } from 'react'
import './LeftSideBar.css'
import assest from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { arrayUnion, doc, collection, setDoc , getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'

const LeftSideBar = () => {

  const navigate = useNavigate();

  const {userData, chatData, chatUser, setChatUser, setMessagesId, messagesId} = useContext(AppContext);
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
          let userExist = false;
          chatData.map((user)=>{
            if (user.rId === querySnap.docs[0].data().id) {
              userExist = true
            }
          })
          if(!userExist){
            setUser(querySnap.docs[0].data())
          }
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

  const addChat = async () =>{
    const messagesRef = collection(db, 'messages');
    const chatRef = collection(db, 'chats');
    try {
      const newMessageRef = doc(messagesRef);
      
      await setDoc(newMessageRef, {
        createAt : serverTimestamp(),
        message: []
      })

      await updateDoc(doc(chatRef, user.id), {
        chatsData : arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updateAt: Date.now(),
          messageSeen : true
        })
      })

      await updateDoc(doc(chatRef, userData.id), {
        chatsData : arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updateAt: Date.now(),
          messageSeen : true
        })
      })

    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }

  }

  const setChat = async (item) =>{
    setMessagesId(item.messageId);
    setChatUser(item)
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
          <div onClick={addChat} className="friends add-user">
            <img src={user.avatar} alt="" />
            <div>
              <p>{user.name}</p>
            </div>
        </div>
        :
          chatData.map((item, index)=>(
            <div onClick={() => setChat(item)} className="friends" key={index}>
              <img src={item.userData.avatar} alt="" />
              <div>
                <p>{item.userData.name}</p>
                <span>{item.lastMessage}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LeftSideBar