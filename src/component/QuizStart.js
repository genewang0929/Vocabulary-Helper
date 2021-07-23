import React, { useState, useRef, useEffect } from 'react'
import FinalScore from '../component/FinalScore';
import "../QuizStart.scss"

function QuizStart() {
    const ans = useRef();
    let interval = useRef();
    const qWordList = JSON.parse(localStorage.getItem("starWord"));
    const totalQnum = (qWordList.length > 30) ? 30 : qWordList.length;
    const [wrongAns, setWrongAns] = useState([]);
    const [isWrong, setIsWrong] = useState();
    const [quizWord, setQuizWord] = useState(qWordList[0]);
    const [finalScore, setFinalScore] = useState(false);
    const [showMark, setShowMark] = useState(false);
    const [markType, setMarkType] = useState(false);
    const [qnum, setQnum] = useState(1);
    const [countDown, setCountDown] = useState(10);

    const nextWord = () => {
        setQuizWord(qWordList[qnum]);
    }

    const startTimer = () => {
        interval.current = setInterval(() => {
            if (countDown === 0) {
                setShowMark(true);
                setMarkType(false);
                addWrongAns();
                clearInterval(interval.current);
                if (qnum < totalQnum) {
                    handleNextQ();
                } else {
                    setTimeout(() => {
                        setFinalScore(true);
                        checkIsWrong();
                    }, 2000);
                }
            } else {
                setCountDown(countDown - 1)
            }
        }, 1000);
    }

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    }, [qnum])

    const handleQ = e => {
        e.preventDefault();
        setShowMark(true);
        if (ans.current.value === quizWord.Chinese) {
            setMarkType(true);
        } else {
            setMarkType(false);
            addWrongAns();
        }
        if (qnum < totalQnum) {
            handleNextQ();
        } else {
            setTimeout(() => {
                setFinalScore(true);
                checkIsWrong();
            }, 2000);
        }
    }

    const handleNextQ = () => {
        setTimeout(() => {
            nextWord();
            setShowMark(false);
            ans.current.value = "";
            setQnum(qnum + 1);
            setCountDown(10);
        }, 2000);
    }

    const addWrongAns = () => {
        let temp = wrongAns;
        console.log(temp, quizWord);
        temp.push(quizWord);
        setWrongAns(temp);
    }

    const checkIsWrong = () => {
        (wrongAns.length > 0) ? setIsWrong(true) : setIsWrong(false);
    }

    return (
        <div>
            {!finalScore ? <div className="quizstart">
                <div className="quizstart blackborder">
                    <h1 className="quizstart font">{quizWord.Word}</h1>
                </div>
                <form className="quizstart mid" onSubmit={handleQ}>
                    <input className="quizstart mid inputs" type="text" placeholder="輸入答案" ref={ans}></input>
                    <button className="quizstart mid buttons"><i className="fas fa-location-arrow"></i></button>
                </form>
                <div className="grid-container">
                    <h1 className="grid-item--1"><i className="fas fa-clock"></i>{countDown}</h1>
                    <h1 className="grid-item--2"><i className="fas fa-pencil-alt"></i>{qnum}/{totalQnum}</h1>
                </div>
                {(showMark && markType) ? <div className="answer--1">
                    <i className="fas fa-check"></i>
                </div> : null}
                {(showMark && !markType) ? <div className="answer--2">
                    <i className="fas fa-times"></i>
                </div> : null}
            </div> : null}
            {finalScore ? <FinalScore wrongAns = {wrongAns} isWrong = {isWrong}/> : null}
        </div>

    )
}

export default QuizStart
