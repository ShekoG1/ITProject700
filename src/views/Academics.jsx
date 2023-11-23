import { useState, useEffect } from "react";
import Academics_AcademicRecord from "../islands/Academics_AcademicRecord";
import Academics_ProgressReport from "../islands/Academics_ProgressReport";
import Academics_ExamResults from "../islands/Academics_ExamResults";
import "./../lib/style/academic.css";
import { createClient } from '@supabase/supabase-js';
import processAcademicData from '../util/handleAcademicRecord';
import handleExamData from "../util/handleExamResults";
import getStudentInfo from '../util/getStudentInfo';

export default function Academics(){

    const [selectedOption, setSelectedOption] = useState("academic_record");
    const [results, setResults] = useState(null);
    const [examData, setExamData] = useState(null);
    const hasStudentInfo = getStudentInfo();
    let widget = null;

    const supabase = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_KEY
    );

    const fetchResults = async () => {
        const { data, error } = await supabase
            .from('results')
            .select('*').eq('student_number',localStorage.getItem('studentNumber'));
        if (error) {console.log("Error: ", error);}
        else {setResults(processAcademicData(data));setExamData(handleExamData(data))}
    };

    useEffect(() => {
        fetchResults();
    }, []);

    switch (selectedOption) {
        case "academic_record":
            widget = results == null ? <></> : <Academics_AcademicRecord results={results} />;
            break;
        case "progress_report":
            widget = <Academics_ProgressReport results={results} />
            break;
        case "exam_results":
            widget = <Academics_ExamResults results={examData} />
            break;
        default:
            widget = <>
                <h1>Oops...Something went wrong!</h1>
                <p>An error occured while loading the page content. Please conact your administrator or try again later.</p>
            </>
            break;
    }

    return (
        <div id="finances">
            <div id="view-options">
                <button onClick={()=>{setSelectedOption("academic_record");}} className={selectedOption === "academic_record" ? "option option-selected":"option"}>Academic Record</button>
                <button onClick={()=>{setSelectedOption("progress_report");}} className={selectedOption === "progress_report" ? "option option-selected":"option"}>Progress Report</button>
                <button onClick={()=>{setSelectedOption("exam_results");}} className={selectedOption === "exam_results" ? "option option-selected":"option"}>Exam Results</button>
            </div>
            <div id="finance-content">
                {widget}
            </div>
        </div>
    );
}