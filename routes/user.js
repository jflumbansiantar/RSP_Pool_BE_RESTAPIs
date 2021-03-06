const { Router } = require('express');
const router = Router();
const { usersController } = require('../controllers/user');
const { Authentication, IsAdmin } = require('../middlewares/auth');
const { uploader } = require('../middlewares/multer')

router.get('/list', IsAdmin, usersController.getAllUsers)
router.post('/login', usersController.login)
router.post('/register', uploader.single('photo'), usersController.register)
router.get('/find/:id', IsAdmin, usersController.findById)

module.exports = router;
