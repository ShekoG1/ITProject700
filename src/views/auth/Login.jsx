import PinInput from "../../components/PinInput";
import NavBtn from "../../components/NavBtn";
import FilledBtn from "../../components/FilledBtn";
import { useState } from "react";

export default function Login(){

    const [studentNumber, setStudentNumber] = useState(null);
    const [studentPin, setStudentPin] = useState(null);

    const saveStudentNumber = (input)=>{
        setStudentNumber(input.toString());

        if(studentPin !== null){
            // Make API request
            console.log(studentNumber);
            console.log(studentPin);
            window.location.href = "/Dashboard"
        }
    }
    const login = (input)=>{
        setStudentPin(input.toString());

        // Make API request
        if(studentNumber !== null){
            console.log(studentNumber);
            console.log(studentPin);
            window.location.href = "/Dashboard";
        }
    };

    return(
        <>
            <header id="login-header">
                RICHFIELD
            </header>

            <div className="content">
                <nav>
                    <NavBtn href={"#home"} text={"About"} />
                    <NavBtn href={"#home"} text={"Help"} />
                    <NavBtn href={"https://learning.richfield.ac.za/HET/login/index.php"} text={"Moodle"} newTab={true}/>
                </nav>

                <div id="auth-box">
                    <div id="student-number-container">
                        <span>Student Number</span>
                        <p>Hint: This is you 9-digit student number. For example, <strong>123-456-789</strong></p>
                        <PinInput pinCount={9} flexDirection="column" autoSubmit={true} OnSubmit={saveStudentNumber}/>
                    </div>
                    <div id="student-pin-container">
                        <span>Student Number</span>
                        <p>Hint: This is your 4 digit student pin. For example, <strong>1234</strong></p>
                        <div id="student-pin">
                            <div className="decorative-line"></div><PinInput pinCount={4} flexDirection="column" autoSubmit={true} OnSubmit={login}/><div className="decorative-line"></div>
                        </div>
                        <div id="forgot-password-container">
                            <FilledBtn label="Forgot Password?" onClick={()=>{}} id="forgot-password-btn"/>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="contact-cta">
                    <span><strong>Contact Us</strong></span>
                </div>
                <div className="legal">
                    <span>
                    Richfield | Copyright 2023 | All Rights Reserved
                    </span>
                </div>
            </footer>
        </>
    );
}