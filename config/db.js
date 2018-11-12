const mongoose=require('mongoose');

//mongoose promise
mongoose.Promise=global.Promise;

//mongooseconnect
mongoose.connect('mongodb://sasi:sasi1234@ds157853.mlab.com:57853/pusherpoll')
        .then(()=>{
            console.log('mongodb is connected');
        }).catch(err=>{
            console.log(err);
        })