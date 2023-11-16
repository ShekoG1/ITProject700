import validateUser from './../util/auth';
import DataManipulation from './../util/dataManipulation';

export default function Academics_ProgressReport(props){
    validateUser();
    const dataManipulation = new DataManipulation();
    const results = props.results;
    console.log(results)
    return(
        <div id="progressreport-content">
            <div id="header">
                <h1>Progress Report</h1>
            </div>
            <div id="student-details">
                <div id="student-names">
                    <span id="student-fname">Shekhar</span>
                    <span id="student-mnames"></span>
                    <span id="student-lname">Maharaj</span>
                </div>
                <div id="student-number">402101963</div>
            </div>
            <div id="progress-reports">
                {results.map((module, index) => {
                    return module.years.map((year, yearIndex) => {
                        return year.semesters.map((semester, semesterIndex) => {
                            return (
                                <div key={`${index}-${yearIndex}-${semesterIndex}`} className="report">
                                    <div className="report-year">{year.year}</div>
                                    {/* <div className="report-qualification">{module.module_code}</div> */}
                                    <div className="report-qualification">BSC IT</div>
                                    <div className="report-content">
                                         <div className="report-subject">
                                            <span>SUBJECT: {module.module_code}</span>
                                        </div>
                                        <table className='grade'>
                                            <tbody>
                                            {semester.marks.map((mark, markIndex) => {
                                                return (
                                                    <td key={markIndex} className="report-grade">
                                                        <tr className={`progress-heading ${mark.type === "exam" ? 'exam':null}`}>{dataManipulation.formatString(mark.type)}</tr>
                                                        <tr>{mark.mark_percentage}</tr>
                                                    </td>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                        <div className='breaker'></div>
                                        <div className="report-detail">
                                            <div className="academic-period">Semester {semester.semester}</div>
                                            <div className="full-period-mark">Full Period Mark: {semester.total}</div>
                                        </div>
                                        <div className="exam-admission">
                                            Exam Admission: Y
                                        </div>
                                    </div>
                                </div>
                            );
                        });
                    });
                })}
            </div>
        </div>
    );
}