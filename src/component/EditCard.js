import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import "../App.scss"

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

function EditCard({ update, open, children, onClose, obj }) {
  const [input, setInput] = useState('');
  const [chi, setChi] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "input") {
      setInput(value);
    } else {
      setChi(value);
    }
  }

  useEffect(() => {
    setInput(obj.Word);
    setChi(obj.Chinese);
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault();
    let wordObj = {};
    wordObj["Word"] = input;
    wordObj["Chinese"] = chi;
    wordObj["Yellow"] = obj.Yellow;
    update(wordObj);
    setInput('');
    setChi('');
  }

  const enterHandler = e => {
    if (e.key === 'Enter')
      handleUpdate(e);
  }

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className="popup" style={MODAL_STYLES}>
        <div className="popup--header"><h1 className="popup--text">add a word</h1></div>
        <div className="flex__input--1">
          <h1>單字</h1>
          <input value={input} className="ipt eng" placeholder="English" name="input" onChange={handleChange}></input>
        </div>
        <div className="flex__input--2">
          <h1>中譯</h1>
          <input value={chi} className="ipt chi" placeholder="Chinese" name="chi" onChange={handleChange} onKeyDown={enterHandler}></input>
        </div>
        <div className="flex__button">
          <button className="btn close" onClick={onClose}>Cancel</button>
          <button className="btn submit" onClick={handleUpdate}>Add</button>
        </div>

        {children}
      </div>
    </>,
    document.getElementById('editModal')
  )
}

export default EditCard