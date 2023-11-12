import { useState, useEffect } from "react";
import "./../lib/style/student.css"
import { createClient } from '@supabase/supabase-js';


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
            :<>
                <h1>Error</h1>
                <p>An error occured while loading your student information. Please contact your student advisor or try again later.</p>
            </>
            }
        </div>
    );
}