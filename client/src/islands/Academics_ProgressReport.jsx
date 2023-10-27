

export default function Academics_ProgressReport(){

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
                {/* A Single report */}
                <div className="report">
                    <div className="report-year">2023</div>
                    <div className="report-qualification">RBSIT: BSC IN INFORMATION TECHNOLOGY</div>
                    <div className="report-content">
                        <div className="report-subject">
                            <span>SUBJECT: AFI700D</span>
                            <span>ARTIFICIAL INTELLIGENCE 700</span>
                        </div>
                        <div className="report-detail">
                            <div className="academic-period">Semester 1 (JAN - JUN)</div>
                            <div className="half-period-mark">Half Period Mark:</div>
                            <div className="full-period-mark">Full Period Mark: 74</div>
                        </div>
                        <div className="exam-admission">
                            Exam Admission: Y
                        </div>
                        <div className="grades">
                            <div className="exam-admission-icon">
                                YES
                            </div>
                            <div className="grade-detail">
                                <div className="grade-group">Group: Class - A</div>
                                {/* Always two grade groups */}
                                <div className="grade">
                                    <div className="mark-type">
                                        <div className="type">
                                            ASSIGNMENTS
                                        </div>
                                        <div className="mark">
                                            Mark: 71
                                        </div>
                                    </div>
                                    <div className="marks">
                                        <table>
                                            <thead>
                                                <th></th>
                                                <th>Assignment 1</th>
                                                <th>Assignment 2</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td>70</td>
                                                    <td>72</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="grade">
                                    <div className="mark-type">
                                        <div className="type">
                                            CONTINUOUS ASSESSMENT
                                        </div>
                                        <div className="mark">
                                            Mark: 79
                                        </div>
                                    </div>
                                    <div className="marks">
                                        <table>
                                            <thead>
                                                <th></th>
                                                <th>CA 1</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td>79</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* END GRADE GROUPS */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* END REPORT */}
            </div>
        </div>
    );
}