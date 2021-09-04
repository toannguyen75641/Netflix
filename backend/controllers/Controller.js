exports.success = (res, data, code = 200) => {
    res.status(code).json({
        success: true,
        data
    })
} 

exports.error = (res, errors, code = 404) => {
    res.status(code).json({
        success: false,
        errors
    })
}