const { Router } = require('express');
const router = Router();
const { RoomController } = require('../controllers/room');
const { BookingController } = require('../controllers/booking');
const { Authentication, IsAdmin, } = require('../middlewares/auth');
const { uploader } = require('../middlewares/multer')


router.get('/', RoomController.getAllRoom);
router.post('/add', IsAdmin, uploader.single('photo'), RoomController.addRoom)
router.post('/edit', IsAdmin, uploader.single('photo'), RoomController.addRoom)
router.delete('delete', IsAdmin, RoomController.deleteRoom)
router.get('/find/room', RoomController.search);
router.get('/find/:id', RoomController.findById);

module.exports = router;
