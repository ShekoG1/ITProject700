import Swal from "sweetalert2"
import { createClient } from '@supabase/supabase-js';
import "./../lib/style/student.css";

const UpdateUserDetailsForm = (e) => {
    const student = JSON.parse(e.target.getAttribute('data-student'));
    console.log(student)
    const markup = `
    <div class="update-form">
        <div class="user-names">
            <div class="update-form-input">
                <label htmlFor="fName">First Name</label>
                <input type="text" name="fName" id="fName" value="${student.fName}"/>
            </div>
            <div class="update-form-input">
                <label htmlFor="lName">Last Name</label>
                <input type="text" name="lName" id="lName" value="${student.lName}"/>
            </div>
        </div>
        <div class="update-form-input">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div class="phone">
                <div class="country-code">
                    +27
                </div>
                <input type="number" name="contactNumber" id="contactNumber" max={9} value="${student.contactNumber.slice(1)}"/>
            </div>
        </div>
        <div class="update-form-input">
            <label htmlFor="emailAddress">Email Address</label>
            <input type="email" name="emailAddress" id="emailAddress" value="${student.emailAddress}" />
        </div>
        <div class="update-form-input">
            <label htmlFor="physicalAddress">Physical Address</label>
            <div id="address">
                <label>Street name and number</label><br/>
                <input type="text" name="street" id="street" value="${student.address[0].street}"/><br/>
                <label>City</label><br/>
                <input type="text" name="city" id="city" value="${student.address[0].city}"/><br/>
                <label>State/Province</label><br/>
                <input type="text" name="state" id="state" value="${student.address[0].state}"/><br/>
                <label>Postal Code</label><br/>
                <input type="number" max="4" name="postalCode" id="postalCode" value="${student.address[0].postalCode}"/><br/>
                <label>Country</label><br/>
                <select name="country" id="country">
                    <option ${student.address[0].country == "" ? 'default selected':null} value="">Country</option>
                    <option ${student.address[0].country == "South Africa" ? 'default selected':null} value="South Africa">South Africa</option>
                    <option ${student.address[0].country == "United States of America" ? 'default selected':null} value="United States of America">United States of America</option>
                    <option ${student.address[0].country == "Canada" ? 'default selected':null} value="Canada">Canada</option>
                    <option ${student.address[0].country == "Zimbabwe" ? 'default selected':null} value="Zimbabwe">Zimbabwe</option>
                </select>
            </div>
        </div>
    </div
    `;

    Swal.fire({
        title: 'Update Info',
        html: markup,
        icon: 'info',
        confirmButtonText: 'Update',
        showCancelButton: true,
        cancelButtonText: 'Cancel'
    }).then(async (result)=>{
        if(result.isConfirmed){
            console.log(document.querySelector('#country').value);

            // Intialize Supabase
            const supabase = createClient(
                process.env.REACT_APP_SUPABASE_URL,
                process.env.REACT_APP_SUPABASE_KEY
            );

            // Get form values
            const updatedStudent = {
                fName: document.querySelector("#fName").value,
                lName: document.querySelector("#lName").value,
                emailAddress: document.querySelector("#emailAddress").value,
                contactNumber: "0"+document.querySelector("#contactNumber").value
            }
            const updateStudentAddress = {
                street:document.querySelector("#street").value,
                city:document.querySelector("#city").value,
                state:document.querySelector("#state").value,
                postalCode:document.querySelector("#postalCode").value,
                country:document.querySelector("#country").value
            }

            // Validate form values
            for (let key in updatedStudent) {
                if (updatedStudent[key] === '') {
                    Swal.fire({
                        title: 'Error',
                        text: `${key} cannot be blank`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                }
            }
            for (let key in updateStudentAddress) {
                if (updateStudentAddress[key] === '') {
                    Swal.fire({
                        title: 'Error',
                        text: `${key} cannot be blank`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                }
            }

            // Update User
            try {
                console.log(updatedStudent)
                const { data,error } = await supabase
                .from('student')
                .update(updatedStudent)
                .eq('studentNumber','402101963')
                .select();
                if (error) {
                    Swal.fire({
                        title: 'Error',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    console.log("Updated user");
                    console.log(data)
                    // Update Address
                    try {
                        const { error } = await supabase
                        .from('address')
                        .update(updateStudentAddress)
                        .eq('studentNumber',localStorage.getItem('studentNumber'));
                        if (error) {
                            Swal.fire({
                                title: 'Error',
                                text: error.message,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        } else {
                            // Success
                            Swal.fire({
                                title: 'Success',
                                text: 'Student details updated successfully',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(()=>{
                                window.location.reload();
                            });
                        }
                    } catch (error) {
                        Swal.fire({
                            title: 'Error',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    });
}

export default UpdateUserDetailsForm
