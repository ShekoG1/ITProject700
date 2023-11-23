import { useState } from "react";
import ExamResultCard from "../components/ExamResultCard";
import validateUser from './../util/auth';
import { usePDF } from "react-to-pdf";

export default function Academics_ExamResults(props){
    validateUser();
    const { results: examData } = props;
    const [showResults, setShowResults] = useState(false);
    const [year, setYear] = useState(null);
    const { toPDF, targetRef } = usePDF({filename: 'ExamResults.pdf'});
    const student = JSON.parse(localStorage.getItem('student'));
    const loadResults = (event) => {
        const element = event.target;
        const yearToSet = element.classList.contains('exam-item') ? 
            element.getAttribute("data-year") : 
            element.parentElement.getAttribute("data-year");

        setYear(yearToSet);
        setShowResults(true);
    };

    const loadMenu = () => {
        setShowResults(false);
    };
    console.log(year ? examData : "Not set");

    const results = (
        <div id="exam-results">
            <div id="go-back">
                <button onClick={loadMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                    <span>Go Back</span>
                </button>
            </div>
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
            <div id="exam-details" ref={targetRef}>
                {examData[year] ?
                
                Object.entries(examData[year]['semesters']).map(([semester, semesterData], index) => (
                    Object.entries(semesterData).map(([subjectKey, subjectData], index) => {
                        console.log(subjectData)
                        /*
                        subjectData expected value:
                            [
                                {
                                    "id": 29,
                                    "type": "assignment_1",
                                    "result": "pass",
                                    "mark_percentage": 85,
                                    "created_at": "2023-11-14T19:33:59.754483+00:00"
                                },
                                {
                                    "id": 30,
                                    "type": "assignment_2",
                                    "result": "fail",
                                    "mark_percentage": 40,
                                    "created_at": "2023-11-14T19:33:59.754483+00:00"
                                },
                                {
                                    "id": 31,
                                    "type": "assignment_3",
                                    "result": "pass",
                                    "mark_percentage": 75,
                                    "created_at": "2023-11-14T19:33:59.754483+00:00"
                                },
                                {
                                    "id": 32,
                                    "type": "exam",
                                    "result": "pass",
                                    "mark_percentage": 78,
                                    "created_at": "2023-11-14T19:33:59.754483+00:00"
                                }
                            ]
                        */

                        let halfPeriodMark = 0;
                        let fullperiodMark = 0;
                        let finalMark = 0;
                        let examMark = 0;
                        let result = null;

                        // Loop to iterate through subjectData
                        subjectData.forEach((data, index) => {
                            // Space for calculations
                            // TODO: Add your calculations here
                            console.log("data is");
                            console.log(data);

                            if(data.type === "assignment_3"){
                                fullperiodMark += data.mark_percentage * 0.34;
                            }else if(data.type != "exam"){
                                fullperiodMark += data.mark_percentage * 0.33;
                            }else{
                                examMark = data.mark_percentage;
                            }
                        });

                        finalMark = (fullperiodMark * 0.40) + (examMark * 0.60);

                        if(finalMark > 49 && finalMark < 56){
                            result = "pass-warning"
                        }else if(finalMark > 55 && finalMark < 60){
                            result = "pass"
                        }
                        else if(finalMark > 59 && finalMark < 75){
                            result = "pass-safe"
                        }
                        else if(finalMark > 74){
                            result = "pass-distinction"
                        }
                        else if(finalMark < 50){
                            result = "fail"
                        }

                        return (
                            <ExamResultCard 
                                key={subjectKey}
                                result={result} 
                                examMonth={6} 
                                subject={subjectKey} 
                                halfPeriodMark={halfPeriodMark.toFixed(1)} 
                                fullPeriodMark={fullperiodMark.toFixed(1)} 
                                finalMark={finalMark}
                            />
                        )
                    })
                )) : "Nothing Found"
                
                }
            </div>
        </div>
    );

    const options = (
        <div id="exam-year-qualification-options">
            {Object.keys(examData).map((examYear, index) => (
                <div key={index} className="exam-item" onClick={loadResults} data-year={examYear}>
                    <div className="exam-year">{examYear}</div>
                    <div className="exam-qualification">Bsc In Information Technology</div>
                </div>
            ))}
        </div>
    );

    return(
        <div id="examResults">
            <div id="student-details-exam-year">
                <span>{`${student.fName} ${student.lName}`}</span>
                <span>{localStorage.getItem('studentNumber')}</span>
            </div>
            {showResults ? results : options}
        </div>
    );
}