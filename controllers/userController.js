const config = require('../secret/config.js');
const db = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const token = require("../services/token.js")


exports.login = (req, res) => {
    db.Usuario.findOne({
        where:{
            email: req.body.email
        }
    }).then(user => {
        if (!user){
            return res.status(404).send('User Not Found.');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid){
            return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!"});        
        }
        token.encode(user).then(function(tokenReturn){res.status(200).json({ user, tokenReturn});}).catch();
        
    }).catch(err => {
        res.status(500).send('Error ->' + err);
    });
}

exports.add = (req, res) =>{
    var matched_users_promise = db.Usuario.findAll({
        where:  {email: req.body.email}
    });
    matched_users_promise.then(function(users){ 
        if(users.length == 0){
            const passwordHash = bcrypt.hashSync(req.body.password,10);
            db.Usuario.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: passwordHash,
                rol: req.body.rol,
                estado: req.body.estado
            }).then(function(){
                res.status(200).send({name:req.body.name, email:req.body.email, password:passwordHash});
            });
        }
        else{
            res.status(409).json({errors: "Username or Email already in user"});
        }
    }).catch(err => {
        res.status(500).send('Error ->' + err);
    });
}

exports.update = async (req,res,next) => {
    try{
        const user = await db.Usuario.findOne({where:{id:req.body.id}});
        if (user){
            const user = await db.Usuario.update({
                nombre:req.body.nombre,
                email:req.body.email,
                rol:req.body.rol,
                password:req.body.password,
                estado:req.body.estdo
            },
                {
                where: {
                    id:req.body.id
                },
                //returning; true
            });
            res.status(200).json(user);
        }else{
            res.status(404).send({message:'user not found.'})
        }
    }catch(error){
        res.status(500).send({message:"error."});
        next(error);
    }
};

exports.activate = async (req,res,next) => {
    try{
        const user = await db.Usuario.findOne({where:{id:req.body.id}});
        if (user){
            const user = await db.Usuario.update({
                estado:1
            },
                {
                where: {
                    id:req.body.id
                },
                //returning; true
            });
            res.status(200).json(user);
        }else{
            res.status(404).send({message:'user not found.'})
        }
    }catch(error){
        res.status(500).send({message:"error."});
        next(error);
    }
};


exports.deactivate = async (req,res,next) => {
    try{
        const user = await db.Usuario.findOne({where:{id:req.body.id}});
        if (user){
            const user = await db.Usuario.update({
                estado:1
            },
                {
                where: {
                    id:req.body.id
                },
                //returning; true
            });
            res.status(200).json(user);
        }else{
            res.status(404).send({message:'user not found.'})
        }
    }catch(error){
        res.status(500).send({message:"error."});
        next(error);
    }
};


exports.list = (req, res) => {
    db.Usuario.findAll().then(users => res.json(users));
    
}