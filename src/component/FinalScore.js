import React from 'react'
import "../App.scss"

function FinalScore({ wrongAns, isWrong }) {

    const handleAgain = () => {
        window.location.reload();
    }

    return (
        <div>
            {
                isWrong ? <h1 className="list--header">Wrong words</h1> : 
                <h1 className="list--header">All correct!</h1>
            }
            <div className="list">
                {wrongAns.map((obj) =>
                    <div key={obj.Word}>
                        <div className="wordbar">
                            <div className="word"><h1>{obj.Word}</h1></div>
                            <div className="word"><h1>{obj.Chinese}</h1>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <button className="tryAgain" onClick={handleAgain}>Try again</button>
        </div>
    )
}

export default FinalScore
