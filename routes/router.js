const express = require('express');
const router = express.Router();

const ejemplo = require('../controllers/ejemplo.controllers.js');

router.post('/to-do/create', ejemplo.create);
router.get('/to-do/all', ejemplo.findAll);
router.get('/to-do/onebyid/:id', ejemplo.findById);
router.put('/to-do/update/:id', ejemplo.update);
router.delete('/to-do/delete/:id', ejemplo.delete);

module.exports = router;
