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
                            {/* mailto:khanyisilengobo@richfield.ac.za?subject=[StudentNumber] - iEnabler Password Reset Request&body=Hi%20there%20Khanyisile,%0D%0A%0D%0AI%20hope%20you%20are%20well.%20I%20seem%20to%20have%20forgotten%20my%20password%20to%20access%20the%20iEnabler%20system.%20Please%20can%20you%20reset%20my%20password.%0D%0A%0D%0AThank%20you%20in%20advance.%0D%0A%0D%0AKind%20regards,%0D%0A[StudentNumber] */}
                            <FilledBtn label="Forgot Password?" onClick={()=>{window.open('mailto:email@example.com?subject=Subject&body=Body%20goes%20here')}} id="forgot-password-btn"/>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="contact-cta">
                    <a href="https://www.richfield.ac.za/quick-application/" target="_blank"><strong>Contact Us</strong></a>
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