import React, {useState} from 'react'
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

function Modal({ save, open, children, onClose }) {
  
  const [input, setInput] = useState('');
  const [chi, setChi] = useState('');
  
  const handleChange = e => {
      const {name, value} = e.target;
      if(name === "input") {
          setInput(value);
      } else {
          setChi(value);
      }
  }

  const handleSave = e => {
      e.preventDefault();
      let wordObj = {};
      if(input === "" && chi === "")
        return;
      wordObj["Word"] = input;
      wordObj["Chinese"] = chi;
      wordObj["Yellow"] = false;
      save(wordObj);
      setInput('');
      setChi('');
  }

  const enterHandler = e => {
    if(e.key === 'Enter') {
        handleSave(e);
    }
  }

  if (!open) return null;

  return ReactDom.createPortal(
    <>
        <div style={OVERLAY_STYLES} />
        <div className="popup" style={MODAL_STYLES}>
            <div className="popup--header"><h1 className="popup--text">add a word</h1></div>
            <div className="flex__input">
                <h1>單字</h1>
                <input value={input} className="ipt" placeholder="English" name="input" onChange={handleChange}></input>
            </div>
            <div className="flex__input">
                <h1>中譯</h1>
                <input value={chi} className="ipt" placeholder="Chinese" name="chi" onChange={handleChange} onKeyDown={enterHandler}></input>
            </div>
            <div className="flex__button">
                <button className="btn close" onClick={onClose}>Cancel</button>
                <button className="btn submit" onClick={handleSave}>Add</button>
            </div>
            
            {children}
        </div>
    </>,
    document.getElementById('modal')
  )
}

export default Modal