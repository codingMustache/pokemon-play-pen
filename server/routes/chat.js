const { addMessage, getUsersMsg } = require('../db/dbHelperFuncs.js');

const { Router } = require('express');
const Chat = Router();



Chat.get('/', (req, res)=>{
  const id = req.user._id;
  getUsersMsg(id, (msgs)=> {
    if (msgs) {
      res.status(200).send(msgs.reverse());
    } else {
      res.sendStatus(404);
    }
  });
});

Chat.post('/', (req, res)=>{
  const msg = req.body;
  //construct Msg Obj
  const msgObj = {
    receiver: msg.to,
    sender: req.user._id,
    message: msg.text,
    date: new Date()
  };
  // add msg to Schema
  addMessage(msgObj, (insertedObj)=>{
    if (!!insertedObj) {
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  });
});


module.exports = {Chat};
