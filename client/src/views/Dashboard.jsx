import FilledBtn from "../components/FilledBtn";
import "../lib/style/dashboard.css"

export default function Dashboard(props){
    return(
        <div id="dashboard">
            <div className="component" id="finance-due">
                <div className="component-heading">
                    <span>Finance</span>
                </div>
                <div className="component-content">
                    <span>Next Payment</span>
                    <span><strong>R 3, 500.00</strong></span>
                </div>
                <div className="view-now-btn">
                    <FilledBtn label="View Details" onClick={()=>{window.location.href = "/Finance"}}/>
                </div>
            </div>
            <div className="component" id="final-results">
                <div className="component-heading">
                    <span>Final Results</span>
                </div>
                <div className="component-content">
                    <p>View your final results for each semester, of each year, of your designated program.</p>
                </div>
                <div className="view-now-btn">
                    <FilledBtn label="View" onClick={()=>{window.location.href = "/Final-Results"}}/>
                </div>
            </div>
            <div className="component" id="academic-record">
                <div className="component-heading">
                    <span>Academic Record</span>
                </div>
                <div className="component-content">
                    <p>View all grades thus far for each semester, of each year, of your program.</p>
                    <p>These grades include all assignments, tests and exams</p>
                    <p><i>Note: This is often used to report grades in job applications</i></p>
                </div>
                <div className="view-now-btn">
                    <FilledBtn label="View" onClick={()=>{window.location.href = "/Dashboard"}}/>
                </div>
            </div>
            <div className="component" id="progress-report">
                <div className="component-heading">
                    <span>Progress Report</span>
                </div>
                <div className="component-content">
                    <p>View all grades of assignments and tests for the entirety of your program completed thus far.</p>
                </div>
                <div className="view-now-btn">
                    <FilledBtn label="View" onClick={()=>{window.location.href = "/Dashboard"}}/>
                </div>
            </div>
            <div className="component" id="student-advisor">
                <div className="component-heading">
                    <span>Student Advisor Details</span>
                </div>
                <div className="component-content">
                    <p>You may contact your designated student advisor by using the following details</p>

                    <table>
                        <tr>
                            <td>
                                Name:
                            </td>
                            <td>
                                Khanyisile Ngobo
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Phone Number:
                            </td>
                            <td>
                                (000)-000-0000
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email Address:
                            </td>
                            <td>
                                KhanyisileN@richfield.ac.za
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Office Hours
                            </td>
                            <td>
                                Monday - Friday<br/>
                                08:00AM - 05:00PM
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Average Response Time (Email)
                            </td>
                            <td>
                                1 hour
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="view-now-btn">
                    <FilledBtn label="Contact" onClick={()=>{window.location.href = "/Dashboard"}}/>
                </div>
            </div>
        </div>
    );
}