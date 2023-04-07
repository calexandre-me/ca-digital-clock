const express = require('express');
const UserModel = require('../models/user');

const userRouter = express.Router();

userRouter.post('/board/users/register', (req, res)=>{
    const user = UserModel(req.body);
    user.save()
    .then(msg=>{
        res.send({success: "User has been registered. Go log-in!"})
    })
    .catch(error=>{
        res.send({ error: "An error occured! Check your data."});
    })
    console.log(req.body)
});

userRouter.post('/board/users/login', async (req, res)=>{
    const {email, password} = req.body;
    console.log(req.body);
    
    try{
        const targetUser = await UserModel.findByCredentials(email, password);
        console.log("You are logged in!!!");
        return res.status(200).send({ok: "Logging you in!!!"});  
    }
    catch(err){
        res.send({error: err.message});
    }
});
module.exports = userRouter;