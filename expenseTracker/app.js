const express =require('express')
const mongoose=require('mongoose')
const config =require('./config')
//const url='mongodb://localhost/AlienDBx'
//const url ='mongodb+srv://rahul123:rahul123@cluster0.0mcko.mongodb.net/REST-API?retryWrites=true&w=majority'
const url=config.clouldDB
//const url=config.localDB
const client =require("twilio")(config.accountSID,config.authToken)
const app=express()

mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection

con.on('open',function(){
    console.log('connected......')
})
app.use(express.json())
//names(testing)
const alienRouter=require('./routers/names')
app.use('/names',alienRouter)

//register data
const registerRouter=require('./routers/registration')
app.use('/registration',registerRouter)

//ENTER  phone no for otp
app.get('/otp',(req,res)=>{
    if (req.query.phonenumber) {
    client
          .verify
          .services(config.serviceID)
          .verifications
          .create({
              to: `+${req.query.phonenumber}`,
              channel:req.query.channel
          })
          .then((data) =>{
              res.status(200).send({
                  
                  message:"OTP Send",
                  phonenumber:req.query.phonenumber,
                  data
              })
          })
        } else {
            res.status(400).send({
                message: "Wrong phone number :(",
                phonenumber: req.query.phonenumber,
                data
            })
         }

})

//otp verification
app.get('/otpVerify',(req,res)=>{
    if (req.query.phonenumber && (req.query.code).length === 4) {
    client
         .verify
         .services(config.serviceID)
         .verificationChecks
         .create({
            to: `+${req.query.phonenumber}`,
            code:req.query.code
         })
         .then(data =>{
            if (data.status === "approved") {
            res.status(200).send({
                message:"Phone no verified",
                data
            })
            
    }
        
         })
        } else{
            res.status(400).send({
                message: "Wrong phone number or code :(",
                phonenumber: req.query.phonenumber,
                data
            })
        }
    })

//Expense data
const expenseRouter=require('./routers/expenses')
app.use('/expense',expenseRouter) 


app.listen(9000, ()=>{
    console.log('server started')
}) 