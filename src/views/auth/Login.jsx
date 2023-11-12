import PinInput from "../../components/PinInput";
import NavBtn from "../../components/NavBtn";
import FilledBtn from "../../components/FilledBtn";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2';
import autoLogin from './../../util/autoLogin';

export default function Login(){
    autoLogin();
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey)

    const [studentNumber, setStudentNumber] = useState(null);
    const [studentPin, setStudentPin] = useState(null);

    const saveStudentNumber = async (input)=>{
        setStudentNumber(input.toString());

        if(studentPin !== null){
            // Make API request
            console.log(studentNumber);
            console.log(studentPin);
            const { data, error } = await supabase.auth.signInWithPassword({
                email: `${studentNumber}@my.richfield.ac.za`,
                password: studentPin
            });

            console.log(data);
            console.log(`LOGIN\nStudent Number: ${studentNumber}\nPin: ${input.toString()}\n${error}`);
            if(error){
                Swal.fire({
                    title: 'Error!',
                    text: `Invalid login credentials! Please try again later`,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })
            }else{
                localStorage.setItem('studentNumber',studentNumber);
                localStorage.setItem('token', data.session.access_token);
                window.location.href = "/Dashboard";
            }
        }
    }
    const login = async (input)=>{
        setStudentPin(input.toString());

        // Make API request
        if(studentNumber !== null){
            console.log(studentNumber);
            console.log(studentPin);

            const { data, error } = await supabase.auth.signInWithPassword({
                email: `${studentNumber}@my.richfield.ac.za`,
                password: input.toString()
            });

            console.log(data);
            console.log(`LOGIN\nStudent Number: ${studentNumber}\nPin: ${input.toString()}\n${error}`);
            if(error){
                Swal.fire({
                    title: 'Error!',
                    text: `Invalid login credentials! Please try again later`,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })
            }else{
                localStorage.setItem('studentNumber',studentNumber);
                localStorage.setItem('token', data.session.access_token);
                window.location.href = "/Dashboard";
            }
        }
    };
    const showAbout = ()=>{
        Swal.fire({
            title: 'About Richfields\' iEnabler System',
            html: `Invalid login credentials! Please try again later`,
            icon: 'info',
            confirmButtonText: 'Got it!'
        })
    }
    const showHelp = ()=>{
        Swal.fire({
            title: 'Error!',
            text: `Invalid login credentials! Please try again later`,
            icon: 'error',
            confirmButtonText: 'Okay'
        })
    }

    return(
        <>
            <header id="login-header">
                RICHFIELD
            </header>

            <div className="content">
                <nav>
                    <NavBtn href={"#"} onClick={showAbout} text={"About"} />
                    <NavBtn href={"#"} onClick={showHelp} text={"Help"} />
                    <NavBtn href={"https://learning.richfield.ac.za/HET/login/index.php"} text={"Moodle"} newTab={true}/>
                </nav>

                <div id="auth-box">
                    <div id="student-number-container">
                        <span>Student Number</span>
                        <p>Hint: This is you 9-digit student number. For example, <strong>123-456-789</strong></p>
                        <PinInput pinCount={9} flexDirection="column" autoSubmit={true} OnSubmit={saveStudentNumber}/>
                    </div>
                    <div id="student-pin-container">
                        <span>Student Pin</span>
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