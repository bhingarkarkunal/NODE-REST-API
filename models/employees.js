const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    attendancePercentage : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('Employee', employeeSchema)