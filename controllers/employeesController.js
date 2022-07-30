const data = {};

data.employees = require('../model/employees.json');

const getAllEmployees = (req,res) => {
    res.json(data.employees);
  }

  const createNewEmployee = (req,res)=> {
    res.json({
        "name": req.body.name,
        "gender":req.body.gender,
        "age":req.body.age
    });
  }

  const updateEmployee = (req,res)=>{
    res.json({
        "name": req.body.name,
        "gender":req.body.gender,
        "age":req.body.age
    });
  }
  const deleteEmployee = (req,res)=> {
    res.json({"id":req.body.id})
}

const getEmployeeById = (req,res)=> {
    res.json({"id":req.params.id});
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
}