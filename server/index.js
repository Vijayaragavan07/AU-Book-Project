const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const mysql = require("mysql")
const crypto = require("crypto")

var bookPage = express()
bookPage.use(cors())
bookPage.use(express.json())
bookPage.use(bodyparser.urlencoded({ extended: true }))
bookPage.use(express.static('public'))

let localdb = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Newsreader@07",
    database: "annauniversitybooks"
})

localdb.connect((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Database Connected !");
    }
})

bookPage.post("/adminregister", (request, response) => {
    var s_no = crypto.randomUUID();
    console.log(s_no);
    var dateTime = new Date();
    var createdDate = dateTime.toISOString().slice(0, 10);
    console.log(createdDate);
    var { firstName, lastName, email, password, phone, license } = request.body;
    var adminkey = "aubook";
    if (adminkey === license) {
        var insertQuery = `insert into admin (s_no,first_name,last_name,email,password,phone,license_key,created_by,updated_by,created_date,updated_date)
    values('${s_no}','${firstName}','${lastName}','${email}','${password}','${phone}','${license}','${s_no}','${s_no}','${createdDate}','${createdDate}')`
        console.log(insertQuery);
        localdb.query(insertQuery, (error, result) => {
            if (error) {
                response.send({ "status": "error" })
                console.log(error);
            }
            else {
                response.send({ "status": "success", "firstName": firstName, "lastName": lastName, "dbid": dbid })
                console.log(result);
            }
        })
    }
    else {
        response.send({ "status": "invalid" })
    }
})

bookPage.post("/adminlogin", (request, response) => {
    var { username, password, license } = request.body;
    console.log(username);
    console.log(password);
    console.log(license);
    var selectQuery = `select * from admin where email = '${username}'`
    console.log(selectQuery);
    localdb.query(selectQuery, (error, result) => {
        console.log(result);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else if (username.length > 0) {
            var dbemail = result[0].email;
            var dbpassword = result[0].password;
            var dblicense = result[0].license_key;
            var dbfname = result[0].first_name;
            var dblname = result[0].last_name;
            var dbid = result[0].s_no
            console.log(dbemail);
            console.log(dbpassword);
            console.log(dblicense);
            if (username === dbemail) {
                if (password === dbpassword) {
                    if (dblicense === license) {
                        response.send({ "status": "success", "firstName": dbfname, "lastName": dblname, "dbid": dbid })
                    }
                    else {
                        response.send({ "status": "mismatch" })
                    }
                }
                else {
                    response.send({ "status": "password" })
                }
            }
            else {
                response.send({ "status": "email" })
            }
        }
        else {
            response.send({ "status": "internal" })
        }
    })
})

