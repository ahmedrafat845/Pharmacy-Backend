import { productModel } from "../../../DataBase/models/product.model.js"


export const addProduct=async(req,res)=>{
    const {name,price,category,quantity,bestSeller,offer,description,image}=req.body
   try{
    const isProduct=await productModel.findOne({name})
    if(isProduct){
        res.status(400).json({msg:"product already added"})
    }else{
        await productModel.insertMany({name,price,category,quantity,bestSeller,offer,description,image})
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


export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find();
        res.json({ message: "success", allProducts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    const { _id, name, quantity, price, category, description, bestSeller, offer,image } = req.body;
    try {
      const product = await productModel.findById(_id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
  
      const updatedProduct = await productModel.findByIdAndUpdate(
        _id,
        { name, quantity, price, category, description, bestSeller, offer ,image},
        { new: true } 
      );
  
      res.status(200).json({
        msg: 'Product updated successfully',
        product: updatedProduct,
      });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  