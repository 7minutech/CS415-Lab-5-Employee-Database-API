echo "Request to GET /employee"
curl -s http://localhost:8080/employee | jq
echo "Request to GET /employee/id"
curl -s http://localhost:8080/employee/1 | jq
echo "Request to POST /employee"
curl -X POST http://localhost:8080/employee \
    -H "Content-Type: application/json" \
    -d '{"name": "Eli", "salary": "1000", "age": "21"}'
