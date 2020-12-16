const { Router } = require('express');
const router = Router();
const usersRoutes = require('./user')
const roomsRoutes = require('./room')
const bookingsRoutes = require('./booking');

router.get('/', (req,res)=>{
    res.status(200).json({
        message : "Hi, good people! Welcome to Home Page of Movie Review Apps! Have a good day!"
    })
});
router.use('/room', moviesRoutes)
router.use('/users', usersRoutes)
router.use('/booking', bookingsRoutes)

module.exports = router;


