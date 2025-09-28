echo "Request to POST /employee"
curl -X POST http://localhost:8080/employee \
    -H "Content-Type: application/json" \
    -d '{"name": "Eli", "salary": "1000", "age": "21"}'