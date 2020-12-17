const { users } = require("../models");
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')


class usersController {
   static async register(req, res, next) {
      const { email, password, photo } = req.body;
      try {
         const found = await users.findOne({
            where: {
               email
            }
         })
         if (found) {
            res.status(400).json({
               status: 'failed',
               msg: "Thats email already registered!"
            })
         } else {
            const user = await users.create({
               email,
               password,
               photo
            });
            const access_token = tokenGenerator(user);
            res.status(200).json({
               status: 'success',
               message: 'Your account has been created!',
               token: access_token
            });
         }
      } catch (err) {
         next(err);
      }
   }
   static async login(req, res, next) {
      const { email, password } = req.body;
      console.log(req.body);
      try {
         const user = await users.findOne({
            where: { email }
         });
         if (user) {
            if (decryptPwd(password, user.password)) {
               const access_token = tokenGenerator(user);
               res.status(200).json({
                  status: 'success',
                  message: 'You are login.',
                  token: access_token
               });
            } else {
               res.status(400).json({
                  status: 'failed',
                  msg: "Incorrect password!"
               })
            }
         } else {
            res.status(404).json({
               status: 'failed',
               msg: "User not found!"
            })
         }
      } catch (err) {
         next(err);
      }
   }
   //adminOnly
   static async getAllUsers(req, res, next) {
      console.log("See all the Users");
      try {
         const user = await users.findAll({})
         if (user) {
            res.status(200).json(user);
         } else {
            res.status(400).json({
               msg: 'Failed to load users'
            })
         }
      } catch (error) {
         next(error);
      }
   }
   static async findById(req, res) {
      const id = req.params.id;
      try {
         const user = await users.findOne({
            where: { id }
         });
         if (user) {
            res.status(200).json(user)
         }
         else {
            res.status(404).json(`User is not found.`)
         }
      }
      catch (error) {
         next(error)
      }
   }
}
module.exports = {
   usersController
};
