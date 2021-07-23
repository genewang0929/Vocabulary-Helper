import React, { useState } from 'react'
import "../VoList.scss"
import EditCard from './EditCard'

function Card(
    {
        obj,
        index,
        showChi,
        deleteWord,
        updateListArray,
        addQuiz,
        deleteQuiz,
        updateYellow
    }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isYellow, setIsYellow] = useState(obj.Yellow);

    const handleYellow = e => {
        if (isYellow) {
            obj.Yellow = false;  
            deleteQuiz(obj);
        } else {
            obj.Yellow = true;
            addQuiz(obj);
        }
        setIsYellow(obj.Yellow);
        updateYellow(obj, obj.Word);
    }

    const handleDelete = () => {
        deleteWord(obj);
    }

    const update = (obj) => {
        updateListArray(obj, obj.Word);
    }

    return (
        <div>
            <div className="wordbar">
                <div className="word"><h1>{obj.Word}</h1></div>
                <div className="word">
                    {
                        showChi ? <h1>{obj.Chinese}</h1> : null
                    }
                </div>
                <button className="icon" onClick={() => setIsOpen(true)}>
                    <i className="fas fa-edit"></i>
                </button>
                <button className={isYellow ? "icon-1" : "icon"} onClick={handleYellow}>
                    <i className="fas fa-star"></i>
                </button>
                <button className="icon" onClick={(handleDelete)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
            <EditCard update={update} open={isOpen} onClose={() => setIsOpen(false)} obj={obj} />
        </div>

    )
}

export default Card
