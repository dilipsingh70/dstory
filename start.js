var mysql = require('mysql')
const express=require('express')
const app=express()
//app.set('view engine' , 'pug')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'));



//https://bobbyhadz.com/blog/refused-to-apply-style-because-mime-type-text-html-not-supported-in-node#:~:text=To%20solve%20the%20error%20%22Refused,to%20serve%20static%20files%20correctly.

function connect(){
  var con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "",
    database: "user_info"
  });
  return con;
}


app.get('/', function (req, res) { 
  res.render(__dirname+"/helll.html" , {name:""});
});



app.post('/submit', function(req,res){
  const form_data=req.body
  console.log(form_data)
  const form_usermail = form_data["uname"]
  const form_password = form_data["psw"]
  console.log(form_usermail, form_password)
  var con=connect();
  con.connect(function(err) {
    if (err) throw err;
    con.query(`SELECT password , username FROM user_data WHERE username="${form_usermail}"`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      try{
        if(form_password === result[0].password)
        {
          res.render(__dirname+"/helll.html" , {name:form_usermail})    
        }
      }
      catch{
        res.render(__dirname+"/helll.html")
      }
    });
  });
});



app.post('/register' , function(req,res){
  var con=connect();
  const reg_data=req.body
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO user_data VALUES('${reg_data["uname"]}','${reg_data["psw"]}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`1 record inserted ${reg_data["uname"]}' , '${reg_data["psw"]}'`);
    });
  });

  res.render(__dirname+"/helll.html" ,{name:""} )
})



app.listen(5500,()=>console.log(`server running at:  http://127.0.0.1:5500`))