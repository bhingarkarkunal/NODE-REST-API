const express = require('express')
const router = express.Router()
const Employees = require('../models/employees')

//GETTING ALL EMPLOYEES' DATA
router.get('/', (req,res)=> {
    Employees.find()
    .then( docs => {
        const response = {
            count: docs.length,
            Employees : docs.map( doc =>{
                return {
                    id : doc.id,
                    name : doc.name,
                    department : doc.department,
                    salary : "₹" + doc.salary,
                    attendancePercentage : doc.attendancePercentage + "%"
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ 
            code : 500,
            error : err })
    })  
})

//GETTING ONE EMPLOYEE's DATA
router.get('/:id', (req,res)=> {
    console.log("get api started...") 
    var num = req.params.id
    Employees.find({ id : num })
    .then( (doc) => {
        if(doc.length > 0 )
        {
            res.status(201).json({
                id : doc[0].id,
                name : doc[0].name,
                department : doc[0].department,
                salary : "₹" + doc[0].salary,
                attendancePercentage : doc[0].attendancePercentage + "%"
            })
        }
        else
        {
            res.status(404).json({ 
                code : 404,
                message : "Employee with id " + num + " not found." }
            )
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ 
            code : 500,
            error : err })
    })
    console.log("data get...|||") 
})
    

//POSTING ONE EMPLOYEE's DATA
router.post('/', (req,res)=> {
    console.log("Post api started...") 
    const employees = new Employees({
        id : req.body.id,
        name : req.body.name,
        department : req.body.department,
        salary : req.body.salary,
        attendancePercentage : req.body.attendancePercentage
    })
    employees.save()
    .then(()=> {
        res.status(201).json({
            code : 201,
            message: "Employee " + req.body.name + "'s data has been recorded successfully",
            
        })
    })
    .catch( error => {
         console.log(error) 
         res.status(500).json({ 
            code : 500, 
            error: error.message })
    })
    console.log("Post methoda data saved") 
})

//DELETING ONE EMPLOYEE'S DATA
router.delete('/:id', (req,res)=> {
    var num = req.params.id
    Employees.find({ id : num })
    .then( (doc) => {
        if(doc.length > 0)
        {
            Employees.deleteOne({ id : num })
            .then( doc => {
                res.status(200).json({
                    code : 200,
                    message : "Employee with id " + num + " has been deleted successfully"
                })    
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ 
                    code : 500,
                    error : err })
            })
        }
        else
        { 
            res.status(404).json({ 
                code : 404,
                message : "Employee with id " + num + " not found." }
            )
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ 
            code : 500,
            error : err })
    })

})

//UPDATING ONE EMPLOYEE's DATA
router.put('/:id', (req,res)=> {
    var num = req.params.id
    Employees.find({ id : num })
    .then( (doc) => {
        if(doc.length > 0)
        {
            Employees.updateOne({ id : num },{$set : req.body})
            .then( doc => {
                res.status(200).json({
                    code : 200,
                    message : "Employee with id " + num + " has been updated successfully",
                })    
            })
        }
        else
        {
            res.status(404).json({ 
                code : 404,
                message : "Employee with id " + num + " not found." }
            )
        } 
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ 
            code : 500,
            error : err })
    })    
})

module.exports = router