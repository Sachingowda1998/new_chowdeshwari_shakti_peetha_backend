const express = require('express');
const {
    login,
    addUser,
    editUser,
    editPassword,
    getUser,
    deleteUser
} = require('../controllers/loginController');
const router = express.Router();

router.post('/login', login);
router.post('/add', addUser);
router.put('/edit/:userId', editUser);
router.put('/edit-password/:userId', editPassword);
router.get('/user/:userId', getUser);
router.delete('/delete/:userId', deleteUser);

module.exports = router;
