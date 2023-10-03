import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function Admindashboard() {
    var { id } = useParams()
    const[info,setInfo]=useState([])
    useEffect(()=>{
        fetch("http://localhost:2001/getadmin/"+id)
        .then(data=>data.json())
        .then((res)=>{
            setInfo(res[0])
        })
    },[])
    function handlebooks(event){
        event.preventDefault();
        var bookId = document.getElementById("bookId").value;
        var deptId = document.getElementById("deptId").value;
        var semId = document.getElementById("semId").value;
        var titleId = document.getElementById("titleId").value;
        var authorId = document.getElementById("authorId").value;
        var imageId = document.getElementById("imageId").value;

        var bookDetails = {
            bookId:bookId,
            deptId:deptId,
            semId:semId,
            titleId:titleId,
            authorId:authorId,
            imageId:imageId
        }
        if(bookId === ''){
            alert("Enter Book Id !")
        }
        else if(deptId === ''){
            alert("Enter Department !")
        }
        else if(titleId === ''){
            alert("Enter Book Title !")
        }
        else if(imageId === ''){
            alert("Enter Image Link !")
        }
        else{
            axios.post("http://localhost:2001/uploadbooks/"+id,bookDetails)
            .then((res)=>{
                if(res.data.status === "success"){
                    alert("Books Uploaded Successfully !")
                    window.location.reload();
                }
                else if(res.data.status === "error"){
                    alert("Enter valid details !")
                }
            })
        }
    }
    return (
        <>
            <div className="container mt-5">
                <div className="card text-white bg-dark bg-opacity-50">
                    <h1 className="text-center">Welcome {info.first_name}</h1>
                    <div className="container">
                        <div className="card bg-light m-3 bg-opacity-25 text-white">
                            <h1 className="card-title text-center">Books Upload</h1>
                            <div className="card-body">
                                <form onSubmit={handlebooks}>
                                <h5 className="p-1 m-2">Book Id</h5>
                                <input type="text" id="bookId" className="p-1 m-2 w-100" placeholder="Enter Book Id"/>
                                <label><h5 className="p-1 m-2">Department</h5></label>
                                <select id="deptId">
                                    <option>Select Department</option>
                                    <option value="CSE">Computer Science</option>
                                    <option value="ECE">ECE</option>
                                    <option value="MECHANICAL">Mechanical</option>
                                    <option value="EEE">EEE</option>
                                    <option value="CIVIL">Civil</option>
                                </select>
                                <label><h5 className="p-1 m-2">Select semester</h5></label>
                                <select id="semId">
                                    <option>Select semester</option>
                                    <option value="1st-sem">1st sem</option>
                                    <option value="2nd-sem">2nd sem</option>
                                    <option value="3rd-sem">3rd sem</option>
                                    <option value="4th-sem">4th sem</option>
                                    <option value="5th-sem">5th sem</option>
                                    <option value="6th-sem">6th sem</option>
                                    <option value="7th-sem">7th sem</option>
                                    <option value="8th-sem">8th sem</option>
                                </select>
                                <h5 className="p-1 m-2">Book Title</h5>
                                <input type="text" id="titleId" className="p-1 m-2 w-100" placeholder="Enter Book Title"/>
                                <h5 className="p-1 m-2">Author</h5>
                                <input type="text" id="authorId" className="p-1 m-2 w-100" placeholder="Enter Author Name"/>
                                <h5 className="p-1 m-2">Book Image URL</h5>
                                <input type="text" id="imageId" className="p-1 m-2 w-100" placeholder="Enter Book Image URL"/>
                                <div className="m-2">
                                    <input type="submit" className="btn btn-primary w-50 text-center p-1" value="Upload"/>
                                </div>
                                </form>
                                    <Link to='/viewbookdetails'><input type="submit" className="btn btn-primary p-1" value="View Book Details"/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}