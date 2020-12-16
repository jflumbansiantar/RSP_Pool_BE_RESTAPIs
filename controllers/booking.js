const { rooms, users, bookings } = require('../models')
const sequelize = require('sequelize')

class BookingController {
   //user only
   static async addBooking(req, res, next) {
      const { total_person, booking_time, noted, check_in_time, check_out_time } = req.body;
      const roomId = req.params.id
      const userId = req.usersData.id
      try {
         //user and room validation
         const foundUser = await bookings.findOne({ where: { userId: userId } })
         const foundRoom = await bookings.findOne({ where: { roomId: roomId } })
         if (foundUser && foundRoom) {
            res.status(400).json({
               status: 'failed',
               msg: "You already had book this room.",
               data: {
                  user: foundUser,
                  room: foundRoom
               }
            })
         }
         const newBooking = await bookings.create({
            total_person,
            booking_time: new Date(),
            noted,
            check_in_time,
            check_out_time
         });
         if (newBooking.total_person < rooms.room_capacity) {
            res.status(400).json({
               status: 'failed',
               msg: "Please choose bigger room.",
               data: {
                  total_person,
                  room_capacity
               }
            })
         }
         res.status(200).json({
            status: 'success',
            msg: "Thank you for your Booking!",
            data: newBooking
         })

      } catch (error) {
         next(error)
      }
   }

   //adminOnly
   static async getAllBooking(req, res, next) {
      try {
         const result = await bookings.findAll({
            order: [['id', 'ASC']],
            include: [
               users,
               rooms
            ]
         })
         res.status(200).json({
            status: 'success',
            message: 'Here is all the bookings.',
            data: result
         })
      } catch (error) {
         next(error)
      }
   }
   static async getBookingbyRoom(req, res, next) {
      const roomId = req.params.roomId
      try {
         const findRoom = await rooms.findOne({
            where: {
               id: roomId
            }
         })
         if (findRoom) {
            const result = await bookings.findAll({
               where: {
                  roomId: roomId
               },
               order: [
                  ['id', 'ASC']
               ],
               include: [
                  users, rooms
               ]
            });
            res.status(200).json({
               status: 'success',
               msg: "Here is all the booking for this room.",
               data: result
            })
         } else {
            res.status(400).json({
               status: 'failed',
               msg: "Room doesn't have any booking."
            })
         }
      } catch (error) {
         next(error)
      }
   }
   static async getBookingbyUser(req, res, next) {
      const userId = req.params.userId
      try {
         const findUser = await users.findOne({
            where: {
               id: userId
            }
         })
         if (findUser) {
            const result = await bookings.findAll({
               where: {
                  userId: userId
               },
               order: [
                  ['id', 'ASC']
               ],
               include: [
                  users, rooms
               ]
            });
            res.status(200).json({
               status: 'success',
               msg: "Here is all the booking for this room.",
               data: result
            })
         } else {
            res.status(400).json({
               status: 'failed',
               msg: "User doesn't have any booking."
            })
         }
      } catch (error) {
         next(error)
      }
   }

   static async bookingApproved(req, res, next) {
      const bookingId = req.params.id;
      try {
         const found = await bookings.findOne({
            where: {
               id: bookingId
            }
         })
         if (!found) {
            res.status(400).json({
               status: 'failed',
               msg: "Booking not found."
            })
         } else {
            const booking = await bookings.update({
               where: {
                  updatedAt: new Date(),
               }
            })
            //send email
            res.status(200).json({
               status: 'success',
               msg: "Your booking has been approved.",
               data: booking
            })
         }
      } catch (error) {
         next(error)
      }
   }

   static async bookingRejected(req, res, next) {
      const bookingId = req.params.id;
      try {
         const found = await bookings.findOne({
            where: {
               id: bookingId
            }
         });
         if (!found) {
            res.status(400).json({
               status: 'failed',
               msg: "Booking not found."
            })
         } else {
            const booking = await bookings.update({
               where: {
                  updatedAt: new Date(),
               }
            })
            //send email
            res.status(200).json({
               status: 'success',
               msg: "Your booking has been rejected.",
               data: booking
            })
         }
      } catch (error) {
         next(error)
      }
   }
}

module.exports = {
   BookingController
};
