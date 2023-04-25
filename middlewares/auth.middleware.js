const express = require("express");
let jwt = require("jsonwebtoken");
require("dotenv").config()
const auth = async (req, res, next) => {

    try {
        let token = req.headers.authorization;
        // console.log(token)
        if (token) {
            let decoded = jwt.verify(token, process.env.key);
           
            if (decoded) {
                // console.log(decoded) 
                let userId = decoded.userID;
                // console.log(userId)
                req.body.userID = userId;
                next();
            } else {
                res.send({ message: "not authorised" })
            }
        } else {
            res.send({ message: "Please Log in first" })
        }

    } catch (error) {
        console.log(1)
        res.send({ error: error.message})
    }
}
module.exports = { auth, }