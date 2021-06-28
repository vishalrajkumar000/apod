require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const https = require('https')

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine','ejs')


app.get('/',(req,res)=>{
  res.render("home")
})

app.get('/pod',(req,res)=>{
  const url ="https://api.nasa.gov/planetary/apod?api_key="+process.env.API_KEY;
  https.get(url,(response)=>{
    response.on("data",(data)=>{
      const apod=JSON.parse(data)
      res.render("pod",{data:apod})
    })
  }).on("error",e=>{
    console.log(e)
    res.render("failure")
  })
})

app.post('/pod',(req,res)=>{
  let podate=req.body.podate;
  var ToDate = new Date();
  if (new Date(podate).getTime() <= ToDate.getTime()) {

     }else{
       podate=ToDate.toISOString().slice(0,10)
     }
  const url ="https://api.nasa.gov/planetary/apod?api_key="+process.env.API_KEY+"&date="+podate;
  https.get(url,(response)=>{
    response.on("data",(data)=>{
      const apod=JSON.parse(data)
      res.render("pod",{data:apod})
    })
  })
})

app.get('/about',(req,res)=>{
  res.render("about")
})

app.get('/download',(req,res)=>{
  res.download(__dirname+"/public/app/APOD-V.apk")
})



app.listen(process.env.PORT || 3000,()=>{
  console.log("Server is running")
})
