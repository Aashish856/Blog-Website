const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")

const app = express()

const para1 = "What is the  EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript."

const para2 = "What is the  EJS is a ou generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript."

const para3 = "What is the  EJS is a simple templating language that u generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript."

app.set('view engine' , 'ejs')

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

var posts = []

app.get("/" , (req,res)=>{
    res.render("home" , {paragraph1 : para1 , posts :posts})
})
app.get("/dailyGenral" , (req,res)=>{
    res.render("dailyGenral")
})

app.get("/contact" , (req,res)=>{
    res.render("contact")
})
app.get("/about" , (req,res)=>{
    res.render("about")
})

app.get("/compose" , (req,res)=>{
    res.render("compose")
})

app.get("/post/:userId" , (req , res) =>{
    console.log(req.params.userId)
    var s = req.params.userId
    var sDash = _.lowerCase(s)
    var isFound = false
    var index = 0;
    for(var i = 0; i< posts.length; i++){
        if (sDash == _.lowerCase(posts[i].title)){
            isFound = true
            index = i
            break;
        }
    }
    if(isFound == true){
        res.render("post" , {t : posts[index].title , c : posts[index].content })
    }
})

app.post("/compose" , (req,res)=>{
    const post = {
        title : req.body.postTitle,
        content : req.body.post
    }
    posts.push(post)
    res.redirect("/")
})

app.listen(3000 , ()=>{
    console.log("app started on port 3000")
})
