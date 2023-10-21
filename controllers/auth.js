const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
   

    // Find user by username
    const user = await User.findOne({email});
    //  console.log(user); return
    // If user not found or password incorrect, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate and send JWT token
    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
