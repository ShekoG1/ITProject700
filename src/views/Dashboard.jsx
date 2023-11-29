import FilledBtn from "../components/FilledBtn";
import "../lib/style/dashboard.css"
import finalResults from "../lib/assets/finalResults.jpg";
import academicRecord from "../lib/assets/academicRecord.jpg";
import progressReport from "../lib/assets/progressReport.jpg";
import profile from "../lib/assets/profile.jpg";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

export default function Dashboard(props){

    const [wait,setWait] = useState(true)
    const [balanceDue,setBalanceDue] = useState("loading...");

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ZAR' }).format(amount);
    }

    useEffect(() => {
        const fetchSupabaseData = async () => {
          const supabase = createClient(
            process.env.REACT_APP_SUPABASE_URL,
            process.env.REACT_APP_SUPABASE_KEY
          );
    
          try {
            const { data, error } = await supabase
              .from('studentFinance')
              .select(`*`)
              .eq('studentNumber',localStorage.getItem('studentNumber'));
            if (error) {
                setWait(true);
                console.log(error)
            } else {
                console.log(data)
                setBalanceDue(data[data.length-1].balance);
                localStorage.setItem("balance", formatMoney(data[data.length-1].balance))
                setWait(false);
            }
          } catch (error) {
            setWait(true);
            console.log(error)
          }
        };
    
        fetchSupabaseData();
      }, []);

    return(
        <div id="dashboard">
            <div id="components">
                <div className="component" id="finance-due" onClick={()=>{window.location = "/Finances"}}>
                    <div className="component-heading">
                        <span>Finance</span>
                    </div>
                    <div className="component-content">
                        <span>Next Payment</span>
                        <span><strong>{wait ? "Loading..." : formatMoney(balanceDue)}</strong></span>
                    </div>
                </div>
                <div className="component orange" id="final-results" onClick={()=>{localStorage.setItem('selectedOption','exam_results');window.location = "/Academics"}}>
                    <div className="component-content">
                        <img src={finalResults} alt="Final Results"/>
                    </div>
                    <div className="component-heading">
                        <span>Final Results</span>
                    </div>
                </div>
                <div className="component pink" id="academic-record" onClick={()=>{localStorage.setItem('selectedOption','academic_record');window.location = "/Academics"}}>
                    <div className="component-content">
                        <img src={academicRecord} alt="Academic Record"/>
                    </div>
                    <div className="component-heading">
                        <span>Academic Record</span>
                    </div>
                </div>
                <div className="component purple" id="progress-report" onClick={()=>{localStorage.setItem('selectedOption','progress_report');window.location = "/Academics"}}>
                    <div className="component-content">
                        <img src={progressReport} alt="Progress Report"/>
                    </div>
                    <div className="component-heading">
                        <span>Progress Report</span>
                    </div>
                </div>
            </div>
            <div id="bottom-content">
                <div className="component" id="student-advisor">
                    <div className="component-heading">
                        <span>Student Advisor Details</span>
                    </div>
                    <div className="component-content">
                        <div id="details">
                        <p>You may contact your designated student advisor by using the following details:</p>

                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Name:
                                    </td>
                                    <td>
                                        Khanyisile Ngobo
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Phone Number:
                                    </td>
                                    <td>
                                        (000)-000-0000
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Email Address:
                                    </td>
                                    <td>
                                        KhanyisileN@richfield.ac.za
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Office Hours
                                    </td>
                                    <td>
                                        Monday - Friday<br/>
                                        08:00AM - 05:00PM
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Average Response Time (Email)
                                    </td>
                                    <td>
                                        1 hour
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className="profile">
                            <img src={profile} alt="Profile" />
                        </div>
                    </div>
                    <div className="view-now-btn">
                        <FilledBtn label="Contact" onClick={(e)=>{e.preventDefault();window.location = `mailto:KhanyisileN@richfield.ac.za?subject=${localStorage.getItem('studentNumber')}%20|%20You%20Subject`}}/>
                    </div>
                </div>
                <div id="quote">
                    <em>"<strong>EDUCATION</strong> is the <strong>KEY</strong><br/>to <strong>UNLOCK</strong> the <strong>GOLDEN DOOR</strong><br/> of <strong>FREEDOM</strong>"</em>
                </div>
            </div>
        </div>
    );
}