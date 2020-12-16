const { Router } = require('express');
const router = Router();
const { RoomController } = require('../controllers/room');
const { BookingController } = require('../controllers/booking');
const { authentication, authorization } = require('../middlewares/auth');
// const { uploader } = require('../middlewares/multer')