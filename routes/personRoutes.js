// const express = require('express');
// const router = express.Router();
// const Person = require('./../models/person');

// router.post('/', async (req, res) => {
//   try {
//     const data = req.body;
//     const newPerson = new Person(data);
//     const response = await newPerson.save();
//     console.log('data saved');
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })

// router.get('/', async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log('data fetched');
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })

// router.get('/:workType', async(req,res) =>{
//   try{
//     const workType = req.params.workType;
//     if(workType=='chef' || workType=='manager' || workType=='waiter')
//     {
//       const response = await Person.find({work: workType});
//       console.log('response fetched');
//       res.status(200).json(response);
//     }else{
//       res.status(404).json({error : 'Invalid work type'});
//     }
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// });

// router.put('/:id',async(req,res)=>{
//   try{
//     const personId = req.params.id;
//     const updatedPersonData = req.body; 
//     const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
//       new: true,
//       runValidators: true,
//     })
//     if(!updatedPersonData) {
//       return res.status(404).json({error: 'Person not found'});
//     }
//     console.log('data updated');
//     res.status(200).json(response);
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal Error'});
//   }
// });

// router.delete('/:id',async(req,res) => {
//   try{
//     const personId = req.params.id;
//     const response = await Person.findByIdAndRemove(personId);
//     if(!response) {
//       return res.status(404).json({error: 'Person not found'});
//     }
//     console.log('data deleted');
//     res.status(200).json({message: 'Denied Successfully'});
//   }catch(err) {
//     console.log(err);
//     res.status(500).json({error: 'Internal Error'});
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware , generateTkeon} = require('./../jwt');

router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('data saved');
    const payload = {
      id: response.id,
      username: response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateTkeon(response.username);
    console.log("Token is : " , token);
    res.status(200).json({response: response , token: token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/login',async(req,res) => {
  try{
    const {username,password} = req.body;
    const user = await Person.findOne({username: username});
    if(!user || !(await user.comparePassword(password)))
    {
      return res.status(401).json({error: `Invalid username or password`});
    }
    const payload = {
      id : user.id,
      username: user.username
    }
    const token = generateTkeon(payload);
    res.json({token})
  }catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.get('/profile',async(req,res) => {
  
})

// Modified to return only the authenticated user's data
router.get('/', async (req, res) => {
  try {
    // req.user is set by the authentication middleware
    const authenticatedUser = req.user;
    console.log('data fetched for user:', authenticatedUser.username);
    res.status(200).json(authenticatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/:workType', async(req,res) =>{
  try{
    const workType = req.params.workType;
    if(workType=='chef' || workType=='manager' || workType=='waiter')
    {
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error : 'Invalid work type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.put('/:id',async(req,res)=>{
  try{
    const personId = req.params.id;
    const updatedPersonData = req.body; 
    const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
      new: true,
      runValidators: true,
    })
    if(!response) { // Fixed: was checking updatedPersonData instead of response
      return res.status(404).json({error: 'Person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Error'});
  }
});

router.delete('/:id',async(req,res) => {
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId); // Updated: findByIdAndRemove is deprecated
    if(!response) {
      return res.status(404).json({error: 'Person not found'});
    }
    console.log('data deleted');
    res.status(200).json({message: 'Deleted Successfully'}); // Fixed: was "Denied Successfully"
  }catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Error'});
  }
});

module.exports = router;