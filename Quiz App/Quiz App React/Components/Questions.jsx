import questions from "../questions.js";
import ProgressBar from "./ProgressBar.jsx";
import {useState,useRef} from "react";


export default function Answers({handleNullAnswer,answers,handleOnClick,questionText,active,answer}){
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...answers];
        console.log(shuffledAnswers.current);
        shuffledAnswers.current.sort(()=>(Math.random()-0.5))
        console.log(shuffledAnswers.current)
    }

    return(
        <div id="question">
            <ProgressBar timeout={10000} onTimeout={handleNullAnswer}/>
            <h2>{questionText}</h2>
            <ul id="answers">
                {
                    shuffledAnswers.current.map(a => {
                        let classes = "";
                        if(active === 'selected' && a === answer){
                            classes += "selected";
                        }
                        else if(active === 'correct' && a === answer){
                            classes += 'correct';
                        }
                        else if(active === 'wrong' && a === answer) {
                            classes += 'wrong';
                        }

                        return( <li key={a} className="answer">
                            <button className={classes} onClick={() => handleOnClick(a)}>{a}</button>
                        </li>)

                    })}
            </ul>
        </div>
    )
}