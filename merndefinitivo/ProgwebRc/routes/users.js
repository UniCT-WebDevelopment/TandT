
const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
//aggiorna utente 
router.put("/:id", async (req,res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json(" Informazioni acount  aggiunte con successo")
        } catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(403).json(" puoi aggiornare solo il tuo account");
    }
});
//delete 
router.delete("/:id", async (req,res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("  account eliminato")
        } catch (error) {
            console.log(err);
        }
    }
    else {
        return res.status(403).json(" puoi eliminare solo il tuo account");
    }
});
//get a user 
router.get("/",async(req,res) =>{
    
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({username:username});
        const {password,updatedAt,isAdmin, ...other} = user._doc;
        res.status(200).json(other);
    } catch (err){
        res.status(500).json(err);
    }
});

//get friends

router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });
//foolow user 
router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);     
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers:req.body.userId}});
                await currentUser.updateOne({$push: {followings:req.params.id}});
                res.status(200).json("account aggiunto ai seguiti")
            }
            else{
                res.status(403).json("account gia seguito")
            }
        } 
        catch (err) {
            res.status(500).json(err);        
        }
    }
    else {
        res.status(403).json("non puoi seguire te stesso")
    }
});
//unfollow
router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);     
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers:req.body.userId}});
                await currentUser.updateOne({$pull: {followings:req.params.id}});
                res.status(200).json("account unfollowed")
            }
            else{
                res.status(403).json("non segui questo account")
            }
        } 
        catch (err) {
            res.status(500).json(err);        
        }
    }
    else {
        res.status(403).json("non puoi unfollow te stesso")
    }
});

//ricerca utenti

router.get("/search/:searchUser",async(req,res)=>{
    try{
       // const currentUser = await User.findById(req.body.userId);
        const Users = await User.findOne({ 'username': req.params.searchUser });
        if(Users){
        res.body = true;
        res.status(200).json("utente trovato");
        }
        else{
            es.body = false;
            res.status(200).json("utente trovato");
        } 
        return Users;
    }catch(err){
        res.status(500).json(err);

    }
})



module.exports = router;
