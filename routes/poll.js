const express=require('express');
const router=express.Router();
const Pusher=require('pusher');
const mongoose=require('mongoose');
const Vote=require('../Modals/vote')


var pusher = new Pusher({
    appId: '643622',
    key: '4e4823458da55f50b735',
    secret: 'fddd2971d509b6345977',
    cluster: 'us2',
    encrypted: true
  });
router.get('/',(req,res)=>{
    Vote.find().then(votes=>
        res.json({success:true,votes}));
})

router.post('/',(req,res)=>{
    const newVote={
        os:req.body.os,
        points:1
    }
 
    new Vote(newVote).save().then(vote=>{
        pusher.trigger('os-poll', 'vote', {
            points:parseInt(vote.points),
            os:vote.os
          });
          return res.json({success:true,meassage:"Thank you for voting"});
        
    })   
})

module.exports=router;