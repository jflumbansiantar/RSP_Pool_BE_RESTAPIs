const { Rooms } = require('../models')
const { Op, where } = require('sequelize')

class RoomController {
   static async geAlltRoom(req, res, next) {
      const page = req.params.page;
      try {
         const result = await Rooms.findAll({
            order: [
               ['id', 'ASC']
            ]
         });
         const options = { page, paginate: 10 };
         const { docs, pages, total } = await result.paginate(options);
         if (page > pages) {
            res.status(400).json({
               status: 'failed',
               message: `Page ${page} is not found`
            })
         }
         res.status(200).json({
            status: 'Success',
            message: 'Here is all the rooms.',
            data: result
         })
      }
      catch (error) {
         next(error)
      }
   }

   static async addRoom(req, res, next) {
      const { room_name, room_capacity } = req.body;
      const photo = req.file.path;
      try {
         const result = await Rooms.findOne({
            where: {
               room_name
            }
         });
         if (result) {
            res.status(400).json({
               status: 'failed',
               msg: 'Room already exists. Please create a new one.'
            })
         } else {
            const newRoom = await Rooms.create({
               room_name,
               room_capacity,
               photo
            })
            res.status(201).json({
               status: 'success',
               msg: 'Room created!',
               data: newRoom
            })
         }

      } catch (error) {
         next(error)
      }
   }

   static async updateRoom(req, res, next) {
      const id = req.params.id;
      const { room_name, room_capacity } = req.body;
      const photo = req.file.path;
      try {
         const result = await Rooms.findOne({
            where: {
               id
            }
         })
         if (result) {
            const updateRoom = await Rooms.update({
               room_name, room_capacity, photo
            }, {
               where: {
                  id
               }
            });
            res.status(201).json({
               status: 'success',
               message: 'Updated succesfully!',
               data: updateRoom
            })
         } else {
            res.status(404).json({
               status: 'failed',
               message: 'Cannot find the Room.'
            })
         }
      } catch (error) {
         next(error)
      }
   }

   static async deleteRoom(req, res, next) {
      const id = req.params.id
      try {
         const result = Rooms.destroy({
            where: {
               id
            }
         })
         res.status(200).json({
            status: 'success',
            msg: 'Room deleted',
            data: result
         })
      }
      catch (error) {
         next(error)
      }
   }
   static async search(req, res, next) {
      const { search } = req.body;
      try {
         const found = await Rooms.findAll({
            where: {
               title: {
                  [Op.like]: '%' + search + '%'
               }
            }
         });
         if (found) {
            res.status(200).json({
               status: 'success',
               msg: 'Room found',
               data: search
            });
         } else {
            res.status(400).json({
               status: 'failed',
               msg: "Room is not available!"
            });
         }
      }
      catch (error) {
         next(error);
      }
   }
   static async findById(req, res, next) {
      const id = req.params.id;
      try {
         const result = await Rooms.findOne({
            where: {
               id
            }
         })
         if (result) {
            res.status(200).json({
               status: 'success',
               msg: 'Room found',
               data: result
            })
         }
         else {
            res.status(404).json({
               status: 'failed',
               msg: "Room is not available!"
            })
         }
      }
      catch (error) {
         next(error)
      }
   }
}



module.exports = {
   RoomController
}
