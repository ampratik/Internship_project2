const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({
    
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim:true,
        validate:{
                validator:function(email){
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },msg:'please fill a valid email address',isAsync:false
            }
            },
    mobile :{
            type : Number,
            required : true,
            unique : true,
            trim:true,
            validate:{
                     validator:function(mobile){
                    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobile)
                    },msg:'please fill a valid mobile number',isAsync:false
                    }
            },
    collegeId :{
        type : ObjectId,
        required : true,
        ref : "college",
        trim : true
    },
    isDeleted: {
        type : boolean,
        default: false
        }
    },{ timestamps: true }
);

module.exports = mongoose.model('intern', internSchema) 


