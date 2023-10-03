import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export function StudentRegister() {
    function handleregister(event){
        event.preventDefault();
        var firstName = document.getElementById("firstNameId").value;
        var lastName = document.getElementById("lastNameId").value;
        var email = document.getElementById("emailId").value;
        var password = document.getElementById("passwordId").value;
        var phone = document.getElementById("phoneId").value;
        var college = document.getElementById("collegeId").value;
        var department = document.getElementById("deptId").value;
        
        var studentRegisterDetails = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            phone:phone,
            college:college,
            department:department
        }

        if(firstName === ''){
            alert("Enter your first name !")
        }
        else if(lastName === ''){
            alert("Enter your last name !")
        }
        else if(email === ''){
            alert("Enter your email !")
        }
        else if(password === ''){
            alert("Enter your password !")
        }
        else if(phone === ''){
            alert("Enter your phone number")
        }
        else if(college === ''){
            alert("Enter your college name !")
        }
        else if(department === ''){
            alert("Select your department !")
        }
        else{
            axios.post("http://localhost:2001/studentregister",studentRegisterDetails)
            .then((res)=>{
                var firstName = res.data.firstName;
                var lastName = res.data.lastName;
                var department = res.data.department
                if(res.data.status === "success"){
                    if(department === "cse"){
                        alert(`Hi ${firstName} ${lastName} registered successfully !`)
                        window.location.href =`/studentlogin`;
                    }
                    else if(department === "ece"){
                        alert(`Hi ${firstName} ${lastName} registered successfully !`)
                        window.location.href = `/studentlogin`
                    }
                    else if(department === "mech"){
                        alert(`Hi ${firstName} ${lastName} registered successfully !`)
                        window.location.href = `/studentlogin`
                    }
                    else if(department === "civil"){
                        alert(`Hi ${firstName} ${lastName} registered successfully !`)
                        window.location.href = `/studentlogin`
                    }
                    else if(department === "eee"){
                        alert(`Hi ${firstName} ${lastName} registered successfully !`)
                        window.location.href = `/studentlogin`
                    }
                    // window.location.reload();
                }
                else if(res.data.status === "error"){
                    alert("User already exist ! please log in")
                    window.location.reload();
                }
            })
        }
    }
    return (
        <>
            <div className="container d-flex justify-content-center mt-5">
                <div className="card w-75 h-75 bg-opacity-50 text-white justify-content-center bg-warning">
                    <form onSubmit={handleregister}>
                        <h1 className="text-center">Student Registration Form</h1>
                        <div className="card-body">
                            <h5 className="p-1 m-2">First Name</h5>
                            <input type="text" id="firstNameId" className="w-100 p-2 m-2" placeholder="Enter your first name" />
                            <h5 className="p-1 m-2">last Name</h5>
                            <input type="text" id="lastNameId" className="w-100 p-2 m-2" placeholder="Enter your last name" />
                            <h5 className="p-1 m-2">Email</h5>
                            <input type="text" id="emailId" className="w-100 p-2 m-2" placeholder="Enter your Email" />
                            <h5 className="p-1 m-2">Password</h5>
                            <input type="password" id="passwordId" className="w-100 p-2 m-2" placeholder="Enter your password" />
                            <h5 className="p-1 m-2">Phone Number</h5>
                            <input type="text" id="phoneId" className="w-100 p-2 m-2" placeholder="Enter your phone number" />
                            <h5 className="p-1 m-2">College Name</h5>
                            <input type="text" id="collegeId" className="w-100 p-2 m-2" placeholder="Enter your college name" />
                            <label className="p-1 m-2">Department</label>
                            <select id="deptId">
                                <option>Select department</option>
                                <option value="cse">CSE</option>
                                <option value="ece">ECE</option>
                                <option value="mech">Mechanical</option>
                                <option value="civil">CIVIL</option>
                                <option value="eee">EEE</option>
                            </select>
                            <div className="text-center mt-3">
                            <input type="submit" className="btn btn-primary w-50"/>
                            <p className="mt-2">Already have an Account?<Link to='/studentlogin'> Click here to login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}