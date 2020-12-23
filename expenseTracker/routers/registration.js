const express= require('express')
//const { createIndexes } = require('../models/name')
const router =express.Router()
const Register=require('../models/register')

router.get('/show',async(req,res)=>{
    try{
         const registers= await Register.find()
         res.json(registers)
    }catch(err){
        res.send(err)
    }
})

router.post('/add',async(req,res)=>{
    const registers = new Register({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        dob:req.body.dob
    })
    try{
        const a3= await registers.save()
        res.json(a3)

    }catch(err){
        res.send(err)
    }

})
router.patch('/update/:id',async(req,res)=>{
    try{
        const registers = await Register.findById(req.params.id)
        registers.name=req.body.name,
        registers.email=req.body.email,
        registers.gender=req.body.gender,
        registers.dob=req.body.dob
        const a1 =await registers.save()
        res.json(a1)
            
    }catch(err){
        res.send(err)
    }
})
router.delete('/remove/:id',async(req,res)=>{
    try{
        const registers = await Register.findById(req.params.id)
        registers.name=req.body.name,
        registers.email=req.body.email,
        registers.gender=req.body.gender,
        registers.dob=req.body.dob
        const a1 =await registers.delete()
        res.json(a1)
            
    }catch(err){
        res.send(err)
    }
})
module.exports=router