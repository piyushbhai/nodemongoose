const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/auth');

// GET all users
router.get('/',verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific user by ID
router.get('/:id', [verifyToken,getUser], (req, res) => {
  res.json(res.user);
});

// POST a new user
router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // console.log(hashedPassword); return
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role
  });

  
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT/update a user by ID
router.put('/:id', [verifyToken,getUser], async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }

  if (req.body.email != null) {
    res.user.email = req.body.email;
  }

  if (req.body.role != null) {
    res.user.role = req.body.role;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user by ID
router.delete('/:id', verifyToken,async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(200).send({ message: 'User not found'});
    }

    res.status(200).send({ message: `User with ID ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
