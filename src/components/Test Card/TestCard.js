import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './TestCard.css'

function TestCard(props) {

    let[isButton,setIsButton] = useState(false)

    return (
        <div>
            <Card bg={props.card.variant} className="text-black test-card" onMouseEnter={()=>{setIsButton(true)}} onMouseLeave={()=>{setIsButton(false)}} >
                <Card.Img className="test-card-img" src={props.card.img} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title style={{color:"#1C1C1C"}}>{props.card.title}</Card.Title>
                    { isButton ? <Link to={props.card.testLink} ><Button className="test-card-btn">Take Test</Button></Link> : null}
                </Card.ImgOverlay>
            </Card>
        </div>
    )
}

export default TestCard
