echo "Request to GET /employee"
curl -s http://localhost:8080/employee | jq
ehco
echo "Request to GET /employee/id"
curl -s http://localhost:8080/employee/1 | jq
echo
echo "Request to POST /employee"
curl -X POST http://localhost:8080/employee \
    -H "Content-Type: application/json" \
    -d '{"name": "Eli", "salary": "1000", "age": "21"}'
echo
echo "Request to PUT /employee"
curl -X PUT http://localhost:8080/employee \
    -H "Content-Type: application/json" \
    -d '{"id": "1", "name": "Tiger Nixon", "salary": "150000", "age": "61"}'
