var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var ProducSchema=Schema({
   
    name:String,
    description:String,
    price:Number,
    code:String,  
    stock:Number,
    crateAt:String,
    marca:{ type: Schema.Types.ObjectId, ref: 'Marca' },
    img:String,
    esFragancia:Boolean,
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    fragancia: { type: Schema.Types.ObjectId, ref: 'Fragancia' },
    eliminado:Boolean

})



module.exports=ProducSchema