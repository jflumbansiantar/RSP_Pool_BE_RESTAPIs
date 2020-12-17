const { Router } = require('express');
const router = Router();
const { RoomController } = require('../controllers/room');
const { BookingController } = require('../controllers/booking');
const { Authentication, IsAdmin, } = require('../middlewares/auth');


router.post('/add/:roomId', Authentication, BookingController.addBooking)
router.get('/', Authentication, IsAdmin, BookingController.getAllBooking)
router.get('/:roomId', Authentication, IsAdmin, BookingController.getBookingbyRoom)
router.get('/:userId', Authentication, IsAdmin, BookingController.getBookingbyUser)
router.put('/approved/:id', Authentication, IsAdmin, BookingController.bookingApproved)
router.put('/rejected/:id', Authentication, IsAdmin, BookingController.bookingRejected)

module.exports = router;