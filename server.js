//Setup Express
const express = require('express');
const app = express();
var fs = require('fs');
//Setup Body Parser
const bp = require('body-parser');
app.use(bp.json());
const path = require('path');
//Setup Port
const port = 8000;


//Setup Mongoose
const mongoose =require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/product');
app.use(express.static(path.join(__dirname+ '/product-app/dist')));
//Setup Schema


const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 4},
    price: {type: Number, required: true},
    imageurl: {type: String}},
    {timestamps: true
    });
    mongoose.model('Product', ProductSchema);
    var Product = mongoose.model('Product')
   
    app.get('/product', (req, res)=> {
        console.log("in all route", )
        Product.find({}, (err,products)=>{
            if(err){
                console.log(err);
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Success", data: products})
            }
        })
    })
    app.get('/product/:id', (req, res)=>{
        Product.findOne({_id: req.params.id}, (err, product)=>{
            if(err){
                console.log (err)
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Success", data: product})
            }
        })
    })
    //Create Product
    app.post('/product', (req,res)=>{
        
        var newProduct = new Product({title:req.body.title, price:req.body.price, imageurl: req.body.imageurl})
        newProduct.save((err)=>{
            if(err){
                console.log(newProduct.errors)
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Success"})
            }
        })
    })
    // Update Product
    app.put('/product/:id', (req,res)=>{
        console.log("i have reached the updated server")
        var product = Product.update({_id: req.params.id}, {title: req.body.title, price:req.body.price, imageurl: req.body.imageurl}, (err)=>{
            if(err){
                console.log(err);
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Successful Update!"})
            }
        })
    })
    //Delete Product
    app.delete('/product/:id', (req,res)=>{
        Product.remove({_id: req.params.id}, (err)=>{
            if(err){
                console.log(err);
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Successful removal"})
            }
        
        })
    
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./product-app/dist/index.html"))
      });


app.listen(port, ()=>{
    console.log(`We on port ${port}`);
})