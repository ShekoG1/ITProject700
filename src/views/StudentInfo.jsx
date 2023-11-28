import { useState, useEffect } from "react";
import "./../lib/style/student.css"
import { createClient } from '@supabase/supabase-js';
import UpdateUserDetailsForm from "../islands/UpdateUserDetailsForm";

export default function StudentInfo(){

    const [student,setStudent] = useState(null);
    const [address,setAddress] = useState(null);
    const [wait,setWait] = useState(true)

    useEffect(() => {
        const fetchSupabaseData = async () => {
          const supabase = createClient(
            process.env.REACT_APP_SUPABASE_URL,
            process.env.REACT_APP_SUPABASE_KEY
          );
    
          try {
            const { data, error } = await supabase
              .from('student')
              .select(`*, address!inner(*)`)
              .eq('studentNumber',localStorage.getItem('studentNumber'));
            if (error) {
                setWait(true);
                console.log(error)
            } else {
                console.log(data[0])
                setStudent(data[0]);
                setWait(false);
            }
          } catch (error) {
            setWait(true);
          }
        };
    
        fetchSupabaseData();
      }, []);

    return(
        <div id="student">
            <h1>Student Information</h1>
            { student != 'error' ?
            <>
                <div id="details-tools">
                    {
                        wait ? null :
                        <button id="update-details-btn" data-student={JSON.stringify(student)} onClick={UpdateUserDetailsForm}>
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                            </i>
                            Update
                        </button>
                    }
                </div>
                <table>
                <tbody>
                    <tr>
                        <td>
                            Full Name
                        </td>
                        <td>{wait ? "...Loading" : `${student.fName} ${student.lName}`}</td>
                    </tr>
                    <tr>
                        <td>
                            Student Number
                        </td>
                        <td>{wait ? "...Loading" : `${student.studentNumber}`}</td>
                    </tr>
                    <tr>
                        <td>
                            Mobile Number
                        </td>
                        <td>{wait ? "...Loading" : `${student.contactNumber}`}</td>
                    </tr>
                    <tr>
                        <td>
                            Email Address
                        </td>
                        <td>{wait ? "...Loading" : `${student.emailAddress}`}</td>
                    </tr>
                    <tr>
                        <td>
                            Postal Address
                        </td>
                        <td>
                            {wait ? "...Loading" : `${student.address[0].street}`}<br/>
                            {wait ? "...Loading" : `${student.address[0].city}`}<br/>
                            {wait ? "...Loading" : `${student.address[0].country}, ${student.address[0].postalCode}`}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Physical Address
                        </td>
                        <td>
                        {wait ? "...Loading" : `${student.address[0].street}`}<br/>
                            {wait ? "...Loading" : `${student.address[0].city}`}<br/>
                            {wait ? "...Loading" : `${student.address[0].country}, ${student.address[0].postalCode}`}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Study Address
                        </td>
                        <td>
                        {wait ? "...Loading" : `${student.address[0].street}`}<br/>
                            {wait ? "...Loading" : `${student.address[0].city}`}<br/>
                            {wait ? "...Loading" : `${student.address[0].country}, ${student.address[0].postalCode}`}
                        </td>
                    </tr>
                </tbody>
            </table>
            </>
            :<>
                <h1>Error</h1>
                <p>An error occured while loading your student information. Please contact your student advisor or try again later.</p>
            </>
            }
        </div>
    );
}