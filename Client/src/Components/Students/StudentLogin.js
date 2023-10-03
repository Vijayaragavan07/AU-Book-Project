import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
export function StudentLogin() {
    function handlelogin(event) {
        event.preventDefault();
        var username = document.getElementById("userId").value;
        var password = document.getElementById("passId").value;

        var studentLoginDetails = {
            username: username,
            password: password,
        }

        if (username === '') {
            alert("Enter your username !")
        }
        else if (password === '') {
            alert("Enter your password !")
        }
        else {
            axios.post("http://localhost:2001/studentlogin", studentLoginDetails)
                .then((res) => {
                    var firstName = res.data.firstName;
                    var lastName = res.data.lastName;
                    var id = res.data.dbid;
                    var department = res.data.dbdepartment
                    if (res.data.status === "internal") {
                        alert("Admin error !")
                        window.location.reload();
                    }
                    else if (res.data.status === "email") {
                        alert("Enter valid email !")
                        window.location.reload();
                    }
                    else if (res.data.status === "password") {
                        alert("Please enter valid password !")
                        window.location.reload();
                    }
                    else if (res.data.status === "success") {
                        if(department === "cse"){
                            alert(`Hi ${firstName} ${lastName} login successfully !`)
                            window.location.href = `/csedashboard/${id}`
                        }
                        else if(department === "mech"){
                            alert(`Hi ${firstName} ${lastName} login successfully !`)
                            window.location.href = `/mechdashboard/${id}`
                        }
                        else if(department === "ece"){
                            alert(`Hi ${firstName} ${lastName} login successfully !`)
                            window.location.href = `/ecedashboard/${id}`
                        }
                        else if(department === "eee"){
                            alert(`Hi ${firstName} ${lastName} login successfully !`)
                            window.location.href = `/eeedashboard/${id}`
                        }
                        else if(department === "civil"){
                            alert(`Hi ${firstName} ${lastName} login successfully !`)
                            window.location.href =`/civildashboard/${id}`
                        }

                    }
                    else if (res.data.status === "error") {
                        alert("Internal server error")
                        window.location.reload();
                    }
                })
        }
    }
    return (
        <>
            <div className="container align-items-center mt-5">
                <div className="container card w-75 bg-warning text-white bg-opacity-50">
                    <form onSubmit={handlelogin}>
                        <h1 className="card-title text-center">Student Login</h1>
                        <div className="card-body">
                            <h5 className="p-1 m-2">Username</h5>
                            <input type="text" id="userId" className="w-100 p-2 m-2" placeholder="Enter your email" />
                            <h5 className="p-1 m-2">Password</h5>
                            <input type="password" id="passId" className="w-100 p-2 m-2" placeholder="Enter your email" />
                            <div className="m-2 p-1 text-center">
                                <input type="submit" className="btn btn-primary w-50" value="Login" />
                                <p className="mt-2">Don't have an account?<Link to='/studentregister'> click here to signup</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}