import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import QuizStart from '../component/QuizStart';
import "../Quiz.scss"

function Quiz() {
    const [start, setStart] = useState(true);
    const qWordList = JSON.parse(localStorage.getItem("starWord"));

    const handleStart = () => {
        shuffle();
        resetqWordList();
        setStart(false);
    }

    const shuffle = () => {
        for(let i = qWordList.length - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = qWordList[i];
            qWordList[i] = qWordList[j];
            qWordList[j] = temp;
        }
    }

    const resetqWordList = () => {
        localStorage.removeItem("starWord");
        localStorage.setItem("starWord", JSON.stringify(qWordList));
    }

    return (
        <div>
            {start ? <div className="Quiz">
                <div>
                    {
                        (qWordList.length) ? <h1 className="Quiz font">Translate marked words in 10 seconds</h1> : 
                        <h1 className="Quiz font">No word have been marked</h1>
                    }
                    {
                        (qWordList.length) ? <h2 className="Quiz font h2">Max: 30 words</h2> :
                        <h2 className="Quiz font h2">Go mark some words</h2>
                    }
                </div>
                {
                    (qWordList.length) ? <button className="Quiz start" onClick={handleStart}>Click to start</button> :
                    <Link to="/home" className="Quiz start2">Back to list</Link>
                }
            </div> : null}

            {!start ? <QuizStart /> : null}
        </div>
    )
}

export default Quiz
