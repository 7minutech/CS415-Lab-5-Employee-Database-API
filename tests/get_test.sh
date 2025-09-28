echo "Request to GET /employee"
curl -s http://localhost:8080/employee | jq
ehco
echo "Request to GET /employee/id"
curl -s http://localhost:8080/employee/1 | jq