const express= require('express')
//const alien = require('../models/alien')
const router =express.Router()
const Alien =require('../models/name')

router.get('/',async(req,res)=>{

    try{
        const aliens= await Alien.find()
        res.json(aliens)

    }catch(err){
        res.send('Error:'+err)
    }
})

router.get('/:id',async(req,res)=>{

    try{
        const aliens= await Alien.findById(req.params.id)
        res.json(aliens)

    }catch(err){
        res.send('Error:'+err)
    }
})

router.post('/',async(req,res)=>{
    const aliens=new Alien({
        name:req.body.name,
        gender:req.body.gender,
        date:req.body.date
    })
    try{
        const a1= await aliens.save()
        res.json(a1)

    }catch(err){
        res.send(err)

    }
})

router.patch('/:id',async(req,res)=>{
    try{
        const aliens = await Alien.findById(req.params.id)
        aliens.gender=req.body.gender
        const a1 =await aliens.save()
        res.json(a1)
            
    }catch(err){
        res.send(err)
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const aliens = await Alien.findById(req.params.id)
        aliens.gender=req.body.gender
        const a1 =await aliens.delete()
        res.json(a1)
            
    }catch(err){
        res.send(err)
    }
})


module.exports=router