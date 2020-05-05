const mongoose = require('mongoose');

var moment = require('moment')

const connBackEnd = mongoose.createConnection('mongodb://localhost:27017/almacenBackEnd',
{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});

const connFrontEnd = mongoose.createConnection('mongodb://localhost:27017/almacenFrontEnd',
{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});

let ProductoBack=connBackEnd.model('Producto',require('./ShemasBack/producto'))
connBackEnd.model('Marca',require('./ShemasBack/marca'))
connBackEnd.model('Fragancia',require('./ShemasBack/fragancia'))
connBackEnd.model('Categoria',require('./ShemasBack/categoria'))
let ProductoFront=connFrontEnd.model('Producto',require('./ShemaFront/producto'))

ProductoBack.find({}, function(err,productosBack){
   
    ProductoFront.find({}, function(error,productosFront){
    //     console.log(error)
    if(productosFront.length>0){
        let pb=[]
        let pf=[]
        
        productosBack.forEach(function(prodb){
         pb.push(prodb.code)
        
        })
        productosFront.forEach(function(prodf){
         pf.push(prodf.code)
        
        })
        console.log(pb)
        console.log(pf)
        pb.forEach(function(codeb){
         let existe=pf.includes(codeb)
         if(!existe){
            ProductoBack.findOne({code:codeb},function(err,producto){
                guardar(producto)
            })
           
         }else{
            ProductoBack.findOne({code:codeb},function(err,prob){
                ProductoFront.findOne({code:codeb},function(err,prof){
                    modificar(prob,prof)
                })
            })
         }
        })
    }else{
        productosBack.forEach(function(prodb){
            guardar(prodb)
           
           
           })
         
    }
      
    })
}).populate('marca').populate('categoria').populate('fragancia')

   
   
       

async function guardar(producto){
    
    var prod=new ProductoFront()
    prod.name=producto.name
    prod.description=producto.description
    prod.code=producto.code;
    prod.price=producto.price;
    prod.createAt=moment().unix();
    prod.img=producto.img;
    prod.eliminado=false;
    prod.estaEnPuntera='false'
    prod.marca=producto.marca.name;
    prod.categoria=producto.categoria.name; 
    prod.fragancia=producto.fragancia!=null?producto.fragancia.name:"";
    prod.save()
}

async function modificar(productoBack,productosFront){
   
    productosFront.name=productoBack.name
    productosFront.description=productoBack.description
    productosFront.code=productoBack.code;
    productosFront.price=productoBack.price;
    productosFront.createAt=moment().unix();
    productosFront.img=productoBack.img;
    productosFront.eliminado=false;
    productosFront.estaEnPuntera=productoBack.estaEnPuntera
    productosFront.marca=productoBack.marca.name;
    productosFront.categoria=productoBack.categoria.name; 
    productosFront.fragancia=productoBack.fragancia!=null?productoBack.fragancia.name:"";
    productosFront.save()
}
