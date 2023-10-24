import FilledBtn from "../components/FilledBtn";
import "../lib/style/dashboard.css"
import finalResults from "../lib/assets/finalResults.jpg";
import academicRecord from "../lib/assets/academicRecord.jpg";
import progressReport from "../lib/assets/progressReport.jpg";
import profile from "../lib/assets/profile.jpg";

export default function Dashboard(props){
    return(
        <div id="dashboard">
            <div id="components">
                <div className="component" id="finance-due">
                    <div className="component-heading">
                        <span>Finance</span>
                    </div>
                    <div className="component-content">
                        <span>Next Payment</span>
                        <span><strong>R 3, 500.00</strong></span>
                    </div>
                    {/* <div className="view-now-btn">
                        <FilledBtn label="View" onClick={()=>{window.location.href = "/Finance"}}/>
                    </div> */}
                </div>
                <div className="component" id="final-results">
                    <div className="component-heading">
                        <span>Final Results</span>
                    </div>
                    <div className="component-content">
                        <img src={finalResults} alt="Final Results"/>
                    </div>
                    {/* <div className="view-now-btn">
                        <FilledBtn label="View" onClick={()=>{window.location.href = "/Final-Results"}}/>
                    </div> */}
                </div>
                <div className="component" id="academic-record">
                    <div className="component-heading">
                        <span>Academic Record</span>
                    </div>
                    <div className="component-content">
                        <img src={academicRecord} alt="Final Results"/>
                    </div>
                    {/* <div className="view-now-btn">
                        <FilledBtn label="View" onClick={()=>{window.location.href = "/Dashboard"}}/>
                    </div> */}
                </div>
                <div className="component" id="progress-report">
                    <div className="component-heading">
                        <span>Progress Report</span>
                    </div>
                    <div className="component-content">
                        <img src={progressReport} alt="Final Results"/>
                    </div>
                    {/* <div className="view-now-btn">
                        <FilledBtn label="View" onClick={()=>{window.location.href = "/Dashboard"}}/>
                    </div> */}
                </div>
            </div>
            <div className="component" id="student-advisor">
                <div className="component-heading">
                    <span>Student Advisor Details</span>
                </div>
                <div className="component-content">
                    <div id="details">
                    <p>You may contact your designated student advisor by using the following details</p>

                    <table>
                        <tbody>
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
                        </tbody>
                    </table>
                    </div>
                    <div className="profile">
                        <img src={profile} alt="Profile" />
                    </div>
                </div>
                <div className="view-now-btn">
                    <FilledBtn label="Contact" onClick={()=>{window.location.href = "/Dashboard"}}/>
                </div>
            </div>
        </div>
    );
}