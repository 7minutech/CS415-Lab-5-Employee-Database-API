echo "Request to /employee"
curl -s http://localhost:8080/employee | jq
echo "Request to /employee/id"
curl -s http://localhost:8080/employee/1 | jq