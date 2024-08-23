import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assest from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import assets from '../../assets/assets'
import { onSnapshot , doc, updateDoc, arrayUnion, getDoc} from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'

const ChatBox = () => {

  const {userData, chatUser, setChatUser, setMessages, messages, messagesId} = useContext(AppContext)

  const [input, setInput ] = useState("");

  const sendMessage = async () => {
    try {

      if(input && messagesId){
        await updateDoc(doc(db, 'messages', messagesId), {
          messages : arrayUnion({
            sId : userData.id,
            text: input,
            createdAt : new Date()
          })
        })

        const userIDs = [chatUser.rId, userData.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, 'chats', id);
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex((c)=> c.messageId === messagesId)
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0,30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatsData : userChatData.chatsData
            })
          }
        })
      }
    } catch (error) {
      toast.error(error.messages)
    }
    setInput("")
  }
  
  useEffect(()=>{
    if (messagesId) {
      
      const unSub = onSnapshot(doc(db, 'messages', messagesId), (res)=>{
        setMessages(res.data().messages.reverse())
        console.log(res.data().messages.reverse())
      })
      return ()=>{
        unSub();
      }
    }
  },[messagesId])


  return chatUser ? (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>{chatUser.userData.name} <img className='dot' src={assest.green_dot}/></p>
        <img src={assest.help_icon} className='help' alt="" />
      </div>

      <div className="chat-message">
        <div className="s-msg">
          <p className="msg">
            Lorem ipsum dolor sit amet consectetur adipisicing ...
          </p>
          <div>
            <img src={assest.profile_img} />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className="s-msg">
          <img className='msg-img' src={assest.pic1} alt="" />
          <div>
            <img src={assest.profile_img} />
            <p>2:30 PM</p>
          </div>
        </div>

        <div className="r-msg">
          <p className="msg">
            Lorem ipsum dolor sit amet consectetur adipisicing ...
          </p>
          <div>
            <img src={assest.profile_img} />
            <p>2:30 PM</p>
          </div>
        </div>
      </div>
      
      <div className="chat-input">
        <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Send a message' />
        <input type="file" id="image" accept='image/png, image/jpeg, image/jpg' hidden />
        <label htmlFor="image">
          <img src={assest.gallery_icon} alt="" />
        </label>
        <img onClick={sendMessage} src={assest.send_button} alt="" />
      </div>
    </div>
  ) : <div className='chat-welcome'>
        <img src={assets.logo_icon} alt="" />
        <p>Chat anytime, anywhere</p>
      </div>
}

export default ChatBox