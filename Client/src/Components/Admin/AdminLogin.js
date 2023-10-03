import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
export function AdminLogin() {
    function handlelogin(event){
        event.preventDefault();
        var username = document.getElementById("userId").value;
        var password = document.getElementById("passId").value;
        var license = document.getElementById("licenseId").value;

        var adminLoginDetails = {
            username:username,
            password:password,
            license:license
        }

        if(username === ''){
            alert("Enter your username !")
        }
        else if(password === ''){
            alert("Enter your password !")
        }
        else if(license === ''){
            alert("Enter valid license key !")
        }
        else{
            axios.post("http://localhost:2001/adminlogin",adminLoginDetails)
            .then((res)=>{
                var firstName = res.data.firstName;
                var lastName = res.data.lastName;
                var id = res.data.dbid;
                if(res.data.status === "internal"){
                    alert("Admin error !")
                    window.location.reload();
                }
                else if(res.data.status === "email"){
                    alert("Enter valid email !")
                    window.location.reload();
                }
                else if(res.data.status === "password"){
                    alert("Please enter valid password !")
                    window.location.reload();
                }
                else if(res.data.status === "mismatch"){
                    alert("Please enter valid license key !")
                    window.location.reload();
                }
                else if(res.data.status === "success"){
                    alert(`Hi ${firstName} ${lastName} login successfully !`)
                    window.location.reload();
                    window.location.href=`/admindashboard/${id}`
                }
                else if(res.data.status === "error"){
                    alert("Internal server error")
                    window.location.reload();
                }
            })
        }
    }
    return (
        <>
            <div className="container align-items-center mt-5">
                <div className="container card w-75 bg-dark text-white bg-opacity-50">
                    <form onSubmit={handlelogin}>
                    <h1 className="card-title text-center">Admin Login</h1>
                    <div className="card-body">
                        <h5 className="p-1 m-2">Username</h5>
                        <input type="text" id="userId" className="w-100 p-2 m-2" placeholder="Enter your email"/>
                        <h5 className="p-1 m-2">Password</h5>
                        <input type="password" id="passId" className="w-100 p-2 m-2" placeholder="Enter your password"/>
                        <h5 className="p-1 m-2">License Key</h5>
                        <input type="password" id="licenseId" className="w-100 p-2 m-2" placeholder="Enter your License key"/>
                        <div className="m-2 p-1 text-center">
                        <input type="submit" className="btn btn-primary w-50" value="Login"/>
                        <p className="mt-2">Don't have an account?<Link to='/adminregister'> click here to signup</Link></p>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
}