import validateUser from './../util/auth';
import {React,useState,useEffect} from 'react';
import { createClient } from '@supabase/supabase-js';
import processAcademicData from '../util/handleAcademicRecord';
import { usePDF } from "react-to-pdf";

export default function Academics_AcademicRecord(props){
    // Ensure user is logged in before showing sensitive data
    validateUser();
    const [showTools, setShowTools] = useState(true);
    const results = props.results
    const { toPDF, targetRef } = usePDF({filename: 'AcademicRecord.pdf'});
console.log(localStorage.getItem("student"))
    const [student,setStudent] = useState(null);
    const [wait,setWait] = useState(true)

    useEffect(() => {
        const fetchSupabaseData = async () => {
          const supabase = createClient(
            process.env.REACT_APP_SUPABASE_URL,
            process.env.REACT_APP_SUPABASE_KEY
          );
    
          try {
            const { data, error } = await supabase
              .from('student')
              .select(`*`)
              .eq('studentNumber',localStorage.getItem('studentNumber'));
            if (error) {
                setWait(true);
                console.log(error)
            } else {
                setStudent(data[0]);
                setWait(false);
                localStorage.setItem("student",JSON.stringify(data[0]))
            }
          } catch (error) {
            setWait(true);
          }
        };
    
        if(student === null){
            fetchSupabaseData();
        }
      }, []);

    return(
        <>
            <div id="record-tools">
                <button onClick={() => {toPDF()}}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                    </span>
                    <span>Download</span>
                </button>
                <button onClick={()=>window.print()}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                        </svg>
                    </span>
                    <span>Print</span>
                </button>
            </div>
            <div id="academicrecord-content" ref={targetRef}>
                <div id="headings">
                    <span id="school">Richfield Graduate Institute of Technology</span>
                    <span>Academic Record</span>
                </div>
                <div id="student-info">
                    <div id="student-number">{localStorage.getItem('studentNumber')}</div>
                    <div id="student-names">
                        <span id="student-fname">{wait ? "Loading..." : `${student.fName}`}</span>
                        <span id="student-mnames"></span>
                        <span id="student-lname">{wait ? "Loading..." : `${student.lName}`}</span>
                    </div>
                    <div id="student-id-number">{wait ? "Loading..." : `${student.idNumber}`}</div>
                    <div id="student-dob">{wait ? "Loading..." : `${student.dateOfBirth}`}</div>
                </div>
                <div id="student-owes-institution">
                    You owe the institution <span id="student-owing-amount">{localStorage.getItem("balance")}</span>
                </div>
                {Object.entries(results.reduce((acc, module) => {
                    module.years.forEach((year) => {
                        if (!acc[year.year]) {
                            acc[year.year] = [];
                        }
                        year.semesters.forEach((semester) => {
                            console.log(semester)
                            // --------------------------------------------------
                            // Mark an year mark calculations here
                            let fullPeriodMark = 0;
                            let finalMark = 0;
                            let examMark = 0;
                            for(let i=0; i<semester.marks.length;i++){
                                if(semester.marks[i].type === "assignment_3"){
                                    fullPeriodMark += semester.marks[i].mark_percentage * 0.34;
                                }else if(semester.marks[i].type !== "exam"){
                                    fullPeriodMark += semester.marks[i].mark_percentage * 0.33;
                                }else{
                                    examMark = semester.marks[i].mark_percentage;
                                }
                            }

                            finalMark = (fullPeriodMark * 0.40) + (examMark * 0.60);
                            //---------------------------------------------------
                            acc[year.year].push({
                                module_code: module.module_code,
                                semester: semester.semester,
                                full_period_mark:fullPeriodMark.toFixed(1),
                                total: finalMark.toFixed(1)
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
                                    let color
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
                                                SEMESTER {module.semester}
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
                                                                {module.full_period_mark}
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
        </>
    );
}