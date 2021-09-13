import React,{ useState,useEffect } from 'react'
import QuestionIcon from '../Test/QuestionIcon';
import AnswerIcon from './AnswerIcon';
import Correctans from './Correctans';
import Incorrectans from './Incorrectans';
import axios from 'axios'
import { BookmarkCheckFill, BookmarkDash } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'
import '../Test/Test.css'

function TestDetails() {

    let[questions,setQuestions]=useState([])
    let[currentQuestion,setCurrentQuestion]=useState({});
    let[currentQuestionIndex,setCurrentQuestionIndex]=useState(0)

    useEffect(()=>{
        axios.get('https://quizapp-2.herokuapp.com/getTestDetails')
        .then((res) => {
            console.log(res);
            setQuestions(res.data.questionDetails)
            setCurrentQuestion(res.data.questionDetails[0])
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const handleNext = (e)=>{
        if(currentQuestionIndex === 19)
        {
            return alert( "that was last question of test" )
        }
        setCurrentQuestion( questions[ currentQuestionIndex+1 ] )
        setCurrentQuestionIndex( ( prevState )=>{ return prevState+1 } )
    }

    const handlePrev = ()=>{
        if( currentQuestionIndex === 0 )
        {
            return alert( "that was first question of test" )
        }
        setCurrentQuestion( questions[ currentQuestionIndex-1 ] )
        setCurrentQuestionIndex( ( prevState )=>{ return prevState-1 } )
    }

    const skipToIndex = params=>e=>{
        setCurrentQuestion( questions[ params ] )
        setCurrentQuestionIndex( params )
    }

    const getTestName = ()=>{
        switch( currentQuestion.testno )
        {
            case 1:
                return 'Full Stack Web Developer'
            case 2:
                return 'Product Based Companies'
            case 3:
                return 'Service Based Companies'
            case 4:
                return 'General Awareness'
            default:
                return 'No such test exists'
        }
    }

    const checkIcon = (option)=>{
        if(currentQuestion.answer === option)
        {
            return <Correctans/>
        }
        else if(currentQuestion.userAnswer === option && currentQuestion.answer !== option)
        {
            return <Incorrectans/>
        }
        else if(currentQuestion.userAnswer !== option)
        {
            return <AnswerIcon/>
        }
    }

    return (
        <div className="main-test-container" >
            <div className="test-banner align-items-center mb-4 flex-column-reverse flex-lg-row"> 
                <div className="test-banner-text"> 
                    <span className="test-banner-text-mocktest">
                        MOCK TEST
                    </span>
                    <span className="test-banner-text-testname">
                        {' '}for { getTestName() }
                    </span>
                </div>
                <img alt="test" className="test-banner-image" src="https://res.cloudinary.com/kunalbarve/image/upload/v1630561482/Quiz%20app/mock_test_masthead_2x_lp7qua.png" />
            </div>
            <div className="test-parent-container align-items-center mb-4 flex-column flex-lg-row">
                <div className="test-container">
                    <div className="test-container-header">
                        <h3 className="test-container-header-questions">
                            Question:{currentQuestionIndex+1}/{questions.length}
                        </h3>
                        <div style={{cursor:"pointer"}} >
                            {currentQuestion.isMFL?<BookmarkCheckFill color='#424242' size={28} />:
                            <BookmarkDash color='#424242' size={28} />}

                            <span>
                                {currentQuestion.isMFL? "Marked for later":"Mark for later"}
                            </span>
                        </div>{console.log(currentQuestion)}
                    </div>{console.log(questions)}
                    <p className="test-container-question">
                        {currentQuestionIndex+1}.{currentQuestion.question}
                    </p>
                    <div className="test-container-options">
                        <div>
                            {checkIcon('A')}
                            <span for="answer" className="option-text" >A. {currentQuestion.A}</span>
                        </div>
                        <div>
                            {checkIcon('B')}
                            <span for="answer" className="option-text">B. {currentQuestion.B}</span>
                        </div>
                        <div>
                            {checkIcon('C')}
                            <span for="answer" className="option-text">C. {currentQuestion.C}</span>
                        </div>
                        <div>
                            {checkIcon('D')}
                            <span for="answer" className="option-text">D. {currentQuestion.D}</span>
                        </div>
                    </div>
                    <div className="test-container-btn-container">
                        <Button  onClick={ handlePrev } variant="previous" > Previous </Button>
                        <Button  onClick={ handleNext } variant="success" style={{width:"205px"}} > Save &#38; Next </Button>
                    </div>
                </div>
                <div className="test-questions">
                    <h3 style={{color:"#283B75"}}>Question Status</h3>
                    <div class="test-questions-legend" >
                        <div className="test-questions-legend-item" id="ans" >

                        </div>
                        <span>
                            Answered
                        </span>
                        <div className="test-questions-legend-item" id="unans" >

                        </div>
                        <span>
                            Unanswered
                        </span>
                        <div className="test-questions-legend-item" id="mfl" >
                            
                        </div>
                        <span>
                            Marked For Later
                        </span>
                    </div>
                    <div className = "test-questions-icon-wrapper">
                        {
                            questions.map((question,index)=>(
                                <QuestionIcon question={question} index={index} currentQuestionIndex={currentQuestionIndex} onClick={skipToIndex(index)} key={index} >{index+1}</QuestionIcon>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestDetails
