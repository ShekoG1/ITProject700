import { useState, useEffect } from "react";
import Academics_AcademicRecord from "../islands/Academics_AcademicRecord";
import Academics_ProgressReport from "../islands/Academics_ProgressReport";
import Academics_ExamResults from "../islands/Academics_ExamResults";
import "./../lib/style/academic.css";
import { createClient } from '@supabase/supabase-js';
import processAcademicData from '../util/handleAcademicRecord';

export default function Academics(){

    // All select option string use underscores for spaces and are always lower cased
    const [selectedOption, setSelectedOption] = useState("academic_record");
    const [widgetProps, setWidgetProps] = useState({});
    let widget = null;

    // Get all student academic data
    // --------------------------------------------------------------------------------------------------------------
    // Instantiate Supabase
    const supabase = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_KEY
    );

    // Declarations
    const [results, setResults] = useState(null);

    // Supabase request to get all academic data for student
    const fetchResults = async () => {
        const { data, error } = await supabase
            .from('results')
            .select('*').eq('student_number',localStorage.getItem('studentNumber'));
        // Handle request result
        if (error) console.log("Error: ", error);
        else handleData(data);
    };

    useEffect(() => {
        // Get student data as soon as the page loads
        fetchResults();
    }, []);
    // --------------------------------------------------------------------------------------------------------------

    const handleData = (data) => {
        console.log(data);
        // Process data before returning it to the results state
        setResults(data)
    };

    // Determine widget to show
    switch (selectedOption) {
        case "academic_record":
            let recordData = processAcademicData(results);
            widget = <Academics_AcademicRecord results={recordData} />;
        break;
        case "progress_report":
            let reportData = processAcademicData(results);
            widget = <Academics_ProgressReport results={reportData} />
        break;
        case "exam_results":
            let examData = processAcademicData(results);
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