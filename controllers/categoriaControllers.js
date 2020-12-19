const config = require('../secret/config.js');
const db = require('../models');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const token = require("../services/token.js")


exports.add = (req, res) =>{
    var matched_category_promise = db.Categoria.findAll({
        where:  {nombre: req.body.nombre}
    });
    matched_category_promise.then(function(category){ 
        if(category.length == 0){
            db.Categoria.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                estado: req.body.estado
            }).then(function(){
                res.status(200).send({nombre:req.body.nombre, descripcion:req.body.descripcion, estado:req.body.estado});;
            });
        }
        else{
            res.status(409).send();
        }
    }).catch(err => {
        res.status(500).send('Error ->' + err);
    });
}

exports.update = async (req,res,next) => {
    try{
        const category = await db.Categoria.findOne({where:{id:req.body.id}});
        if (category){
            const category = await db.Categoria.update({descripcion:req.body.descripcion},
                {
                where: {
                    nombre:req.body.id
                },
                //returning; true
            });
            res.status(200).json(category);
        }else{
            res.status(404).send({message:'category not found.'})
        }
    }catch(error){
        res.status(500).send({message:"error."});
        next(error);
    }
};

exports.activate = async (req,res,next) => {
    try{
        const category = await db.Categoria.findOne({where:{id:req.body.id}});
        if (category){
            const category = await db.Categoria.update({estado:1},
                {
                where: {
                    id:req.body.id
                },
                //returning; true
            });
            res.status(200).json(category);
        }else{
            res.status(404).send({message:'category not found.'})
        }
    }catch(error){
        res.status(500).send({message:"error: "+ error});
        next(error);
    }
};

exports.deactivate = async (req,res,next) => {
    try{
        const category = await db.Categoria.findOne({where:{id:req.body.id}});
        if (category){
            const category = await db.Categoria.update({estado:0},
                {
                where: {
                    id:req.body.id
                },
                //returning; true
            });
            res.status(200).json(category);
        }else{
            res.status(404).send({message:'category not found.'})
        }
    }catch(error){
        res.status(500).send({message:"error: "+ error});
        next(error);
    }
};

exports.list = (req, res) => {
    db.Categoria.findAll().then(categories => res.status(200).json(categories));
}