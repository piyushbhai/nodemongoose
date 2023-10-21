const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/tachblicapp';
// const db = process.env.MONGODB_URI;

mongoose.connect(db,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log("connection successful");    
}).catch((err)=>{
    console.log(err);
    console.log("No connection");
})
