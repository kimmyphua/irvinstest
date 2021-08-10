const router = require("express").Router();
const itemModel = require("../models/item.model")

router.get("/",async (req,res)=>{
    try{
        let item = await itemModel.find()
        res.status(200).json({item})
    }catch(e){
        res.status(400).json({"message":"fail to find item"})
    }
})

router.get("/:id", async(req,res)=>{
    try{
        
        let item = await itemModel.findById(req.params.id)
        res.status(200).json({item})
    }catch (e) {
        res.status(400).json({"message":"fail to find item"})
    }
})

router.post("/products", async(req,res)=>{
    try{
        let item = new itemModel(req.body)
        console.log(item)
        await item.save()
        
        res.status(201).json({item})
    }catch (e) {
        console.log(e)
        res.status(400).json({message:"failed to create item"})
    }
})

router.delete("/delete/:id", async(req,res)=>{
    try{
        
        let results = await itemModel.findByIdAndDelete(req.params.id)
        let id = results._id
        console.log(id)
        res.status(200).json({id})
    }catch (e) {
        res.status(400).json({"message":"fail to delete item"})
    }
})

router.put("/products/:id", async(req,res)=>{
    try{
        console.log(req.body)
        let item = await itemModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({item})
    }catch (e) {
        res.status(400).json({"message":"fail to edit item"})
    }
})


module.exports = router