import validateUser from './../util/auth';
import {React,useState,useEffect} from 'react';
import { createClient } from '@supabase/supabase-js';
import processAcademicData from '../util/handleAcademicRecord';

export default function Academics_AcademicRecord(props){
    // Ensure user is logged in before showing sensitive data
    validateUser();

    const results = props.results
    console.log(results)

    // // Instantiate Supabase
    // const supabase = createClient(
    //     process.env.REACT_APP_SUPABASE_URL,
    //     process.env.REACT_APP_SUPABASE_KEY
    // );

    // // Declarations
    // const [results, setResults] = useState([]);

    // // Supabase request to get all academic data for student
    // const fetchResults = async () => {
    //     const { data, error } = await supabase
    //         .from('results')
    //         .select('*').eq('student_number',localStorage.getItem('studentNumber'));
    //     // Handle request result
    //     if (error) console.log("Error: ", error);
    //     else handleData(data);
    // };

    // useEffect(() => {
    //     // Get student data as soon as the page loads
    //     fetchResults();
    // }, []);

    // const handleData = (data) => {
    //     console.log(data);
    //     // Process data before returning it to the results state
    //     setResults(processAcademicData(data))
    // };
    
    return(
        <div id="academicrecord-content">
            <div id="headings">
                <span id="school">Richfield Graduate Institute of Technology</span>
                <span>Academic Record</span>
            </div>
            <div id="student-info">
                <div id="student-number">402101963</div>
                <div id="student-names">
                    <span id="student-fname">Shekhar</span>
                    <span id="student-mnames"></span>
                    <span id="student-lname">Maharaj</span>
                </div>
                <div id="student-id-number">0000000000000</div>
                <div id="student-dob">29-MAY-2001</div>
            </div>
            <div id="student-owes-institution">
                You owe the institution <span id="student-owing-amount">ZAR 7674</span>
            </div>

            {results.map((module) => {
                return module.years.map((year) => {
                    return (
                        <div className="record">
                            <div className="year">
                                <div className="represented-year">
                                    {year.year}
                                </div>
                            </div>
                            <div className="qualification">
                                RBSIT - BSC IN INFORMATION TECHNOLOGY
                            </div>
                            <div className="records">
                                {year.semesters.map((semester) => {
                                    return (
                                        <div className={`record-item ${semester.total >= 75 ? 'pass-distinction-border' : semester.total >= 60 ? 'pass-safe-border' : semester.total >= 50 ? 'pass-warning-border' : semester.total >= 40 ? 'pass-border' : 'fail-border'}`}>
                                            <div className="subject"><span>SUBJECT:</span>
                                                <span className="code">
                                                    {module.module_code}
                                                </span>
                                                <span className="title">
                                                    {module.module_code}
                                                </span>
                                            </div>
                                            <div className="academic-period">
                                                SEMESTER {semester.semester} (JAN - JUN)
                                            </div>
                                            <div className="marks">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Year Mark</th>
                                                            <th>Final Mark</th>
                                                            <th>Result</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="year-mark">
                                                                {semester.total}
                                                            </td>
                                                            <td className="final-mark">
                                                                {semester.total}
                                                            </td>
                                                            <td className={`result ${semester.total >= 75 ? 'pass-distinction-text' : semester.total >= 60 ? 'pass-safe-text' : semester.total >= 50 ? 'pass-warning-text' : semester.total >= 40 ? 'pass-text' : 'fail-text'}`}>
                                                                {semester.total >= 40 ? 'PASS' : 'FAIL'}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                });
            })}
            {/* RECORD END */}
        </div>
    );
}