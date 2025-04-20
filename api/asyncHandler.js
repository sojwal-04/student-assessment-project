const asyncHandler = (fn) => {
    return async (req, res, next = () => { }) => {
        //
        try {
            await fn(req, res, next);
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                message: err.message || err?.sqlMessage || 'Internal Server Error',
                data: null,
                error: err,
                stackTrace: process.env.NODE_ENV == 'DEV' ? err.stack : null
            });
        }
    }
}

module.exports = asyncHandler;