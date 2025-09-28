echo "Request to PUT /employee"
curl -X PUT http://localhost:8080/employee \
    -H "Content-Type: application/json" \
    -d '{"id": "1", "name": "Tiger Nixon", "salary": "150000", "age": "61"}'