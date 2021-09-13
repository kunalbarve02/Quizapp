import axios from 'axios'
import { Button } from 'react-bootstrap'
import React, { useReducer } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { BookmarkCheckFill, BookmarkDash } from 'react-bootstrap-icons'
import { useParams } from 'react-router'
import './Test.css'
import QuestionIcon from './QuestionIcon'
import { useHistory } from 'react-router'

const reducer=( questions, action )=>{
    switch(action.type)
    {
        case 'INITIALIZE_STATE':
            questions = action.payload
            console.log(questions)
            return questions
        case 'MARK_FOR_LATER':
            axios.get('https://quizapp-2.herokuapp.com/markForLater',{
                params:{
                    id:action.payload.id
                }
            })
            .then(res=>{questions = res.data})
            questions[action.payload.currentQuestionIndex].isMFL=true
            console.log(questions)
            return questions
        case 'UNMARK_FOR_LATER':
            axios.get('https://quizapp-2.herokuapp.com/unMarkForLater',{
                params:{
                    id:action.payload.id
                }
            })
            .then(res=>{questions = res.data})
            questions[action.payload.currentQuestionIndex].isMFL=false
            return questions
        default:
            return questions
    }
}

function Test() {

    let history = useHistory()
    let { testName } = useParams()

    let[ currentQuestion, setCurrentQuestion ] = useState({})
    let[ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)
    let[ answer, setAnswer ] = useState("")

    const [ questions, dispatch ] = useReducer( reducer, [] )
    
    useEffect(()=>{
        axios.get('https://quizapp-2.herokuapp.com/getQuestions',{
            params: {
                testName:testName
            }
        })
        .then(res=>{
            console.log(res.data)
            dispatch({ type:"INITIALIZE_STATE", payload:res.data })
            setCurrentQuestion(res.data[0])
            setAnswer(currentQuestion.userAnswer)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    

    const handleNext = (e)=>{
        if(currentQuestionIndex === 19)
        {
            if(answer!=="")
            {
                axios.post('https://quizapp-2.herokuapp.com/insertAnswer',{
                    option:answer,
                    id:currentQuestion._id
                })
                .then(res=>{
                    dispatch({type:"INITIALIZE_STATE",payload:res.data})
                })
            }
            setAnswer("")
            setCurrentQuestionIndex(0)
            setCurrentQuestion( questions[0] )
            return alert( "that was last question of test" )
        }
        setCurrentQuestion( questions[ currentQuestionIndex+1 ] )
        setCurrentQuestionIndex( ( prevState )=>{ return prevState+1 } )
        if(answer!=="")
        {
            axios.post('https://quizapp-2.herokuapp.com/insertAnswer',{
                option:answer,
                id:currentQuestion._id
            })
            .then(res=>{
                dispatch({type:"INITIALIZE_STATE",payload:res.data})
            })
        }
        setAnswer("")
    }

    const handlePrev = ()=>{
        if( currentQuestionIndex === 0 )
        {
            if(answer!=="")
            {
                axios.post('https://quizapp-2.herokuapp.com/insertAnswer',{
                    option:answer,
                    id:currentQuestion._id
                })
                .then(res=>{
                    dispatch({type:"INITIALIZE_STATE",payload:res.data})
                })
            }
            setAnswer("")
            return alert( "that was first question of test" )
        }
        setCurrentQuestion( questions[ currentQuestionIndex-1 ] )
        setCurrentQuestionIndex( ( prevState )=>{ return prevState-1 } )
        if(answer!=="")
        {
            axios.post('https://quizapp-2.herokuapp.com/insertAnswer',{
                option:answer,
                id:currentQuestion._id
            })
            .then(res=>{
                dispatch({type:"INITIALIZE_STATE",payload:res.data})
            })
        }
        setAnswer("")
    }

    const skipToIndex = params=>e=>{
        setCurrentQuestion( questions[ params ] )
        setCurrentQuestionIndex( params )
        if(answer!=="")
        {
            axios.post('https://quizapp-2.herokuapp.com/insertAnswer',{
                option:answer,
                id:currentQuestion._id
            })
            .then(res=>{
                dispatch({type:"INITIALIZE_STATE",payload:res.data})
            })
        }
        setAnswer("")
    }

    const handleSubmit = async()=>{
        var isValid = true
        if(answer!=="")
        {
            await axios.post('https://quizapp-2.herokuapp.com/insertAnswer',{
                option:answer,
                id:currentQuestion._id
            })
            .then(res=>{
                dispatch({type:"INITIALIZE_STATE",payload:res.data})
            })
        }
        setAnswer("")
        questions.map((question)=>{
            if ( question.userAnswer === "" )
            {
                isValid = false
            }
        })
        if(!isValid)
        {
            return alert("Answer all questions")
        }
        axios.get("https://quizapp-2.herokuapp.com/submitTest")
        .then(res=>{
            console.log(res)
            history.push("/result")
        })
    }

    const getTestName = ( testName )=>{
        switch( testName )
        {
            case 'fullStackWebDev':
                return 'Full Stack Web Developer'
            case 'prodBased':
                return 'Product Based Companies'
            case 'serviceBased':
                return 'Service Based Companies'
            case 'generalAwareness':
                return 'General Awareness'
            default:
                return 'No such test exists'
        }
    }

    const handleRadio = (e)=>{
        console.log(e.target.value)
        console.log(e.target.name)
        setAnswer(e.target.name)
    }

    console.log(currentQuestion.userAnswer)

    return (
        <div className="main-test-container">
            <div className="test-banner align-items-center mb-4 flex-column-reverse flex-lg-row"> 
                <div className="test-banner-text"> 
                    <span className="test-banner-text-mocktest">
                        MOCK TEST
                    </span>
                    <span className="test-banner-text-testname">
                        {' '}for { getTestName( testName ) }
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
                            {currentQuestion.isMFL?<BookmarkCheckFill  onClick={()=>{ dispatch({ type:'UNMARK_FOR_LATER', payload:{currentQuestionIndex:currentQuestionIndex,id:currentQuestion._id} })
                                handleNext()
                            }}  color='#424242' size={28} />:
                            <BookmarkDash onClick={()=>{dispatch({type:'MARK_FOR_LATER',payload:{currentQuestionIndex:currentQuestionIndex,id:currentQuestion._id}})
                                handleNext()
                            }} color='#424242' size={28} />}

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
                            <input style={{cursor:"pointer"}} type="radio" checked={answer==="A"||currentQuestion.userAnswer==="A"} name="A" onChange={handleRadio} />
                            <label for="answer" className="option-text" >A. {currentQuestion.A}</label>
                        </div>
                        <div>
                            <input style={{cursor:"pointer"}} type="radio" checked={answer==="B"||currentQuestion.userAnswer==="B"} name="B" onChange={handleRadio} />
                            <label for="answer" className="option-text">B. {currentQuestion.B}</label>
                        </div>
                        <div>
                            <input style={{cursor:"pointer"}} type="radio" checked={answer==="C"||currentQuestion.userAnswer==="C"} name="C" onChange={handleRadio}/>
                            <label for="answer" className="option-text">C. {currentQuestion.C}</label>
                        </div>
                        <div>
                            <input style={{cursor:"pointer"}} type="radio" checked={answer==="D"||currentQuestion.userAnswer==="D"} name="D" onChange={handleRadio}/>
                            <label for="answer" className="option-text">D. {currentQuestion.D}</label>
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
                    <Button onClick={handleSubmit} className="w-75 text-white mb-2">Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default Test