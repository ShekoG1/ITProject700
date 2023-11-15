import { useState } from "react";
import ExamResultCard from "../components/ExamResultCard";
import validateUser from './../util/auth';

export default function Academics_ExamResults(props){
    validateUser();
    const examData = props.results;

    const [showResults, setShowResults] = useState(false);
    const[yearDisplayed, setYearDisplayed] = useState("2023");

    // Events
    function loadResults (elem) {
        setYearDisplayed(elem.target.getAttribute("data-year"));
        setShowResults(true);
    }
    const loadMenu = () => {
        setShowResults(false);
    }

    var results = <div id="exam-results">
        <div id="go-back">
            <button onClick={loadMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
                <span>
                    Go Back
                </span>
            </button>
        </div>
        <h2>{yearDisplayed}</h2>
        <div id="exam-details">
            <ExamResultCard result="pass" examMonth="6" subject="AFI700D - ARTIFICIAL INTELLIGENCE 700" halfPeriodMark="" fullPeriodMark="74" finalMark="75"/>
            <ExamResultCard result="fail" examMonth="6" subject="CBS700D - CYBER SECURITY 700" halfPeriodMark="" fullPeriodMark="51" finalMark="49"/>
            <ExamResultCard result="pass-warning" examMonth="6" subject="HCI700D - HUMAN COMPUTER INTERACTION 700" halfPeriodMark="" fullPeriodMark="57" finalMark="53"/>
        </div>
    </div>;
    var options = <>
        <div id="exam-year-qualification-options">
            <div className="exam-item" onClick={loadResults} data-year={2023}>
                <div className="exam-year">2023</div>
                <div className="exam-qualification">Bsc In Information Technology</div>
            </div>
            <div className="exam-item">
                <div className="exam-year" onClick={loadResults} data-year={2022}>2022</div>
                <div className="exam-qualification">Bsc In Information Technology</div>
            </div>
            <div className="exam-item">
                <div className="exam-year" onClick={loadResults} data-year={2021}>2021</div>
                <div className="exam-qualification">Bsc In Information Technology</div>
            </div>
        </div>
    </>;

    return(
        <div id="examResults">
            <div id="student-details-exam-year">
                <span>Shekhar Maharaj</span>
                <span>402101963</span>
            </div>
            {showResults ? results : options}
        </div>
    );
}