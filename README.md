# RESTful express book reviews APIs
## Install and run
```sh
git clone https://github.com/usg-ishimura/expressBookReviews.git
cd expressBookReviews/final_project
npm install
npm start
```
### Get a list of all books
```sh
curl http://localhost:5000/
```
### Get book details by ISBN
```sh
curl http://localhost:5000/isbn/3
```
### Get book details by author
```sh
curl http://localhost:5000/author/Dante%20Alighieri
```
### Get book details by title
```sh
curl http://localhost:5000/author/The%20Divine%20Comedy
```
### Get book reviews by ISBN
```sh
curl http://localhost:5000/review/3
```
### Register
```sh
curl --header "Content-Type: application/json" 
--request POST 
--data "{\"username\":\"user123\",\"password\":\"password123\"}" 
http://localhost:5000/register
```
### Login
```sh
TOKEN=$(curl --header "Content-Type: application/json" 
--request POST 
--data "{\"username\":\"user123\",\"password\":\"password123\"}" 
http://localhost:5000/customer/login | jq -r '.id_token')
```
### Add review
```sh
curl --header "Content-Type: application/json" 
-H "Authorization: Bearer ${TOKEN}" 
--request PUT 
--data "{\"review\":\"kick ass dude\"}" 
http://localhost:5000/customer/auth/review/3
```
### Delete review
```sh
curl -H "Authorization: Bearer ${TOKEN}" 
--request DELETE 
http://localhost:5000/customer/auth/review/3
```
