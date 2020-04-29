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

ProductoBack.find({},async function(error,productos){
    console.log(error)
    console.log(productos)
    for(var i =0;i<productos.length;i++){
       await guardar(productos[i])
    }
   
       
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
    prod.marca=producto.marca.name;
    prod.categoria=producto.categoria.name; 
    prod.fragancia=producto.fragancia!=null?producto.fragancia.name:"";
    prod.save()
}
