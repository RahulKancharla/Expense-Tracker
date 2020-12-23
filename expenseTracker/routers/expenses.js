const express=require('express')
const router =express.Router()
const Expense=require('../models/expense')

router.get('/show',async(req,res)=>{
    try{
         const expenses= await Expense.find()
         res.json(expenses)
    }catch(err){
        res.send(err)
    }
})

router.post('/add',async(req,res)=>{
    const expenses = new Expense({
        amount:req.body.amount,
        category:req.body.category,
        day:req.body.day,
        month:req.body.month
    })
    try{
        const a2= await expenses.save()
        res.json(a2)

    }catch(err){
        res.send(err)
    }

})
router.patch('/update/:id',async(req,res)=>{
    try{
        const expenses = await Expense.findById(req.params.id)
        expenses.amount=req.body.amount,
        expenses.category=req.body.category,
        expenses.day=req.body.day,
        expenses.month=req.body.month
        const a1 =await expenses.save()
        res.json(a1)
            
    }catch(err){
        res.send(err)
    }
})
router.delete('/remove/:id',async(req,res)=>{
    try{
        const expenses = await Expense.findById(req.params.id)
        expenses.amount=req.body.amount
        const a1 =await expenses.delete()
        res.json(a1)
            
    }catch(err){
        res.send(err)
    }
})

module.exports=router