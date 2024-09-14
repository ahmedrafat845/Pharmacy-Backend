import { productModel } from "../../../DataBase/models/product.model.js"


export const addProduct=async(req,res)=>{
    const {name,price,category,quantity,bestSeller,offer,description}=req.body
   try{
    const isProduct=await productModel.findOne({name})
    if(isProduct){
        res.status(400).json({msg:"product already added"})
    }else{
        await productModel.insertMany({name,price,category,quantity,bestSeller,offer,description})
        res.status(201).json({msg:"product added successfully"})
    }
   }catch(error){
    res.status(500).json({ msg: 'Server error', error: error.message });
   }
}

export const deleteProduct = async (req, res) => {
 try{
  const {_id} = req.body
  let deletedProduct=await productModel.findById({_id})
  if(deletedProduct){
      await productModel.findByIdAndDelete({_id})
      res.status(201).json({message:"deleted successffuly"})
  }else{
      res.status(400).json({message:"product not found"})
  }
 }catch(error){
  res.status(500).json({ msg: 'Server error', error: error.message });
 }
};
