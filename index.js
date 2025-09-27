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
response.send("<h1>Home</h1>");
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
    if (!(valid_employee)){
        console.log("error: Post request employee json was not valid")
        res.send({success: false})
        return
    }
    let index = employee_db.length
    let next_id = index + 1
    let newEmployee = req.body
    newEmployee.id = next_id
    employee_db.push(newEmployee)
    res.send({"success": true, "employee": employee_db[index]})
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