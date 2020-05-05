var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var ProducSchema=Schema({
   
    name:String,
    description:String,
    price:Number,
    code:String,  
    createAt:String,
    marca:String,
    img:String,
    categoria:String,
    fragancia: String,
    eliminado:Boolean,
    estaEnPuntera:String

})



module.exports=ProducSchema