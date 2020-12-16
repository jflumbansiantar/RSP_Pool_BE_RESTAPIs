const { Router } = require('express');
const router = Router();
const resolvers = require('../graphQL/resolvers');
const { authentication, authorization } = require('../middlewares/auth');
const { uploader } = require('../middlewares/multer')

router.get('/list', authentication, authorization, usersController.getAllUsers)
router.post('/login', usersController.login)
router.post('/register', usersController.register)
router.put('/edit/:id', authentication, uploader.single('image'), usersController.editUsers)
router.get('/find/:id', authentication, authorization, usersController.findById)

module.exports = router;
