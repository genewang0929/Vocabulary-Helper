import React, {useState, useRef} from 'react'
import ReactDom from 'react-dom'
import "../Login.scss"
import "../App.scss"
import { useAuth } from "../store/auth-context"

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

function ForgotPW({open, children, onClose}) {

  
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      setLoading(true)
      await resetPassword(emailRef.current.value)
      alert("Check your inbox for further instructions")
    } catch {
      alert("Failed to reset password")
    }
    
    setLoading(false)
  }
  
  if (!open) return null;
  return ReactDom.createPortal(
    <>
        <div style={OVERLAY_STYLES} />
        <form className="popup" style={MODAL_STYLES} onSubmit={handleSubmit}>
            <div className="popup--header forgotPW"><h1 className="forgotPW text">Send Password</h1></div>
            <h1 className="login__input user">Email Address:</h1>
            <div className="login type"><input className="login__input" type="email" placeholder="Enter Email" ref={emailRef}></input></div>
            <div className="login type"><button disabled={loading} className="login__button">Send</button></div>
            <div className="login type"><button className="login__button exit" onClick={onClose}>Exit</button></div>
            {children}
        </form>
    </>,
    document.getElementById('forgotPW')
  )
}

export default ForgotPW