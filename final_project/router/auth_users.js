const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let userId = req.session.authorization.username
  let review = req.body.review;
  let isbn = req.params.isbn
  let reviews = books[isbn].reviews;
  let reviewsLen = Object.keys(reviews).length;
  let review_object = {"user" : userId, "review" : review}
  let old_review_index = 0;

  if(review && userId){
    for(i = 1; i <= reviewsLen; i++){
        if(userId == reviews[i].user){
            old_review_index = i
            break
        }
    }
    if(old_review_index != 0){
        reviews[old_review_index] = review_object;
        return res.status(200).json({message: "Review modified correctly"})
    } else {
        reviews[(reviewsLen+1).toString()] = review_object
        return res.status(200).json({message: "Review added correctly"})
    }    
  }
  if(old_review_index != 0){
    return res.status(400).json({message: "Could not modify review"});
  } else {
    return res.status(400).json({message: "Could not add review"});
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let userId = req.session.authorization.username
    let isbn = req.params.isbn
    let reviews = books[isbn].reviews;
    let reviewsLen = Object.keys(reviews).length;
    for(i = 1; i <= reviewsLen; i++){
        if(userId == reviews[i].user){
            delete reviews[i]
            return res.status(200).json({message: "Review successfully deleted"});
            break
        }
    }
    return res.status(404).json({message: "Could not find a review associated to the current user"})
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
