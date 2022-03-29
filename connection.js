const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/students", {
    /*useCreateIndex: true,
    useNewURLParser: true,
    useUnfiedTopology: true*/
}).then(()=> {
    console.log("Connection successful")
}).catch((err) => {
        console.log("Error")
    
});


