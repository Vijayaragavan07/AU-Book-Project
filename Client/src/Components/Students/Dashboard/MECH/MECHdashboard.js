import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function MECHdashboard() {
    const {id} = useParams()
    const[firstName,setFirstName]=useState([])
    useEffect(()=>{
        fetch("http://localhost:2001/getonemechstudent/"+id)
        .then(data=>data.json())
         .then((result)=>{
            setFirstName(result[0].first_name)
         })
    },[])
    return (
        <>
        <h1 className="text-center text-white bg-primary p-4">Welcome <span className="text-warning">{firstName}</span> to Mechanical Department !</h1>
            <div className="container">
                {/* <div className="d-flex justify-content-center align-items-center">
                <input type="input" className="w-50 "/>
                </div> */}
                <div className="card mt-5 bg-light bg-opacity-75">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-6">
                            <h1 className="pt-5 ps-5 pb-5">I Year</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 col-6">
                            <h2 className="pt-3"><Link to={`/mechfirstsem`}>I Semester</Link></h2>
                            <h2 className="pt-3"><Link to='/mechsecondsem'>II Semester</Link></h2>
                        </div>
                    </div>
                </div>
                <div className="card mt-5 bg-light bg-opacity-75">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-6">
                            <h1 className="pt-5 ps-5 pb-5">II Year</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 col-6">
                            <h2 className="pt-3"><Link to='/mechthirdsem'>III Semester</Link></h2>
                            <h2 className="pt-3"><Link to='/mechfourthsem'>IV Semester</Link></h2>
                        </div>
                    </div>
                </div>
                <div className="card mt-5 bg-light bg-opacity-75">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-6">
                            <h1 className="pt-5 ps-5 pb-5">III Year</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 col-6">
                            <h2 className="pt-3"><Link to='/mechfifthsem'>V Semester</Link></h2>
                            <h2 className="pt-3"><Link to='/mechsixthsem'>VI Semester</Link></h2>
                        </div>
                    </div>
                </div>
                <div className="card mt-5 bg-light bg-opacity-75">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-6">
                            <h1 className="pt-5 ps-5 pb-5">IV Year</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 col-6">
                            <h2 className="pt-3"><Link to='/mechseventhsem'>VII Semester</Link></h2>
                            <h2 className="pt-3"><Link to='/mecheighthsem'>VIII Semester</Link></h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}