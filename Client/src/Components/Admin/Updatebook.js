import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function Updatebooks() {
    var { book_id } = useParams()
    const [info, setInfo] = useState([])
    useEffect(() => {
        fetch("http://localhost:2001/getbooksforupdate/" + book_id)
            .then(data => data.json())
            .then((res) => {
                setInfo(res[0])
            })
    }, [])
    function handleupdate(event) {
        event.preventDefault();
        var department = document.getElementById("deptId").value;
        var title = document.getElementById("titleId").value;
        var author = document.getElementById("authorId").value;
        var imageel = document.getElementById("imageId").value;

        var bookDetails = {
            department: department,
            title: title,
            author: author,
            imageel: imageel
        }
        if (department === "") {
            alert("enter department")
        }
        else if (title === "") {
            alert("enter title")
        } else if (author === "") {
            alert("Enter about")
        }
        else if (imageel === "") {
            alert("upload image")
        }
        else {
            axios.put("http://localhost:2001/update/" + book_id, bookDetails)
                .then((response) => {
                    if (response.data.status === "success") {
                        alert("Book updated successfully!")
                    }
                    else if (response.data.status === "error") {
                        alert("Book didn't get updated!")
                    }
                })

        }
    }
    function newdata(event) {
        setInfo(event.target.value);
    }
    return (
        <>
        <div className="container">
            <form onSubmit={handleupdate} onChange={newdata}>
                <h1 className="text-center text-white">Books Update page</h1>
                <div className="d-flex mt-5 justify-content-center align-items-center">
                    <div className="card w-100 p-5 bg-dark bg-opacity-50 text-white">
                        <h3 className="p-1 m-2">Department</h3>
                        <input type="text" id="deptId" className="p-1 m-2" placeholder="Department" value={info.department} />
                        <h3 className="p-1 m-2">Enter Book Title</h3>
                        <input type="text" id="titleId" className="p-1 m-2" placeholder="Book-title" value={info.book_title} />
                        <h3 className="p-1 m-2">Author</h3>
                        <input type="text" id="authorId" className="p-1 m-2" placeholder="Author Name" value={info.author} />
                        <h3 className="p-1 m-2">Book image URL</h3>
                        <input type="text" id="imageId" className="p-1 m-2" placeholder="image:url" value={info.book_image} />
                        <input type="submit" className="btn btn-primary m-2 w-50" value='Upload' />
                        <Link to={`/viewbookdetails`}> <input type="button" className="btn btn-primary m-2" value='View book details' /></Link>
                    </div>
                </div>
            </form>
            </div>
        </>
    );
}