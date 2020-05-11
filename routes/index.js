const express = require('express');
const router = express.Router();

// const tasksRouter = require('./tasks');
const userRouter = require('./user.js');

const {User, Task} = require('../models')

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'masuk'
    })
});
router.use('/user', userRouter);
// router.use('/tasks', tasksRouter);

module.exports = router;
