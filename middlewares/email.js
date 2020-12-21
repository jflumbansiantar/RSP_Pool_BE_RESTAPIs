const nodemailer = require('nodemailer');
const { users, bookings } = require('../models/bookings');

module.exports = async (booking) => {
    let dataBookings = await bookings.findOne({ where: booking });
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })
    let mail = await transporter.sendEmail({
        from: process.env.EMAIL_USER,
        to: users.email,
        subject: 'ROOM BOOKING',
        text: 'Your Booking',
        html: `
        `
    });
    console.log("Mail sent : %s", mail.messageId);
    
}