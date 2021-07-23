import React from 'react'
import { Link } from 'react-router-dom'
import "../Quiz.scss"
import gif from '../img/coding.gif'

function Introduce() {
    return (
        <div>
            <div className="background">
                <img src={gif} alt="gif" className="background"></img>
            </div>
            <div className="Quiz">
                <div><h1 className="Quiz font">Create your own vocabulary list</h1></div>
                <Link to="/login" className="Quiz start2">Get Started</Link>
            </div>
        </div>
    )
}

export default Introduce
