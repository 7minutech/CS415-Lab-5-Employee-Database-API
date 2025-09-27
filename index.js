import express from 'express'
import fs from 'fs'

const app = express();
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

app.listen(port, () => {
console.log(`Express ${version} Listening on Port ${port}`);
});