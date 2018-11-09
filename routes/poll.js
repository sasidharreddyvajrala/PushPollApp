const express=require('express');
const router=express.Router();
const Pusher=require('pusher');


var pusher = new Pusher({
    appId: '643622',
    key: '4e4823458da55f50b735',
    secret: 'fddd2971d509b6345977',
    cluster: 'us2',
    encrypted: true
  });

router.get('/',(req,res)=>{
    res.send('POLL');
})

router.post('/',(req,res)=>{
    pusher.trigger('os-poll', 'vote', {
        points:1,
        os:req.body.os
      });
      return res.json({success:true,meassage:"Thank you for voting"});
})

module.exports=router;