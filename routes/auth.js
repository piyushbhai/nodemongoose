const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  // Add code for user registration here
});

router.post('/login', async (req, res) => {
  // Add code for user login here
});

router.post('/token', async (req, res) => {
  // Add code for generating a new token here
});

module.exports = router;
