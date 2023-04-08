const mongoose = require('mongoose');

//DB password: fmlqioFQuyHKMHtC
// mongoose.connect('mongodb://127.0.0.1:27017/dc-user')
mongoose.connect('mongodb+srv://charlesalexandremeance:fmlqioFQuyHKMHtC@db-users.ncwdszp.mongodb.net/?retryWrites=true&w=majority')
  .then((message) => {
    console.log('Connected!') 
    return 'Connected'
  })
  .catch(error=>{ 
    console.log("Could not connect to the database.")
    return "Could not connect to the database."
  });