bookPage.get("/getadmin/:id", (request, response) => {
    var { id } = request.params
    selectQuery = `select * from admin where s_no='${id}'`
    localdb.query(selectQuery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.post("/uploadbooks/:id", (request, response) => {
    var { id } = request.params
    var { bookId, deptId, semId, titleId, authorId, imageId } = request.body;
    var dateTime = new Date();
    var createdDate = dateTime.toISOString().slice(0, 10);
    console.log(createdDate);
    var insertQuery = `insert into book_details (book_id,department,semester,book_title,author,book_image,created_by,updated_by,created_date,updated_date,s_no) 
    values('${bookId}','${deptId}','${semId}','${titleId}','${authorId}','${imageId}','${id}','${id}','${createdDate}','${createdDate}','${id}')`
    localdb.query(insertQuery, (error, result) => {
        console.log(insertQuery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send({ "status": "success" })
        }
    })
})

bookPage.get("/getallbooks", (request, response) => {
    var selectQuery = `select * from book_details`
    localdb.query(selectQuery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.post("/studentregister", (request, response) => {
    var ss_no = crypto.randomUUID();
    console.log(ss_no);
    var dateTime = new Date();
    var createdDate = dateTime.toISOString().slice(0, 10);
    console.log(createdDate);
    var { firstName, lastName, email, password, phone, college, department } = request.body
    var insertQuery = `insert into students (ss_no,first_name,last_name,email,password,phone,college,department,created_by,updated_by,created_date,updated_date)
    values('${ss_no}','${firstName}','${lastName}','${email}','${password}','${phone}','${college}','${department}','${ss_no}','${ss_no}','${createdDate}','${createdDate}')`

    console.log(insertQuery);
    localdb.query(insertQuery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send({ "status": "success", "firstName": firstName, "lastName": lastName, "department": department })
        }
    })
})

bookPage.post("/studentlogin", (request, response) => {
    var { username, password } = request.body;
    var selectQuery = `select * from students where email = '${username}'`
    localdb.query(selectQuery, (error, result) => {
        console.log(result);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else if (username.length > 0) {
            var dbemail = result[0].email;
            var dbpassword = result[0].password;
            var dbfname = result[0].first_name;
            var dblname = result[0].last_name;
            var dbid = result[0].ss_no
            var dbdepartment = result[0].department;
            console.log(dbdepartment);
            console.log(dbid);
            console.log(dbemail);
            console.log(dbpassword);
            if (username === dbemail) {
                if (password === dbpassword) {
                    response.send({ "status": "success", "firstName": dbfname, "lastName": dblname, "dbid": dbid, "dbdepartment":dbdepartment })
                }
                else {
                    response.send({ "status": "password" })
                }
            }
            else {
                response.send({ "status": "email" })
            }
        }
        else {
            response.send({ "status": "internal" })
        }
    })


})

bookPage.post("/deletebook", (request, response) => {
    var { book_id } = request.body
    var deleteQuery = `delete from book_details where book_id = '${book_id}'`;
    localdb.query(deleteQuery, (error, result) => {
        console.log(deleteQuery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send({ "status": "success" })
            console.log(result);
        }
    })
})

bookPage.get("/getbooksforupdate/:book_id", (request, response) => {
    var { book_id } = request.params;
    var getquery = `select * from book_details where book_id='${book_id}'`
    console.log(getquery);
    localdb.query(getquery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.put("/update/:book_id", (request, response) => {
    let { book_id } = request.params
    let { department, title, author,  imageel } = request.body
    console.log(department);
    console.log(book_id);
    let datetime = new Date();
    console.log(datetime);
    let createdDate = datetime.toISOString().slice(0, 10);
    let updateQuery = `update book_details set department = '${department}', book_title='${title}', author='${author}', book_image='${imageel}', updated_date='${createdDate}' where book_id = '${book_id}'`
    localdb.query(updateQuery, (error, result) => {
        console.log(updateQuery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send({ "status": "success" })
            console.log(result);
        }
    })


})



//CSE Department
bookPage.get("/getonestudent/:id",(request,response)=>{
    var {id}=request.params
    var selectQuery =`select * from students where ss_no='${id}'`
    console.log(selectQuery);
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getfirstsemcsebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CSE' and semester = '1st-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getsecondsemcsebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CSE' and semester = '2nd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getthirdsemcsebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CSE' and semester = '3rd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getfourthsemcsebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CSE' and semester = '4th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getfifthsemcsebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CSE' and semester = '5th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getsixthsemcsebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CSE' and semester = '6th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getseventhsemcsebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CSE' and semester = '7th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/geteighthsemcsebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CSE' and semester = '8th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})


//mech department
bookPage.get("/getonemechstudent/:id",(request,response)=>{
    var {id}=request.params
    var selectQuery =`select * from students where ss_no='${id}'`
    console.log(selectQuery);
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getfirstsemmechbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='MECHANICAL' and semester = '1st-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getsecondsemmechbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='MECHANICAL' and semester = '2nd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getthirdsemmechbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='MECHANICAL' and semester = '3rd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getfourthsemmechbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='MECHANICAL' and semester = '4th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getfifthsemmechbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='MECHANICAL' and semester = '5th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getsixthsemmechbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='MECHANICAL' and semester = '6th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getseventhsemmechbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='MECHANICAL' and semester = '7th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/geteighthsemmechbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='MECHANICAL' and semester = '8th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})


//Civil
bookPage.get("/getonecivilstudent/:id",(request,response)=>{
    var {id}=request.params
    var selectQuery =`select * from students where ss_no='${id}'`
    console.log(selectQuery);
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getfirstsemcivilbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CIVIL' and semester = '1st-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getsecondsemcivilbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CIVIL' and semester = '2nd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getthirdsemcivilbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CIVIL' and semester = '3rd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getfourthsemcivilbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CIVIL' and semester = '4th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getfifthsemcivilbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CIVIL' and semester = '5th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getsixthsemcivilbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CIVIL' and semester = '6th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getseventhsemcivilbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CIVIL' and semester = '7th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/geteighthsemcivilbooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='CIVIL' and semester = '8th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

//EEE department
bookPage.get("/getoneeeestudent/:id",(request,response)=>{
    var {id}=request.params
    var selectQuery =`select * from students where ss_no='${id}'`
    console.log(selectQuery);
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getfirstsemeeebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='EEE' and semester = '1st-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getsecondsemeeebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='EEE' and semester = '2nd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getthirdsemeeebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='EEE' and semester = '3rd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getfourthsemeeebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='EEE' and semester = '4th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getfifthsemeeebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='EEE' and semester = '5th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getsixthsemeeebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='EEE' and semester = '6th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getseventhsemeeebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='EEE' and semester = '7th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/geteighthsemeeebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='EEE' and semester = '8th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

//ECE department
bookPage.get("/getoneecestudent/:id",(request,response)=>{
    var {id}=request.params
    var selectQuery =`select * from students where ss_no='${id}'`
    console.log(selectQuery);
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.get("/getfirstsemecebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='ECE' and semester = '1st-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getsecondsemecebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='ECE' and semester = '2nd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getthirdsemecebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='ECE' and semester = '3rd-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getfourthsemecebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='ECE' and semester = '4th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getfifthsemecebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='ECE' and semester = '5th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getsixthsemecebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='ECE' and semester = '6th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/getseventhsemecebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='ECE' and semester = '7th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})
bookPage.get("/geteighthsemecebooks",(request,response)=>{
    var selectQuery = `select * from book_details where department='ECE' and semester = '8th-sem'`
    localdb.query(selectQuery,(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result)
            console.log(result);
        }
    })
})

bookPage.listen(2001, () => {
    console.log("Your port is running in 2001 !");
})