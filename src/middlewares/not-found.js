module.exports = (req,res,next) => {
    // throw new Error('test err')
    res.status(404).json({ message: 'Not Found 404 on this server' })
}