const jwt= require('jsonwebtoken')
module.exports = function isValidToken(req,res,next){
    jwt.verify(req.body.token,'JWTTOKEN',(err,data)=>{
        if(err)
            return res.status(401).send(err)
        return next()
    })
}