import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function ViewBookDetails() {
    const [bookDetails, setBookDetails] = useState([])
    useEffect(() => {
        fetch("http://localhost:2001/getallbooks")
            .then(data => data.json())
            .then((res) => {
                setBookDetails(res)
            })
    }, [])

    function handledelete(book_id) {
        var deleteData = {
            book_id: book_id
        }
        axios.post("http://localhost:2001/deletebook", deleteData)
            .then((res) => {
                if (res.data.status === "error") {
                    alert("Book can't be deleted !")
                }
                else if (res.data.status === "success") {
                    alert("Book Successfully deleted !")
                    window.location.reload();
                }
            })
    }

    return (
        <>
            <div className="container m-5">
                <div className="row g-2">
                    {
                        bookDetails.map((value, index) => (
                            <>
                                <div className="col-lg-4">
                                    <div className="container">
                                        <div className="card">
                                            <img className="h-50 sizee" src={value.book_image} alt="..." />
                                            <div className="card-body sizee">
                                                <div className="card shadow-lg  bg-dark-subtle p-2">
                                                    <h4 className="card-title text-center  bg-success p-1 text-white">Book Id :{value.book_id}</h4>
                                                    <h4>Department : {value.department}</h4>
                                                    <h5>Book Title : {value.book_title}</h5>
                                                    <h6>Author : {value.author}</h6>
                                                </div>
                                                <Link to={`/update/${value.book_id}`}><input type="button" className="btn btn-primary mt-3" value="Update" /></Link>
                                                <input type="button" className="btn btn-danger float-end mt-3" value="Delete" onClick={() => { handledelete(value.book_id) }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
                {/* <Link to='/admindashboard'><h3>Click here to go back</h3></Link> */}
            </div>
        </>
    );
}