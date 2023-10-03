import React from "react";
import { Link } from "react-router-dom";

export function HomePage() {
    return (
        <>
            <div className="container row justify-content-center m-5 text-center">
                <h1 className="mb-5 text-info text-shadow-25 shadow-lg">Anna University Books for Engineering Students</h1>
                <div className="col-lg-6">
                    <div className="card mt-5 p-4 text-warning bg-success bg-opacity-50 shadow-lg">
                        <h1 className="card-title">Admin</h1>
                        <p>(*Authorized persons only allowed here.)</p>
                        <div className="card-body pb-5">
                            <Link to='/adminlogin' ><input type='submit' className="btn btn-primary fs-5" value='Login'/></Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card mt-5 p-5 bg-light bg-opacity-50">
                        <h1 className="card-title">Student</h1>
                        <div className="card-body pb-5">
                            <Link to='/studentlogin' ><input type='submit' className="btn btn-primary fs-5" value='Login'/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}