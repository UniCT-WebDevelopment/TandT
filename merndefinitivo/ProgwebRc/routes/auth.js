const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//REGISTER
router.post("/register", async (req,res)=>{
    try{

        //cifratura pass
        const salt = await bcrypt.genSalt(10);
        const hashedPaassword = await bcrypt.hash(req.body.password,salt);
        
        //prelevamento dati 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPaassword,
            desc : req.body.desc,
            nazionality: req.body.nazionality,
            city: req.body.city,
            profilePicture :req.body.profilePicture,
            coverPicture :req.body.coverPicture,
        });
        //invio
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

//login
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("utente nont trovato");

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("password sbagliata")
        
        res.status(200).json(user);
    }catch(err){
     
    }
});


module.exports = router;