import {Container} from 'react-bootstrap/'
import { Facebook,Twitter } from 'react-bootstrap-icons'
import './Footer.css'

const  Footer = ()=>
{  
    const footerItems=[
        'Service','Extras','My Account','Useful Links'
    ] 
    return (
        <div className="footer-container">
            <hr/>
            <Container className="d-flex flex-column justify-content-between py-4 mx-0"
            style={{height:"512px"}} fluid>
                
                <Container className="d-flex flex-row justify-content-between align-self-center mx-0">
                    <Container className="d-flex flex-column justify-content-between mx-0">
                        <h3 className="footer-title">
                            TestME
                        </h3>

                        <p className="footer-txt">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.
                        </p>
                    </Container>
                    <Container className="d-flex flex-column justify-content-between">
                        <h5 className="footer-heading">
                            Follow Us
                        </h5>
                        <p className="footer-txt">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.
                        </p>
                        <p>
                            <a href="https://www.facebook.com/">
                                <Facebook color="#4267B2" size="30" style={{cursor:"pointer"}}/>
                            </a>
                            <a href="https://twitter.com/">
                                <Twitter size="30" style={{cursor:"pointer"}} color="#1DA1F2"/> 
                            </a>
                        </p>
                    </Container>
                    <Container className="d-flex flex-column justify-content-between">
                        <h5 className="footer-heading">
                            Contact Us
                        </h5>
                        <p className="footer-txt">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.
                        </p>
                    </Container>
                </Container>
                <hr/>
                <Container  className="d-flex flex-row justify-content-between align-items-center mx-0">
                    {
                        footerItems.map((item)=>(
                            <Container key={item} className="w-50">
                                <ul style={{listStyleType:"none"}}>
                                    <li className="footer-heading">
                                       <h5>{item}</h5> 
                                    </li>
                                    <li className="footer-txt">About Us</li>
                                    <li className="footer-txt">Infomation </li>
                                    <li className="footer-txt">Privacy Policy </li>
                                    <li className="footer-txt">Terms and Conditions</li>
                                </ul>
                            </Container>
                        ))
                    }
                </Container>

            </Container>
            <hr/>
        </div>
    )
}

export default Footer