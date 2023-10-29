import { useState } from "react";
import Academics_AcademicRecord from "../islands/Academics_AcademicRecord";
import Academics_ProgressReport from "../islands/Academics_ProgressReport";
import Academics_ExamResults from "../islands/Academics_ExamResults";
import "./../lib/style/academic.css";

export default function Academics(){

    // All select option string use underscores for spaces and are always lower cased
    const [selectedOption, setSelectedOption] = useState("academic_record");
    let widget = null;

    // Determine widget to show
    switch (selectedOption) {
        case "academic_record":
            widget = <Academics_AcademicRecord/>;
        break;
        case "progress_report":
            widget = <Academics_ProgressReport/>
        break;
        case "exam_results":
            widget = <Academics_ExamResults/>
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