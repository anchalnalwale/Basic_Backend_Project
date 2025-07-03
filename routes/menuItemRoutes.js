const express = require('express')
const router = express.Router();
const MenuItem = require('./../models/MenuItems');

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newItem = new MenuItem(data);
    const response = await newItem.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Error' });
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Error' });
  }
})

router.get('/:tasteType', async(req,res) =>{
  try{
    const tasteType = req.params.tasteType;
    if(tasteType=='sweet' || tasteType=='spicy' || tasteType=='sour')
    {
      const response = await MenuItem.find({taste: tasteType});
      console.log('response fetched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error : 'Invalid taste type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
}); 

// router.delete('/:id', async (req, res) => {
//   try {
//     const menuId = req.params.id;
//     const response = await MenuItem.findByIdAndRemove(menuId);
//     if (!response) {
//       return res.status(404).json({ error: 'Menu not found' });
//     }
//     console.log('data deleted');
//     res.status(200).json({ message: 'Deleted Successfully' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Error' });
//   }
// });

module.exports = router;