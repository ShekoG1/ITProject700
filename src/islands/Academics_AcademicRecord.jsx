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
            {Object.entries(results.reduce((acc, module) => {
                module.years.forEach((year) => {
                    if (!acc[year.year]) {
                        acc[year.year] = [];
                    }
                    year.semesters.forEach((semester) => {
                        console.log(semester)
                        // --------------------------------------------------
                        // Final mark an year mark calculations here
                        //---------------------------------------------------
                        acc[year.year].push({
                            module_code: module.module_code,
                            semester: semester.semester,
                            total: semester.total
                        });
                    });
                });
                return acc;
            }, {})).map(([year, modules], index) => {
                return (
                    <div key={index} className="record">
                        <div className="year">
                            <div className="represented-year">
                                {year}
                            </div>
                        </div>
                        <div className="qualification">
                            RBSIT - BSC IN INFORMATION TECHNOLOGY
                        </div>
                        <div className="records">
                            {modules.map((module, moduleIndex) => {
                                return (
                                    <div key={moduleIndex} className={`record-item ${module.total >= 75 ? 'pass-distinction-border' : module.total >= 60 ? 'pass-safe-border' : module.total >= 50 ? 'pass-warning-border' : module.total >= 40 ? 'pass-border' : 'fail-border'}`}>
                                        <div className="subject"><span>SUBJECT:</span>
                                                                                       <span className="code">
                                                                                               {module.module_code}
                                                                                       </span>
                                            <span className="title">
                                                {module.module_code}
                                            </span>
                                        </div>
                                        <div className="academic-period">
                                            SEMESTER {module.semester} (JAN - JUN)
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
                                                            {module.total}
                                                        </td>
                                                        <td className="final-mark">
                                                            {module.total}
                                                        </td>
                                                        <td className={`result ${module.total >= 75 ? 'pass-distinction-text' : module.total >= 60 ? 'pass-safe-text' : module.total >= 50 ? 'pass-warning-text' : module.total >= 40 ? 'pass-text' : 'fail-text'}`}>
                                                            {module.total >= 40 ? 'PASS' : 'FAIL'}
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
            })}
            {/* RECORD END */}
        </div>
    );
}