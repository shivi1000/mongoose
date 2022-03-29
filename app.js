const express = require('express');
const res = require('express/lib/response');
require("./connection");
const Student = require('./students');
const app = express();
app.use(express.json());

//const port = process.env.PORT || 3000;

//create a new student

/*app.post("/students" , (req, res) => {
    console.log(req.body);
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
})*/

app.post("/students" , async(req,res) => {
    try{

    const user = new Student(req.body);
    const createUser =  await user.save()
    res.status(201).send(createUser);
    }
    catch(e){res.status(400).send(e);}
})

app.get("/students" , async (req, res) => {
    try{
        const studentsData = await Student.find()
        res.send(studentsData);
    }catch(e){res.send(e);
    }
})
// get individual student data

app.get("/students/:id", async (req, res) => {
  try{
      const _id = req.params.id;
      const studentData = await Student.findById(_id);

      if(!studentData){
          return res.status(404).send();
      }else{
          res.send(studentData);
      }
  } catch(e){
      res.send(e);
    } 
})

//update student by id

app.put("/students/:id", async (req,res) => {
    try{
         const _id = req.params.id;
         const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
        new:true
        });

        res.send(updateStudents);
    }catch(e){
        res.status(404).send(e);
    }

})

//delete student by _id

app.delete("/students/:id",async(req,res) => {
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){res.status(500).send(e);
    }
})


app.listen(8080, () => {
    console.log("Listening to port number 8080")
})