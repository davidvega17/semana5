const config = require('../secret/config.js');
const db = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

exports.add = (req, res) =>{
    var matched_Articulo_promise = db.Articulo.findAll({
        where:  {nombre: req.body.nombre}
    });
    matched_Articulo_promise.then(function(category){ 
        if(category.length == 0){
            db.Articulo.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                estado: req.body.estado,
                categoriaId: req.body.categoriaId,
                codigo: req.body.codigo
            }).then(function(){
                res.status(200).send({nombre:req.body.nombre, descripcion:req.body.descripcion, estado:req.body.estado,codigo:req.body.codigo});;
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
        const Articulo = await db.Articulo.findOne({where:{id:req.body.id}});
        if (Articulo){
            const Articulo = await db.Articulo.update(
                {
                    nombre:req.body.nombre,
                    descripcion:req.body.descripcion,
                    codigo:req.body.codigo,
                },
                {
                where: {
                    id:req.body.id                },
                //returning; true
            });
            res.status(200).json(Articulo);
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
        const Articulo = await db.Articulo.findOne({where:{id:req.body.id}});
        if (Articulo){
            const Articulo = await db.Articulo.update({estado:1},
                {
                where: {
                    id:req.body.id
                },
                //returning; true
            });
            res.status(200).json(Articulo);
        }else{
            res.status(404).send({message:'Articulo not found.'})
        }
    }catch(error){
        res.status(500).send({message:"error: "+ error});
        next(error);
    }
};

exports.deactivate = async (req,res,next) => {
    try{
        const Articulo = await db.Articulo.findOne({where:{id: req.body.id}});
        if (Articulo){
            const Articulo = await db.Articulo.update({estado:0},
                {
                where: {
                    id:req.body.id
                },
                //returning; true
            });
            res.status(200).json(Articulo);
        }else{
            res.status(404).send({message:'Articulo not found.'})
        }
    }catch(error){
        res.status(500).send({message:"error: "+ error});
        next(error);
    }
};


exports.list = (req, res) => {
    console.log(db);
    db.Articulo.findAll().then(articulos => res.status(200).json(articulos));
}