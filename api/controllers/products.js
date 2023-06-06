const mongoose = require('mongoose');
const Product = require("../models/product");

exports.products_get_all = (req,res,next) => {
    Product
    .find()
    .select('name price _id  description quantity productImage')
    .exec()
    .then(products => {
        const response = {
            count:products.length,
            products: products.map(product => {
                return {
                    name: product.name,
                    price: product.price,
                    _id: product._id,
                    description: product.description,
                    quantity:product.quantity,
                    productImage: "http://localhost:3000/"+product.productImage,
                    request:{
                        type: 'GET',
                        url:'http://localhost:3000/products/'+product._id,
                    }
                }
            }),
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
};

exports.products_create_product =(req, res, next) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      description:req.body.description,
      quantity: req.body.quantity,
      productImage: req.file.path,
    });
    product
      .save()
      .then(result => {
        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
              name: result.name,
              price: result.price,
              _id: result._id,
              description:result.description,
              quantity: result.quantity,
              productImage: result.productImage,
              request: {
                  type: 'GET',
                  url: "http://localhost:3000/products/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: err
        });
      });
  };

  exports.products_get_product = (req,res,next) => {
    const id= req.params.productId;
    Product
    .findById(id)
    .select('name price _id  description quantity productImage')
    .exec()
    .then(product =>{
        if(product) {
            res.status(200).json({
                product:product,
                request: {
                    type: 'GET',
                    url:'http://localhost:3000/products/'
                }
            });
        } else {
            res.status(404).json({message:"No valid entry found for provided ID"});
        }

    })
    .catch((err) =>{
        res.status(500).json({error: err});
    });
};

exports.products_update_product = (req,res,next) => {
    const id= req.params.productId;
    Product.findByIdAndUpdate(id,{$set:req.body},{new:true})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Product updated successfully',
            request: {
                type: 'GET',
                url:'http://localhost:3000/products/'+id
            }
        });

    })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    });
};
exports.products_delete=(req,res,next) => {
    const id= req.params.productId;
    Product
    .deleteOne({_id: id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Product deleted successfully',
            request: {
                type:'POST',
                url:'http://localhost:3000/products/',
                body: {name:'String',price:'Number',productImage:'String',description:'String'},
            }
        });
    })
    .catch(err=>{
        res.status(500).json({error: err});
    });
};