module.exports = (error, req, res, next) => {
    if (error) {
        if (error.status) {
            res.status(error.status).json({
                status: 'failed',
                message: error.message
            });
        } else if (error.response && error.response.data) {
            res.status(400).json({
                status: 'failed',
                message: error.message.data.error
            });
        } else {
            res.status(400).json({
                status: 'failed',
                message: error.message
            });
        }
    }
}
