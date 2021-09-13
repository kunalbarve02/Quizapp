import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Button } from 'react-bootstrap'
import Chart from 'react-google-charts'
import { Link } from 'react-router-dom'
import './Result.css'

function Result() {

    let[testDetails,setTestDetails]=useState({})

    useEffect(()=>{
        axios.get('https://quizapp-2.herokuapp.com/getTestDetails')
        .then((res) => {
            setTestDetails(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    console.log(testDetails)

    return (
        <div className="result-container align-items-center mb-4 flex-column flex-lg-row">
            <div className="results-data">
                <h3 className="results-data-heading">
                    TEST SUMMARY
                </h3>
                <div className="results-data-questions">
                    <div className="results-data-questions-item" id="total">
                        <p className="results-data-questions-text">
                            No. of questions
                        </p>
                        <p className="results-data-questions-text">
                            20
                        </p>
                    </div>
                    <div className="results-data-questions-item" id="correct">
                        <p className="results-data-questions-text">
                            Correct
                        </p>
                        <p className="results-data-questions-text">
                            {testDetails.correctAnswers}
                        </p>
                    </div>
                    <div className="results-data-questions-item" id="incorrect">
                        <p className="results-data-questions-text">
                            Incorrect
                        </p>
                        <p className="results-data-questions-text">
                            {20-testDetails.correctAnswers}
                        </p>
                    </div>
                </div>
                <div className="results-data-scorebar-container">
                    <p>Total Score</p>
                    <div  className="results-data-scorebar" style={{width:"100%"}}>
                        <div  className="results-data-scorebar-correct">
                            <p style={{marginLeft:'10px',marginTop:'7px'}}>{testDetails.correctAnswers}/20</p>
                        </div>
                        <div  className="results-data-scorebar-incorrect">
                            <p style={{marginRight:'10px',marginTop:'7px'}}>{Math.trunc((testDetails.correctAnswers/20)*100)}%</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="result-chart">
                <h3 className="result-chart-heading">
                    Summary
                </h3>
                <div className="result-chart-legend-container">
                    <div className="result-chart-legend">
                        <div className="result-chart-legend-item" id="legend-correct">

                        </div>
                        <span  className="result-chart-legend-text">
                        {' '} Correct
                        </span>
                    </div>
                    <div className="result-chart-legend">
                        <div className="result-chart-legend-item" id="legend-incorrect">

                        </div>
                        <span className="result-chart-legend-text">
                            {' '} Incorrect
                        </span>
                    </div>
                </div>
                <div  className="result-chart-chart-container">
                    <Chart
                        width={'300px'}
                        height={'300px'}
                        chartType="PieChart"
                        data={[
                            ['Result','Percentage'],
                            ['Correct',(testDetails.correctAnswers/20)*100],
                            ['Incorrect',(100-(testDetails.correctAnswers/20)*100)]
                        ]}
                        options={{
                            pieHole: 0.5,
                            legend:'none',
                            animation: {
                                startup: true,
                                easing:'linear',
                                duration: 2000,
                              },
                            enableInteractivity: false,
                            colors:['#28C8AB','#F3364C']
                          }}
                    />    
                </div>
                <Link to="/result/details" className="w-75 ml-4">
                    <Button variant="success text-white w-100">
                        Examine Test in Detail
                    </Button> 
                </Link>
            </div>
        </div>
    )
}

export default Result
