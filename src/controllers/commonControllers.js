

const interModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const mongoose = require('mongoose');


//--CREATING COLLEGE

const createCollege = async function (req, res) {
    try {
      let Body = req.body 
      let arr = Object.keys(Body)
      let logoLink = req.body.logoLink;
      let name = req.body.name;
      let fullName = req.body.fullName;
     
     
      let url =/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*\.(?:png|jpg|jpeg))*$/.test(logoLink);
      let name1 = /^[a-zA-Z]{2,45}$/.test(name);

      let colleges = await collegeModel.findOne({ name : name});

      if (arr.length==0) {
        res.status(400).send({ status: false , msg: "Invalid request. Please provide Details" })
      }
      else if (!name || !fullName || !logoLink) {
        res.status(400).send({ status: false , msg: "Input field missing" })
      }
      else if (name1 == false) {
        res.status(400).send({ status: false , msg: "Please Enter valid name." });
      }
      else if (url == false) {
        res.status(400).send({ status: false , msg: "Please Enter valid URL." });
      }
      else if (colleges) {
        res.status(400).send({ status: false , msg: "This College already exist" })
      }
      else if (!colleges) {
        let dataCreated = await collegeModel.create(Body);
        res.status(201).send({  status: true ,data: dataCreated });
      }
    } catch (err) {
      res.status(500).send({  status: false , msg: "Server not responding", error: err.message });
    }
  }

  
//**********************************************************************//

//--CREATING INTERN

  const createIntern = async function(req, res){
  try{
    let data = req.body
    let arr = Object.keys(data)
    let Name = /^[a-zA-Z ]{2,45}$/.test(req.body.name);
    let Email = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(req.body.email)
    let Mobile = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(req.body.mobile)
    
    let intern = await interModel.findOne({ email : req.body.email});
    let mobileNo = await interModel.findOne({ mobile : req.body.mobile});

    if (arr.length == 0) return res.status(400).send({ status: false, msg: "Invalid request. Please provide Details" })
    else if (!req.body.name || !req.body.email || !req.body.mobile || !req.body.collegeId) return res.status(400).send({  status: false ,msg: "Input field missing" })
    
    else if (Name == false) return res.status(400).send({status:false , msg: "Please Enter valid name." })
    
    else if (Email == false) return res.status(400).send({status:false , msg: "Please Enter valid email." })
    else if(intern)  return res.status(400).send({status: false, msg: "email already exist!"})
    
    else if (Mobile == false) return res.status(400).send({status:false , msg: "Please Enter valid mobile number." })
    else if(mobileNo)  return res.status(400).send({status: false, msg: "mobile number already exist!"})
  
    else if (mongoose.Types.ObjectId.isValid(data.collegeId) == false) return res.status(400).send({ staus: false, msg: "College Id is Invalid" })

    let Id = await collegeModel.findOne({ _id: data.collegeId ,isDeleted:false});

    if(!Id){res.status(404).send({ status: false, Error: "College does not exist!" });}
    else{
        let internCreated = await interModel.create(data);
        res.status(201).send({ status: true, data: internCreated});
    }
}catch (err) {
  res.status(500).send({  status: false , msg: "Server not responding", error: err.message });
}
}


//**********************************************************************//
  
//--COLLEGE DETAILS ALONG WITH INTERN LIST

  const collegeDetails =async function(req ,res){
  try{
      const info = req.query.collegeName
      if(!info) return res.status(400).send({status:false , message:"Please Enter College Name"})

      const college = await collegeModel.findOne({name: info ,isDeleted:false})
      if(!college) return res.status(404).send({status:false , message:"Did not found college with this name."})

      const { name, fullName, logoLink } = college //unpacked properties of college.
      console.log({ name, fullName, logoLink })
      const data = { name, fullName, logoLink };

      data["interests"] = []; //In data object we added a key "interest" which is an empty array.
      
      const collegeIdFromcollege = college._id;

      const internList = await interModel.find({ collegeId: collegeIdFromcollege,isDeleted:false});
      if (internList.length==0) return res.status(404).send({ status: false, message: `We Did not Have Any Intern With ${info} College` });
      data["interests"] = [...internList] //copying using spread syntax.
      res.status(200).send({ status: true, data: data });
  }catch (err) {
    res.status(500).send({  status: false , msg: "Server not responding", error: err.message });
  }
  }

//**********************************************************************//


module.exports.createIntern = createIntern;

module.exports.createCollege = createCollege;

module.exports.collegeDetails =collegeDetails;
