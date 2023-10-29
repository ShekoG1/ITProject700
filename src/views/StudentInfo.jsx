import "./../lib/style/student.css"

export default function StudentInfo(){
    return(
        <div id="student">
            <h1>Student Information</h1>
            <table>
                <tbody>
                    <tr>
                        <td>
                            Full Name
                        </td>
                        <td>Shekhar Maharaj</td>
                    </tr>
                    <tr>
                        <td>
                            Student Number
                        </td>
                        <td>402101963</td>
                    </tr>
                    <tr>
                        <td>
                            Mobile Number
                        </td>
                        <td>(084)-894-7990</td>
                    </tr>
                    <tr>
                        <td>
                            Email Address
                        </td>
                        <td>402101963@my.richfield.ac.za</td>
                    </tr>
                    <tr>
                        <td>
                            Postal Address
                        </td>
                        <td>
                            177A Bleecker Street,<br/>
                            Greenwich Village, New York, <br/>
                            USA, 4068
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Physical Address
                        </td>
                        <td>
                            177A Bleecker Street,<br/>
                            Greenwich Village, New York, <br/>
                            USA, 4068
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Study Address
                        </td>
                        <td>
                            177A Bleecker Street,<br/>
                            Greenwich Village, New York, <br/>
                            USA, 4068
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}