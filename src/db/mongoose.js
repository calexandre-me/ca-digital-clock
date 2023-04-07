const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dc-user')
  .then((message) => {
    console.log('Connected!') 
    return 'Connected'
  })
  .catch(error=>{ 
    console.log("Could not connect to the database.")
    return "Could not connect to the database."
  });