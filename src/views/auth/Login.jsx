import PinInput from "../../components/PinInput";
import NavBtn from "../../components/NavBtn";
import FilledBtn from "../../components/FilledBtn";
import { useState, useRef } from "react";
import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2';
import autoLogin from './../../util/autoLogin';
import emailjs from '@emailjs/browser';
import forgotPassword from "../../util/forgotPassword";

export default function Login(){
    autoLogin();
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey)
    // const form = useRef();
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
            html: `
                <p>iEnabler is Richfield College's student management system, providing a user-friendly interface for students to access their grades, exam and assignment marks, and financial information.<br/><br/> This comprehensive tool ensures transparency and convenience, allowing students to easily navigate and print academic records and financial details. As a key companion in the academic journey, iEnabler reflects Richfield's commitment to leveraging technology for efficient student management.</p>
            `,
            icon: 'info',
            confirmButtonText: 'Got it!'
        })
    }
    const showHelp = ()=>{
        Swal.fire({
            title: 'Frequently Asked Questions',
            html: `
                <div>

                    <h2>What is iEnabler?</h2>
                    <p>iEnabler is Richfield College's student management system, designed to provide students with easy access to their grades, exam and assignment marks, and financial information.</p>

                    <h2>How do I access iEnabler?</h2>
                    <p>You can access iEnabler through the college's official website. Use your student credentials to log in and explore the platform.</p>

                    <h2>Can I print my academic records through iEnabler?</h2>
                    <p>Yes, iEnabler allows you to print your academic records and financial information for your convenience.</p>

                    <h2>Is iEnabler mobile-friendly?</h2>
                    <p>Absolutely! iEnabler is designed to be responsive, making it accessible and user-friendly on various devices, including mobile phones and tablets.</p>

                    <h2>How can I get support for iEnabler?</h2>
                    <p>For support, you can contact the college's IT department or refer to the provided user guide available on the iEnabler platform.</p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Okay'
        })
    }

    const form = useRef();
    const [popupVisible, setPopupVisible] = useState(false);
    const [resetLink,setResetLink] = useState("null");

    // Logic to send email to student admin
    const sendEmail = (e)=>{
        e.preventDefault();
        // forgotPassword("shekothegreat1@gmail.com")
        emailjs.sendForm('service_mhvgide', 'template_lqhyc0a', form.current, 'W05BD8jtQx8F6mINv')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    // Markup to generate forgot-password form
    var formMarkup = <form className="forgot-form" onSubmit={sendEmail} ref={form}>
        <h1 className="form-title">Forgot Password</h1>

        <div className="form-input">
            <label htmlFor="to_name">Name</label>
            <input type="text" name="to_name" id="to_name" />
        </div>

        <div className="form-input">
            <label htmlFor="student_number">Student Number</label>
            <input type="number" name="student_number" id="student_number" value={studentNumber ? studentNumber : null}/>
        </div>

        <div className="form-input">
            <label htmlFor="contact_email" title="This is the email that you prefer to be contacted on">Preffered Contact Email</label>
            <input type="email" name="" id="" />
            <p>You can leave this blank if it is your richfield email. That is {studentNumber ? studentNumber : "402000111"}@my.richfield.ac.za</p>
        </div>

        <input type="hidden" name="reset_link" id="reset_link" value={resetLink}/>
        <input type="hidden" name="send_to" id="send_to" value="shekothegreat1@gmail.com"/>

        <div className="form-actions">
            <input className="FakeFilledBtn" type="submit" value="Send" />
            <FilledBtn label="Close"  onClick={() => setPopupVisible(false)} />
        </div>
    </form>;

    return(
        <>
            {
            // Determine whether or not to show the forgot password popup
            popupVisible && 
                <div style={{zIndex:6000,position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="cardBox">
                    
                        <div>
                            {formMarkup}
                        </div>
                    </div>
                </div>
            }

            <header id="login-header">
                RICHFIELD
            </header>

            <div className="content">
                <nav>
                    <NavBtn href={"#"} onclick={showAbout} text={"About"} />
                    <NavBtn href={"#"} onclick={showHelp} text={"Help"} />
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
                           
                            <FilledBtn label="Forgot Password?" onClick={()=>{setPopupVisible(true)}} id="forgot-password-btn"/>
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