import React from 'react'
import './QuestionIcon.css'

function QuestionIcon(props) {

    const unanswered = {
        color: "#C2C2C2",
        border: "1px solid #C2C2C2"
    }

    const mfl = {
        backgroundColor:"#FFEABE",
        border:"1px solid #FDB827",
        color:"#FDB827"
    }

    const active = {
        border: "1px solid #757575",
        color: "#757575"
    }

    const answered = {
        backgroundColor:"#EAFAF7",
        border:"1px solid #28C8AB",
        color:"#28C8AB"
    }

    const whatStyle = ()=>{
        if(props.question.isMFL)
        {
            return mfl
        }
        else if( props.currentQuestionIndex === props.index )
        {
            return active
        }
        else if( props.question.userAnswer !== "")
        {
            return answered
        }
        else
        {
            return unanswered
        }
    }

    if(props.question.isMFL)
    {
        console.log(true);
    }

    return (
        <div onClick={props.onClick} style={whatStyle()} className="question-icon-container">
            {props.children}
        </div>
    )
}

export default QuestionIcon