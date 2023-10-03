import React, { useEffect, useState } from "react";

export function Civilfourthsem() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        fetch("http://localhost:2001/getfourthsemcivilbooks")
            .then(data => data.json())
            .then((res) => {
                setBooks(res)
            })
    }, [])
    return (
        <>
            <div className="container m-5">
                <div className="row g-2">
                    {
                        books.map((value, index) => (
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
                                                    <p>Semester : {value.semester}</p>
                                                </div>
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