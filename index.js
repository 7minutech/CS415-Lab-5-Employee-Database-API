import express from 'express'
import fs from 'fs'

const app = express();
app.use(express.json());
const port = 8080;

const pkg = JSON.parse(fs.readFileSync('package.json'))
const version = 'v' + pkg.dependencies.express.slice(1)

const raw = fs.readFileSync('./Lab05.json', 'utf-8');
const employee_db = JSON.parse(raw);
var counter = 0

app.all('/', (request, response) => {
response.set('Content-Type', 'text/html');
response.send("<h1>Employee DB</h1>");
});

app.get("/employee/:id?", (req, res) => {

    const id = req.params.id;
    res.set('Content-Type', 'application/json');
    if (id) {
        res.send(employee_db[id - 1])
    }
    else {
        res.send(employee_db)
    }
})

app.post("/employee", (req, res) => {
    res.set("Content-Type", "application/json")
    if (req.get("Content-Type") != "application/json"){
        console.log("error: POST request was not json")
        res.send({success: false})
        return
    }
    if (!(valid_employee(req.body))){
        console.log("error: POST request employee json was not valid")
        res.send({success: false})
        return
    }
    let index = employee_db.length
    let next_id = index + 1
    let req_json = req.body
    let newEmployee = {
        id: next_id,
        name: req_json.name,
        salary: req_json.salary,
        age: req_json.age
    }
    employee_db.push(newEmployee)
    res.send({"success": true, "employee": employee_db[index]})
})

app.put("/employee", (req, res) => {
    res.set("Content-Type", "application/json")
    if (req.get("Content-Type") != "application/json"){
        console.log("error: PUT request was not json")
        res.send({success: false})
        return
    }
    if (!(valid_employee(req.body))){
        console.log("error: PUT request employee json was not valid")
        res.send({success: false})
        return
    }
    let employee = req.body
    let index = employee.id - 1
    let old_employee = {...employee_db[index]}
    employee_db[index] = employee
    res.send({"success": true, "updated_employee": employee_db[index], "old_employee": old_employee})
})

app.delete("/employee/:id", (req, res) => {
    res.set("Content-Type", "application/json")
    let id = req.params.id
    if (!valid_id(id)){
        console.log("error: DELETE request had invalid id")
        res.send({success: false})
        return
    }
    let index = id - 1
    employee_db.splice(index, 1)
    decrement_ids(index)
    res.send({"success": true})
})

app.listen(port, () => {
console.log(`Express ${version} Listening on Port ${port}`);
});

function valid_employee(employee) {
    if (!("name" in employee)){
        console.log("Request json does not have name")
        return false
    }
    if (!("salary" in employee)){
        console.log("Request json does not have salary")
        return false
    }
    if (!("age" in employee)){
        console.log("Request json does not have age")
        return false
    }
    return true
}

function valid_id(id){
    let first_id = 1
    let last_id = employee_db.length
    return ((first_id <= id) && (id <= last_id))
}

function decrement_ids(starting_index){
    for (let i = starting_index; i < employee_db.length; i++){
        let employee = employee_db[i]
        employee.id--
    }
}