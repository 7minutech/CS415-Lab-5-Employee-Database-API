echo "Request to DELETE /employee"
echo "Before Deletion"
curl http://localhost:8080/employee/21
curl -X DELETE http://localhost:8080/employee/21
echo
echo "After Deletion"
curl http://localhost:8080/employee/21