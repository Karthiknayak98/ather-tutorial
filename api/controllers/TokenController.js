/**
 * TokenController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jsonwebtoken')
module.exports = {
    generateToken: async function(req,res){
        const token = jwt.sign({},'JWTTOKEN',{expiresIn:'5m'})
        res.json({token})
    }
};

