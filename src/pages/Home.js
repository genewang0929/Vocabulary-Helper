import React, { useState, useEffect } from 'react'
import "../App.scss"
import Card from '../component/Card'
import Modal from '../component/Modal'

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);
  const [showChi, setShowChi] = useState(false);
  const [starWord, setStarWord] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem("list");
    if (arr) {
      let obj = JSON.parse(arr);
      setList(obj);
    }
    let arr2 = localStorage.getItem("starWord");
    if (arr2) {
      let obj2 = JSON.parse(arr2);
      setStarWord(obj2);
    } else {
      localStorage.setItem("starWord", '[]');
    }
  }, [])

  const saveWord = (word) => {
    let tempList = list;
    tempList.push(word);
    localStorage.setItem("list", JSON.stringify(tempList));
    setList(tempList);
    setIsOpen(false);
  }

  const deleteWord = (obj) => {
    let tempList = list;
    for(let i = 0; i < tempList.length; i++) {
      if(tempList[i] === obj) {
        tempList.splice(i, 1);
      }
    }
    localStorage.setItem("list", JSON.stringify(tempList));
    setList(tempList);
    deleteQuiz(obj);
    window.location.reload();
  }

  const updateListArray = (obj, Word) => {
    let tempList = list;
    console.log(Word);
    for(let i = 0; i < tempList.length; i++) {
      if(tempList[i].Word === Word) {
        tempList[i] = obj;
      }
    }
    localStorage.setItem("list", JSON.stringify(tempList));
    setList(tempList);
    window.location.reload();
  }

  const addQuiz = (obj) => {
    let tempList = starWord;
    tempList.push(obj);
    localStorage.setItem("starWord", JSON.stringify(tempList));
    setStarWord(tempList);
  }

  const deleteQuiz = (obj) => {
    console.log(obj.Yellow);
    let tempList = starWord;
    for(let i = 0; i < tempList.length; i++) {
      if(tempList[i].Word === obj.Word) {
        tempList.splice(i, 1);
      }
    }
    localStorage.setItem("starWord", JSON.stringify(tempList));
    setStarWord(tempList);
  }

  const updateYellow = (obj, Word) => {
    let tempList = list;
    for(let i = 0; i < tempList.length; i++) {
      if(tempList[i].Word === Word) {
        tempList[i] = obj;
      }
    }
    localStorage.setItem("list", JSON.stringify(tempList));
    setList(tempList);
  }

  return (
    <div>
      <h1 className="list--header">Vocabulary List</h1>
      <div className="list">
        <div className="addheader">
          <button className="btn add" onClick={() => setIsOpen(true)}>Add words</button>
          <button onClick={() => setShowChi(!showChi)} className="icon hide">
            <i className="fas fa-eye"></i>
          </button>
        </div>
        {list.map((obj, index) =>
          <Card
            key={obj.Word}
            obj={obj}
            index={index}
            showChi={showChi}
            deleteWord={deleteWord}
            updateListArray={updateListArray}
            addQuiz={addQuiz}
            deleteQuiz={deleteQuiz}
            updateYellow={updateYellow}
          />
        )}
      </div>
      <Modal save={saveWord} open={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </div>
  )
}

export default Home
