import React from 'react'
import './ChatBox.css'
import assest from '../../assets/assets'

const ChatBox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assest.profile_img} alt="" />
        <p>Fathima Sahiya <img className='dot' src={assest.green_dot}/></p>
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
        <input type="text" placeholder='Send a message' />
        <input type="file" id="image" accept='image/png, image/jpeg, image/jpg' hidden />
        <label htmlFor="image">
          <img src={assest.gallery_icon} alt="" />
        </label>
        <img src={assest.send_button} alt="" />
      </div>
    </div>
  )
}

export default ChatBox