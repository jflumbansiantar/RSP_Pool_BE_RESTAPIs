const { Router } = require('express');
const router = Router();
const usersRoutes = require('./user')
const roomsRoutes = require('./room')
const bookingsRoutes = require('./booking');

router.get('/', (req,res)=>{
    res.status(200).json({
        status: true,
        message : "Hi, good people! Welcome to Home Page of Our Reservation Apps! Have a good day!"
    })
});
router.use('/room', roomsRoutes)
router.use('/user', usersRoutes)
router.use('/booking', bookingsRoutes)

module.exports = router;


