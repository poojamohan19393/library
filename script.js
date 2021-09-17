const express=require("express")
const app=express();
const mysql=require("mysql");

const PORT =process.env.PORT || 3000


const bodyParser=require("body-parser");
const jsonParser=bodyParser.json();
const urlencodedParser=bodyParser.urlencoded({extended:false});


const con=mysql.createConnection({
    host:"localhost",
    user : "root",
    password:"",
    database :"book_db"
});

con.connect((err)=>{
    if (err) throw err;
    console.log("connected to database");
})



//1.add a book
app.post("/addbook",jsonParser,(req,res)=>{
    let book_name=req.body.book_name;
    let author_name=req.body.author_name;
    let price=req.body.price;

    let qr=`insert into book_tb(book_name,author_name,price) values('${book_name}','${author_name}',${price})`;
    con.query(qr,(err,result)=>{
        if(err){
            res.send({error:"operation failed"});
        }
        else{
            res.send({success:"operation success"});
        }
    });

});

//2.update a book

app.patch("/updatebook/:id",jsonParser,(req,res)=>{

    let book_name=req.body.book_name;
    let author_name=req.body.author_name;
    let price=req.body.price;
    let id=req.params.id;

    let qr=`update book_tb set book_name='${book_name}',author_name='${author_name}',price=${price} where id=${id}`;
    con.query(qr,(err,result)=>{
        if(err){
            res.send({error:"operation failed"});
        }
        else{
            res.send({success:"operation success"});
        }
    });

});


//3.delete a book
app.delete("/delete/:id",(req,res)=>{
    let id=req.params.id;
    let qr = `delete from book_tb where id= ${id}`;
    con.query(qr,(err,result)=>{
        if(err){
            res.send({error:"operation failed"});
        }
        else{
            res.send({success:"operation success"});
        }
    });

});
//4.get all books
app.get("/booklist",(req,res)=>{
    con.query("select * from book_tb",(err,result,fields)=>{
        if (err)throw err;
        res.send(result);
    });
    
});

//5.get one book
app.get("/bookdetails/:id",(req,res)=>{
    let id=req.params.id;
    con.query("select * from book_tb where id= "+id,(err,result,fields)=>{
        if (err) throw (err);
        res.send(result);
    });
});

app.get("/",(req,res)=>{
    res.send("<h1>WELCOME TO LIBRARY</h1>");
})

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));