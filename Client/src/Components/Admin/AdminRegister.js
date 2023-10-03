import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export function AdminRegister() {
    function handleregister(event){
        event.preventDefault();
        var firstName = document.getElementById("firstNameId").value;
        var lastName = document.getElementById("lastNameId").value;
        var email = document.getElementById("emailId").value;
        var password = document.getElementById("passwordId").value;
        var phone = document.getElementById("phoneId").value;
        var license = document.getElementById("licenseId").value;
        
        var adminRegisterDetails = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            phone:phone,
            license:license
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
        else if(license === ''){
            alert("Enter your license key")
        }
        else{
            axios.post("http://localhost:2001/adminregister",adminRegisterDetails)
            .then((res)=>{
                var firstName = res.data.firstName;
                if(res.data.status === "invalid"){
                    alert("Enter valid license key !")
                    window.location.reload();
                }
                else if(res.data.status === "success"){
                    alert("Admin registered successfully !")
                    window.location.reload();
                    window.location.href =`/admindashboard/${firstName}`;
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
                <div className="card w-75 h-75 bg-opacity-50 text-white justify-content-center bg-dark">
                    <form onSubmit={handleregister}>
                        <h1 className="text-center">Admin Registration Form</h1>
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
                            <h5 className="p-1 m-2">License Key</h5>
                            <input type="password" id="licenseId" className="w-100 p-2 m-2" placeholder="Enter your license key" />
                            <div className="text-center mt-3">
                            <input type="submit" className="btn btn-primary w-50"/>
                            <p className="mt-2">Already have an Account?<Link to='/adminlogin'> Click here to login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}