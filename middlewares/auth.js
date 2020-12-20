const { tokenVerifier } = require("../helpers/jwt");
const { users } = require("../models/users");

exports.Authentication = (req, res, next) => {
   const token = req.headers.token;
   if (!token) {
      res.status(400).json({
         success: false,
         message: "Token is not found!",
      });
   } else {
      try {
         const decoded = tokenVerifier(token);

         req.userData = decoded;
         next();
      } catch (err) {
         next(err);
      }
   }
};

exports.IsAdmin = (req, res, next) => {
   const token = req.headers.token;
   if (!token) {
      res.status(400).json({
         success: false,
         message: "Token is not found!",
      });
   } else {
      try {
         const decoded = tokenVerifier(token);

         req.userData = decoded;
         let admin = req.userData.email;

         if (admin === process.env.ADMIN_EMAIL) {
            next();
         } else {
            res.status(400).json({
               success: false,
               message: "You are not authorized!",
            });
         }
      } catch (err) {
         next(err);
      }
   }
};