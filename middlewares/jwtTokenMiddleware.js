const express = require('express');
const jwt = require('jsonwebtoken');
const {key} = require('../settings/keys');
const {client} = require('../redis');

const JWTMiddleware = async function (req, res, next){
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token = token.split(' ')[1]
    const value = await client.get(token);
    if(!token || value=='invalid'){
        res.status(401).send({
            messageError: 'Error Token'
        })
        return 
    }
    if(token){
        jwt.verify(token, key, (error, decoded)=>{
            if(error){
                return res.status(401).json({
                    message: 'Token Error'
                })
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }
}


module.exports = {JWTMiddleware};